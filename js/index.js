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

submitBtn.addEventListener("click", () => {
  alarmTime = document.querySelector("#setAlarm").value.split(":");
  alarmHour = alarmTime[0];
  alarmMin = alarmTime[1];
  if (alarmTime[0] < 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }
  ringtone = true;
  if (alarmHour === undefined || alarmMin === undefined) {
document.querySelector('.error').classList.remove('nodisp');
document.querySelector('.error').innerHTML= "Invalid Time";

} else {
    document.querySelector('.error').classList.add('nodisp');
    localStorage.setItem("alarmHour", alarmHour);
    localStorage.setItem("alarmMin", alarmMin);
    localStorage.setItem("alarmAmPm", ampm);
    showActive = true;
    document.querySelector("#setAlarm").value = '00:00';
  }
});




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

  if (date < 12) {
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

  let alarm = [
    localStorage.getItem("alarmHour"),
    localStorage.getItem("alarmMin"),
  ];
  if (alarm[0] !== null) {
    alarmHour = alarm[0] % 12;
    if (alarmHour === 0 ){
      alarmHour= 12;
    }

    alarmMin = alarm[1];
    if (min < 10) {
      alarmMin = "0" + alarm[1] + alarmMin;
    } else {
      alarmMin = alarm[1];
    }
    alarmAmPm = localStorage.getItem("alarmAmPm");

    if (
      hour == alarmHour &&
      min == alarm[1] &&
      document.querySelector(".ap").innerHTML === alarmAmPm
    ) {
      if (ringtone !== false) {
        ringtone1.play();
        stopBtn.classList.remove("nodisp");
      } else {
        ringtone1.pause();
      }
      stopBtn.addEventListener("click", () => {
        ringtone1.pause();
        stopBtn.classList.add("nodisp");
        localStorage.setItem("alarmHour", null);
        localStorage.setItem("alarmMin", null);
        localStorage.setItem("alarmAmPm", null);
        ringtone = true;
      });
    } else {
      ringtone1.pause();
      stopBtn.classList.add("nodisp");
      if (localStorage.getItem("alarmHour" !== null)) {
        localStorage.setItem("alarmHour", null);
        localStorage.setItem("alarmMin", null);
        localStorage.setItem("alarmAmPm", null);
        ringtone = true;
      }
    }
  }

  if (localStorage.getItem("alarmHour") === "null") {
    document.querySelector(".reset").classList.add('nodisp')
    document.querySelector(".activeAlarm").innerHTML = '';
  } else {
    let showHour = localStorage.getItem('alarmHour') % 12;
    if (showHour === 0 ){
      showHour= 12;
    }
    document.querySelector(".activeAlarm").innerHTML = `
      <p class="alarmHour">${showHour}:</p>
                  <p class="alarmMin">${localStorage.getItem('alarmMin')}:</p>
                  <p class="alarmAmPm">${localStorage.getItem('alarmAmPm')}</p>
                  
      `;
    document.querySelector(".reset").classList.remove('nodisp')
  }

  document.querySelector(".reset").addEventListener("click", () => {
    localStorage.setItem("alarmHour", null);
    localStorage.setItem("alarmMin", null);
    localStorage.setItem("alarmAmPm", null);
    ringtone = true;
  })




}

setInterval(displayDateAndTime, 100);