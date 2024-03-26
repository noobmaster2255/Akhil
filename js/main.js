//agents
let agentsArray = [
  {
    id: "agent-4613",
    name: "Bloody Darryl The Strapped | The Professionals",
    description:
      "Before he was leader of the heist gang 'The Professionals' Sir Bloody Darryl was more simply called, Bloody Darryl. Still your friendly neighborhood psychopath in every sense of the word. Not actually Australian according to Australians. \\n\\n<i>I'm just gonna give them a bit of Razzle Dazzle.</i>",
    rarity: {
      id: "rarity_legendary_character",
      name: "Superior",
      color: "#d32ce6",
    },
    collections: [
      {
        id: "collection-set-op11-characters",
        name: "Operation Riptide Agents",
        image:
          "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/set_icons/set_op11_characters_png.png",
      },
    ],
    team: {
      id: "terrorists",
      name: "Terrorist",
    },
    image:
      "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_tm_professional_varf5_png.png",
  },
  {
    id: "agent-4619",
    name: "'Blueberries' Buckshot | NSWC SEAL",
    description:
      "Known as SEAL Team's \\\"Weapons Sommelier\\\" Buckshot has thoroughly field-tested and reviewed almost every available military weapon in staggering depth. ST6 relies on Buckshot's knowledge of lesser-known guns for edge case advantages in ground based operations.\\n\\nSeen here sporting the classic NUE Type 1 uniform otherwise known as 'blueberries'. \\n\\n<i>They talk to me. The guns. They have feelings.</i>",
    rarity: {
      id: "rarity_mythical_character",
      name: "Exceptional",
      color: "#8847ff",
    },
    collections: [
      {
        id: "collection-set-op10-characters",
        name: "Broken Fang Agents",
        image:
          "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/set_icons/set_op10_characters_png.png",
      },
    ],
    team: {
      id: "counter-terrorists",
      name: "Counter-Terrorist",
    },
    image:
      "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_ctm_st6_variantj_png.png",
  },
  {
    id: "agent-4680",
    name: "'Two Times' McCoy | TACP Cavalry",
    description:
      "'Two Times' McCoy earned his nickname by completing TACP's field training twice. Official records mark this up to a scheduling mix-up, but his teammates report restraining him from completing the trifecta.\\n\\nWith inhuman reserves of physical and mental stamina, McCoy often finds himself the last person standing at the end of any conflict—physical and verbal alike.\\n\\nHis yellow scarf is a tribute to his time with 1st Cavalry Division.\\n\\n<i>Yep. Still here.</i>",
    rarity: {
      id: "rarity_legendary_character",
      name: "Superior",
      color: "#d32ce6",
    },
    collections: [
      {
        id: "collection-set-op10-characters",
        name: "Broken Fang Agents",
        image:
          "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/set_icons/set_op10_characters_png.png",
      },
    ],
    team: {
      id: "counter-terrorists",
      name: "Counter-Terrorist",
    },
    image:
      "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_ctm_st6_variantl_png.png",
  },
  {
    id: "agent-4711",
    name: "Cmdr. Mae 'Dead Cold' Jamison | SWAT",
    description:
      "Cmdr. 'Dead Cold' Jamison has just about seen it all. Skeptical and wry in the midst of deadly combat, others could mistake her for being nonchalant about the chaos at hand. They would be wrong. Nothing gets past Dead Cold, not bad guys with AK-47s, junior officers that call her 'Ma'am,' or an opportunity to make elite officers smirk under pressure.\\n\\n<i>You're gonna find out.</i>",
    rarity: {
      id: "rarity_ancient_character",
      name: "Master",
      color: "#eb4b4b",
    },
    collections: [
      {
        id: "collection-set-op10-characters",
        name: "Broken Fang Agents",
        image:
          "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/set_icons/set_op10_characters_png.png",
      },
    ],
    team: {
      id: "counter-terrorists",
      name: "Counter-Terrorist",
    },
    image:
      "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_ctm_swat_variante_png.png",
  },
  {
    id: "agent-4712",
    name: "1st Lieutenant Farlow | SWAT",
    description:
      "Smart as a whip and relentlessly polite, 1st Lieutenant Farlow is one of the most beloved and respected officers in SWAT. A master tactician in hostage and barricade situations, Farlow quickly climbed the SWAT ranks. Don't be fooled by her overwhelmingly cheerful nature--she can dispatch bad guys in the blink of an eye and not think twice about it.\\n\\n<i>What are they doing over there? Drinking milkshakes?</i>",
    rarity: {
      id: "rarity_legendary_character",
      name: "Superior",
      color: "#d32ce6",
    },
    collections: [
      {
        id: "collection-set-op10-characters",
        name: "Broken Fang Agents",
        image:
          "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/set_icons/set_op10_characters_png.png",
      },
    ],
    team: {
      id: "counter-terrorists",
      name: "Counter-Terrorist",
    },
    image:
      "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_ctm_swat_variantf_png.png",
  },
];

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
let agentTile;
if (currentPage == "/Akhil/agents.html") {
  agentsContainer = document.getElementById("agentsContainer");
  document.body.style.backgroundImage = 'url("/Akhil/assets/bg2.jpg")';
  let selectedTeamId = localStorage.getItem("selectedTeam");
  selectedTeam(selectedTeamId);
}
function selectedTeam(team) {
  if (team === "autoSelectButton") {
    let teams = ["terrorists", "counter-terrorists"];
    randomTeam = Math.floor(Math.random() * teams.length);
    team = teams[randomTeam];
    console.log(team);
  }
  let filteredAgents = agentsArray.filter(function (agent) {
    return agent.team.id == team;
  });
  let agentHeading = document.getElementById("agentHeading");
  agentHeading.innerHTML = `Choose an Agent : ${team}`;
  displayAgents(filteredAgents);
}

function displayAgents(filteredAgents) {
  filteredAgents.forEach(function (agent) {
    agentTile = document.createElement("div");
    agentTile.setAttribute("class", "agent-tile");
    agentTile.setAttribute("id", agent.id);
    let agentImgTag = document.createElement("img");
    agentImgTag.setAttribute("id", "agentImage");
    agentImgTag.setAttribute("src", agent.image);

    let agentName = document.createElement("p");
    agentName.innerHTML = agent.name;
    agentName.id = agent.id;

    agentsContainer.appendChild(agentTile);
    agentTile.appendChild(agentImgTag);
    agentTile.appendChild(agentName);
  });
}

agentTile.addEventListener("click", () => {});

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
