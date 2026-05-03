// audio-player.js manages simple audio player
// Author: David Žižlavský

// Holds data about a single audio track
// Note: frontend must be done separately
class AudioTrack {
    constructor(idButton, idLength, sourcePath) {
        const elementButton = document.getElementById(idButton);
        const elementLength = document.getElementById(idLength);

        if (elementButton === null) {
            console.error("Element for button not found!");
            return;
        }
        if (elementLength === null) {
            console.error("Element for length not found!");
            return;
        }

        this.elementButton = elementButton;
        this.elementLength = elementLength;
        this.sourcePath = sourcePath;
    }
}

// Holds data about the audio player (including AudioTracks)
class AudioController {
    constructor(idAudioPlayer, idPlayButton, idFastForwardButton, idFastBackwardButton, idProgress, idProgressContainer, idTimeCurrent, idTimeTotal, audioTrackArray) {
        const elementAudioPlayer = document.getElementById(idAudioPlayer);
        const elementPlayButton = document.getElementById(idPlayButton);
        const elementFastForwardButton = document.getElementById(idFastForwardButton);
        const elementFastBackwardButton = document.getElementById(idFastBackwardButton);
        const elementProgress = document.getElementById(idProgress);
        const elementProgressContainer = document.getElementById(idProgressContainer);
        const elementTimeCurrent = document.getElementById(idTimeCurrent);
        const elementTimeTotal = document.getElementById(idTimeTotal);

        if (elementAudioPlayer === null) {
            console.error("Element for audio player not found!");
            return;
        }
        if (elementPlayButton === null) {
            console.error("Element for play button not found!");
            return;
        }
        if (elementFastForwardButton === null) {
            console.error("Element for fast forward button not found!");
            return;
        }
        if (elementFastBackwardButton === null) {
            console.error("Element for fast backward button not found!");
            return;
        }
        if (elementProgress === null) {
            console.error("Element for progress bar not found!");
            return;
        }
        if (elementProgressContainer === null) {
            console.error("Element for progress container bar not found!");
            return;
        }
        if (elementTimeCurrent === null) {
            console.error("Element for current time not found!");
            return;
        }
        if (elementTimeTotal === null) {
            console.error("Element for total time not found!");
            return;
        }

        this.elementAudioPlayer = elementAudioPlayer;
        this.elementPlayButton = elementPlayButton;
        this.elementFastForwardButton = elementFastForwardButton;
        this.elementFastBackwardButton = elementFastBackwardButton;
        this.elementProgress = elementProgress;
        this.elementProgressContainer = elementProgressContainer;
        this.elementTimeCurrent = elementTimeCurrent;
        this.elementTimeTotal = elementTimeTotal;
        this.audioTrackArray = audioTrackArray;
        this.isPlaying = false;
        this.currentTrackIndex = null;
    }
}

// Registers the AudioController class into the system
function registerAudioController(audioController) {
    if (audioController === null) {
        console.error("Cannot register NULL audio controller!");
        return;
    }

    audioController.elementAudioPlayer.addEventListener("play", () => onAudioPlay(audioController));
    audioController.elementAudioPlayer.addEventListener("pause", () => onAudioPause(audioController));
    audioController.elementAudioPlayer.addEventListener("timeupdate", () => updateTimer(audioController));
    audioController.elementProgressContainer.addEventListener("click", (e) => onProgressBarClick(audioController, e));

    audioController.audioTrackArray.forEach((audioTrack, index) => {
        audioTrack.elementButton.addEventListener("click", () => switchTrack(audioController, index));
    });

    audioController.elementPlayButton.addEventListener("click", () => togglePlay(audioController));
    audioController.elementFastBackwardButton.addEventListener("click", () => previousTrack(audioController));
    audioController.elementFastForwardButton.addEventListener("click", () => nextTrack(audioController));

    audioController.elementProgress.style.width = "0%";
    audioController.elementTimeCurrent.textContent = formatTime(0);
    audioController.elementTimeTotal.textContent = formatTime(0);
}

