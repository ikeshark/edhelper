// stop mobile scrolling (to prevent rubber band)
document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, false);

// player object and prototype
function Player(i) {
  this.i = i;
  this.number = this.i + 1;
  this.name = "Player " + this.number;
  this.life = 40;
  this.lifeHistory = [40];
  this.historyTime = [Date.now()];
  this.commanderDamage = Array(12).fill(0);
  this.poison = 0;
  this.energy = 0;
  this.experience = 0;
  this.castCount = 0;
  this.hasPartners = false;
  this.rotated = false;
  this.color = "";
}
// boolean helper function to enable auto sizing
function isOverflown(element) {
  return element.scrollHeight > element.clientHeight ||
   element.scrollWidth > element.clientWidth;
}
Player.prototype.displayLife = function() {
  // display main life
  lifeButtons[this.i].innerHTML = this.life;
  // display modal life
  lifeDisplay.innerHTML = this.life;
  for (let i = 9; i > 0; i -= 0.25) {
    lifeButtons[this.i].style.fontSize = i + "em";
    let isOverflow = isOverflown(lifeButtons[this.i]);
    // continue until no overfill
    if (!isOverflow) {
      // make it a bit smaller for 'padding'
      let fontSize = i - 0.5;
      lifeButtons[this.i].style.fontSize = fontSize + "em";
      // if it's good enough for the main life, it's good enough for the modal
      // note: used to do two separate loops, each testing for overfill
      lifeDisplay.style.fontSize = fontSize + "em";
      break;
    }
  }
};
Player.prototype.displayName = function() {
  nameButtons[this.i].innerHTML = this.name;
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
  numPlayers = Number(localStorage.getItem("numPlayers"));
  for (let i = 0; i < numPlayers; i++) {
    let player = "player" + i;
    let temp = JSON.parse(localStorage.getItem(player));
    players[i].name = temp.name;
    players[i].life = temp.life;
    players[i].lifeHistory = temp.lifeHistory;
    players[i].historyTime = temp.historyTime;
    players[i].commanderDamage = temp.commanderDamage;
    players[i].poison = temp.poison;
    players[i].energy = temp.energy;
    players[i].experience = temp.experience;
    players[i].castCount = temp.castCount;
    players[i].castCountB = temp.castCountB;
    players[i].hasPartners = temp.hasPartners;
    players[i].rotated = temp.rotated;
    players[i].color = temp.color;
  }
}
function saveState() {
  for (let i = 0; i < numPlayers; i++) {
    let player = "player" + i;
    localStorage.setItem(player, JSON.stringify(players[i]));
  }
  localStorage.setItem("numPlayers", numPlayers);
  // this boolean determines when to load from local storage
  localStorage.setItem("bool", "true");
}
if (localStorage.bool) {
  loadState();
}
window.addEventListener("unload", saveState);

