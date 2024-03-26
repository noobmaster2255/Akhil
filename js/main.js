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
function goBack() {
  window.history.back();
}
backButton.addEventListener("click", goBack);

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
      console.log(error);
    });
}

//screen 2 team buttons
if (currentPage == "/Akhil/team.html") {
  selectTeamButton("teamButtonContainer");
}
function selectTeamButton(containerId) {
  let buttonContainer = document.getElementById(containerId);
  let teamButtonLabels = ["Terrorist", "Counter Terrorist", "Auto Selection"];

  teamButtonLabels.forEach(function (team) {
    let button = document.createElement("button");
    button.textContent = team;
    button.addEventListener("click", function () {
      selectedTeam(team);
    });
    buttonContainer.appendChild(button);
  });

  buttonContainer.style.display = "flex";
}
function selectedTeam(team) {}





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
