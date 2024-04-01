// Documentation;
// "https://bymykel.github.io/CSGO-API/api/"

const agentURL = "https://bymykel.github.io/CSGO-API/api/en/agents.json";
let agents = [];

const weaponURL = "https://bymykel.github.io/CSGO-API/api/en/skins.json";
let weapons = [];

let balance = 9000;

const xhrAgents = new XMLHttpRequest();
xhrAgents.open("GET", agentURL, false);
xhrAgents.onreadystatechange = function () {
  if (xhrAgents.readyState === 4) {
    if (xhrAgents.status === 200) {
      const data = JSON.parse(xhrAgents.responseText);
      agents = data;
      // agents = data.slice(0, 500);
    } else {
      console.error("Request failed with status:", xhrAgents.status);
    }
  }
};
xhrAgents.send();

const xhrWeapons = new XMLHttpRequest();
xhrWeapons.open("GET", weaponURL, false);
xhrWeapons.onreadystatechange = function () {
  if (xhrWeapons.readyState === 4) {
    if (xhrWeapons.status === 200) {
      const data = JSON.parse(xhrWeapons.responseText);
      weapons = data;
    } else {
      console.error("Request failed with status:", xhrWeapons.status);
    }
  }
};
xhrWeapons.send();

//to find current page
let currentPage = window.location.pathname;

//adding back navigation button
let backButtonContainer = document.getElementById("backButtonContainer");
let backButton = document.createElement("BUTTON");
backButton.setAttribute("id", "backButton");
backButton.setAttribute("class", "back-button");
backButton.innerHTML = "< back";
backButtonContainer.appendChild(backButton);

// start button
let startButtonDiv = document.getElementById("buttonContainer");
let startButton = document.getElementById("startButton");

//progress bar
let container = document.getElementById("container");
let progressContainer = document.createElement("div");
progressContainer.setAttribute("id", "progressContainer");
let progressDiv = document.createElement("div");
progressDiv.setAttribute("id", "progressBar");
progressDiv.innerHTML = "1%";
progressContainer.appendChild(progressDiv);
progressContainer.style.display = "none";

// go back function
backButton.addEventListener("click", goBack);
function goBack() {
  window.history.back();
}

if (startButton) {
  startButton.addEventListener("click", startGame);
}

function startGame() {
  startButtonDiv.style.display = "none";
  load()
    .then(() => {
      setTimeout(() => {
        progressContainer.style.display = "none";
        window.location.href = "team.html";
      }, 1000);
    })
    .catch((error) => {
      console.log(`error = ${error}`);
    });
}

//screen 2 team buttons
if (currentPage == "/Akhil/team.html") {
  selectTeamButton("teamButtonContainer");
}

function selectTeamButton(containerId) {
  let buttonContainer = document.getElementById(containerId);
  let teamButtonLabels = ["Terrorist", "Counter Terrorist", "Auto Selection"];
  let buttonIds = ["terrorists", "counter-terrorists", "autoSelectButton"];

  teamButtonLabels.forEach(function (team, id) {
    let button = document.createElement("button");
    button.textContent = team;
    button.id = buttonIds[id];
    button.addEventListener("click", function () {
      load()
        .then(() => {
          localStorage.setItem("lastClickedButtonId", button.id);
          setTimeout(() => {
            window.location.href = "agents.html";
          }, 1000);
        })
        .catch((error) => {
          console.log(`error = ${error}`);
        });
    });
    buttonContainer.appendChild(button);
  });
  buttonContainer.style.display = "flex";
}
let agentsContainer;
if (currentPage == "/Akhil/agents.html") {
  agentsContainer = document.getElementById("agentsContainer");
  let selectedTeamId = localStorage.getItem("lastClickedButtonId");
  selectedTeam(selectedTeamId);
}
function selectedTeam(team) {
  if (team === "autoSelectButton") {
    let teams = ["terrorists", "counter-terrorists"];
    randomTeam = Math.floor(Math.random() * teams.length);
    team = teams[randomTeam];
  }
  let filteredAgents = agents.filter(function (agent) {
    return agent.team.id == team;
  });
  let agentHeading = document.getElementById("agentHeading");
  agentHeading.innerHTML = `Choose an Agent : ${team}`;
  localStorage.setItem("selectedTeam", team);
  displayAgents(filteredAgents);
}

let activeTile = null;
let activeTileId = null;
function displayAgents(filteredAgents) {
  filteredAgents.forEach(function (agent) {
    let agentTile = document.createElement("div");
    agentTile.setAttribute("class", "agent-tile");
    agentTile.setAttribute("id", agent.id);
    let agentImgTag = document.createElement("img");
    agentImgTag.setAttribute("id", "agentImage");
    agentImgTag.setAttribute("src", agent.image);

    let agentName = document.createElement("p");
    agentName.innerHTML = agent.name;
    agentName.id = agent.id;
    agentTile.classList.remove("active");
    agentTile.addEventListener("click", () => {
      if (activeTile !== null) {
        activeTile.classList.remove("active");
      }
      agentTile.classList.add("active");
      activeTile = agentTile;
    });
    agentsContainer.appendChild(agentTile);
    agentTile.appendChild(agentImgTag);
    agentTile.appendChild(agentName);
  });
}

