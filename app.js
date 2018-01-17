// player object and prototype
function Player(i) {
  this.i = i;
  this.poison = 0;
  this.life = 40;
  this.number = this.i + 1;
  this.name = "Player " + this.number;
  this.rotated = false;
  this.castCount = 0;
  this.castCountB = 0;
  this.color = "";
  this.experience = 0;
  this.commanderDamage = Array(12).fill(0);
  this.hasPartners = false;
}
// boolean helper function to enable auto sizing
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
Player.prototype.displayName = function() {
  let upperName =
  nameButtons[this.i].innerHTML = this.name.toUpperCase();
  for (let i = 1.1; i > 0; i -= 0.05) {
    nameButtons[this.i].style.fontSize = i + "em";
    let overflow = isOverflown(nameButtons[this.i]);
    if (!overflow) {
      let fontSize = i - 0.10;
      nameButtons[this.i].style.fontSize = fontSize + "em";
      break;
    }
  }
};
Player.prototype.changeName = function() {
  let newName = prompt("Please enter new name");
  if (newName.length > 0) {
    this.name = newName;
    this.displayName();
  }
};

let player0 = new Player(0);
let player1 = new Player(1);
let player2 = new Player(2);
let player3 = new Player(3);
let player4 = new Player(4);
let player5 = new Player(5);
let players = [player0, player1, player2, player3, player4, player5];

// Colors
const artifact = "linear-gradient(45deg, lightgrey, #bfbfbf, lightgrey)";
const w = "#fffafa";
const u = "#2283D7";
const b = "#000000";
const r = "#bf0000";
const g = "#228b22";
const colors = [artifact, w, u, b, r, g];
// default color assignment
player0.color = colors[5];
player1.color = colors[2];
player2.color = colors[3];
player3.color = colors[4];
player4.color = colors[1];
player5.color = colors[0];
// default number of players
let numPlayers = 4;

// load and save state functions on localStorage
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
    players[i].experience = temp.experience;
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

