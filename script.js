const ID = (id) => { return document.getElementById(id) },
timeFrames = ["daily", "weekly", "monthly"]

if (!localStorage.getItem("TIMEFRAMES")) {
  localStorage.setItem("TIMEFRAMES", timeFrames[0]);
}

let TIMEFRAMES = localStorage.getItem('TIMEFRAMES')
ID(TIMEFRAMES).classList.toggle('active')

fetch("./data.json")
  .then((res) => res.json())
  .then((datas) => { localStorage.setItem("datas", JSON.stringify(datas));displayCard(TIMEFRAMES);})

function displayCard(dateonclick) {
    localStorage.setItem("TIMEFRAMES", dateonclick);

    timeFrames.forEach((item) => {
      item == dateonclick
        ? ID(item).classList.add("active")
        : ID(item).classList.remove("active");
    });

    const MAIN = ID("main");
    while (MAIN.firstChild) {
        MAIN.removeChild(MAIN.firstChild);
    }
    let datas = JSON.parse(localStorage.getItem("datas"));
    datas.forEach((data) => {
    MAIN.insertAdjacentHTML(
      "beforeend",
      `
    <div id="${data.title.replace(" ", "")}" class="card">
    <div class="container">
    <div class="title">
    <p>${data.title}</p>
    <p>•••</p>  
    </div>
    <div class="data">
    <p>${data["timeframes"][dateonclick]["current"]}hrs</p>
    <p>Last Week - ${data["timeframes"][dateonclick]["previous"]}hrs</p>
    </div>
    </div>
    </div>
    `
    );
  });
}

timeFrames.forEach((dateonclick) => {
    ID(dateonclick).onclick = () => {
      displayCard(dateonclick);
    };
});
