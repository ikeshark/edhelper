// Colors
const artifact = "linear-gradient(45deg, lightgrey, #bfbfbf, lightgrey)";
const w = "#fffafa";
const u = "#2283D7";
const b = "#555f61";
const r = "#ff0000";
const g = "#12c700";
const wubr = colorCombinator(w, u, b, r);
const wubg = colorCombinator(w, u, b, g);
const wurg = colorCombinator(w, u, r, g);
const ubrg = colorCombinator(u, b, r, g);
const wbrg = colorCombinator(w, b, r, g);
const wubrg = colorCombinator(w, u, b, r, g);
const greenRed = "linear-gradient(45deg, #30e8bf, red)";
const coal = "linear-gradient(to left, #eb5757, black)";
const rasta = "linear-gradient(to bottom, red, yellow, green)";
const rainbow = "linear-gradient(to bottom, red, orange, yellow, green, blue, indigo, violet)";
// const blackWhite = "radial-gradient(circle, black, white)";
const whiteBlack = "radial-gradient(circle, white, black)";
const whiteBlackWhite = "radial-gradient(circle, white, black, white)";
const blackWhiteBlack = "radial-gradient(circle, black, white, black)";
const blueSky = "linear-gradient(to left, #56ccf2, #2f80ed)";
const greenWhite = "linear-gradient(to left, white, green)";
const redWhite = "linear-gradient(to left, #ffcccc, red)";
const greenBlue = "linear-gradient(to left, #45a247, #283c86)";
const blackWhite = "linear-gradient(to left, white, black)";
function colorCombinator() {
  let result = "repeating-linear-gradient(45deg ";
  for (let i = 0; i < arguments.length; i++) {
    result += ", " + arguments[i] + " " + (i * 15) + "%";
    result += ", " + arguments[i] + " " + ((i + 1) * 15) + "%";
  }
  result += ")";
  return result;
}
let threecolors = [];
let colors = [artifact, w, u, b, r, g];
for (let i = 1; i < 5; i++) {
  for (let j = i + 1; j < 6; j  ++) {
    let temp = colorCombinator(colors[i], colors[j]);
    colors.push(temp);
    for (let k = j + 1; k < 6; k++) {
      let temp = colorCombinator(colors[i], colors[j], colors[k]);
      threecolors.push(temp);
    }
  }
}
colors = colors.concat(threecolors);
let othercolors = [wubr, wubg, wurg, wbrg, ubrg, wubrg, rasta, rainbow, greenWhite, redWhite, greenBlue, blackWhite, greenRed, coal, blueSky];
colors = colors.concat(othercolors);
// player object and prototype
function Player(i) {
  this.i = i;
  this.poison = 0;
  this.life = 40;
  this.number = this.i + 1;
  this.name = "Player " + this.number;
  this.rotated = false;
  this.castCount = 0;
  this.commanderDamage = Array(6).fill(0);
}
Player.prototype.color = "";
function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
Player.prototype.displayLife = function() {
  lifeButtons[this.i].innerHTML = this.life;
  lifeDisplay.innerHTML = this.life;
  for (let i = 9; i > 0; i -= 0.25) {
    lifeButtons[this.i].style.fontSize = i + "em";
    let overflow = isOverflown(lifeButtons[this.i]);
    if (!overflow) {
      let fontSize = i - 0.5;
      lifeButtons[this.i].style.fontSize = fontSize + "em";
      break;
    }
  }
  for (let i = 9; i > 0; i -= 0.25) {
    lifeDisplay.style.fontSize = i + "em";
    let overflow = isOverflown(lifeDisplay);
    if (!overflow) {
      let fontSize = i - 0.5;
      lifeDisplay.style.fontSize = fontSize + "em";
      break;
    }
  }
};

