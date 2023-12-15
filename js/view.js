import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
});

// Itération 2 

function moveToNextOrPrevRange(indice) {
  if (indice === -1) {
    V.uicalendar.prev();
  } else if (indice === 1) {
    V.uicalendar.next();
  }
}

function moveToToday() {
  V.uicalendar.today();
}

V.coloradd = function() {
  V.uicalendar.setCalendarColor('mmi1', {
    color: '#000000',
    backgroundColor: '#f45464',
    borderColor: 'trasparence',
  });
 
  V.uicalendar.setCalendarColor('mmi2', {
    color: '#000000',
    backgroundColor: '#1194a7',
    borderColor: 'trasparence',
  });
 
  V.uicalendar.setCalendarColor('mmi3', {
    color: '#000000',
    backgroundColor: '#691d69',
    borderColor: 'trasparence',
  });
}

// Itération 3
V.colorcalendar = function (calendar) {
  let colorMap = {
    mmi1: { CM: "#87CEFA", TD: "#26619C", TP: "#6495ED", Autre: "#4682B4" },
    mmi2: { CM: "#FFA07A", TD: "#FA8072", TP: "#E9967A", Autre: "#CD5C5C" },
    mmi3: { CM: "#e6dcd4", TD: "#bda18c", TP: "#6f5e4a", Autre: "#ffebcc" },
  };
  for (let ev of calendar) {
    let color = colorMap[ev.calendarId][ev.type];
    ev.backgroundColor = color;
    ev.borderColor = "trasparence";
  }
};

// Itération 5

V.filtergroups = function() {

let selectYear = document.getElementById('select-year');
let selectGroupMMI1 = document.getElementById('select-group-mmi1');
let selectGroupMMI2 = document.getElementById('select-group-mmi2');
let selectGroupMMI3 = document.getElementById('select-group-mmi3');
    let selectedYear = selectYear.value;
 
     selectGroupMMI1.style.display = 'none';
     selectGroupMMI2.style.display = 'none';
     selectGroupMMI3.style.display = 'none';
 
     if (selectedYear === 'mmi1') {
         selectGroupMMI1.style.display = 'block';
     } else if (selectedYear === 'mmi2') {
         selectGroupMMI2.style.display = 'block';
     } else if (selectedYear === 'mmi3') {
         selectGroupMMI3.style.display = 'block';
     }
}

// Itération 8
V.ViewPer = function () {
  let selectView = document.getElementById("select-view");
  localStorage.setItem("view", selectView.value);
  selectView.addEventListener("change", function (event) {
    let selectedView = event.target.value;
    V.uicalendar.changeView(selectedView);
  });
};
// Itération 8 / Itération 10 avec localstorage
V.ViewPerLS = function () {
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
V.ControlViewMobile = function () {
  if (window.innerWidth < 768) {
    V.uicalendar.changeView("day");
  }
};


document.querySelector("#prev").addEventListener("click", () => moveToNextOrPrevRange(-1));
document.querySelector("#now").addEventListener("click", () => moveToToday());
document.querySelector("#next").addEventListener("click", () => moveToNextOrPrevRange(1));



export { V };


