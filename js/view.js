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


document.querySelector("#prev").addEventListener("click", () => moveToNextOrPrevRange(-1));
document.querySelector("#now").addEventListener("click", () => moveToToday());
document.querySelector("#next").addEventListener("click", () => moveToNextOrPrevRange(1));


export { V };


