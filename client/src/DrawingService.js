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

        this.context.fillStyle = 'rgb(0,0,0)';
        this.context.fillRect(0, 0, 600, 300);
        const barWidth = (600 / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {

            barHeight = dataArray[i] / 2;
            this.context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
            this.context.fillRect(x, 300 - barHeight / 2, barWidth, barHeight)
            x += barWidth + 1
        }
    }
}