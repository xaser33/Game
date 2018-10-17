//This file contains the room object and details

//initialise room array
var rooms = [];

//room constructor
function roomConstructor(name1, desc, altDesc, itm, lcked, posDir, chars,
  posAct, inaccess, inaccText, event1, event2, event3, event4) {
  name: name1;
  description: desc;
  altDescription: altDesc;
  item: itm;
  locked: lcked;
  possibleDirections: posDir;
  npc: chars;
  possibleActions: posAct;
  inaccessible: inaccess;
  isInaccessibleText: inaccText;
  eventOne: event1;
  eventTwo: event2;
  eventThree: event3;
  eventFour: event4;
}

//rooms
var startRoom = { // rooms - 0
  name: "Dining Room",
  description: "It's dark",
  altDescription1: "It's pretty bright, you can see a door",
  item: ["candlestick", "letter opener"],
  locked: false,
  possibleDirections: {
    north: 1
  },
  npc: "Butler",
  possibleActions: {
    lightSwitch: true,
    openDoor: true,
  }
};
rooms.push(startRoom);

var entranceHall = {
  name: "Entrance Hall",
  description: "Your hayfever immediately makes you sneeze, \
  the sound alerts a faerie hiding in the tall grass",
  altDescription1: "",
  item: "key",
  inaccessible: false,
  isInaccessibleText: "You try the door, but it seems to be locked, \
  on investigation, there's a brass coloured keyhole.",
  possibleDirections: {
    south: 0,
  },
  npc: null,
  possibleActions: {
    pickup: true,
  }
};
rooms.push(entranceHall);
