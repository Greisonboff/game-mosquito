//config css
device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        videoId: '4Ti04PYb1rY',
    });
}

//video id
videoIdGroup = ['LtKQbgOR3Ko', 'SkwVvdf2F_Q', 'Ghpx-H_cA9I', '4Ti04PYb1rY'];
posisionSound = -1;

videoId = (e) => {
    if (e == 'next') {
        posisionSound++;
        if (posisionSound == 4) {
            posisionSound = 0;
        }
        player.loadVideoById({ videoId: videoIdGroup[posisionSound] });
    } else {
        posisionSound--;
        if (posisionSound == -1) {
            posisionSound = 3;
        }
        player.loadVideoById({ videoId: videoIdGroup[posisionSound] });
    }
}

activeSound = () => {
    if (player != undefined && typeof player == 'object' && typeof player.playVideo == 'function') {
        setTimeout(() => {
            //player.seekTo(1);
            player.setVolume(30);
            player.playVideo();
        }, 300);
    } else {
        setTimeout(() => {
            activeSound();
        }, 300);
    }
}
activeSound();

//volume config
volumeActive = (e) => {
    if (document.querySelectorAll('.activeVolume').length > 0) {
        document.querySelectorAll('.activeVolume').forEach(function (e) {
            e.classList.remove('activeVolume');
        })
    }
    player.setVolume(parseInt(`${e.getAttribute('data-size')}0`));
    document.querySelectorAll('[data-size]').forEach(function (a) {
        if (parseInt(e.getAttribute('data-size')) > parseInt(a.getAttribute('data-size'))) {
            a.classList.add('activeVolume');
        } else {
            a.style.backgroundColor = 'rgb(0 0 0 / 30%)';
        }
    });
    e.classList.add('activeVolume');
}

for (e of document.querySelectorAll('.volume')) {
    e.addEventListener('click', function () {
        volumeActive(this);
    })
}

// up - down sound
upDownSound = (e) => {
    if (e == 'up') {
        if (document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length] != undefined) {
            document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length].classList.add('activeVolume');
            player.setVolume(`${document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length - 1].getAttribute('data-size')}0`);
        }
    }
    if (e == 'down') {
        if (document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length - 1] != undefined) {
            document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length - 1].classList.remove('activeVolume');
            if (document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length - 1] != undefined) {
                player.setVolume(`${document.querySelectorAll('.volume')[document.querySelectorAll('.volume.activeVolume').length - 1].getAttribute('data-size')}0`);
            } else {
                document.querySelectorAll('.volume')[0].classList.remove('activeVolume');
                player.setVolume(0);
            }
        }
    }
}

if (device == 'mobile') {
    document.querySelector('#containerMain').style.margin = 0;

    fullScreenMobile = () => {
        document.documentElement.webkitRequestFullScreen();
        document.body.style.zoom = .7;
        document.querySelector('#loadin').style.display = 'none';
    }

    hideComunicatin = ()=>{
        setTimeout(() => {
            document.querySelector('#footerComunication').style.display = 'none';
        }, 10000);
    }

    if (window.screen.orientation.angle == 0) {
        document.querySelector('#containerMain').classList.add('mobiliCssContainerMain');
        document.querySelector('#container').classList.add('mobiliCssContainer');
        document.querySelector('#footerComunication').style.display = 'block';
        hideComunicatin();
    } else {
        document.body.style.zoom = .7;
        document.querySelector('footer p').style.fontSize = '2em';
    }
    document.body.style.position = 'fixed';

    window.screen.orientation.addEventListener('change', function () {
        if (window.screen.orientation.angle == 90 || window.screen.orientation.angle != 0) {
            document.querySelector('#containerMain').classList.remove('mobiliCssContainerMain');
            document.querySelector('#container').classList.remove('mobiliCssContainer');
            document.body.style.zoom = .7;
            document.querySelector('footer p').style.fontSize = '2em';
            document.querySelector('#footerComunication').style.display = 'none';

        } else {
            document.querySelector('#container').classList.add('mobiliCssContainer');
            document.querySelector('#containerMain').classList.add('mobiliCssContainerMain');
            document.body.style.zoom = 1;
            document.querySelector('footer p').style.fontSize = '2.5em';
            document.querySelector('#footerComunication').style.display = 'block';
            hideComunicatin();
        }

    })
}

mosquitoPosi = 0;
countCreate = 0;

