export class DrawingService {
    constructor () {
        this.canvas = document.getElementById('visualizer-canvas')
        this.context = this.canvas.getContext('2d')
    }

    drawHouse () {
        this.context.lineWidth = 10;
        // Wall
        this.context.strokeRect(75, 140, 150, 110);
        // Door
        this.context.fillRect(130, 190, 40, 60);
        // Roof
        this.context.beginPath();
        this.context.moveTo(50, 140);
        this.context.lineTo(150, 60);
        this.context.lineTo(250, 140);
        this.context.closePath();
        this.context.stroke();
    }
}