Player.prototype.changeName = function() {
  let newName = prompt("Please enter new name");
  if (newName != null) {
    this.name = newName;
    nameButtons[this.i].innerHTML = newName;
    // this is good and all but, but if you go from 4 to 5 players, player name will not auto-adjust
    // should build displayName() have changeName call displayName()
    for (let i = 1; i > 0; i -= 0.05) {
      nameButtons[this.i].style.fontSize = i + "em";
      let overflow = isOverflown(nameButtons[this.i]);
      if (!overflow) {
        let fontSize = i - 0.10;
        nameButtons[this.i].style.fontSize = fontSize + "em";
        break;
      }
    }
  }
};
let player0 = new Player(0);
let player1 = new Player(1);
let player2 = new Player(2);
let player3 = new Player(3);
let player4 = new Player(4);
let player5 = new Player(5);
let players = [player0, player1, player2, player3, player4, player5];
// default color assignment
player0.color = colors[5];
player1.color = colors[2];
player2.color = colors[3];
player3.color = colors[4];
player4.color = colors[6];
player5.color = colors[7];
const playerDivs = document.querySelectorAll("#playersContainer > div");
let numPlayers = 4;
// load and save state functions
function loadState() {
  temp2 = localStorage.getItem("numPlayers");
  numPlayers = Number(temp2);
  for (let i = 0; i < numPlayers; i++) {
    let player = "player" + i;
    let temp = JSON.parse(localStorage.getItem(player));
    players[i].name = temp.name;
    players[i].life = temp.life;
    players[i].poison = temp.poison;
    players[i].color = temp.color;
    players[i].commanderDamage = temp.commanderDamage;
    players[i].rotated = temp.rotated;
    players[i].castCount = temp.castCount;
  }
}
function saveState() {
  for (let i = 0; i < numPlayers; i++) {
    let player = "player" + i;
    localStorage.setItem(player, JSON.stringify(players[i]));
  }
  localStorage.setItem("numPlayers", numPlayers);
  localStorage.setItem("bool", "true");
}
if (localStorage.bool) {
  loadState();
}
window.addEventListener("unload", saveState);

