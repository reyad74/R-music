console.log("Welcome to Rmusic")
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let progress = 0;

let songs = [
    { songName: "Song 1", filePath: "1.mp3", coverPath: "bg.jpg" },
    { songName: "Song 2", filePath: "2.mp3", coverPath: "bg.jpg" },
    { songName: "Song 3", filePath: "3.mp3", coverPath: "bg.jpg" },
    { songName: "Song 4", filePath: "4.mp3", coverPath: "bg.jpg" },
    { songName: "Song 5", filePath: "5.mp3", coverPath: "bg.jpg" },
    { songName: "Song 6", filePath: "6.mp3", coverPath: "bg.jpg" },
    { songName: "Song 7", filePath: "7.mp3", coverPath: "bg.jpg" },
    { songName: "Song 8", filePath: "8.mp3", coverPath: "bg.jpg" },
   
]

songItems.forEach((element, i) => {
    const img = element.getElementsByTagName("img")[0];
    const songNameSpan = element.getElementsByClassName("songName")[0];
    if (img && songs[i]) img.src = songs[i].coverPath;
    if (songNameSpan && songs[i]) songNameSpan.innerText = songs[i].songName;
});


//audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {

    // Update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    MyProgressBar.value = progress;
})
MyProgressBar.addEventListener('change', () => {
    audioElement.currentTime = MyProgressBar.value * audioElement.duration / 100;
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    
    })
});
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = songs.length - 1;
    } else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});
// Shuffle functionality