// Event triggered on audio play
function onAudioPlay(audioController) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    if (audioController.currentTrackIndex === null) {
        console.warn("No audio track loaded yet!");
        return;
    }

    audioController.isPlaying = true;
    
    // Set FA class for the correct icon
    audioController.elementPlayButton.firstChild.classList.add("fa-pause");
    audioController.elementPlayButton.firstChild.classList.remove("fa-play");
}

// Event triggered on audio pause
function onAudioPause(audioController) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    if (audioController.currentTrackIndex === null) {
        console.warn("No audio track loaded yet!");
        return;
    }

    audioController.isPlaying = false;

    // Set FA class for the correct icon
    audioController.elementPlayButton.firstChild.classList.add("fa-play");
    audioController.elementPlayButton.firstChild.classList.remove("fa-pause");
}

// Event triggered on progress bar click
function onProgressBarClick(audioController, event) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    if (audioController.currentTrackIndex === null) {
        console.warn("No audio track loaded yet!");
        return;
    }
    
    const offset = event.offsetX;
    const width = audioController.elementProgressContainer.clientWidth;

    const duration = audioController.elementAudioPlayer.duration;

    // Calculate timestamp where to move the audio (based on click offset)
    const newTime = (offset / width) * duration;
    audioController.elementAudioPlayer.currentTime = newTime;
}

// Switch track forward
function nextTrack(audioController) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    if (audioController.currentTrackIndex === null) {
        console.warn("No audio track loaded yet!");
        return;
    }

    let currentTrackIndex = audioController.currentTrackIndex;
    currentTrackIndex = (currentTrackIndex + 1) % audioController.audioTrackArray.length;
    switchTrack(audioController, currentTrackIndex);
}

// Switch track forward
function previousTrack(audioController) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    if (audioController.currentTrackIndex === null) {
        console.warn("No audio track loaded yet!");
        return;
    }

    let currentTrackIndex = audioController.currentTrackIndex;
    currentTrackIndex = (currentTrackIndex - 1 + audioController.audioTrackArray.length) % audioController.audioTrackArray.length;
    switchTrack(audioController, currentTrackIndex);
}

// Event triggered on timer update
function updateTimer(audioController) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    const progressElement = audioController.elementProgress;
    const audioElement = audioController.elementAudioPlayer;

    if (!isNaN(audioElement.duration)) {
        audioController.elementTimeCurrent.textContent = formatTime(audioElement.currentTime);
        audioController.elementTimeTotal.textContent = formatTime(audioElement.duration);
        
        const progressPercentage = (audioElement.currentTime / audioElement.duration) * 100 || 0;
        progressElement.style.width = progressPercentage + "%";
    }
}

// Switches to a specific track
// trackIndex = index in the audioController tracks array
function switchTrack(audioController, trackIndex) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    const audioTrack = audioController.audioTrackArray.at(trackIndex);
    if (audioTrack === null) {
        console.error("Audio track not found!");
        return;
    }

    audioController.audioTrackArray.forEach((track, index) => {
        if (index == trackIndex) {
            track.elementButton.classList.add("playing");
        } else {
            track.elementButton.classList.remove("playing");
        }
    });

    audioController.currentTrackIndex = trackIndex;
    audioController.elementAudioPlayer.src = audioTrack.sourcePath;
    audioController.elementProgress.width = "0%";
    audioController.elementTimeCurrent.textContent = formatTime(0);
    audioController.elementAudioPlayer.play();
}

// Toggle button logic (play/pause)
function togglePlay(audioController) {
    if (audioController === null) {
        console.error("Audio controller cannot be null!");
        return;
    }

    if (audioController.currentTrackIndex === null) {
        console.warn("No audio track selected!");
        return;
    }
    
    if (audioController.isPlaying) {
        audioController.elementAudioPlayer.pause();
    } else {
        audioController.elementAudioPlayer.play();
    }
}

// Helper function to format time for display purposes
function formatTime(seconds) {
    const currentMinutes = Math.floor(seconds / 60);
    const currentSeconds = Math.floor(seconds % 60);

    return `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;
}