createFly = (a, b) => {
    fly = document.createElement('img');
    countCreate++;
    if (countCreate == 10) {
        fly.setAttribute('src', 'img/mosquito-especial1.png');
        fly.setAttribute('class', 'yellow');
        fly.setAttribute('onclick', 'addSpots(5),removeFly(this)');
    } else if (countCreate == 20) {
        fly.setAttribute('src', 'img/mosquito-especial2.png');
        fly.setAttribute('class', 'blue');
        fly.setAttribute('onclick', 'addSpots(10),removeFly(this)');
    } else if (countCreate == 35) {
        fly.setAttribute('src', 'img/abelha.png');
        fly.setAttribute('class', 'yellow bee');
        fly.setAttribute('onclick', 'removeSpots(),removeFly(this)');
    } else if (countCreate == 50) {
        fly.setAttribute('src', 'img/mosquito-alpha.png');
        fly.setAttribute('onclick', 'alphaAtac(),removeFly(this)');
        countCreate = 0;
    } else if (mosquitoPosi % 2 == 0) {
        fly.setAttribute('src', 'img/mosquito-bravo.png');
        fly.setAttribute('onclick', 'removeFly(this)');
    } else {
        fly.setAttribute('src', 'img/mosquito-bravo1.png');
        fly.setAttribute('onclick', 'removeFly(this)');
    }
    if (fly.getAttribute('class') == 'yellow bee') {
        fly.setAttribute('id', 'bee');
    } else {
        fly.setAttribute('id', 'fly');
    }
    fly.setAttribute('style', 'height: 55px; position: absolute; left: ' + a + 'px; top: ' + b + 'px;');
    document.querySelector('#container').append(fly);
    if (fly.getAttribute('class') == 'yellow bee') {
        timeRemoveBee();
    }
    mosquitoPosi++;
}

pauseGame = (e) => {
    if (pause == false) {
        pause = true;
        e.innerText = 'Play'
    } else {
        pause = false;
        e.innerText = 'Pause'
        timer();
    }
}

alphaAtac = () => {
    upTimerAlpha(10);
    for (e of document.querySelectorAll('#fly')) {
        if (e.classList.value == '') {
            e.setAttribute('src', 'img/gosma.png');
            e.setAttribute('class', 'gosma');
        } else if (e.classList.value == 'yellow') {
            e.setAttribute('src', 'img/gosma-amarelo.png');
            e.setAttribute('class', 'gosma');
        } else {
            e.setAttribute('src', 'img/gosma-azul.png');
            e.setAttribute('class', 'gosma');
        }
        setTimeout(() => {
            document.querySelectorAll('.gosma').forEach(e => {
                e.remove();
            });
        }, 200);
    }
}

validStart = () => {
    if (document.querySelector('.userName').value != "") {
        run(active = true, pause = false), timer(true), hidenStart(), backgroundImplement();
        document.querySelector('#userLevel').textContent = '1';
        localStorage.setItem('name', document.querySelector('.userName').value);
    }
}

removeFlyAll = () => {
    for (e of document.querySelectorAll('#fly')) {
        e.remove();
    }
    for (e of document.querySelectorAll('#bee')) {
        e.remove();
    }
}

timeRemoveBee = () => {
    setTimeout(() => {
        for (e of document.querySelectorAll('#bee')) {
            e.remove();
            spots = spots + 10;
        }
    }, 5000);
}

countFly = () => {
    return document.querySelectorAll('#fly').length;
}

resetElements = () => {
    pause = true;
    active = false;
    removeFlyAll();
    document.querySelector('#timerA').textContent = '01';
    document.querySelector('#timerB').textContent = '00';
    timeRun = 1000;
    timerContrl = 2000;
    cont = 0;
    spots = 0;
    levelCount = 1;
    document.querySelector('#cont').textContent = '0';
    document.querySelector('#userLevel').textContent = '0';
}

gameOver = () => {
    pause = true;
    active = false;
    document.querySelector('#container').style.backgroundImage = "url('img/game-over-personalizado.png')";
    removeFlyAll();
    document.querySelector('#timerA').textContent = '01';
    document.querySelector('#timerB').textContent = '00';
    timeRun = 1000;
    timerContrl = 2000;
    cont = 0;
    saveUserRecords();
    upRecords(spots, levelCount);
    spots = 0;
    levelCount = 1;
    document.querySelector('#userLevel').innerText = levelCount;
    document.querySelector('#cont').textContent = '0';

}

backgroundImplementCont = 0;

backgroundImplement = () => {
    backgroundImplementCont++;
    if (backgroundImplementCont == 6) {
        backgroundImplementCont = 1;
    }
    document.querySelector('#container').style.backgroundImage = "url(img/paisagem" + backgroundImplementCont + ".png)";
}

positionTop = () => {
    return Math.floor(Math.random() * (parseInt(document.querySelector('#container').getBoundingClientRect().height.toFixed(0)) - 60)) + parseInt(document.querySelector('#container').getBoundingClientRect().top.toFixed(0));
}

positionLeft = () => {
    return Math.floor(Math.random() * (parseInt(document.querySelector('#container').getBoundingClientRect().width.toFixed(0)) - 60)) + parseInt(document.querySelector('#container').getBoundingClientRect().left.toFixed(0));
}

upTimer = (a) => {
    newTimer('upTimer', a);
}

upTimerAlpha = (a) => {
    newTimer('upTimer', a);
}

dowTimer = (e) => {
    newTimer('dowTimer', e);
}

cont = 0;
spots = 0;

