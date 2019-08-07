var end;

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
    counter.style.borderColor = getColor(mins * 60 + secs);
}

function getCounterEl() {
    let counter = document.getElementById('counter');
    if (counter) {
        return counter;
    }
    counter = document.createElement('div');
    counter.style.position = 'absolute';
    counter.style.left = 'calc(100% - 10px)';
    counter.style.top = '55px';
    counter.style.width = '50px';
    counter.style.textAlign = 'right';
    counter.style.border = '2px solid grey';
    counter.style.borderRadius = '5px';
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

function getColor(seconds) {
    const total = 45 * 60;
    const percent = seconds / total;
    const inverse = 1 - percent;
    let red = 0;
    let green = 0;
    if (inverse < 0.5) {
        red = green = (inverse * 255) * 2;
    } else {
        red = 255;
        green = 255 * (percent * 2);
    }
    let ret = `rgb(${red.toFixed(2)}, ${green.toFixed(2)}, 0)`;
    return ret;
}

