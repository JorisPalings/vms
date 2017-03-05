import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'clock',
    template: `<div class="clock" id="clock">
                </div>`,
    styleUrls: ['../dist/assets/css/clock.css']
})

export class ClockComponent implements OnInit {
    ngOnInit() {
        clockFunction();
    }
}

function clockFunction() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m;
    var t = setTimeout(clockFunction, 500);
}
function checkTime(i) {
    if (i < 10)
        i = "0" + i;  // add zero in front of numbers < 10
    return i;
}
