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

// Itération 5

let selectYear = document.getElementById('select-year');
let selectGroupMMI1 = document.getElementById('select-group-mmi1');
let selectGroupMMI2 = document.getElementById('select-group-mmi2');
let selectGroupMMI3 = document.getElementById('select-group-mmi3');
 selectYear.addEventListener('change', function() {
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
 });


document.querySelector("#prev").addEventListener("click", () => moveToNextOrPrevRange(-1));
document.querySelector("#now").addEventListener("click", () => moveToToday());
document.querySelector("#next").addEventListener("click", () => moveToNextOrPrevRange(1));



export { V };


