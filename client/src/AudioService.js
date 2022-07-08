export class AudioService {
    constructor () {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.analyserNode = this.audioContext.createAnalyser();
    }

    createSource(audioElement) {
        const sourceElement = this.audioContext.createMediaElementSource(audioElement);
        sourceElement.connect(this.analyserNode);
        sourceElement.connect(this.audioContext.destination);
    }

    getTrackData() {
        const bufferLength = this.analyserNode.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        this.analyserNode.getByteTimeDomainData(dataArray)
        return(dataArray)
    }
}