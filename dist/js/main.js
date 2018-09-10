// Init speech synth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices
let voices=[];

const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach(voice=>{
        // Create option element
        const option = document.createElement('option');
        option.textContent=voice.name+`(${voice.lang})`;

        //Set needed option attribute
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
    console.log(voices);
};

getVoices();
if (synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged =getVoices;
}

// Speak
const speak = () => {
    //  check if speaking
    if(synth.speaking){
        console.log("Already Speaking dude...");
        return;
    }
    if(textInput.value != '') {
        //  Bg animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // speak text end
        speakText.onend = e => {
            console.log('done and dusted');
            body.style.background = '#141414';
        };

        speakText.onerror = e => {
            console.error("Soething went wrong re");
        };

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voice
        voices.forEach(voice =>{
            if(voice.name==selectedVoice){
                speakText.voice=voice;
            }
        });
        // Set pitch and rate
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        // Speak
        synth.speak(speakText);
    }
};

// Event listeners

// Text form submit
textForm.addEventListener('submit',e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => rateValue.textContent=rate.value);

// Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent=pitch.value);

// Voice select change
voiceSelect.addEventListener('change', e => speak());