let icons = document.querySelectorAll(".mainIcons");
// display board function
function displayBoard() {
  let container = document.getElementById("playersContainer");
  switch (numPlayers) {
    case 6:
      for (let i = 0; i < 6; i++) {
        playerDivs[i].style.width = "33.33vw";
      }
      let layout6 = '"one one two two three three""six six five five four four"';
      container.style.gridTemplateAreas = layout6;
      break;
    case 5:
      for (let i = 0; i < 3; i++) {
        playerDivs[i].style.width = "33.33vw";
      }
      for (let i = 3; i < 5; i++) {
        playerDivs[i].style.width = "50vw";
      }
      let flipContainers = document.querySelectorAll(".lifeAndNameContainer");
      let layout5 = '"one one two two three three""five five five four four four"';
      container.style.gridTemplateAreas = layout5;
      break;
    case 4:
      for (let i = 0; i < 4; i++) {
        playerDivs[i].style.width = "50vw";
        icons[i].style.width = "55%";
        icons[i + 2].style.width = "55%";
      }
      let layout4 = '"one one two two" "four four three three"';
      container.style.gridTemplateAreas = layout4;
      break;
    case 3:
      for (let i = 0; i < 3; i++) {
        playerDivs[i].style.width = "50vw";
        players[i].number = i + 1;
        icons[i].style.width = "55%";
      }
      playerDivs[2].style.width = "100vw";
      let layout3 = '"one one two two" "three three three three"';
      container.style.gridTemplateAreas = layout3;
      icons[4].style.width = "35%";
      icons[5].style.width = "35%";
      break;
    case 2:
      for (let i = 0; i < 2; i++) {
        playerDivs[i].style.width = "100vw";
        icons[i].style.width = "35%";
        icons[i + 2].style.width = "35%";
        players[i].number = i + 1;
      }
      let layout2 = '"one" "two"';
      container.style.gridTemplateAreas = layout2;
  }
  for (let i = 0; i < numPlayers; i++) {
    playerDivs[i].classList.remove("hidden");
    playerDivs[i].style.background = players[i].color;
    let deg = players[i].rotated ? 180 : 0;
    commanderDamageButtons[i].classList.remove("hidden");
    rotate(playerDivs[i], deg);
    players[i].displayLife();
  }
  for (let i = numPlayers; i < 6; i++) {
    playerDivs[i].classList.add("hidden");
    commanderDamageButtons[i].classList.add("hidden");

  }
}
// new name buttons and event listeners
const nameButtons = document.querySelectorAll(".playerName");
nameButtons.forEach((elem, i) => {
  elem.addEventListener("click", players[i].changeName.bind(players[i]));
});
// rotate function
function rotate(element, deg) {
  element.style.webkitTransform = "rotate("+deg+"deg)";
  element.style.mozTransform = "rotate("+deg+"deg)";
  element.style.msTransform = "rotate("+deg+"deg)";
  element.style.oTransform = "rotate("+deg+"deg)";
  element.style.transform = "rotate("+deg+"deg)";
};
// modal window variables and close function
// reminder: below is in DOM order
const modalWindows = document.querySelectorAll("[id^=modalWindow]");
const modalBackground = document.getElementById("modalBackground");
const closeModal = () => {
  modalWindows.forEach(function(element) {
    element.classList.add("hidden");
  })
  modalBackground.classList.add("hidden");
};
// rotate buttons
const rotateButtons = document.querySelectorAll(".buttonContainer button:nth-child(2)");
rotateButtons.forEach(function(element, i) {
  element.addEventListener("click", function() {
    let deg = players[i].rotated ? 0 : 180;
    rotate(playerDivs[i], deg);
    players[i].rotated = !players[i].rotated;
  });
});
// life change modal window
const lifeButtons = document.querySelectorAll(".lifeButtons");
const lifeDisplay = document.getElementById("modalLifeDisplay");
const lifePlusMinusButtons = document.querySelectorAll(".plusMinus");
const doubleHalveButtons = document.querySelectorAll(".doubleHalve");
lifeButtons.forEach(function (element, i) {
  element.addEventListener("click", function(){
    // variables
    let player = players[i];
    // functions
    function plusMinusLife() {
      player.life += parseInt(this.value);
      player.displayLife();
    };
    function doubleHalveLife() {
      player.life = Math.floor(player.life * parseFloat(this.value));
      player.displayLife();
    }
    let closeLifeModal = () => {
      lifePlusMinusButtons.forEach(function(element) {
        element.removeEventListener("click", plusMinusLife);
      });
      doubleHalveButtons.forEach(function(element) {
        element.removeEventListener("click", doubleHalveLife);
      });
      document.getElementById("lifeExit").removeEventListener("click", closeLifeModal);
      closeModal();
    };
    // opening and orienting modal window and displaying current life total
    let deg = player.rotated ? 180 : 0;
    rotate(modalWindows[0], deg);
    modalWindows[0].classList.remove("hidden");
    modalBackground.classList.remove("hidden");
    player.displayLife();
    // display background color of the appropriate player
    lifeDisplay.style.background = player.color;
    // adding event listeners to buttons
    lifePlusMinusButtons.forEach(function(element) {
      element.addEventListener("click", plusMinusLife);
    });
    doubleHalveButtons.forEach(function(element) {
      element.addEventListener("click", doubleHalveLife);
    });
    // close modal event listeners
    document.getElementById("lifeExit").addEventListener("click", closeLifeModal);
  });
});
// commander damage modal window
const commanderButtons = document.querySelectorAll(".buttonContainer button:nth-child(1)");
const commanderDamageButtons = document.querySelectorAll("[id^=cmdButton] + label");
const cmdPlusMinusButtons = document.querySelectorAll("#cmdPlusMinus button");
commanderDamageButtons.forEach((elem) => {
  elem.addEventListener('click', () => {
    cmdPlusMinusButtons[0].classList.remove("invisible");
    cmdPlusMinusButtons[1].classList.remove("invisible");
  });
});
cmdPlusMinusButtons[0].addEventListener('click', () => {
  cmdPlusMinusButtons[2].classList.remove("invisible");
  cmdPlusMinusButtons[3].classList.remove("invisible");
});
cmdPlusMinusButtons[1].addEventListener('click', () => {
  cmdPlusMinusButtons[2].classList.remove("invisible");
  cmdPlusMinusButtons[3].classList.remove("invisible");
});
commanderButtons.forEach(function (element, i) {
  element.addEventListener("click", function(){
    // variables
    let player = players[i];
    let castCount = document.querySelector("#castCount + label");
    let poison = document.querySelector("#poison + label");
    // opening and orienting modal window
    let deg = player.rotated ? 180 : 0;
    rotate(modalWindows[1], deg);
    modalWindows[1].classList.remove("hidden");
    modalBackground.classList.remove("hidden");
    let currentPlayer = document.getElementById("currentPlayer");
    currentPlayer.innerHTML = player.name;
    currentPlayer.style.background = player.color;
    castCount.innerHTML = player.castCount;
    // functions
    function plusAndMinus() {
      let checkedValue = document.querySelector("input[name=cmdModalGroup]:checked").value;
      let increment = parseInt(this.value);
      if (checkedValue === "poison") {
        player.poison += increment;
        poison.innerHTML = player.poison;
      } else if (checkedValue === "castCount") {
        player.castCount += increment;
        castCount.innerHTML = player.castCount;
      } else {
        let i = parseInt(checkedValue);
        player.commanderDamage[i] += increment;
        player.life -= increment;
        player.displayLife();
        commanderDamageButtons[i].innerHTML = player.commanderDamage[i];
      }
    }
    let closeCmdModal = () => {
      cmdPlusMinusButtons.forEach(function(element) {
        element.removeEventListener("click", plusAndMinus);
        element.classList.add("hidden");
      });
      closeModal();
    };
    // button event listeners and displays
    commanderDamageButtons.forEach(function (element, i) {
      element.style.background = players[i].color;
      element.innerHTML = player.commanderDamage[i];
    });
    cmdPlusMinusButtons.forEach(function(element) {
      element.addEventListener("click", plusAndMinus);
    });
    poison.innerHTML = player.poison;
    // close modal event listeners
    document.getElementById("cmdExit").addEventListener("click", closeCmdModal);
  });
});
// utilities modal
document.getElementById("gearBtn").addEventListener("click", function() {
  modalBackground.classList.remove("hidden");
  modalWindows[2].classList.remove("hidden");
});
document.getElementById("utiliExit").addEventListener("click", closeModal);
// utilities modal functions and event listeners
document.getElementById("addPlayer").addEventListener("click", addPlayer);
// move this up by colors and shit
function addPlayer() {
    if (numPlayers === 6) {
      alert("6 is maximum number of players");
    } else {
      numPlayers += 1;
      displayBoard();
      for (let i = 0; i < numPlayers; i++) {
        setTimeout(players[i].displayLife.bind(players[i]), 400);
      }
    }
};
document.getElementById("newGamePrompt").addEventListener("click", function() {
  localStorage.clear();
  window.removeEventListener("unload", saveState);
  location.reload();
});
function hidePlayer() {
  if (numPlayers === 2) {
    alert("Two is the minimum number of players");
  } else {
    numPlayers -= 1;
    displayBoard();
    for (let i = 0; i < numPlayers; i++) {
      setTimeout(players[i].displayLife.bind(players[i]), 400);
    }
  }
};
document.getElementById("hidePlayer").addEventListener("click", hidePlayer);
let colorBoxes = document.querySelectorAll(".allColors");
colorBoxes.forEach(function(element, i) {
  element.style.background = colors[i];
  element.addEventListener("click", () => {
    for (let i = 0; i < numPlayers; i++) {
      pBoxes[i].classList.remove("hidden");
    }
  });
});
// change colors sub modal
let pBoxes = document.querySelectorAll(".choosePlayerButtons");

