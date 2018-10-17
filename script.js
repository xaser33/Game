//get elements
var header = $('#header')
var inputBox = $('#user-input')
var scrollingText = $('#game-text')

//init vars
var currentRoom = null;
var commands = ["go", "pickup", "inventory", "talk", "help", "look", "examine",
  "open", "show"
];
var inventory = ["hat", "hanky", "knife"];
var gameOver = false;

//run start sequence after 2 seconds
var startSequence = setInterval(startGame, 1000);

function startGame() {
  scrollingText.append("What's happening, where am I?<br />");
  clearInterval(startSequence);
}

//put the player in the room
var roomSequence = setInterval(startSequenceRoom, 1000);

function startSequenceRoom() {
  updateRoom(startRoom);
  clearInterval(roomSequence);
}

$(document).ready(function() {
  //Do these things when the return key is pressed:
  //put the focus inside the inputbox ready for the user to type
  inputBox.focus();

  $(document).keypress(function(key) {
    //if the key pressed is return, and the focus is the inputbox
    if (key.which === 13 && inputBox.is(':focus')) {
      //put the input into the value variable as lower case
      var value = inputBox.val().toLowerCase();
      //clear the input box for improved visuals
      inputBox.val("");
      //pass the value to the input parser
      parseInput(value);
    }
  })
  //Place things here to run when the game is ready:
})

//this function handles all of the users input. Directions, item handling
//and requests for help, inventory output etc.
function parseInput(input) {
  //break the users input into separate words
  var inputArray = input.split(" ");
  //find how many words the user used!
  var numWords = inputArray.length;

  //print out array for test purposes
  for (i in inputArray)
    scrollingText.append("<strong>" + inputArray[i] + "</strong><br />");
  switch (inputArray[0]) {
    case "go":
      //check if north,south,east,west exist in the array, if so
      //do the thing and break out of the switch statement.
      if ($.inArray('north', inputArray) >= 0) {
        console.log("moving " + inputArray[1]);
        var directionSelected = rooms[currentRoom.possibleDirections.north];
        if (directionSelected != null) {
          updateRoom(directionSelected);
        } else {
          scrollingText.append("You can't move this way. <br />");
        }
        break;
      }

      if ($.inArray('east', inputArray) >= 0) {
        console.log("moving " + inputArray[1]);
        var directionSelected = rooms[currentRoom.possibleDirections.east];
        if (directionSelected != null) {
          updateRoom(directionSelected);
        } else {
          scrollingText.append("You can't move this way. <br />");
        }
        break;
      }

      if ($.inArray('south', inputArray) >= 0) {
        console.log("moving " + inputArray[1]);
        var directionSelected = rooms[currentRoom.possibleDirections.south];
        if (directionSelected != null) {
          updateRoom(directionSelected);
        } else {
          scrollingText.append("You can't move this way. <br />");
        }
        break;
      }

      if ($.inArray('west', inputArray) >= 0) {
        console.log("moving " + inputArray[1]);
        var directionSelected = rooms[currentRoom.possibleDirections.west];
        if (directionSelected != null) {
          updateRoom(directionSelected);
        } else {
          scrollingText.append("You can't move this way. <br />");
        }
        break;
      }
      //in the case no if statement is true, ask the question and break
      scrollingText.append("Which direction? <br />");
      break;
    case "pickup":
      scrollingText.append("You have selected ", inputArray[0], "<br />");
      break;
    case "inventory":
      if (inventory.length == 0) {
        scrollingText.append("Your inventory is empty! <br />")
        break;
      } else {
        for (i in inventory) {
          scrollingText.append(inventory[i], ", ");
        }
        scrollingText.append("<br />")
      }
      break;
    case "talk":
      scrollingText.append("You have selected <br />", inputArray[0], "<br />");
      break;
    case "help":
      scrollingText.append("List of possible actions: <br />");
      for (c in commands) {
        scrollingText.append(commands[c], ", ");
      }
      scrollingText.append("<br />")
      break;
    case "look":
      //the look case could either reprint the description of the room for the
      //user, or show the items again, or more detail.
      scrollingText.append("You have selected <br />", inputArray[0], "<br />");
      break;
    case "examine":
      //the examine case is for looking at some item in more detail. For instance
      //if a room has a bookshelf with a protruding book, you could examine book
      scrollingText.append("You have selected <br />", inputArray[0], "<br />");
      break;
    case "open":
      scrollingText.append("You have selected <br />", inputArray[0], "<br />");
      break;
    case "show":
      //show the item to an NPC in the room, it may change their dialogue
      //function to go here to handle how people react to different objects
      var item = inputArray[1];
      //First check if the item exists in the inventory. It will return -1 if
      //not. If so, the position in the array.
      if ($.inArray(inputArray[1], inventory) >= 0) {
        console.log("You are showing: " + item + " to " +
          currentRoom.npc);
        if (currentRoom.npc == null) {
          scrollingText.append("There's nobody here to show the " + item + "\
            to <br />");
          break;
        } else {
          scrollingText.append("You show the " + item + " to the \
            " + currentRoom.npc + "<br />");
          showObject(item, currentRoom);
          break;
        }
      } else {
        console.log("Input item not in inventory");
        scrollingText.append("You don't seem to have said " + item + "<br />");
        break;
      }

    default:
      scrollingText.append("Command not recognised <br />",
        inputArray[0], "<br />");
  }
}
//this function takes the item the user types in the second word of their input
//and 'shows' it to the npc in the current room. It finds the right character
//because they are in an array and calls the character object func itemShow()
function showObject(item, room) {
  console.log("npc is " + room.npc);
  console.log("you are in room " + room.name);
  //Find the butler object from the string "Butler"
  var response = null;
  for (k in characters) {
    if (characters[k].name == room.npc) {
      response = characters[k].itemShown(item);
    }
  }
  //var npc = for
  scrollingText.append(response + "<br />");
}
//this is the main update room function.
//it will print the new room name and description, and any
//items that you can see.
function updateRoom(newRoom) {
  if (newRoom.inaccessible == true) {
    scrollingText.append(newRoom.isInaccessibleText + "<br />");
  } else {
    currentRoom = newRoom;
    scrollingText.append("You are in: ", currentRoom.name, ". Description: ");
    scrollingText.append(currentRoom.description, "<br />");
    printItemsInRoom(currentRoom);
  }
}

function printItemsInRoom(room) {
  if (room.item != null) {
    scrollingText.append("Here you can see: <br />");
    for (i in room.item) {
      scrollingText.append(room.item[i], " ");
    }
  } else {
    scrollingText.append("There's no items you can see <br />");
  }
}
