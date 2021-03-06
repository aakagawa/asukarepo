// global variables
window.onload = function() {findAudio};
function findAudio() {
    source = document.getElementById('source');
    player = document.getElementById('player');
}

var i = 0;
var playlist = [
        "Untitled nº1.wav",
        "Untitled nº2.wav",
        "Untitled nº3.wav"
    ];
var elem = document.getElementById('progressBar');
var playpauseTrack = document.getElementsByClassName('playpauseTrack');
var biplay = document.getElementsByClassName('bi bi-play-fill');
var bipause = document.getElementsByClassName('bi bi-pause-fill');

// listening for selection of track
var tracks = document.getElementsByTagName('tr');
for (var j = 0; j < tracks.length; j++) {
    thisTrack = tracks[j];
    thisTrack.addEventListener('click', active);
    thisTrack.addEventListener('dblclick', playTrack);
    var thisplaypause = tracks[j].getElementsByClassName('playpauseTrack');
        for (var k = 0; k < thisplaypause.length; k++) {
        thisthisplaypause = thisplaypause[k];
        thisthisplaypause.addEventListener('click', playpauseOnTrack);
    }
}

// selection of track 
var current = document.getElementsByClassName('active');
function active() { 
    i = this.rowIndex;
    source.src = playlist[i];
    current[0].className = current[0].className.replace('active', '');
    this.className += 'active';
}

function loadPlay() {
    player.load();
    player.play();
}

function displayPause() {
    document.getElementById('play').style.display = "none";
    document.getElementById('pause').style.display = "inline-block";
}

function displayPauseBoth() {
    displayPause();
    biplay[i].style.display = "none";
    bipause[i].style.display = "inline-block";
}

function displayPlay() {
    document.getElementById('play').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
}

function displayPlayBoth() {
    displayPlay();
    biplay[i].style.display = "inline-block";
    bipause[i].style.display = "none";
}

function playTrack() {
    i = this.rowIndex;
    source.src = playlist[i];
    loadPlay();
    resetIcons();
    displayPause();
    var increment = setInterval(_increment, 1000);
    function _increment() {
        elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
    }
}

function playpauseOnTrack() {
    i = this.parentElement.parentElement.rowIndex;
    source.src = playlist[i];
    if (player.currentSrc === source.src) {
        if (player.paused === true) {
            player.play();
            this.getElementsByClassName('bi bi-play-fill')[0].style.display = "none";
            this.getElementsByClassName('bi bi-pause-fill')[0].style.display = "inline-block";
            displayPause();
            var increment = setInterval(_increment, 1000);
            function _increment() {
                elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
            }
        }
        else {
            player.pause();
            this.getElementsByClassName('bi bi-play-fill')[0].style.display = "inline-block";
            this.getElementsByClassName('bi bi-pause-fill')[0].style.display = "none"; 
            displayPlay();
            clearInterval(increment);
        }
    }
    else { 
        loadPlay();
        resetIcons();
        this.getElementsByClassName('bi bi-play-fill')[0].style.display = "none";
        this.getElementsByClassName('bi bi-pause-fill')[0].style.display = "inline-block";
        displayPause();
        var increment = setInterval(_increment, 1000);
        function _increment() {
            elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
        }
    }
}

// playpause toggle
document.getElementById('playpause').onclick = function() {playpause()};
function playpause() {
    if (player.paused == true) {
        player.play();
        displayPauseBoth();
        var increment = setInterval(_increment, 1000);
        function _increment() {
            elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
        }
    }
    else {
        player.pause();
        displayPlayBoth();
        clearInterval(increment);
    }
}

document.getElementById('previousButton').onclick = function() {previous()};
function previous() {
    if (player.currentTime < 2.5) { 
        if (i !== 0) {
            resetIcons();
            i--;
        }
        source.src = playlist[i];
        loadPlay();
        displayPauseBoth();
        var increment = setInterval(_increment, 1000);
        function _increment() {
            elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
        }
    }
    else {
        source.src = playlist[i];
        loadPlay();
        displayPlayBoth();
    }
}

document.getElementById('nextButton').onclick = function() {next()};
function next() {
    if (i === playlist.length - 1) {
        i = 0;
    }
    else {
        i++;
        resetIcons();
    }
    source.src = playlist[i];
    loadPlay();
    displayPauseBoth();
    var increment = setInterval(_increment, 1000);
    function _increment() {
        elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
    }
}

function resetIcons() {
    for (var l = 0; l < playpauseTrack.length; l++) {
        biplay[l].style.display = "inline-block";
        bipause[l].style.display = "none";
    }
}

function progressBar() {
    var _duration = player.duration;
    var _progress = player.currentTime;
    
    // formatting duration  
    var duration = calcDuration(_duration);
    if (isNaN(_duration) === true) {
        document.getElementById('end').innerHTML = '00:00';
    }
    else {
        document.getElementById('end').innerHTML = duration;
    }

    // formatting progress
    var currentTime = calcProgress(_progress);
    document.getElementById('progress').innerHTML = currentTime;

    // CHANGE THIS TO LOAD AND PLAY NEXT TRACK!!
    if (player.currentTime === player.duration) {
        i++;
        resetIcons();
        source.src = playlist[i];
        loadPlay();
        displayPauseBoth();
        var increment = setInterval(_increment, 1000);
        function _increment() {
            elem.style.width = ((player.currentTime / player.duration) * 100) + '%'; 
        }
    }
}

function calcDuration(_duration) { 
    // formatting duration of audio
    var min = Math.floor(_duration / 60);
    var sec_int = _duration - (min * 60);
    var sec_ = Math.round(sec_int);
    var sec_str = sec_.toString();
    if (sec_ < 10 ) {
        sec_str = '0' + sec_str   
    }
    var sec = sec_str.substr(0, 2);
    var time = min + ':' + sec;
    return time;
}

function calcProgress(currentTime) {
    // formattting progress of audio
    var min_progress = parseInt(currentTime / 60) % 60;
    var sec_progress_long = currentTime % 60;
    var sec_progress = sec_progress_long.toFixed();
    var _progress = (min_progress < 10 ? "0" + min_progress : min_progress) + ":" 
        + (sec_progress < 10 ? "0" + sec_progress : sec_progress);
    return _progress;
}