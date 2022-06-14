'use strict';

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const ringtone1 = new Audio("../ring/ringtone1.mp3");
let ringtone = true;
const stopBtn = document.querySelector(".stop");
const submitBtn = document.querySelector(".submit");
const snoozeBtn = document.querySelector(".snooze");

function app() {
  displayDateAndTime()
  showAlarm()
  removeAlarm()
  checkAlarm()
  stopAlarm()
}

function init() {
  if (localStorage.getItem("alarmHour") === null) {
    localStorage.setItem("alarmHour", null);
    localStorage.setItem("alarmMin", null);
    localStorage.setItem("alarmAmPm", null);
  }
}
init()

function snooze() {
  ringtone1.pause()
  let storageHour = localStorage.getItem("alarmHour")
  let storageMin = localStorage.getItem("alarmMin");
  document.querySelector(".reset").classList.add('nodisp')
  document.querySelector(".Alarm").classList.add('nodisp')
  let snoozeTime = storageMin
  if (snoozeTime = 55) {
    snoozeTime = (Number(storageMin) + 1) % 60
  } else {
    snoozeTime = storageMin
  }
  console.log(snoozeTime)

  if (storageMin > 54)[
    storageHour = localStorage.setItem("alarmHour", ((Number(storageHour)) + 1))
  ]
  if (snoozeTime < 10) {
    storageMin = localStorage.setItem("alarmMin", ("0" + snoozeTime))
    console.log("yo")
  } else {
    storageMin = localStorage.setItem("alarmMin", snoozeTime)
  }

}

snoozeBtn.addEventListener('click', () => {
  snooze()
})

function showAlarm() {
  if (localStorage.getItem("alarmMin") === "null") {
    document.querySelector(".reset").classList.add('nodisp')
    document.querySelector(".Alarm").classList.add('nodisp')
    document.querySelector(".activeAlarm").innerHTML = '';
  } else {
    let showHour = localStorage.getItem('alarmHour') % 12;
    if (showHour === 0) {
      showHour = 12;
    }
    document.querySelector(".activeAlarm").innerHTML = `
      <p class="alarmHour">${showHour}:</p>
                  <p class="alarmMin">${localStorage.getItem('alarmMin')}:</p>
                  <p class="alarmAmPm">${localStorage.getItem('alarmAmPm')}</p>
                  
      `;
    document.querySelector(".reset").classList.remove('nodisp')
    document.querySelector(".Alarm").classList.remove('nodisp')
  }
}

function checkAlarm() {
  let date = new Date();
  let hour = date.getHours() % 12;
  let min = date.getMinutes();
  if (hour === 0) {
    hour = 12;
  }
  let alarm = [
    localStorage.getItem("alarmHour"),
    localStorage.getItem("alarmMin"),
  ];
  if (alarm[0] !== null) {
    let alarmHour = alarm[0] % 12;
    if (alarmHour === 0) {
      alarmHour = 12;
    }

    let alarmMin = alarm[1];
    if (min < 10) {
      alarmMin = "0" + alarm[1] + alarmMin;
    } else {
      alarmMin = alarm[1];
    }
    let alarmAmPm = localStorage.getItem("alarmAmPm");

    if (
      hour == alarmHour &&
      min == alarm[1] &&
      document.querySelector(".ap").innerHTML === alarmAmPm
    ) {
      if (ringtone !== false) {
        ringtone1.play();
        stopBtn.classList.remove("nodisp");
        snoozeBtn.classList.remove("nodisp");
      } else {
        ringtone1.pause();
        stopBtn.classList.add("nodisp");
        snoozeBtn.classList.add("nodisp");
        localStorage.setItem("alarmHour", null);
        localStorage.setItem("alarmMin", null);
        localStorage.setItem("alarmAmPm", null);
        ringtone = true;
        snooze()
      }
    }

  }
}



function stopAlarm() {
  stopBtn.addEventListener("click", () => {
    localStorage.setItem("alarmHour", null);
    localStorage.setItem("alarmMin", null);
    localStorage.setItem("alarmAmPm", null);
    ringtone = true;
    ringtone1.pause();
    stopBtn.classList.add("nodisp");
    snoozeBtn.classList.add("nodisp");
  });

}

function addAlarm() {
  submitBtn.addEventListener("click", () => {
    let alarmTime = document.querySelector("#setAlarm").value.split(":");
    let storageHour = alarmTime[0];
    let storageMin = alarmTime[1];
    let storageAmPm;
    if (alarmTime[0] < 12) {
      storageAmPm = "AM";
    } else {
      storageAmPm = "PM";
    }
    ringtone = true;
    if (storageHour === undefined || storageMin === undefined) {
      document.querySelector('.error').innerHTML = "Invalid Time";
      document.querySelector('.error').classList.remove('nodisp');

    } else {
      document.querySelector('.error').classList.add('nodisp');
      localStorage.setItem("alarmHour", storageHour);
      localStorage.setItem("alarmMin", storageMin);
      localStorage.setItem("alarmAmPm", storageAmPm);
      document.querySelector("#setAlarm").value = '00:00';
      document.querySelector(".Alarm").classList.remove('nodisp')
      document.querySelector(".reset").classList.remove('nodisp')
    }
  });
}

function removeAlarm() {
  document.querySelector(".reset").addEventListener("click", () => {
    localStorage.setItem("alarmHour", null);
    localStorage.setItem("alarmMin", null);
    localStorage.setItem("alarmAmPm", null);
    ringtone = true;
    document.querySelector(".reset").classList.add('nodisp')
    document.querySelector(".Alarm").classList.add('nodisp')
  })

}

function displayDateAndTime() {
  let date = new Date();
  let hour = date.getHours() % 12;
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (hour === 0) {
    document.querySelector(".hour").innerHTML = "12:";
  } else {
    document.querySelector(".hour").innerHTML = hour + ":";
  }
  if (min < 10) {
    document.querySelector(".min").innerHTML = "0" + min + ":";
  } else {
    document.querySelector(".min").innerHTML = min + ":";
  }

  if (sec < 10) {
    document.querySelector(".sec").innerHTML = "0" + sec + ":";
  } else {
    document.querySelector(".sec").innerHTML = sec + ":";
  }

  if (date.getHours() < 12) {
    document.querySelector(".ap").innerHTML = "AM";
  } else {
    document.querySelector(".ap").innerHTML = "PM";
  }

  let day = date.getDay();
  let month = date.getMonth();
  let currentDate = date.getDate();
  let year = date.getFullYear();

  document.querySelector(".year").innerHTML = year + "/";

  document.querySelector(".month").innerHTML = month + "/";

  document.querySelector(".cdate").innerHTML = currentDate;

  document.querySelector(".day").innerHTML = weekday[day];
}

addAlarm()
setInterval(app, 100);