// display board function
const playerDivs = document.querySelectorAll("#mainContainer > div");
function displayBoard() {
  let icons = document.querySelectorAll(".l-mainIcons");
  let container = document.getElementById("mainContainer");
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
    rotate(playerDivs[i], deg);
    players[i].displayLife();
    players[i].displayName();
  }
  for (let i = numPlayers; i < 6; i++) {
    playerDivs[i].classList.add("hidden");
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
function closeModal() {
  // saving state b/c ios web apps don't send unload triggers
  saveState();
  modalWindows.forEach(function(element) {
    element.classList.add("hidden");
  });
  modalBackground.classList.add("hidden");
};
// rotate buttons
const rotateButtons = document.querySelectorAll("[src*=rotate]");
rotateButtons.forEach((element, i) => {
  let parent = element.closest("button");
  parent.addEventListener("click", function() {
    let deg = players[i].rotated ? 0 : 180;
    rotate(playerDivs[i], deg);
    players[i].rotated = !players[i].rotated;
  });
});
// life change modal window
const lifeButtons = document.querySelectorAll(".lifeButtons");
const lifeDisplay = document.getElementById("modalLifeDisplay");
lifeButtons.forEach(function (element, i) {
  element.addEventListener("click", function(){
    // variables
    let player = players[i];
    let isLifeDisplay = true;
    let oldLife = player.life;
    let lifePlusMinusButtons = document.querySelectorAll(".plusMinus");
    let doubleHalveButtons = document.querySelectorAll(".doubleHalve");
    let historyDisplay = document.getElementById("lifeHistoryDisplay");
    // functions
    function toggleHistory() {
      isLifeDisplay = !isLifeDisplay;
      lifeDisplay.classList.toggle("hidden");
      historyDisplay.classList.toggle("hidden");
      let display = "" + player.lifeHistory[0];
      let baseNumber = player.historyTime[0];
      for (let i = 1; i < player.lifeHistory.length; i++) {
        let time = player.historyTime[i] - baseNumber;
        time /= 1000;
        display += ", " + player.lifeHistory[i] + ": " + Math.floor(time);
      }
      historyDisplay.innerHTML = display;
    }
    function plusMinusLife() {
      if (!isLifeDisplay) {
        toggleHistory();
      }
      player.life += parseInt(this.value);
      player.displayLife();
    };
    function doubleHalveLife() {
      if (!isLifeDisplay) {
        toggleHistory();
      }
      player.life = Math.floor(player.life * parseFloat(this.value));
      player.displayLife();
    }
    let closeLifeModal = () => {
      if (!isLifeDisplay) {
        toggleHistory();
      }
      if (player.life != oldLife) {
        player.lifeHistory.push(parseInt(player.life));
        player.historyTime.push(Date.now());
      }
      lifePlusMinusButtons.forEach(function(element) {
        element.removeEventListener("click", plusMinusLife);
      });
      doubleHalveButtons.forEach(function(element) {
        element.removeEventListener("click", doubleHalveLife);
      });
      lifeDisplay.removeEventListener("click", toggleHistory);
      historyDisplay.removeEventListener("click", toggleHistory);
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
    lifeDisplay.addEventListener("click", toggleHistory);
    historyDisplay.addEventListener("click", toggleHistory);
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
const commanderButtons = document.querySelectorAll("[src*=sword]");
commanderButtons.forEach(function (element, i) {
  let parent = element.closest("button");
  parent.addEventListener("click", function() {
    // variables
    let player = players[i];
    let oldLife = player.life;
    let partnerCheckbox = document.getElementById("partnerCheckbox");
    // all radios in modal
    let cmdModalGroup = document.querySelectorAll("input[name=cmdModalGroup]");
    const commanderDamageButtons = document.querySelectorAll("[id^=cmdButton] + label");
    const partnerButtons = document.querySelectorAll("[id^=partnerButton] + label");
    const castCount = document.querySelector("#castCount + label");
    const energy = document.querySelector("#energy + label");
    const experience = document.querySelector("#experience + label");
    const poison = document.querySelector("#poison + label");
    let cmdPlusMinusButtons = document.querySelectorAll(".j-cmd-inc");

    // opening and orienting modal window
    let deg = player.rotated ? 180 : 0;
    rotate(modalWindows[1], deg);
    modalWindows[1].classList.remove("hidden");
    modalBackground.classList.remove("hidden");

    // current player banner
    let currentPlayer = document.getElementById("currentPlayer");
    currentPlayer.innerHTML = player.name;
    currentPlayer.style.background = player.color;

    if (player.hasPartners) {
      partnerCheckbox.checked = true;
    }
    for (let i = 0; i < numPlayers; i++) {
      commanderDamageButtons[i].classList.remove("hidden");
    }
    partnerButtons.forEach((elem, i) => {
      if (i < numPlayers) {
        elem.classList.add("invisible");
        elem.classList.remove("hidden");
        if (players[i].hasPartners) {
          elem.classList.remove("invisible");
        }
      }
      elem.style.background = players[i].color;
      elem.innerHTML = player.commanderDamage[i + 6];
    });
    for (let i = 5; i >= numPlayers; i--) {
      partnerButtons[i].classList.add("hidden");
      commanderDamageButtons[i].classList.add("hidden");
    }
    commanderDamageButtons.forEach(function(element, i) {
      element.style.background = players[i].color;
      element.innerHTML = player.commanderDamage[i];
    });
    experience.innerHTML = player.experience;
    castCount.innerHTML = player.castCount;
    energy.innerHTML = player.energy;
    poison.innerHTML = player.poison;
    energy.innerHTML = player.energy;

    // functions
    function togglePartners() {
      let oldId = this.getAttribute("for");
      let player = players[oldId.slice(-1)];
      let oldElem = document.getElementById(oldId);
      let newElem;
      if (oldElem.checked && player.hasPartners) {
        let i = parseInt(this.getAttribute("data-attr")) - 1;
        partnerButtons[i].classList.toggle("behind");
        commanderDamageButtons[i].classList.toggle("behind");
        if (parseInt(oldElem.value) > 5) {
          let newId = commanderDamageButtons[i].getAttribute("for");
          newElem = document.getElementById(newId);
          checkPartner(newElem);
        } else {
          let newId = partnerButtons[i].getAttribute("for");
          newElem = document.getElementById(newId);
          newElem.checked = true;
        }
        function checkPartner() {
          newElem.checked = true;
        }
        setTimeout(checkPartner, 10);
      }
    }
    function showPlusMinus() {
      cmdPlusMinusButtons[0].classList.remove("invisible");
      cmdPlusMinusButtons[1].classList.remove("invisible");
      cmdModalGroup.forEach(function(elem) {
        elem.removeEventListener("click", showPlusMinus);
      });
    }
    function toggleHasPartners() {
      player.hasPartners = !player.hasPartners;
      partnerButtons[i].classList.toggle("invisible");
      let attr = player.hasPartners ? player.number + "A" : player.number;
      commanderDamageButtons[i].setAttribute("data-attr", attr)
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
      } else if (checkedValue === "energy"){
        player.energy += increment;
        energy.innerHTML = player.energy;
      } else {
        let i = parseInt(checkedValue);
        player.commanderDamage[i] += increment;
        player.life -= increment;
        player.displayLife();
        if (i > 5) {
          partnerButtons[i - 6].innerHTML = player.commanderDamage[i];
        } else {
          commanderDamageButtons[i].innerHTML = player.commanderDamage[i];
        }
      }
    }
    function showMinusButtons() {
      cmdPlusMinusButtons[2].classList.remove("invisible");
      cmdPlusMinusButtons[0].removeEventListener("click", showMinusButtons);
      cmdPlusMinusButtons[1].removeEventListener("click", showMinusButtons);
    }
    function closeCmdModal() {
      if (player.life != oldLife) {
        player.lifeHistory.push(parseInt(player.life));
        player.historyTime.push(Date.now());
      }
      cmdPlusMinusButtons.forEach((elem, i) => {
        elem.removeEventListener("click", plusAndMinus);
        elem.classList.add("invisible");
      });
      cmdModalGroup.forEach((elem, i) => {
        elem.removeEventListener("click", showPlusMinus);
      });
      commanderDamageButtons.forEach(elem => {
        elem.removeEventListener("click", togglePartners);
        elem.classList.add("hidden");
      });
      partnerButtons.forEach(elem => {
        elem.removeEventListener("click", togglePartners);
      });
      cmdPlusMinusButtons[0].removeEventListener("click", showMinusButtons);
      cmdPlusMinusButtons[1].removeEventListener("click", showMinusButtons);
      partnerCheckbox.checked = false;
      partnerCheckbox.removeEventListener("click", toggleHasPartners);
      let checks = document.querySelector("input[name=cmdModalGroup]:checked");
      if (checks) {
        checks.checked = false;
      }
      document.getElementById("cmdExit").removeEventListener("click", closeCmdModal);
      closeModal();
    };

    // button event listeners and displays
    partnerCheckbox.addEventListener("click", toggleHasPartners);
    cmdModalGroup.forEach(function(elem) {
      elem.addEventListener("click", showPlusMinus);
    });
    cmdPlusMinusButtons.forEach(elem => {
      elem.addEventListener("click", plusAndMinus);
    });
    commanderDamageButtons.forEach(elem => {
      elem.addEventListener("click", togglePartners);
    });
    partnerButtons.forEach(elem => {
      elem.addEventListener("click", togglePartners);
    });
    cmdPlusMinusButtons[0].addEventListener("click", showMinusButtons);
    cmdPlusMinusButtons[1].addEventListener("click", showMinusButtons);
    document.getElementById("cmdExit").addEventListener("click", closeCmdModal);
  });
});

// utilities modal
let utiliRotateBool = false;
document.getElementById("l-gearBtn").addEventListener("click", function() {
  // variables
  let rotateBtn = document.getElementById("utiliRotate");
  let exitBtn = document.getElementById("l-utiliExit");
  let addPlayerBtn = document.getElementById("addPlayer");
  let hidePlayerBtn = document.getElementById("hidePlayer");
  let newGameBtn = document.getElementById("newGamePrompt");
  let changeColorsBtn = document.getElementById("changeColors");
  let massLifeBtn = document.getElementById("massLife");
  let diceBtn = document.getElementById("dice");

  // always open right-side up
  utiliRotateBool = false;
  rotate(modalWindows[2], 0);

  modalBackground.classList.remove("hidden");
  modalWindows[2].classList.remove("hidden");

  // functions
  function addPlayer() {
      if (numPlayers < 6) {
        numPlayers += 1;
        displayBoard();
        for (let i = 0; i < numPlayers; i++) {
          // without time out the layout doesn't set correctly
          setTimeout(players[i].displayLife.bind(players[i]), 400);
        }
      }
  };
  function hidePlayer() {
    if (numPlayers > 2) {
      numPlayers -= 1;
      displayBoard();
      for (let i = 0; i < numPlayers; i++) {
        setTimeout(players[i].displayLife.bind(players[i]), 400);
      }
    }
  };
  function newGame() {
    localStorage.clear();
    window.removeEventListener("unload", saveState);
    location.reload();
  };
  // change colors sub modal
  function changeColors() {
    // variables
    let pBoxes = document.querySelectorAll(".choosePlayerButtons");
    let colorRadios = document.querySelectorAll("[id^=radio]");
    let gradientBool = false;
    let gradientCheckbox = document.getElementById("gradientCheckbox");
    let gradientCheckboxLabel = document.querySelector("#gradientCheckbox + label");
    let colorMenuButtons = document.querySelectorAll(".colorMenu");
    let colorBoxes = document.querySelectorAll(".allColors");
    let radios = document.querySelectorAll("input[name=chooseColor]");
    let rotateBtn = document.getElementById("choosePlayerRotate");
    let exitBtn = document.getElementById("choosePlayerExit");

    // orientation
    modalWindows[3].classList.remove("hidden");
    modalWindows[2].classList.add("hidden");
    let deg = utiliRotateBool ? 180 : 0;
    rotate(modalWindows[3], deg);

    // set up player boxes
    pBoxes.forEach(function(element,i) {
      element.style.background = players[i].color;
      element.innerHTML = players[i].number;
    });

    // functions
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
      let result = "linear-gradient(45deg ";
      for (let i = 0; i < arguments.length; i++) {
        result += ", " + arguments[i];
      }
      result += ")";
      return result;
    }
    function displayMonoColors() {
      clearSelected();
      gradientCheckboxLabel.classList.add("hidden");
      colorBoxes.forEach((element, i) => {
        element.style.background = colors[i];
      });
      colorMenuButtons[0].classList.add("invert-btn");
      for (i = 0; i < 6; i++) {
        colorBoxes[i].classList.remove("hidden");
      }
      colorRadios.forEach((element, i) => {
        element.value = i;
      });
    }
    // default is to display mono colors
    displayMonoColors();

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
      colorMenuButtons[1].classList.add("invert-btn");
      for (i = 0; i < 10; i++) {
        colorBoxes[i].classList.remove("hidden");
      }
    };
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
      colorMenuButtons[2].classList.add("invert-btn");
      for (i = 0; i < 10; i++) {
        colorBoxes[i].classList.remove("hidden");
      }
    };
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
      colorMenuButtons[3].classList.add("invert-btn");
      for (i = 0; i < 6; i++) {
        colorBoxes[i].classList.remove("hidden");
      }
    };
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
    function clearSelected() {
      radios.forEach(function(elem) {
        elem.checked = false;
      });
      colorMenuButtons.forEach(function(element) {
        element.classList.remove("invert-btn");
      });
      colorBoxes.forEach(function(element){
        element.classList.add("hidden");
      });
    };
    function toggleGradient() {
      // if something was checked before toggle, it should remain checked
      let checked;
      radios.forEach(function(elem) {
        if (elem.checked === true) {
          checked = elem;
        }
      });

      if (this.checked) {
        gradientBool = true;
      } else {
        gradientBool = false;
      }
      let currentPage = document.querySelector("#modalWindowChangeColor .invert-btn");
      if (currentPage === colorMenuButtons[1]) {
        displayTwoColors();
      }
      if (currentPage === colorMenuButtons[2]) {
        displayThreeColors();
      }
      if (currentPage === colorMenuButtons[3]) {
        displayFourColors();
      }
      // rechecking checked, if it exsists
      if (checked) {
        checked.checked = true;
      }
    };
    function toggleRotate() {
      utiliRotateBool = !utiliRotateBool;
      let deg = utiliRotateBool ? 180 : 0;
      rotate(modalWindows[3], deg);
    };
    function exit() {
      closeUtiliModal();
      displayMonoColors();
      pBoxes.forEach(elem => {
        elem.classList.add("hidden");
        elem.removeEventListener("click", changeColor);
      });
      gradientCheckbox.removeEventListener("click", toggleGradient);
      rotateBtn.removeEventListener("click", toggleRotate);
      exitBtn.removeEventListener("click", exit);
      document.getElementById("singleColors").removeEventListener("click", displayMonoColors);
      document.getElementById("twoColors").removeEventListener("click", displayTwoColors);
      document.getElementById("threeColors").removeEventListener("click", displayThreeColors);
      document.getElementById("fourFiveColors").removeEventListener("click", displayFourColors);
    }
    // event listeners
    gradientCheckbox.addEventListener("click", toggleGradient);
    colorBoxes.forEach(function(element, i) {
      element.addEventListener("click", () => {
        for (let i = 0; i < numPlayers; i++) {
          pBoxes[i].classList.remove("hidden");
        }
      });
    });
    document.getElementById("singleColors").addEventListener("click", displayMonoColors);
    document.getElementById("twoColors").addEventListener("click", displayTwoColors);
    document.getElementById("threeColors").addEventListener("click", displayThreeColors);
    document.getElementById("fourFiveColors").addEventListener("click", displayFourColors);
    pBoxes.forEach(elem => elem.addEventListener("click", changeColor));
    rotateBtn.addEventListener("click", toggleRotate);
    exitBtn.addEventListener("click", exit);
  };

  // dice modal
  function dice() {
    // variables
    let dice = document.querySelectorAll(".l-dice:not(div)");
    let rotateBtn = document.getElementById("diceRotate");
    let exitBtn = document.getElementById("exitDice");

    // open and orient
    modalWindows[4].classList.remove("hidden");
    modalWindows[2].classList.add("hidden");
    let deg = utiliRotateBool ? 180 : 0;
    rotate(modalWindows[4], deg);

    // functions
    function deselectDice() {
      dice.forEach(function(element) {
        element.classList.add("invert-btn");
        element.innerHTML = element.value;
      });
    }
    function animateDice() {
      let frames = [
        { transform: "rotate(-8deg)" },
        { transform: "rotate(-4deg)" },
        { transform: "rotate(0deg)" },
        { transform: "rotate(4deg)" },
        { transform: "rotate(8deg)" }
      ];
      let animation = this.animate(frames, {
        duration: 100,
        direction: 'alternate',
        iterations: 4
      });
      animation.onfinish = getRandom.bind(this);
    }
    function getRandom() {
      deselectDice();
      let r = Math.floor(Math.random() * this.value) + 1;
      this.classList.remove("invert-btn");
      this.innerHTML = r;
    }
    function rotateWindow() {
      utiliRotateBool = !utiliRotateBool;
      let deg = utiliRotateBool ? 180 : 0;
      rotate(modalWindows[4], deg);
    }
    function closeDice() {
      deselectDice();
      closeUtiliModal();
      dice.forEach(elem => elem.removeEventListener("click", animateDice));
      rotateBtn.removeEventListener("click", rotateWindow);
      exitBtn.removeEventListener("click", closeDice);
    }
    // event listeners
    dice.forEach(elem => elem.addEventListener("click", animateDice));
    rotateBtn.addEventListener("click", rotateWindow);
    exitBtn.addEventListener("click", closeDice);
  };

  // mass Life change modal
  function massLife() {
    // variables
    let excludePlayerBoxes = document.querySelectorAll("[id^=excludeP] + label");
    let exitBtn = document.getElementById("massChangeExit");
    let plus5 = document.getElementById("massPlus5");
    let plus = document.getElementById("massPlus");
    let minus = document.getElementById("massMinus");
    let minus5 = document.getElementById("massMinus5");
    let clearBtn = document.getElementById("l-clearExcluded");
    let rotateBtn = document.getElementById("massChangeRotate");
    // if lives have changed, we must make history
    let oldLives = [];
    for (let i = 0; i < numPlayers; i++) {
      oldLives.push(players[i].life);
    }

    // open and orient
    modalWindows[5].classList.remove("hidden");
    modalWindows[2].classList.add("hidden");
    let deg = utiliRotateBool ? 180 : 0;
    rotate(modalWindows[5], deg);
    for (let i = 0; i < numPlayers; i++) {
      excludePlayerBoxes[i].classList.remove("hidden");
      excludePlayerBoxes[i].style.background = players[i].color;
      excludePlayerBoxes[i].innerHTML = players[i].life;
    }

    // functions
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
    function deselect() {
      let radios = document.querySelectorAll("input[name=excludeGroup]");
      radios.forEach(function(elem) {
        elem.checked = false;
      });
    };
    function rotateWindow() {
      utiliRotateBool = !utiliRotateBool;
      let deg = utiliRotateBool ? 180 : 0;
      rotate(modalWindows[5], deg);
    }
    function exit() {
      deselect();
      for (let i = 0; i < numPlayers; i++) {
        if (players[i].life != oldLives[i]) {
          players[i].lifeHistory.push(parseInt(players[i].life));
          players[i].historyTime.push(Date.now());

        }
      }
      document.getElementById("netChange").innerHTML = 0;
      closeUtiliModal();
      excludePlayerBoxes.forEach(elem => elem.classList.add("hidden"));
      plus5.removeEventListener("click", massLifeChange);
      plus.removeEventListener("click", massLifeChange);
      minus.removeEventListener("click", massLifeChange);
      minus5.removeEventListener("click", massLifeChange);
      clearBtn.removeEventListener("click", deselect);
      rotateBtn.removeEventListener("click", rotateWindow);
      exitBtn.removeEventListener("click", exit);
    }

    // event listeners
    plus5.addEventListener("click", massLifeChange);
    plus.addEventListener("click", massLifeChange);
    minus.addEventListener("click", massLifeChange);
    minus5.addEventListener("click", massLifeChange);
    clearBtn.addEventListener("click", deselect);
    rotateBtn.addEventListener("click", rotateWindow);
    exitBtn.addEventListener("click", exit);

  }
  function utiliRotate() {
    utiliRotateBool = !utiliRotateBool;
    let deg = utiliRotateBool ? 180 : 0;
    rotate(modalWindows[2], deg);
  };
  function closeUtiliModal() {
    closeModal();
    addPlayerBtn.removeEventListener("click", addPlayer);
    hidePlayerBtn.removeEventListener("click", hidePlayer);
    newGameBtn.removeEventListener("click", newGame);
    changeColorsBtn.removeEventListener("click", changeColors);
    diceBtn.removeEventListener("click", dice);
    massLifeBtn.removeEventListener("click", massLife);
    rotateBtn.removeEventListener("click", utiliRotate);
    exitBtn.removeEventListener("click", closeUtiliModal);
  };

  // event listeners
  addPlayerBtn.addEventListener("click", addPlayer);
  hidePlayerBtn.addEventListener("click", hidePlayer);
  newGameBtn.addEventListener("click", newGame);
  changeColorsBtn.addEventListener("click", changeColors);
  diceBtn.addEventListener("click", dice);
  massLifeBtn.addEventListener("click", massLife);
  rotateBtn.addEventListener("click", utiliRotate);
  exitBtn.addEventListener("click", closeUtiliModal);
});

// test for mobile courtesy of open tech guides
function isMobileDevice() {
  testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    		       'BlackBerry|Windows Phone|'  +
    		       'Opera Mini|IEMobile|Mobile' ,
    		      'i');
  if (testExp.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}
// stop auto-lock
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
displayBoard();
