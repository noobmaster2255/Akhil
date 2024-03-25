//to find current page
let currentPage = window.location.pathname;

//adding back navigation button
let backNavigation = document.getElementById("backNavigation");
let backButton = document.createElement("BUTTON");
backButton.setAttribute("id", "backButton");
backButton.setAttribute("class", "back-button");
backButton.innerHTML = "go back";
backNavigation.appendChild(backButton);

//progress bar
let progressContainer = document.createElement("div");
progressContainer.setAttribute("id", "progressContainer");
let progressDiv = document.createElement("div");
progressDiv.setAttribute("id", "progressBar");
progressDiv.innerHTML = "1%";
progressContainer.appendChild(progressDiv);
progressContainer.style.display = "none";

let container = document.getElementById("container");

//start button page
if (currentPage == "/Akhil/index.html") {
  container.appendChild(progressContainer);
  backNavigation.style.display = "none";

  //creating start button
  let startButtonDiv = document.getElementById("startButtonContainer");
  let startButton = document.createElement("BUTTON");
  startButton.setAttribute("id", "startButton");
  startButton.setAttribute("class", "start-button");
  startButton.innerHTML = "START";
  startButtonDiv.appendChild(startButton);
  startButton.addEventListener("click", function () {
    startButtonDiv.style.display = "none";
    load().then(() => {});
    
  });
}



// function for progress load
function load() {
  return new Promise((resolve, reject) => {
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
