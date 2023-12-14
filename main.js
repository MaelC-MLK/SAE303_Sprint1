import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

await M.init();

// Itération 4 / Itération 10 avec localstorage
C.selectYear = function () {
  let selectYear = document.getElementById("select-year");
  let tab = [];
  selectYear.addEventListener("change", function () {
    let selectedValue = selectYear.value;
    V.uicalendar.clear();
    if (selectedValue === "all-year") {
      let all = M.getEvents("mmi1").concat(
        M.getEvents("mmi2").concat(M.getEvents("mmi3"))
      );
      tab = all;
    } else {
      tab = M.getEvents(selectedValue);
    }
    V.colorcalendar(tab);
    V.uicalendar.createEvents(tab);
    localStorage.setItem("year", selectedValue);
  });
};
// Itération 5 / Itération 10 avec localstorage
C.filterCreateEventsByGroups = function (selectElement, year) {
  selectElement.addEventListener("change", function () {
    let selectedValue = this.value;
    let filteredEvents = [];
    if (selectedValue === "all-groups") {
      filteredEvents = M.getEvents(year);
    } else {
      filteredEvents = M.getEvents(year).filter((ev) =>
        ev.groups.includes(selectedValue)
      );
    }
    V.uicalendar.clear();
    V.colorcalendar(filteredEvents);
    V.uicalendar.createEvents(filteredEvents);
    localStorage.setItem("group", selectedValue);
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
    V.colorcalendar(filteredEvents);
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
    V.colorcalendar(filteredEvents);
    V.uicalendar.createEvents(filteredEvents);
  });
};

// Itération 10 / Itération qui est intégrée à l'itération 8 et l'itération 4 et l'itération 5
C.ControlViewStorage = function () {
  let selectYear = document.getElementById("select-year");
  V.filtergroups();
  selectYear.addEventListener("change", function () {
    V.filtergroups();
  });

  let savedYear = localStorage.getItem("year");
  if (savedYear) {
    let selectYear = document.getElementById("select-year");
    if (selectYear) {
      selectYear.value = savedYear;
      selectYear.dispatchEvent(new Event("change"));
    }
  }
  if (localStorage.getItem("group") && localStorage.getItem("year")) {
    let savedYear = localStorage.getItem("year");
    let selectGroup = document.getElementById("select-group-" + savedYear);
    if (selectGroup) {
      selectGroup.value = localStorage.getItem("group");
      selectGroup.dispatchEvent(new Event("change"));
    }
  }
};

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
  V.colorcalendar(all);
  V.uicalendar.createEvents(all);
  V.ViewPerLS();
  V.ControlViewMobile();
  C.selectYear();
  C.searchEventall();
  C.ControlViewStorage();
};
C.init();

window.C = C;