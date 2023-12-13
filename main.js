import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

await M.init();

// Itération 3
C.colorcalendar = function (calendar) {
  let colorMap = {
    mmi1: { CM: "#D31949", TD: "#f45464", TP: "#b02321", Autre: "#ffb84d" },
    mmi2: { CM: "#00bdae", TD: "#1194a7", TP: "#10686b", Autre: "#ffd699" },
    mmi3: { CM: "#e6dcd4", TD: "#bda18c", TP: "#3f352d", Autre: "#ffebcc" },
  };
  for (let ev of calendar) {
    let color = colorMap[ev.calendarId][ev.type];
    ev.backgroundColor = color;
    ev.borderColor = "trasparence";
  }
};

// Itération 4

C.selectYear = function () {
  let selectYear = document.getElementById("select-year");
  let tab = []; // Déclaration de la variable tab ici

  selectYear.addEventListener("change", function () {
    let selectedValue = selectYear.value;
    V.uicalendar.clear();

    if (selectedValue === "all-year") {
      tab = M.getEvents("mmi1").concat(
        M.getEvents("mmi2"),
        M.getEvents("mmi3")
      );
    } else {
      tab = M.getEvents(selectedValue);
    }

    C.colorcalendar(tab);
    V.uicalendar.createEvents(tab);
  });
};

// Itération 5
C.filterCreateEventsByGroups = function (selectElement, year) {
  selectElement.addEventListener("change", function () {
    let selectedValue = this.value;
    let filteredEvents = [];
    if (selectedValue === "all-groups") {
      filteredEvents = M.getEvents(year);
      C.colorcalendar(filteredEvents);
      V.uicalendar.createEvents(filteredEvents);
    } else
      for (let ev of M.getEvents(year)) {
        if (ev.groups.includes(selectedValue)) {
          filteredEvents.push(ev);
        }
      }
    V.uicalendar.clear();
    C.colorcalendar(filteredEvents);
    V.uicalendar.createEvents(filteredEvents);
  });
};

// Itération 6
C.searchEvent = function () {
  function filterEvents(searchValue) {
    searchValue = searchValue.toLowerCase();
    let allEvents = M.getAllEvents();
    return allEvents.filter(
      (event) =>
        event.ressource.toLowerCase().includes(searchValue) ||
        event.enseignant.toLowerCase().includes(searchValue) ||
        event.location.toLowerCase().includes(searchValue)
    );
  }

  let searchBar = document.getElementById("search-barre");
  searchBar.addEventListener("keyup", function (event) {
    let searchValue = event.target.value;
    let filteredEvents = filterEvents(searchValue);
    V.uicalendar.clear();
    C.colorcalendar(filteredEvents);
    V.uicalendar.createEvents(filteredEvents);
  });
};

// Itération 7
C.searchEventall = function () {
  function filterEvents(searchValue) {
    let keywords = searchValue.toLowerCase().split(" ");
    let allEvents = M.getAllEvents();

    return allEvents.filter((event) =>
      keywords.every(
        (keyword) =>
          event.ressource.toLowerCase().includes(keyword) ||
          event.enseignant.toLowerCase().includes(keyword) ||
          event.location.toLowerCase().includes(keyword)
      )
    );
  }

  let searchBar = document.getElementById("search-barre");
  searchBar.addEventListener("keyup", function (event) {
    let searchValue = event.target.value;
    let filteredEvents = filterEvents(searchValue);
    V.uicalendar.clear();
    C.colorcalendar(filteredEvents);
    V.uicalendar.createEvents(filteredEvents);
  });
};

// Itération 8
C.ViewPer = function () {
  let selectView = document.getElementById("select-view");
  localStorage.setItem("view", selectView.value);
  selectView.addEventListener("change", function (event) {
    let selectedView = event.target.value;
    V.uicalendar.changeView(selectedView);
  });
};

// Itération 8 / Itération 10 avec localstorage

C.ViewPerLS = function () {
  let selectView = document.getElementById("select-view");
  if (localStorage.getItem("view")) {
    let storedView = localStorage.getItem("view");
    selectView.value = storedView;
    V.uicalendar.changeView(storedView);
  }
  selectView.addEventListener("change", function (event) {
    let selectedView = event.target.value;
    localStorage.setItem("view", selectedView);
    V.uicalendar.changeView(selectedView);
  });
};

// Itération 9
C.ControlViewMobile = function () {
  if (window.innerWidth < 768) {
    V.uicalendar.changeView("day");
  }
};

// Itération 10 / Itération qui est intégrée à l'itération 8 

C.init = function () {
  let all = M.getEvents("mmi1").concat(
    M.getEvents("mmi2").concat(M.getEvents("mmi3"))
  );
  let mmi1 = document.getElementById("select-group-mmi1");
  C.filterCreateEventsByGroups(mmi1, "mmi1");
  let mmi2 = document.getElementById("select-group-mmi2");
  C.filterCreateEventsByGroups(mmi2, "mmi2");
  let mmi3 = document.getElementById("select-group-mmi3");
  C.filterCreateEventsByGroups(mmi3, "mmi3");

  V.uicalendar.clear();
  C.colorcalendar(all);
  V.uicalendar.createEvents(all);
  C.selectYear();
  C.searchEventall();
  C.ViewPerLS();
  C.ControlViewMobile();
  console.log(all);
};

C.init();
