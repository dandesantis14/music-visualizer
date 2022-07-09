export class AudioService {
    constructor () {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 256;
    }

    createSource(audioElement) {
        const sourceNode = this.audioContext.createMediaElementSource(audioElement);
        sourceNode.connect(this.analyserNode);
        sourceNode.connect(this.audioContext.destination);
    }

    getTrackData() {
        const bufferLength = this.analyserNode.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        this.analyserNode.getByteTimeDomainData(dataArray)
        return[dataArray,bufferLength]
    }
    
}