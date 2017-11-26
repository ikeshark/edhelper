// Colors
let gold = "#ffd700";
let blue = "#00B1E1";
let grey = "#7D7D7D";
let red = "#ff0000";
let green = "#008000";
let tan = "#d2b48c";
let purple = "#9932CC";
let brown = "#a8a565";
let teal = "#07beb8";
let pink = "#ff69b4";
let yellow = "#ffff00";
let orange = "#ff8c00";
let blueGreenGrad = "radial-gradient(" + blue + ", " + green + ")";
let peach = "linear-gradient(" + gold + ", " + pink + ")";
let newGrad = "linear-gradient(" + red + ", " + gold + "," + green + ")";
const colors = [red, orange, gold, yellow, green, teal, blue, purple, pink, tan, newGrad, grey, blueGreenGrad, peach];

// player object and prototype
function Player(i) {
  this.i = i;
}
Player.prototype.poison = 0;
Player.prototype.rotated = false;
Player.prototype.life = 40;
Player.prototype.color = "";
Player.prototype.displayLife = function() {
  let id = "life" + this.i;
  document.getElementById(id).innerHTML = this.life;
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
player0.color = colors[0];
player1.color = colors[7];
player2.color = colors[3];
player3.color = colors[5];
player4.color = colors[1];
player5.color = colors[6];
// setting up the colors and setting starting number of players
let playerDivs = document.querySelectorAll("[id^=player]");
playerDivs.forEach(function(element, i) {
  element.style.background = players[i].color;
});
let numPlayers = 4;
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
    choosePlayerButtons[i].classList.remove("hidden");
  }
  for (i = numPlayers; i < 6; i++) {
    playerDivs[i].classList.add("hidden");
    commanderDamageButtons[i].classList.add("hidden");
    choosePlayerButtons[i].classList.add("hidden");
  }
}
// rotate function and event listeners
function rotate() {
  let parent = this.parentNode;
  let player = players[this.value];
  let deg = player.rotated ? 0 : 180;
  parent.style.webkitTransform = "rotate("+deg+"deg)";
  parent.style.mozTransform = "rotate("+deg+"deg)";
  parent.style.msTransform = "rotate("+deg+"deg)";
  parent.style.oTransform = "rotate("+deg+"deg)";
  parent.style.transform = "rotate("+deg+"deg)";
  player.rotated = !player.rotated;
};
let rotateButtons = document.querySelectorAll("[id^=rotate]");
rotateButtons.forEach(function(element) {
  element.addEventListener("click", rotate);
});

// modal window variables and close function
const modalWindow = document.getElementById("modalWindow");
const modalWindow2 = document.getElementById("modalWindow2");
const modalWindow3 = document.getElementById("modalWindow3");
const modalBackground = document.getElementById("modalBackground");

const closeModal = () => {
  modalWindow.classList.add("hidden");
  modalWindow2.classList.add("hidden");
  modalWindow3.classList.add("hidden");
  modalWindow4.classList.add("hidden");
  modalBackground.classList.add("hidden");
};