// display board function
const playerDivs = document.querySelectorAll("#playersContainer > div");
const icons = document.querySelectorAll(".mainIcons");
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
    players[i].displayName();
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
  });
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
const castCount = document.querySelector("#castCount + label");
const castCountB = document.querySelector("#castCountB + label");
const experience = document.querySelector("#experience + label");
const poison = document.querySelector("#poison + label");
function showPlusMinus() {
  cmdPlusMinusButtons[0].classList.remove("invisible");
  cmdPlusMinusButtons[1].classList.remove("invisible");
}
poison.addEventListener("click", showPlusMinus);
castCount.addEventListener("click", showPlusMinus);
castCountB.addEventListener("click", showPlusMinus);
experience.addEventListener("click", showPlusMinus);
commanderDamageButtons.forEach((elem) => {
  elem.addEventListener("click", showPlusMinus);
});
cmdPlusMinusButtons[0].addEventListener("click", () => {
  cmdPlusMinusButtons[2].classList.remove("invisible");
});
cmdPlusMinusButtons[1].addEventListener("click", () => {
  cmdPlusMinusButtons[2].classList.remove("invisible");
});
commanderButtons.forEach(function (element, i) {
  element.addEventListener("click", function(){
    // variables
    let player = players[i];
    let partnerCheckbox = document.getElementById("partnerCheckbox");
    // opening and orienting modal window
    let deg = player.rotated ? 180 : 0;
    rotate(modalWindows[1], deg);
    modalWindows[1].classList.remove("hidden");
    modalBackground.classList.remove("hidden");
    let currentPlayer = document.getElementById("currentPlayer");
    currentPlayer.innerHTML = player.name;
    currentPlayer.style.background = player.color;
    castCount.innerHTML = player.castCount;
    if (player.hasPartners) {
      castCountB.classList.remove("hidden");
      castCountB.innerHTML = player.castCountB;
      document.getElementById("ccbLabel").classList.remove("hidden");
      partnerCheckbox.checked = true;
    }
    experience.innerHTML = player.experience;
    // functions
    function togglePartners() {
      player.hasPartners = !player.hasPartners;
      castCountB.classList.toggle("hidden");
      castCountB.innerHTML = player.castCountB;
      if (player.hasPartners) {
        document.getElementById("ccbLabel").classList.remove("hidden");
      } else {
        document.getElementById("ccbLabel").classList.add("hidden");
      }
    }
    function plusAndMinus() {
      let checkedValue = document.querySelector("input[name=cmdModalGroup]:checked").value;
      let increment = parseInt(this.value);
      if (checkedValue === "poison") {
        player.poison += increment;
        poison.innerHTML = player.poison;
      } else if (checkedValue === "castCount") {
        player.castCount += increment;
        castCount.innerHTML = player.castCount;
      } else if (checkedValue === "castCountB") {
        player.castCountB += increment;
        castCountB.innerHTML = player.castCountB;
      } else if (checkedValue === "experience") {
        player.experience += increment;
        experience.innerHTML = player.experience;
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
        element.classList.add("invisible");
      });
      castCountB.classList.add("hidden");
      document.getElementById("ccbLabel").classList.add("hidden");
      partnerCheckbox.checked = false;
      partnerCheckbox.removeEventListener("click", togglePartners);
      closeModal();
    };
    // button event listeners and displays
    partnerCheckbox.addEventListener("click", togglePartners);
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
let utiliRotateBool = false;
document.getElementById("utiliRotate").addEventListener("click", function() {
  utiliRotateBool = !utiliRotateBool;
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[2], deg);
});
document.getElementById("gearBtn").addEventListener("click", function() {
  utiliRotateBool = false;
  rotate(modalWindows[2], 0);
  modalBackground.classList.remove("hidden");
  modalWindows[2].classList.remove("hidden");
  function closeUtiliModal() {
    closeModal();
    document.getElementById("utiliExit").removeEventListener("click", closeUtiliModal);
  }
  document.getElementById("utiliExit").addEventListener("click", closeUtiliModal);
});
// utilities modal functions and event listeners
document.getElementById("addPlayer").addEventListener("click", addPlayer);
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
// change colors sub modal
const pBoxes = document.querySelectorAll(".choosePlayerButtons");
const colorRadios = document.querySelectorAll("[id^=radio]");
function colorCombinator() {
  let result = "repeating-linear-gradient(45deg ";
  for (let i = 0; i < arguments.length; i++) {
    result += ", " + arguments[i] + " " + (i * 15) + "%";
    result += ", " + arguments[i] + " " + ((i + 1) * 15) + "%";
  }
  result += ")";
  return result;
}
function gradientMaker() {
  let result = "linear-gradient(to right ";
  for (let i = 0; i < arguments.length; i++) {
    result += ", " + arguments[i];
  }
  result += ")";
  return result;
}
let gradientBool = false;
const gradientCheckbox = document.getElementById("gradientCheckbox");
const gradientCheckboxLabel = document.querySelector("#gradientCheckbox + label");
gradientCheckbox.addEventListener("click", function() {
  if (this.checked) {
    gradientBool = true;
  } else {
    gradientBool = false;
  }
  let currentPage = document.querySelector(".menuSelected");
  if (currentPage === colorMenuButtons[1]) {
    displayTwoColors();
  }
  if (currentPage === colorMenuButtons[2]) {
    displayThreeColors();
  }
  if (currentPage === colorMenuButtons[3]) {
    displayFourColors();
  }
});
const colorMenuButtons = document.querySelectorAll(".colorMenu");
const colorBoxes = document.querySelectorAll(".allColors");
colorBoxes.forEach(function(element, i) {
  element.style.background = colors[i];
  element.addEventListener("click", () => {
    for (let i = 0; i < numPlayers; i++) {
      pBoxes[i].classList.remove("hidden");
    }
  });
});
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
  gradientCheckboxLabel.classList.add("hidden");
  colorBoxes.forEach((element, i) => {
    element.style.background = colors[i];
  });
  this.classList.add("menuSelected");
  for (i = 0; i < 6; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
  colorRadios.forEach((element, i) => {
    element.value = i;
  })
});
function displayTwoColors() {
  clearSelected();
  gradientCheckboxLabel.classList.remove("hidden");
  let twoColorArray = [];
  if (gradientBool) {
    for (let i = 1; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        let temp = gradientMaker(colors[i], colors[j]);
        twoColorArray.push(temp);
        }
      }
    } else {
    for (let i = 1; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        let temp = colorCombinator(colors[i], colors[j]);
        twoColorArray.push(temp);
        }
      }
    }
  colorBoxes.forEach((element, i) => {
    element.style.background = twoColorArray[i];
  });
  colorRadios.forEach((element, i) => {
    element.value = twoColorArray[i];
  });
  colorMenuButtons[1].classList.add("menuSelected");
  for (i = 0; i < 10; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
};
document.getElementById("twoColors").addEventListener("click", displayTwoColors);
function displayThreeColors() {
  clearSelected();
  gradientCheckboxLabel.classList.remove("hidden");
  let colorArray = [];
  if (gradientBool) {
    for (let i = 1; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        for (let k = j + 1; k < 6; k++) {
           let temp = gradientMaker(colors[i], colors[j], colors[k]);
           colorArray.push(temp);
        }
      }
    }
  } else {
      for (let i = 1; i < 5; i++) {
        for (let j = i + 1; j < 6; j++) {
          for (let k = j + 1; k < 6; k++) {
             let temp = colorCombinator(colors[i], colors[j], colors[k]);
             colorArray.push(temp);
          }
        }
      }
    }
  colorBoxes.forEach((element, i) => {
    element.style.background = colorArray[i];
  });
  colorRadios.forEach((element, i) => {
    element.value = colorArray[i];
  });
  colorMenuButtons[2].classList.add("menuSelected");
  for (i = 0; i < 10; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
};
document.getElementById("threeColors").addEventListener("click", displayThreeColors);
function displayFourColors() {
  clearSelected();
  gradientCheckboxLabel.classList.remove("hidden");
  let wubr, wubg, wurg, ubrg, wbrg, wubrg;
  if (gradientBool) {
    wubr = gradientMaker(w, u, b, r);
    wubg = gradientMaker(w, u, b, g);
    wurg = gradientMaker(w, u, r, g);
    ubrg = gradientMaker(u, b, r, g);
    wbrg = gradientMaker(w, b, r, g);
    wubrg = gradientMaker(w, u, b, r, g);
  } else {
    wubr = colorCombinator(w, u, b, r);
    wubg = colorCombinator(w, u, b, g);
    wurg = colorCombinator(w, u, r, g);
    ubrg = colorCombinator(u, b, r, g);
    wbrg = colorCombinator(w, b, r, g);
    wubrg = colorCombinator(w, u, b, r, g);
  }
  let colorArray = [wubr, wubg, wurg, ubrg, wbrg, wubrg];
  colorBoxes.forEach((element, i) => {
    element.style.background = colorArray[i];
  });
  colorRadios.forEach((element, i) => {
    element.value = colorArray[i];
  });
  colorMenuButtons[3].classList.add("menuSelected");
  for (i = 0; i < 6; i++) {
    colorBoxes[i].classList.remove("hidden");
  }
};
document.getElementById("fourFiveColors").addEventListener("click", displayFourColors);
function changeColor() {
  let player = players[this.value];
  let checkedRadio = document.querySelector("input[name=chooseColor]:checked").value;
  if (checkedRadio.length === 1) {
    player.color = colors[checkedRadio];
  } else {
    player.color = checkedRadio;
  }
  playerDivs[this.value].style.background = player.color;
  pBoxes[this.value].style.background = player.color;
};
pBoxes.forEach(function(element) {
  element.addEventListener("click", changeColor);
});
document.getElementById("changeColors").addEventListener("click", function() {
  modalWindows[3].classList.remove("hidden");
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[3], deg);
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
document.getElementById("choosePlayerRotate").addEventListener("click", function() {
  utiliRotateBool = !utiliRotateBool;
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[3], deg);
});
// dice modal
document.getElementById("dice").addEventListener("click", function(){
  document.getElementById("modalWindowDice").classList.remove("hidden");
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[4], deg);
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
document.getElementById("diceRotate").addEventListener("click", function() {
  utiliRotateBool = !utiliRotateBool;
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[4], deg);
});
document.getElementById("exitDice").addEventListener("click", closeModal);

