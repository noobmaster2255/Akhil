// Documentation;
// "https://bymykel.github.io/CSGO-API/api/"

const agentURL = "https://bymykel.github.io/CSGO-API/api/en/agents.json";
let agents = [];

const weaponURL = "https://bymykel.github.io/CSGO-API/api/en/skins.json";
let weapons = [];

const xhrAgents = new XMLHttpRequest();
xhrAgents.open("GET", agentURL, false);
xhrAgents.onreadystatechange = function () {
  if (xhrAgents.readyState === 4) {
    if (xhrAgents.status === 200) {
      const data = JSON.parse(xhrAgents.responseText);
      agents = data.slice(0, 50);
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
          localStorage.setItem("selectedTeam", button.id);
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
  // document.body.style.backgroundImage = 'url("/Akhil/assets/bg2.jpg")';
  let selectedTeamId = localStorage.getItem("selectedTeam");
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
        resolve(characterInfo);
      } else {
        alert("Select a character and type name");
        // reject("Select a character and type name");
      }
    }
  });
}

if (currentPage == "/Akhil/weapons.html") {
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
      weaponSkin.push({ skinName: skinName, skinId: skinId, skinImg: skinImg });
    }
    //&& weaponSkin.length < 500
  });
  weaponSkin.forEach((element) => {
    let weaponTile = document.createElement("weaponTile");
    weaponTile.setAttribute("class", "weapon-tile agent-tile");
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
  nameTile.addEventListener("click", ()=>{
    const name = nameTile.textContent;
    filterByName(name);
  })
})
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