const colorMenuButtons = document.querySelectorAll(".colorMenu");
function clearSelected() {
  colorMenuButtons.forEach(function(element) {
    element.classList.remove("menuSelected");
  });
  colorBoxes.forEach(function(element){
    element.classList.add("hidden");
  });
};
document.getElementById("singleColors").addEventListener("click", function() {
  clearSelected();
  this.classList.add("menuSelected");
  for (i = 0; i < 6; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
});
document.getElementById("twoColors").addEventListener("click", function() {
  clearSelected();
  this.classList.add("menuSelected");
  for (i = 6; i < 16; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
});
document.getElementById("threeColors").addEventListener("click", function() {
  clearSelected();
  this.classList.add("menuSelected");
  for (i = 16; i < 26; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
});
document.getElementById("fourFiveColors").addEventListener("click", function() {
  clearSelected();
  this.classList.add("menuSelected");
  for (i = 26; i < 32; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
});
document.getElementById("otherColors").addEventListener("click", function() {
  clearSelected();
  this.classList.add("menuSelected");
  for (i = 32; i < colorBoxes.length; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
});
function changeColor() {
  let player = players[this.value];
  let colorI = document.querySelector("input[name=chooseColor]:checked").value;
  player.color = colors[colorI];
  playerDivs[this.value].style.background = player.color;
  pBoxes[this.value].style.background = player.color;
};
pBoxes.forEach(function(element) {
  element.addEventListener("click", changeColor);
});
document.getElementById("changeColors").addEventListener("click", function() {
  modalWindows[3].classList.remove("hidden");
  pBoxes.forEach(function(element,i) {
    element.style.background = players[i].color;
    element.innerHTML = players[i].number;
  });
  document.getElementById("choosePlayerExit").addEventListener("click", () => {
    closeModal();
    pBoxes.forEach(elem => {
      elem.classList.add("hidden");
    });
  });
});
// dice modal
document.getElementById("dice").addEventListener("click", function(){
  document.getElementById("modalWindowDice").classList.remove("hidden");
});
const dice = document.querySelectorAll(".dice");
function getRandom() {
  dice.forEach(function(element) {
    element.classList.remove("selectedDice");
    element.innerHTML = element.value;
  });
  let r = Math.floor(Math.random() * this.value) + 1;
  this.classList.add("selectedDice");
  this.innerHTML = r;
}
dice.forEach(function(element) {
  element.addEventListener("click", getRandom);
});
document.getElementById("exitDice").addEventListener("click", closeModal);
// stopping 'rubberband' scrolling
document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, false);

displayBoard();

// to do:

// options window
  // toggle cmd damage-life total bind?
  // turn life tracking on
      // reveals a turn button, center left
        // record after EVERY turn (y-axis)
          // could even highlight active player
      // records each time life / cmd modals are closed
        // x-axis
      // dynamic graph gradually generates when you turn off life tracking
// full screen support for Chrome on Android (ask jim to test)

// other potential features

// name thing at line 95
  // player name presets
    // computer could learn and create presets
  // player name or commander name?
    // could have popular commanders in presets, would change name and color
// support for commander leagues
  // customizable buttons that add and subtract meta-points
    // first blood, etc can only be activated once per game
    // records things like most life lost in one turn...
      // overall life points gained or lost
      // how many times you've cast your commander
