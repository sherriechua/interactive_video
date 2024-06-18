const video = document.getElementById('interactive-video');
const videoSource = document.getElementById('video-source');
const choices = document.getElementById('choices');

const videos = {
    intro: 'walking to door.mp4',
    option1: 'shoes on_final.mp4',
    option2: 'shoes off_final.mp4',
    // Add more video paths as needed
};

// Define the new choices with labels that come after selecting the first set of options
const newChoices = {
    option1: {
        option3: { label: 'fidget', video: 'fidget.mp4' },
        option4: { label: 'check phone', video: 'check phone.mp4' }
    },
    option2: {
        option3: { label: 'fidget', video: 'fidget.mp4' },
        option4: { label: 'check phone', video: 'check phone.mp4' }
    },
    // Add more branches as needed
    option3: {
        option5: { label: 'say thanks', video: 'thanks.mp4' },
        option6: { label: 'drink', video: 'drink.mp4' }
    },
    option4: {
        option5: { label: 'say thanks', video: 'thanks.mp4' },
        option6: { label: 'drink', video: 'drink.mp4' }
    },
    option5: {
        option7: { label: 'after dinner', video: 'fight for bill.mp4' },
    },
    option6: {
        option7: { label: 'after dinner', video: 'fight for bill.mp4' },
    },
    option7: {
        option8: { label: 'To Be Continued...', video: 'tbc.mp4' },
    },
    
};

let showChoicesTime; // Declare globally

video.addEventListener('loadedmetadata', () => {
    showChoicesTime = video.duration - 5; // 5 seconds before the video ends
    console.log(`Video duration: ${video.duration}`);
    console.log(`Choices will be shown at: ${showChoicesTime}`);
    choices.classList.add('hidden'); // Ensure choices are hidden when video loads
    choices.style.display = 'none'; // Ensure choices are hidden when video loads
});

video.addEventListener('timeupdate', () => {
    if (video.currentTime >= showChoicesTime && choices.style.display === 'none') {
        showChoices();
    }
    console.log(`Current time: ${video.currentTime}`);
});

function showChoices() {
    choices.classList.remove('hidden');
    choices.style.display = 'flex';
}

function chooseBranch(option) {
    choices.classList.add('hidden');
    choices.style.display = 'none';
    videoSource.src = videos[option];
    video.load();
    video.play();

    // Update the choices div with new buttons if there are new choices
    if (newChoices[option]) {
        updateChoices(newChoices[option]);
    } else {
        // If no new choices, do not display buttons again
        choices.innerHTML = '';
    }
}

function updateChoices(nextChoices) {
    choices.innerHTML = ''; // Clear existing buttons

    for (const [key, value] of Object.entries(nextChoices)) {
        const button = document.createElement('button');
        button.textContent = value.label;
        button.onclick = () => {
            videos[key] = value.video; // Update the video path in the videos object
            chooseBranch(key);
        };
        choices.appendChild(button);
    }
}