removeFly = (e) => {
    if (e.classList.value == '') {
        e.setAttribute('src', 'img/gosma.png');
    } else if (e.classList.value == 'yellow') {
        e.setAttribute('src', 'img/gosma-amarelo.png');
    } else {
        e.setAttribute('src', 'img/gosma-azul.png');
    }
    setTimeout(() => {
        e.remove();
    }, 200);
    cont++;
    spots++;
    ValidLevelUp();
    document.querySelector('#cont').textContent = spots;
    upTimer(1);
}

addSpots = (e) => {
    spots = spots + e;
}

removeSpots = () => {
    spots = spots - 11;
    newTimer('dowTimer', 10);
}

timeRun = 1000;
run = () => {
    if (active == true) {
        setTimeout(() => {
            //validate game over
            if (active == true && pause == false && countFly() < 75) {
                a = positionLeft();
                b = positionTop();
                createFly(a, b);
            } else if (countFly() == 75) {
                gameOver();
            }
            setTimeout(() => {
                run();
            }, timeRun);
        }, timeRun);
    }
}
pause = false;
timerContrl = 2000;

timer = (e) => {
    if (pause == false || e == true) {
        setTimeout(() => {
            if (document.querySelector('#container').style.backgroundImage != 'url("img/game-over-personalizado.png")') {
                newTimer('default', '');
                timer();
            }
        }, timerContrl);
    }
}

hidenStart = () => {
    document.querySelector('#startPage').style.display = "none";
}

showStart = () => {
    document.querySelector('#startPage').style.display = "block";
    document.querySelector('#container').style.backgroundImage = '';
}

//valid level up
levelCount = 1;
ValidLevelUp = () => {
    if (cont > 20) {
        levelCount++;
        document.querySelector('#userLevel').innerText = levelCount;
        dowTimer(countFly());
        removeFlyAll();
        document.querySelector('#container').style.backgroundImage = "url('img/level-up.png')";
        document.querySelector('#container').style.backgroundColor = 'red';
        timeRun = timeRun - 50;
        timerContrl = timerContrl - 50;
        cont = 0;
        pause = true;
        setTimeout(() => {
            backgroundImplement();
            document.querySelector('#container').style.backgroundColor = 'white';
            pause = false;
            timer();
        }, 4000);
    }
}

upRecords = (a, b) => {
    saveUserRecords();
    e = document.querySelectorAll('#records span');
    if (b > parseInt(e[0].textContent)) {
        document.querySelectorAll('#records span')[0].textContent = b;
    }
    if (a > parseInt(e[1].textContent)) {
        document.querySelectorAll('#records span')[1].textContent = a;
    }
}

saveUserRecords = () => {
    localStorage.setItem('name', document.querySelector('.userName').value);
    localStorage.setItem('level', document.querySelectorAll('#records span')[0].textContent);
    localStorage.setItem('points', document.querySelectorAll('#records span')[1].textContent);
}

getUserInfos = () => {
    a = localStorage.getItem('name');
    if (a != null) {
        document.querySelector('.userName').value = a;
    }
    b = localStorage.getItem('level');
    if (b != null) {
        document.querySelectorAll('#records span')[0].textContent = b;
    }
    c = localStorage.getItem('points');
    if (c != null) {
        document.querySelectorAll('#records span')[1].textContent = c;
    }
}
getUserInfos();

newTimer = (intaraction, val) => {
    a = () => { return parseInt(document.querySelector('#timerA').textContent) * 60 };
    b = () => { return parseInt(document.querySelector('#timerB').textContent) };
    e = a() + b();
    switch (intaraction) {
        case 'default':
            e = e - 1;
            break;

        case 'dowTimer':
            e = e - val;
            break;

        case 'upTimer':
            e = e + val;
            break;

        default:
            break;
    }
    if (e == 0) {
        gameOver();
    } else {
        if (parseInt(e / 60) < 10) {
            document.querySelector('#timerA').textContent = `0${parseInt(e / 60)}`;
        } else {
            document.querySelector('#timerA').textContent = parseInt(e / 60);
        }
        if ((e % 60) < 10) {
            document.querySelector('#timerB').textContent = `0${e % 60}`;
        } else {
            document.querySelector('#timerB').textContent = e % 60;
        }
    }
}

//rules page active
rulesPageInteraction = (e) => {
    if (e == 'on') {
        hidenStart();
        document.querySelector('#rulesPage').style.display = 'block';
    } else {
        document.querySelector('#rulesPage').style.display = 'none';
    }
}

selectLanguage = ()=>{
    e = document.querySelector('.hideElemens').classList.value;
    if(e.includes('language2')){
        for(let i = 0; i < document.querySelectorAll('.language2').length; i++){
            document.querySelectorAll('.language2')[i].classList.remove('hideElemens');
        }
        for(let i = 0; i < document.querySelectorAll('.language1').length; i++){
            document.querySelectorAll('.language1')[i].classList.add('hideElemens');
        }
    }else{
        for(let i = 0; i < document.querySelectorAll('.language1').length; i++){
            document.querySelectorAll('.language1')[i].classList.remove('hideElemens');
        }
        for(let i = 0; i < document.querySelectorAll('.language2').length; i++){
            document.querySelectorAll('.language2')[i].classList.add('hideElemens');
        }
    }
}