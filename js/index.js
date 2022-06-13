const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toggleMonth = false;
const ringtone1 = new Audio('../ring/ringtone1.mp3')
let ringtone = true;
const stopBtn = document.querySelector('.stop')
const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener(('click'), () => {
    alarmTime = document.querySelector('#setAlarm').value.split(':')
    alarmHour = alarmTime[0]
    alarmMin = alarmTime[1]
    if (alarmTime[0] < 12) {
        ampm = "AM"
    } else {
        ampm = "PM"
    }
    ringtone = true;
    console.log(alarmHour, alarmMin)
    localStorage.setItem("alarmHour", alarmHour)
    localStorage.setItem("alarmMin", alarmMin)
    localStorage.setItem("alarmAmPm", ampm)
})


function displayDateAndTime() {

    let date = new Date()
    let hour = date.getHours() % 12;
    let min = date.getMinutes()
    let sec = date.getSeconds()
    if (hour === 0) {
        document.querySelector('.hour').innerHTML = "12:";
    } else {
        document.querySelector('.hour').innerHTML = hour + ":";
    }
    if (min < 10) {
        document.querySelector('.min').innerHTML = "0" + min + ":";
    } else {
        document.querySelector('.min').innerHTML = min + ":";
    }


    if (sec < 10) {
        document.querySelector('.sec').innerHTML = "0" + sec + ":";
    } else {
        document.querySelector('.sec').innerHTML = sec + ":";
    }

    if (date < 12) {
        document.querySelector('.ap').innerHTML = "AM"
    } else {
        document.querySelector('.ap').innerHTML = "PM"
    }

    let day = date.getDay();
    let month = date.getMonth();
    let currentDate = date.getDate()
    let year = date.getFullYear()

    document.querySelector('.year').innerHTML = year + "/";
    if (toggleMonth === false) {
        document.querySelector('.month').innerHTML = month + "/";
    }
    document.querySelector('.cdate').innerHTML = currentDate;

    document.querySelector('.day').innerHTML = weekday[day];




    let alarm = [localStorage.getItem("alarmHour"), localStorage.getItem("alarmMin")]
    if (alarm[0] !== null) {

        alarmHour = alarm[0] % 12;
        if (min < 10) {
            alarmMin = "0" + alarm[1] +
                alarmMin;
        } else {
            alarmMin = alarm[1]
        }
        alarmAmPm = localStorage.getItem("alarmAmPm")

        if (hour == alarmHour && min == alarm[1] && (document.querySelector('.ap').innerHTML === alarmAmPm)) {

            if (ringtone !== false) {
                ringtone1.play()
                stopBtn.classList.remove("nodisp")
            } else {
                ringtone1.pause()
            }
            stopBtn.addEventListener('click', () => {
                ringtone1.pause()
                stopBtn.classList.add("nodisp")
                localStorage.setItem("alarmHour", null)
                localStorage.setItem("alarmMin", null)
                localStorage.setItem("alarmAmPm", null)
                ringtone = true;
            })
        } else {            
                ringtone1.pause()            
            stopBtn.classList.add("nodisp")
            if (localStorage.getItem("alarmHour" !== null)) {
                localStorage.setItem("alarmHour", null)
                localStorage.setItem("alarmMin", null)
                localStorage.setItem("alarmAmPm", null)
                ringtone = true;
            }
        }
    }
}




setInterval(displayDateAndTime, 1)