function displayDateAndTime() {

    const date = new Date()
    const hour = date.getHours() % 12;
    const min = date.getMinutes()
    const sec = date.getSeconds()
    if (hour === 0) {
        document.querySelector('.hour').innerHTML = "12:";
    } else {
        document.querySelector('.hour').innerHTML = hour + ":";
    }
    document.querySelector('.min').innerHTML = min + ":";
    document.querySelector('.sec').innerHTML = sec;
    if (date < 12){
        document.querySelector('.ap') .innerHTML = "AM"
    } else {
        document.querySelector('.ap') .innerHTML = "PM"
    }
    
}

setInterval(displayDateAndTime, 100)