// Get DOM Elements
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const time = document.getElementById('time');
const u_file = document.getElementById('upload_file');
const file = document.getElementById('myFile');

// functions for event listeners
// 1. Function to play or pause the video
function playPauseVideo(){
     if(video.paused){
         video.play();
     }
     else{
        video.pause();
     }
};

// 2. Function to update the icons of play and pause
function updateIcons(){
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }
    else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }


};

// 3. Function to update the progress bar while video is playing
function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;

    //set the time for timestamp
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10){
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs);
    }

    time.innerHTML = `${mins}:${secs}`;

};

// 4. function to update progress bar over status change
function updateVideoProgress(){
    video.currentTime = (+progress.value * video.duration) / 100;
};

//5. function to update the video in player 
function updateVideo(){
    console.log(file);
};


// Add Event listeners
// 1. Event listener for click on the video to play it
video.addEventListener('click', playPauseVideo);
// 2. Event Listener to update the icon of play
video.addEventListener('play', updateIcons);
// 3. Event Listener to update the icon of pause
video.addEventListener('pause', updateIcons);
// 4. Event listener to update the progress bar and time of video
video.addEventListener('timeupdate', updateProgress);
// 5. Listener for click event on play button
play.addEventListener('click',playPauseVideo);
// 6. Listener for click event on stop button
stop.addEventListener('click', playPauseVideo);
// 7. Listener to update progress bar over status change
progress.addEventListener('change', updateVideoProgress);
// 8. Listener to upload the video
u_file.addEventListener('click', updateVideo);
