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


C.init = function (){
   V.uicalendar.createEvents(M.getEvents("mmi1"));
   V.uicalendar.createEvents(M.getEvents("mmi2"));
   V.uicalendar.createEvents(M.getEvents("mmi3"));
   V.coloradd();
}


 C.init()



for(let ev of M.getEvents("mmi1")){
   if(ev.title.includes("CM")){
   let changes = {
      backgroundColor : "#D31949"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
} if(ev.title.includes("TD")){
   let changes = {
      backgroundColor : "#f45464"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
} if(ev.title.includes("TP")){
   let changes = {
      backgroundColor : "#b02321"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
}
}

for(let ev of M.getEvents("mmi2")){
   if(ev.title.includes("CM")){
   let changes = {
      backgroundColor : "#00bdae"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
} if(ev.title.includes("TD")){
   let changes = {
      backgroundColor : "#1194a7"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
} if(ev.title.includes("TP")){
   let changes = {
      backgroundColor : "#10686b"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
}
}


for(let ev of M.getEvents("mmi2")){
   if(ev.title.includes("CM")){
   let changes = {
      backgroundColor : "#e6dcd4"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
} if(ev.title.includes("TD")){
   let changes = {
      backgroundColor : "#bda18c"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
} if(ev.title.includes("TP")){
   let changes = {
      backgroundColor : "#3f352d"
   };
   V.uicalendar.updateEvent(ev.id, ev.calendarId, changes);
}
}