let characterInfo = {};
let saveCharacter = document.getElementById("saveCharacter");
if (saveCharacter) {
  saveCharacter.addEventListener("click", () => {
    saveCharacterName()
      .then(() => {
        load()
          .then(() => {
            setTimeout(() => {
              window.location.href =
                "weapons.html?characterName=" +
                characterInfo.characterName +
                "&agentId=" +
                characterInfo.agentId;
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function saveCharacterName() {
  return new Promise((resolve, reject) => {
    let characterNameInput = document.getElementById("characterName");
    let characterName = characterNameInput.value.trim();

    if (characterName === "") {
      alert("Name should not be empty");
      reject("Name should not be empty");
    } else if (characterName.split(" ").length > 2) {
      alert("Name should not be more than 2 words");
      reject("Name should not be more than 2 words");
    } else if (characterName.length > 20) {
      alert("Name should not be more than 20 characters");
      reject("Name should not be more than 20 characters");
    } else {
      agentId = activeTile ? activeTile.id : null;
      if (agentId !== null && characterName !== "") {
        characterInfo = {
          agentId: agentId,
          characterName: characterName,
        };
        localStorage.setItem("characterName", characterName);
        localStorage.setItem("agentId", agentId);
        resolve(characterInfo);
      } else {
        alert("Select a character and type name");
        // reject("Select a character and type name");
      }
    }
  });
}

if (currentPage == "/Akhil/weapons.html") {
  let displyBalance = document.getElementById("displyBalance");
  displyBalance.textContent = balance;
  listWeapons();
}
function listWeapons() {
  let urlParams = new URLSearchParams(window.location.search);
  const agentId = urlParams.get("agentId");
  const characterName = urlParams.get("characterName");
  weaponCategory();
  weaponName();
  weaponSkin();
  let weaponsContainer = document.getElementById("weaponsContainer");
}

function weaponCategory() {
  let weaponCat = document.getElementById("weaponCat");
  let weaponCategory = [];
  weapons.forEach((weapon) => {
    if (!weaponCategory.includes(weapon.category.name)) {
      weaponCategory.push(weapon.category.name);
    }
  });
  weaponCategory.forEach((category) => {
    if (category) {
      let categoryTile = document.createElement("div");
      categoryTile.setAttribute("class", "category-tile agent-tile");
      categoryTile.setAttribute("id", category);
      categoryTile.textContent = category;
      weaponCat.appendChild(categoryTile);
    }
  });
}

function weaponName() {
  let weaponNameContainer = document.getElementById("weaponNameContainer");
  let weaponNames = [];
  weapons.forEach((weapon) => {
    const name = weapon.weapon.name;
    if (!weaponNames.includes(name)) {
      if (
        name === "Dual Berettas" ||
        name === "Five-SeveN" ||
        name === "Glock-18"
      ) {
        weaponNames.push(name);
      }
    }
  });

  weaponNames.forEach((name) => {
    if (name) {
      let weaponNameTile = document.createElement("div");
      weaponNameTile.setAttribute("class", "weapon-name-tile agent-tile");
      weaponNameTile.setAttribute("id", name);
      weaponNameTile.textContent = name;
      weaponNameContainer.appendChild(weaponNameTile);
    }
  });
}

function weaponSkin() {
  let weaponSkin = [];
  let weaponsContainer = document.getElementById("weaponsContainer");

  weapons.forEach((weapon) => {
    const skin = weapon.name;
    const split = skin.split("|");
    const skinName = split[1];
    const skinId = weapon.id;
    const skinImg = weapon.image;
    if (!weaponSkin.map((skinObj) => skinObj.skinName).includes(skinName)) {
      weaponSkin.push({
        skinName: skinName,
        skinId: skinId,
        skinImg: skinImg,
        skinCategory: weapon.category.name,
      });
    }
    //&& weaponSkin.length < 500
  });
  weaponSkin.forEach((element) => {
    let weaponTile = document.createElement("weaponTile");
    weaponTile.setAttribute("class", "weapon-tile agent-tile");
    weaponTile.setAttribute("id", element.skinId);
    weaponTile.setAttribute("name", element.skinCategory);
    let weaponImage = document.createElement("img");
    weaponImage.id = element.skinId;
    weaponImage.src = element.skinImg;

    let weaponAlias = document.createElement("p");
    weaponAlias.id = `alia-${element.skinId}`;
    weaponAlias.textContent = element.skinName;

    weaponTile.appendChild(weaponImage);
    weaponTile.appendChild(weaponAlias);
    weaponsContainer.appendChild(weaponTile);
  });
}

//filter weapons

function filterByCategory(category) {
  const filteredWeapons = weapons.filter(
    (weapon) => weapon.category.name === category
  );
  displayFilteredWeapons(filteredWeapons);
}

function filterByName(name) {
  const filteredWeapons = weapons.filter(
    (weapon) => weapon.weapon.name === name
  );
  displayFilteredWeapons(filteredWeapons);
}

function displayFilteredWeapons(filteredWeapons) {
  let weaponsContainer = document.getElementById("weaponsContainer");
  weaponsContainer.innerHTML = "";

  filteredWeapons.forEach((weapon) => {
    const skin = weapon.name;
    const split = skin.split("|");
    const skinName = split[1];
    const skinId = weapon.id;
    const skinImg = weapon.image;
    let weaponTile = document.createElement("weaponTile");
    weaponTile.setAttribute("class", "weapon-tile agent-tile");
    weaponTile.setAttribute("name", weapon.category.name);
    let weaponType = weaponTile.getAttribute("name");

    weaponTile.addEventListener("click", () => {
      selectWeapons(skinId);
      reducePriceFromBalance(weaponType);
    });

    let weaponImage = document.createElement("img");
    weaponImage.id = skinId;
    weaponImage.src = skinImg;

    let weaponAlias = document.createElement("p");
    weaponAlias.id = `alia-${skinId}`;
    weaponAlias.textContent = skinName;

    weaponTile.appendChild(weaponImage);
    weaponTile.appendChild(weaponAlias);
    weaponsContainer.appendChild(weaponTile);
  });
}

document.querySelectorAll(".category-tile").forEach((categoryTile) => {
  categoryTile.addEventListener("click", () => {
    const category = categoryTile.textContent;
    filterByCategory(category);
  });
});

document.querySelectorAll(".weapon-name-tile").forEach((nameTile) => {
  nameTile.addEventListener("click", () => {
    const name = nameTile.textContent;
    filterByName(name);
  });
});

/*

/////////selected weapons //////////

*/

let selectedWeaponIds = [];

function selectWeapons(weaponTile) {
  let weaponId = weaponTile.id;
  let weaponType = weaponTile.getAttribute("name");
  const index = selectedWeaponIds.indexOf(weaponId);

  if (index !== -1) {
    selectedWeaponIds.splice(index, 1);
    weaponTile.classList.remove("active");
    return;
  } else {
    if (selectedWeaponIds.length >= 6) {
      alert("You can select up to 6 weapons.");
      return;
    }
    reducePriceFromBalance(weaponType);
    selectedWeaponIds.push(weaponId);
    weaponTile.classList.add("active");
  }

  localStorage.setItem("selectedWeaponIds", JSON.stringify(selectedWeaponIds));
}

document.querySelectorAll(".weapon-tile").forEach((weaponTile) => {
  weaponTile.addEventListener("click", () => {
    selectWeapons(weaponTile);
  });
});

/*

////////// find balance ///////////

*/

const weaponPrices = {
  Pistols: randomPrice(200, 700),
  SMGs: randomPrice(1000, 1500),
  Rifles: randomPrice(1500, 3500),
  Heavy: randomPrice(2500, 4500),
  Knives: randomPrice(100, 500),
  Gloves: randomPrice(100, 500),
};

function randomPrice(min, max) {
  const range = Math.floor((max - min) / 50);
  console.log(range);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function reducePriceFromBalance(weaponType) {
  let price = weaponPrices[weaponType];
  if (balance >= price) {
    balance = balance - price;
  } else {
    alert("insufficient balance to purchase", weaponType);
  }
  let displyBalance = document.getElementById("displyBalance");
  displyBalance.textContent = balance;
  localStorage.setItem("balance", balance);
  return balance;
}

//adding continue navigation button
let continueButtonContainer = document.getElementById(
  "continueButtonContainer"
);
let continueButton = document.createElement("BUTTON");
continueButton.setAttribute("id", "continueButton");
continueButton.setAttribute("class", "continue-button");
continueButton.innerHTML = "Continue";
continueButtonContainer.appendChild(continueButton);

function continueToNextPage(page) {
  load().then(() => {
    setTimeout(() => {
      window.location.href = page;
    }, 1000);
  });
}

// function for progress load
function load() {
  return new Promise((resolve, reject) => {
    container.innerHTML = "";
    container.appendChild(progressContainer);
    let element = document.getElementById("progressBar");
    let width = 1;
    progressContainer.style.display = "block";
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        resolve();
      } else {
        width++;
        element.style.width = width + "%";
        element.innerHTML = width + "%";
      }
    }
  });
}

console.log(localStorage);
