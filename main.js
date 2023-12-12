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

// sample events for testing
// let edt = [
//   {
//     id: '1',
//     calendarId: '1',
//     title: 'my event',
//     category: 'time',
//     start: '2023-12-11T08:30:00',
//     end: '2023-12-11T10:30:00',
//   },
//   {
//     id: '2',
//     calendarId: '1',
//     title: 'second event',
//     category: 'time',
//     start: '2023-12-13T14:00:00',
//     end: '2023-12-13T15:30:00',
//   },
// ]

// creating events in the calendar

// Itération 3

let colorMap = {
  'mmi1':{ CM : '#D31949', TD : '#f45464', TP : '#b02321', Autre : '#ffb84d'},
  'mmi2':{ CM : '#00bdae', TD : '#1194a7', TP : '#10686b', Autre : '#ffd699'},
  'mmi3':{ CM : '#e6dcd4', TD : '#bda18c', TP : '#3f352d', Autre : '#ffebcc'},
};

C.colorcalendar = function(calendar){
  for(let ev of calendar) {
  console.log(ev);
  let color = colorMap[ev.calendarId][ev.type];
  ev.backgroundColor = color;
  ev.borderColor = "trasparence";
}
};


// Itération 4

document.getElementById("select-year").addEventListener("change", function () {
  var selectedValue = this.value;
  let mmi1 = M.getEvents("mmi1");
  let mmi2 = M.getEvents("mmi2");
  let mmi3 = M.getEvents("mmi3");
  V.uicalendar.clear();
  if (selectedValue === "all-year") {
    V.uicalendar.clear();
    V.uicalendar.createEvents(mmi1);
    C.colorcalendar(mmi1);
    V.uicalendar.createEvents(mmi2);
    C.colorcalendar(mmi2);
    V.uicalendar.createEvents(mmi3);
    C.colorcalendar(mmi3);
  }
  if (selectedValue === "year1") {
    V.uicalendar.clear();
    V.uicalendar.createEvents(mmi1);
    C.colorcalendar(mmi1);
  } else if (selectedValue === "year2") {
    V.uicalendar.clear();
    V.uicalendar.createEvents(mmi2);
    C.colorcalendar(mmi2);
  } else if (selectedValue === "year3") {
    V.uicalendar.clear();
    V.uicalendar.createEvents(mmi3);
    C.colorcalendar(mmi3);
  }
});




// Itération 5

function FilterCreateEvents(selectElement, year) {
  selectElement.addEventListener("change", function () {
      let selectedValue = this.value;
      let filteredEvents = [];
      for (let ev of M.getEvents(year)) {
          if (ev.groups.includes(selectedValue)) {
              filteredEvents.push(ev);
          }
      }
      V.uicalendar.clear();
      V.uicalendar.createEvents(filteredEvents);
  });
}

let mmi1 = document.getElementById("select-group-mmi1");
FilterCreateEvents(mmi1, "mmi1");
let mmi2 = document.getElementById("select-group-mmi2");
FilterCreateEvents(mmi2, "mmi2");
let mmi3 = document.getElementById("select-group-mmi3");
FilterCreateEvents(mmi3, "mmi3");



C.init = function () {
  let all = M.getAllEvents()
  C.colorcalendar(all);
  V.uicalendar.createEvents(all);
};

C.init();