// life change modal window
var lifeButtons = document.querySelectorAll("[id^=life]")
lifeButtons.forEach(function (element, i) {
  element.addEventListener("click", function(){
    // variables
    let player = players[i];
    let lifeDisplay = document.getElementById("modalLife");
    let plusMinusButtons = document.querySelectorAll(".plusMinus");
    // functions
    function plusAndMinusLife() {
      player.life += parseInt(this.value);
      player.displayLife();
      lifeDisplay.innerHTML = player.life;
    };
    function doubleAndHalveLife() {
      player.life = Math.floor(player.life * parseFloat(this.value));
      player.displayLife();
      lifeDisplay.innerHTML = player.life;
    }
    let closeLifeModal = () => {
      plusMinusButtons.forEach(function(element) {
        element.removeEventListener("click", plusAndMinusLife);
      });
      document.getElementById("double").removeEventListener("click", doubleAndHalveLife);
      document.getElementById("halve").removeEventListener("click", doubleAndHalveLife);
      closeModal();
    };
    // opening and orienting modal window and displaying current life total
    let deg = player.rotated ? 180 : 0;
    modalWindow.style.webkitTransform = "rotate("+deg+"deg)";
    modalWindow.style.mozTransform = "rotate("+deg+"deg)";
    modalWindow.style.msTransform = "rotate("+deg+"deg)";
    modalWindow.style.oTransform = "rotate("+deg+"deg)";
    modalWindow.style.transform = "rotate("+deg+"deg)";
    modalWindow.classList.remove("hidden");
    modalBackground.classList.remove("hidden");
    lifeDisplay.innerHTML = player.life;
    // display background color of the appropriate player
    lifeDisplay.parentNode.style.background = player.color;
    // adding event listeners to buttons
    plusMinusButtons.forEach(function(element) {
      element.addEventListener("click", plusAndMinusLife);
    });
    document.getElementById("double").addEventListener("click", doubleAndHalveLife);
    document.getElementById("halve").addEventListener("click", doubleAndHalveLife);
    // close modal event listeners
    document.getElementById("lifeExit").addEventListener("click", closeLifeModal);
  });
});
// commander damage modal window
let commanderButtons = document.querySelectorAll("[id^=cmdBtn]");
let commanderDamageButtons = document.querySelectorAll("[id^=cmdButton]");
commanderButtons.forEach(function (element, i) {
  element.addEventListener("click", function(){
    // variables
    let player = players[i];
    let poisonSlider = document.getElementById("poisonSlider");
    let poison = document.getElementById("poison");
    let commanderDamageSliders = document.querySelectorAll("[id^=cmdSlider]");
    // opening and orienting modal window
    let deg = player.rotated ? 180 : 0;
    modalWindow2.style.webkitTransform = "rotate("+deg+"deg)";
    modalWindow2.style.mozTransform = "rotate("+deg+"deg)";
    modalWindow2.style.msTransform = "rotate("+deg+"deg)";
    modalWindow2.style.oTransform = "rotate("+deg+"deg)";
    modalWindow2.style.transform = "rotate("+deg+"deg)";
    modalWindow2.classList.remove("hidden");
    modalBackground.classList.remove("hidden");
    let playerNumber = i + 1;
    let currentPlayer = document.getElementById("currentPlayer");
    currentPlayer.innerHTML = "Player Number: " + playerNumber;
    currentPlayer.style.background = player.color;
    // functions
    function onCmdBtnClick() {
      commanderDamageSliders.forEach(function(element){
        element.classList.add("hidden");
      });
      commanderDamageSliders[this.value].classList.remove("hidden");
    };
    function onCmdSliderChange() {
      let i = this.id[9];
      player.commanderDamage[i] = this.value;
      commanderDamageButtons[i].innerHTML = this.value;
    };
    let onPoisonInput = () => {
      player.poison = poisonSlider.value;
      poison.innerHTML = player.poison;
    };
    let closeCmdModal = () => {
      commanderDamageButtons.forEach(function (element) {
        element.removeEventListener("click", onCmdBtnClick);
      });
      commanderDamageSliders.forEach(function (element) {
        element.classList.add("hidden");
        element.removeEventListener("input", onCmdSliderChange);
      });
      poisonSlider.removeEventListener("input", onPoisonInput);
      closeModal();
    };
    // button event listeners and displays
    commanderDamageButtons.forEach(function (element, i) {
      element.style.background = players[i].color;
      element.innerHTML = player.commanderDamage[i];
      element.addEventListener("click", onCmdBtnClick);
    });
    commanderDamageSliders.forEach(function (element, i) {
      element.style.background = players[i].color;
      element.value = player.commanderDamage[i];
      element.addEventListener("input", onCmdSliderChange);
    });
    // poison slider display and event listener
    poisonSlider.value = player.poison;
    poison.innerHTML = player.poison;
    poisonSlider.addEventListener("input", onPoisonInput);
    // close modal event listeners
    document.getElementById("cmdExit").addEventListener("click", closeCmdModal);
  //  modalBackground.addEventListener("click", closeCmdModal);
  });
});
// utilities modal
let pBoxes = document.querySelectorAll("[id^=pBox]");
document.getElementById("gearBtn").addEventListener("click", function() {
  modalBackground.classList.remove("hidden");
  modalWindow3.classList.remove("hidden");
  pBoxes.forEach(function(element,i) {
    element.style.background = players[i].color;
  });
});
document.getElementById("utiliExit").addEventListener("click", closeModal);
// utilities modal functions and event listeners
document.getElementById("addPlayer").addEventListener("click", addPlayer);
let choosePlayerButtons = document.querySelectorAll(".playerBox");
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
function changeColor() {
  let player = players[this.value];
  let colorI = document.querySelector("input[type=radio]:checked").value;
  player.color = colors[colorI];
  playerDivs[this.value].style.background = player.color;
  pBoxes[this.value].style.background = player.color;
}
choosePlayerButtons.forEach(function(element) {
  element.addEventListener("click", changeColor);
});
document.getElementById("changeColors").addEventListener("click", function() {
  modalWindow4.classList.remove("hidden");
  document.getElementById("choosePlayerExit").addEventListener("click", function() {
    modalWindow4.classList.add("hidden");
  });
});
// mobile fullscreen
let body = window.document.documentElement;
body.addEventListener("swipe", function() {
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  }
});

// to do:

// toggle column view?
// better colors? only use magic colors?
// rotate function should work on all rotations
//  might need to use bind to accomplish this

// make styles work in desktop or mobile, maybe all percentages when possible?
