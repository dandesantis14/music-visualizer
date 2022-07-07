export class AudioService {
    constructor () {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
    }

    createSource(audioElement) {
        const sourceElement = this.audioContext.createMediaElementSource(audioElement);
        // const analyser = this.audioContext.createAnalyser();
        // sourceElement.connect(analyser);
        sourceElement.connect(this.audioContext.destination);
    }
}