export class DrawingService {
    constructor() {
        this.canvas = document.getElementById('visualizer-canvas')
        this.context = this.canvas.getContext('2d')
    }
    
    clearCanvas() {
        this.context.clearRect(0, 0, 600, 300)
    }

    draw(audioContext) {
        const [dataArray, bufferLength] = audioContext.getTrackData()
        const drawVisual = requestAnimationFrame(() => this.draw(audioContext));

        this.context.fillStyle = 'rgb(54, 48, 98)';
        this.context.fillRect(0, 0, 600, 370);
        const barWidth = (600 / bufferLength) * 1.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {

            barHeight = dataArray[i] ;
            this.context.fillStyle = 'rgb(' + (barHeight + 180) + ',115,151)'
            this.context.fillRect(x, 400 + barHeight / 5, barWidth, (-barHeight)-100)
            x += barWidth + 1
        }
    }
}