// mass Life change modal
const excludePlayerBoxes = document.querySelectorAll("[id^=excludeP] + label");
document.getElementById("massLife").addEventListener("click", function(){
  modalWindows[5].classList.remove("hidden");
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[5], deg);
  for (let i = 0; i < numPlayers; i++) {
    excludePlayerBoxes[i].classList.remove("hidden");
    excludePlayerBoxes[i].style.background = players[i].color;
    excludePlayerBoxes[i].innerHTML = players[i].life;
  }
  let exit = document.getElementById("massChangeExit");
  exit.addEventListener("click", function() {
    document.getElementById("netChange").innerHTML = 0;
    closeModal();
    excludePlayerBoxes.forEach(elem => {
      elem.classList.add("hidden");
    });
  });
});
function massLifeChange() {
  let netChange = parseInt(document.getElementById("netChange").innerHTML);
  let amount = parseInt(this.value);
  let excluded = document.querySelector("input[name=excludeGroup]:checked");
  for (let i = 0; i < numPlayers; i++) {
    if (excluded && excluded.value == i) {
      continue;
    }
    players[i].life += amount;
    players[i].displayLife();
    excludePlayerBoxes[i].innerHTML = players[i].life;
  }
  netChange += amount;
  document.getElementById("netChange").innerHTML = netChange;
};
document.getElementById("massPlus5").addEventListener("click", massLifeChange);
document.getElementById("massPlus").addEventListener("click", massLifeChange);
document.getElementById("massMinus").addEventListener("click", massLifeChange);
document.getElementById("massMinus5").addEventListener("click", massLifeChange);
document.getElementById("clearExcluded").addEventListener("click", function() {
  let radios = document.querySelectorAll("input[name=excludeGroup]");
  radios.forEach(function(elem) {
    elem.checked = false;
  });
});
document.getElementById("massChangeRotate").addEventListener("click", function() {
  utiliRotateBool = !utiliRotateBool;
  let deg = utiliRotateBool ? 180 : 0;
  rotate(modalWindows[5], deg);
});
// stopping 'rubberband' scrolling
document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, false);
// stop auto-sleep
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
var noSleep = new NoSleep();
function enableNoSleep() {
  if (isMobileDevice()) {
    noSleep.enable();
  }
  document.removeEventListener("click", enableNoSleep, false);
}
document.addEventListener("click", enableNoSleep, false);
window.addEventListener("unload", function() {
  noSleep.disable();
});
// full screen attempt no. 68, courtesy Mozilla
function enableFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  document.getElementById("gearBtn").removeEventListener("click", enableFullScreen);
}
document.addEventListener("click", function() {
  if (isMobileDevice()) {
    enableFullScreen();
  }
});
displayBoard();
