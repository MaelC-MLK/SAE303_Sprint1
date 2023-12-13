import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};
/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/

// loadind data (and wait for it !)
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
  let tab = [];
  let annee = document.getElementById("select-year");
  annee.addEventListener("change", function () {
    var selectedValue = annee.value;
    V.uicalendar.clear();
    if (selectedValue === "all-year") {
      V.uicalendar.clear();
      tab = M.getEvents("mmi1").concat(
        M.getEvents("mmi2").concat(M.getEvents("mmi3"))
      );
      C.colorcalendar(tab);
      V.uicalendar.createEvents(tab);
    } else if (selectedValue === "year1") {
      V.uicalendar.clear();
      tab = M.getEvents("mmi1");
      C.colorcalendar(tab);
      V.uicalendar.createEvents(tab);
    } else if (selectedValue === "year2") {
      V.uicalendar.clear();
      tab = M.getEvents("mmi2");
      C.colorcalendar(tab);
      V.uicalendar.createEvents(tab);
    } else if (selectedValue === "year3") {
      V.uicalendar.clear();
      tab = M.getEvents("mmi3");
      C.colorcalendar(tab);
      V.uicalendar.createEvents(tab);
    }
  });
};

// Itération 5
C.filterCreateEventsByGroups = function (selectElement, year) {
  selectElement.addEventListener("change", function () {
    let selectedValue = this.value;
    let filteredEvents = [];
    if(selectedValue === "all-groups") {
      filteredEvents = M.getEvents(year);
      C.colorcalendar(filteredEvents);
      V.uicalendar.createEvents(filteredEvents);
    }else 
    for (let ev of M.getEvents(year)) {
      if (ev.groups.includes(selectedValue)) {
        filteredEvents.push(ev);
      }
    }
    V.uicalendar.clear();
    C.colorcalendar(filteredEvents);
    V.uicalendar.createEvents(filteredEvents);
  });
}

// Itération 6
C.searchEvent = function () {

function filterEvents(searchValue) {
  searchValue = searchValue.toLowerCase();
  let allEvents = M.getAllEvents();
  return allEvents.filter(event =>
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
}

// Itération 7
C.searchEventall = function () {

  function filterEvents(searchValue) {
      let keywords = searchValue.toLowerCase().split(' ');
      let allEvents = M.getAllEvents();

      return allEvents.filter(event =>
          keywords.every(keyword =>
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

}

// Itération 8
C.ViewPer = function () {
let selectView = document.getElementById("select-view");
selectView.addEventListener("change", function(event) {
    let selectedView = event.target.value;
    V.uicalendar.changeView(selectedView);
});
}

// Itération 9
C.ControlViewMobile = function () {
if(window.innerWidth < 768) {
  V.uicalendar.changeView("day");}
}

C.init = function () {
  C.selectYear();
  let mmi1 = document.getElementById("select-group-mmi1");
  C.filterCreateEventsByGroups(mmi1, "mmi1");
  let mmi2 = document.getElementById("select-group-mmi2");
  C.filterCreateEventsByGroups(mmi2, "mmi2");
  let mmi3 = document.getElementById("select-group-mmi3");
  C.filterCreateEventsByGroups(mmi3, "mmi3");
  V.uicalendar.clear();
  let all = M.getEvents("mmi1").concat(
    M.getEvents("mmi2").concat(M.getEvents("mmi3"))
  );
  C.colorcalendar(all);
  V.uicalendar.createEvents(all);
  console.log(all);
  C.searchEventall();
  C.ViewPer();
  C.ControlViewMobile();
};

C.init();
  