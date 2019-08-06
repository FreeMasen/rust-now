let end;
let sequence = [];
window.addEventListener('keyup', ev => {
    if (ev.altKey && ev.key === 'g') {
        start();
    } 
});
(function() {
    let maybeSaved = localStorage.getItem('end-date');
    if (maybeSaved) {
        end = new Date(maybeSaved);
        tick();
    }
})()
function start() {
    let now = new Date();
    let mins = now.getMinutes();
    now.setMinutes(mins + 45);
    end = now;
    localStorage.setItem('end-date', end);
    tick();
}
function tick() {
    let now = new Date();
    if (now >= end) {
        return;
    }
    let diff = end - now;
    let secs = Math.floor(diff / 1000);
    let mins = Math.floor(secs / 60);
    update(mins, secs - (mins * 60))
    setTimeout(tick, 1000);
}

function update(mins, secs) {
    let counter = getCounterEl();
    let s = `0${secs}`.substr(-2);
    counter.innerHTML = `${mins}:${s}`;
    if (mins < 10) {
        counter.style.borderColor = 'red';
    } else if (mins < 20) {
        counter.style.borderColor = 'rgba(255,0,0,0.5)';
    } else if (mins < 30) {
        counter.style.borderColor = 'orange';
    } else if (mins < 40) {
        counter.style.borderColor = 'black';
    }
}

function getCounterEl() {
    let counter = document.getElementById('counter');
    if (counter) {
        return counter;
    }
    counter = document.createElement('div');
    counter.style.position = 'absolute';
    counter.style.left = 'calc(100% - 10px)';
    counter.style.top = '50px';
    counter.style.width = '50px';
    counter.style.textAlign = 'right';
    counter.style.border = '2px solid grey';
    counter.setAttribute('id', 'counter');
    counter.addEventListener('mouseenter', () => {
        counter.style.left = 'calc(100% - 50px)';
        counter.style.textAlign = 'left';
    });
    counter.addEventListener('mouseleave', () => {
        counter.style.left = 'calc(100% - 10px)';
        counter.style.textAlign = 'right';
    });
    document.body.appendChild(counter);
    return counter;
}