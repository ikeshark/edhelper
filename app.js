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
const wubrg = colorCombinator(w, u, b, r, g);
const mini = "linear-gradient(45deg, #30e8bf, #ff8235)";
const coal = "linear-gradient(to left, #eb5757, black)";
const rasta = "linear-gradient(to bottom, red, yellow, green)";
const rainbow = "linear-gradient(to bottom, red, orange, yellow, green, blue, indigo, violet)";
const blackWhite = "radial-gradient(circle, black, white)";
const whiteBlack = "radial-gradient(circle, white, black)";
const whiteBlackWhite = "radial-gradient(circle, white, black, white)";
const blackWhiteBlack = "radial-gradient(circle, black, white, black)";
const blueSky = "linear-gradient(to left, #56ccf2, #2f80ed)";
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
let othercolors = [wubr, wubg, wurg, ubrg, wubrg, rasta, rainbow, blackWhite, whiteBlack, whiteBlackWhite, blackWhiteBlack, mini, coal, blueSky];
colors = colors.concat(othercolors);

// player object and prototype
function Player(i) {
  this.i = i;
}
Player.prototype.name = function() {
    return "Player " + (1 + this.i);
}
Player.prototype.poison = 0;
Player.prototype.rotated = false;
Player.prototype.parentRotated = false;
Player.prototype.life = 40;
Player.prototype.color = "";
Player.prototype.castCount = 0;
Player.prototype.displayLife = function() {
  lifeButtons[this.i].innerHTML = this.life;
  lifeDisplay.innerHTML = this.life;
};
let player0 = new Player(0);
let player1 = new Player(1);
let player2 = new Player(2);
let player3 = new Player(3);
let player4 = new Player(4);
let player5 = new Player(5);
let players = [player0, player1, player2, player3, player4, player5];
// I have to separately assign the commander damage arrays to keep them separated
player0.commanderDamage = Array(6).fill(0);
player1.commanderDamage = Array(6).fill(0);
player2.commanderDamage = Array(6).fill(0);
player3.commanderDamage = Array(6).fill(0);
player4.commanderDamage = Array(6).fill(0);
player5.commanderDamage = Array(6).fill(0);
// default color assignment
player0.color = colors[1];
player1.color = colors[2];
player2.color = colors[3];
player3.color = colors[4];
player4.color = colors[5];
player5.color = colors[6];
// setting up the colors and setting starting number of players
const playerDivs = document.querySelectorAll("#playersContainer > div");
playerDivs.forEach(function(element, i) {
  element.style.background = players[i].color;
});
let numPlayers = 4;
// display board is primarily used for changing number of players
function displayBoard() {
  if (numPlayers === 6) {
    for (let i = 3; i < 6; i++) {
      playerDivs[i].style.width = "33.33vw";
    }
  } else if (numPlayers === 5) {
    for (let i = 0; i < 3; i++) {
      playerDivs[i].style.width = "33.33vw";
    }
    for (let i = 3; i < 5; i++) {
      playerDivs[i].style.width = "50vw";
    }
  } else if (numPlayers === 4) {
    for (let i = 0; i < 4; i++) {
      playerDivs[i].style.width = "50vw";
    }
  } else if (numPlayers === 3) {
    playerDivs[0].style.width = "50vw";
    playerDivs[1].style.width = "50vw";
    playerDivs[2].style.width = "100vw";
  } else {
    playerDivs[0].style.width = "100vw";
    playerDivs[1].style.width = "100vw";
  }
  for (i = 0; i < numPlayers; i++) {
    playerDivs[i].classList.remove("hidden");
    commanderDamageButtons[i].classList.remove("hidden");
    pBoxes[i].classList.remove("hidden");
  }
  for (i = numPlayers; i < 6; i++) {
    playerDivs[i].classList.add("hidden");
    commanderDamageButtons[i].classList.add("hidden");
    pBoxes[i].classList.add("hidden");
  }
}
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
let rotateButtons = document.querySelectorAll("#playersContainer button:nth-child(1)");
rotateButtons.forEach(function(element, i) {
  element.addEventListener("click", function() {
    let deg = players[i].rotated ? 0 : 180;
    rotate(playerDivs[i], deg);
    players[i].rotated = !players[i].rotated;
  });
});
// life change modal window
const lifeButtons = document.querySelectorAll("#playersContainer button:nth-child(2)");
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
    lifeDisplay.innerHTML = player.life;
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
const commanderButtons = document.querySelectorAll("#playersContainer button:nth-child(3)");
const commanderDamageButtons = document.querySelectorAll("[id^=cmdButton] + label");
const cmdPlusMinusButtons = document.querySelectorAll("#cmdPlusMinus button");
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
    currentPlayer.innerHTML = player.name();
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
    }
};
document.getElementById("newGamePrompt").addEventListener("click", function() {
  alert("Please refresh your browser to start a new game");
});
function hidePlayer() {
  if (numPlayers === 2) {
    alert("Two is the minimum number of players");
  } else {
    numPlayers -= 1;
    displayBoard();
  }
};
document.getElementById("hidePlayer").addEventListener("click", hidePlayer);
let colorBoxes = document.querySelectorAll(".allColors");
colorBoxes.forEach(function(element, i) {
  element.style.background = colors[i];
});
// change colors sub modal
let pBoxes = document.querySelectorAll(".choosePlayerButtons");
pBoxes.forEach(function(element,i) {
  element.style.background = players[i].color;
});
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
  for (i = 26; i < 31; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
});
document.getElementById("otherColors").addEventListener("click", function() {
  clearSelected();
  this.classList.add("menuSelected");
  for (i = 31; i < colorBoxes.length; i++) {
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
  document.getElementById("choosePlayerExit").addEventListener("click", closeModal);
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
  let d = this.value - 1;
  let r = Math.floor(Math.random() * d + 1);
  // r += 1;
  this.classList.add("selectedDice");
  this.innerHTML = r;
}
dice.forEach(function(element) {
  element.addEventListener("click", getRandom);
});
document.getElementById("exitDice").addEventListener("click", closeModal);
displayBoard();

// to do:

// in life modal the button seems to be on top of life div, they should be two stacked divs
// options window
  // toggle column view
  // toggle cmd damage / life total bind
  // radial vs linear gradients??
// prevent double click zoom on mobile Safari
// full screen support for Chrome
// perhaps have rotate and commander buttons in same div, so only two divs per player
// graph of player damage?
  // turn button or gesture
// make styles work in desktop or mobile, media queries
