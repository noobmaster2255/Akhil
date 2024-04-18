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
if (currentPage == "/team.html") {
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
if (currentPage == "/agents.html") {
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
  localStorage.setItem("filteredAgents", JSON.stringify(filteredAgents));
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
              window.location.href = "weapons.html";
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

if (currentPage == "/weapons.html") {
  let displyBalance = document.getElementById("displyBalance");
  displyBalance.textContent = balance;
  weaponCategory();
  weaponName();
  weaponSkin();
  //adding continue navigation button
  let continueButtonContainer = document.getElementById(
    "continueButtonContainer"
  );
  let continueButton = document.createElement("BUTTON");
  continueButton.setAttribute("id", "continueButton");
  continueButton.setAttribute("class", "continue-button");
  continueButton.innerHTML = "Continue";
  continueButtonContainer.appendChild(continueButton);
}
// function listWeapons() {
//   let urlParams = new URLSearchParams(window.location.search);
//   const agentId = urlParams.get("agentId");
//   const characterName = urlParams.get("characterName");
//   weaponCategory();
//   weaponName();
//   weaponSkin();
//   let weaponsContainer = document.getElementById("weaponsContainer");
// }

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

  // console.log(weapons.team);
  let filteredWeapon = weapons.filter(
    (weapon) =>
      weapon.team.id == localStorage.getItem("selectedTeam") ||
      weapon.team.id == "both"
  );

  filteredWeapon.forEach((weapon) => {
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
    weaponTile.setAttribute("id", weapon.id);
    let weaponType = weaponTile.getAttribute("name");

    weaponTile.addEventListener("click", () => {
      selectWeapons(weaponTile);
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
  const index = selectedWeaponIds.findIndex((item) => item.id === weaponId);

  let categorySelected = selectedWeaponIds.some((item) => {
    return item.type === weaponType;
  });

  if (categorySelected) {
    alert("You can select only one weapon from each category");
    return;
  }

  if (index !== -1) {
    selectedWeaponIds.splice(index, 1);
    weaponTile.classList.remove("active");
    return;
  } else {
    if (selectedWeaponIds.length >= 6) {
      alert("You can select up to 6 weapons.");
      return;
    } else {
      selectedWeaponIds.push({ id: weaponId, type: weaponType });
      let type = weaponType;
      reducePriceFromBalance(type);
      weaponTile.classList.add("active");
    }
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

function continueToNextPage(page) {
  load().then(() => {
    setTimeout(() => {
      window.location.href = page;
    }, 1000);
  });
}
if (currentPage == "/overview.html") {
  let characterNameHeading = document.getElementById("characterNameHeading");
  characterNameHeading.textContent = localStorage.getItem("characterName");

  let characterContainer = document.getElementById("characterContainer");
  let myCharacter = localStorage.getItem("agentId");

  agents.forEach((agent) => {
    if (agent.id == myCharacter) {
      let myCharacterTile = document.createElement("div");
      myCharacterTile.setAttribute("id", "myCharacterTile");
      myCharacterTile.setAttribute("class", "character-tile agent-tile");

      let charcterImgTag = document.createElement("img");
      charcterImgTag.setAttribute("src", agent.image);

      let characterPTag = document.createElement("p");
      characterPTag.textContent = agent.name;

      myCharacterTile.appendChild(charcterImgTag);
      // myCharacterTile.appendChild(characterPTag);
      characterContainer.appendChild(myCharacterTile);
    }
  });

  let weaponOverviewContainer = document.getElementById(
    "weaponOverviewContainer"
  );
  let myWeapons = localStorage.getItem("selectedWeaponIds");
  myWeapons = JSON.parse(myWeapons);

  let listMyWeapons = weapons.filter((weapon) =>
    myWeapons.some((item) => item.id === weapon.id)
  );

  listMyWeapons.forEach((weapon) => {
    let weaponTile = document.createElement("weaponTile");
    weaponTile.setAttribute("class", "weapon-tile agent-tile my-weapon-tile");
    weaponTile.setAttribute("id", weapon.id);
    weaponTile.setAttribute("name", weapon.category.name);
    let weaponImage = document.createElement("img");
    weaponImage.setAttribute("class", "my-weapon-img");
    weaponImage.id = weapon.id;
    weaponImage.src = weapon.image;

    weaponTile.appendChild(weaponImage);
    weaponOverviewContainer.appendChild(weaponTile);
  });

  document.body.addEventListener("mouseover", (event) => {
    if (!event.target.classList.contains("my-weapon-tile")) {
      weaponDetailContainer.style.display = "none";
    }
  });

  let weaponDetailContainer = document.getElementById("weaponDetailContainer");
  document.querySelectorAll(".my-weapon-tile").forEach((weaponTile) => {
    weaponTile.addEventListener("click", () => {
      weaponDetailContainer.innerHTML = "";
      weaponDetailContainer.style.display = "block";
      showWeaponDetails(weaponTile);
    });
  });
}

function showWeaponDetails(weaponTile) {
  let weaponId = weaponTile.id;
  let weaponDetails = weapons.find((weapon) => weapon.id == weaponId);

  let weaponCat = weaponDetails.category.name;
  let weaponName = weaponDetails.weapon.name;
  let weaponMaxFloat = weaponDetails.max_float;
  let weaponMinFloat = weaponDetails.min_float;
  let weaponTeam = weaponDetails.team.name;
  let weaponRarity = weaponDetails.rarity.name;

  let detailHeading = document.createElement("h2");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");
  let p5 = document.createElement("p");

  detailHeading.textContent = weaponName;
  p1.innerHTML = `Weapon Category: <b> ${weaponCat}</b>`;
  p2.innerHTML = `Weapon max float:<b> ${weaponMaxFloat}</b>`;
  p3.innerHTML = `Weapon min float:<b> ${weaponMinFloat}</b>`;
  p4.innerHTML = `Weapon Team:<b> ${weaponTeam}</b>`;
  p5.innerHTML = `Weapon Team:<b> ${weaponRarity}</b>`;

  weaponDetailContainer.appendChild(detailHeading);
  weaponDetailContainer.appendChild(p1);
  weaponDetailContainer.appendChild(p2);
  weaponDetailContainer.appendChild(p3);
  weaponDetailContainer.appendChild(p4);
  weaponDetailContainer.appendChild(p5);
}

function createTeam() {
  let inputCharacterName = document.getElementById("inputCharacterName");
  if (inputCharacterName.value === "") {
    alert("Enter team name");
  } else {
    localStorage.setItem("teamName", inputCharacterName.value);
    load().then(() => {
      setTimeout(() => {
        window.location.href = "teamOverview.html";
      }, 1000);
    });
  }
}

if (currentPage == "/teamOverview.html") {
  const randomAgents = [];
  let filteredAgents = JSON.parse(localStorage.getItem("filteredAgents"));
  const numAgents = filteredAgents.length;

  while (randomAgents.length < 3) {
    let randomIndex = Math.floor(Math.random() * numAgents);
    let randomAgent = filteredAgents[randomIndex];

    if (!randomAgents.includes(randomAgent)) {
      randomAgents.push(randomAgent);
    }
  }
  let myAgent = agents.find(
    (agent) => agent.id === localStorage.getItem("agentId")
  );
  myAgent.name = localStorage.getItem("characterName");
  randomAgents.push(myAgent);
  let teamContainer = document.getElementById("characterContainer");
  let characterNameHeading = document.getElementById("characterNameHeading");
  characterNameHeading.textContent = localStorage.getItem("teamName");
  randomAgents.forEach((member) => {
    let myCharacterTile = document.createElement("div");
    myCharacterTile.setAttribute("id", "myCharacterTile");
    myCharacterTile.setAttribute("class", "character-tile agent-tile");

    let charcterImgTag = document.createElement("img");
    charcterImgTag.setAttribute("src", member.image);

    let characterPTag = document.createElement("p");
    characterPTag.textContent = member.name;

    myCharacterTile.appendChild(charcterImgTag);
    myCharacterTile.appendChild(characterPTag);
    teamContainer.appendChild(myCharacterTile);
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
