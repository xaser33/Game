//this file contains the characters/npcs
var characters = [];

var countVonSnap = {
  name: "Count Von Snap",
  description: "dead..",
  dialogue: {
    one: "...",
    two: "",
    three: "",
  },
  accuse: "No, I'm not the murderer",
  itemShown: function(item) {
    switch (item) {
      case "knife":
        "I'm sorry but that has nothing to do with me."
        break;
      default:
        break;
    }
  }
}
characters.push(countVonSnap);
var butler = {
  name: "Butler",
  description: "A tall, dark man, with an excellent posture. He towers over you \
  with an ominous look. There's something not quite right.",
  itemShown: function(item) {
    switch (item) {
      case "knife":
        return "I'm sorry but that has nothing to do with me.";
        break;
      default:
        return "I'm not sure what I'm looking at..."
        break;
    }
  }
}
characters.push(butler);
