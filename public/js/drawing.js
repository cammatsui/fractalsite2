//======================================================================================================================
/**
 * @file drawing.ts
 * @author Cameron Matsui (cmatsui22@amherst.edu)
 * @date December 2021.
 */
//======================================================================================================================
//======================================================================================================================
/**
 * A class representing a canvas which can be drawn on.
 */
export class DrawingCanvas {
    //==================================================================================================================
    //==================================================================================================================
    // INSTANCE METHODS
    //==================================================================================================================
    //==================================================================================================================
    /**
     * The constructor for the DrawingCanvas.
     *
     * @param canvas: The canvas to use as a DrawingCanvas.
     */
    constructor(canvas) {
        /* The default drawing color. */
        this.defaultColor = 'black';
        /* The default drawing width. */
        this.defaultWidth = 6;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.drawing = false;
        this.prevCoordinate = { x: 0, y: 0 };
        this.currCoordinate = { x: 0, y: 0 };
        this.initializeCanvas();
        this.updateDrawingTools("black", 9);
    } // constructor ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Clear the canvas.
     */
    clear() {
        this.ctx.putImageData(this.ctx.createImageData(this.canvas.width, this.canvas.height), 0, 0);
        this.prevCoordinate = { x: 0, y: 0 };
        this.currCoordinate = { x: 0, y: 0 };
    } // clear ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Update the context's color via strokeStyle.
     *
     * @param newColor: The new color to draw with.
     */
    updateColor(newColor) {
        this.ctx.strokeStyle = newColor;
        this.ctx.fillStyle = newColor;
    } // updateColor ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Update the context's lineWidth and color via strokeStyle.
     *
     * @param newColor: The new color to draw with.
     * @param newWidth: The new pen width to draw with.
     */
    updateDrawingTools(newColor, newWidth) {
        this.ctx.lineWidth = newWidth;
        this.ctx.strokeStyle = newColor;
    } // updateDrawingTools ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Reset the canvas' drawing tools.
     */
    resetDrawingTools() {
        this.updateDrawingTools(this.defaultColor, this.defaultWidth);
    } // resetDrawingTools ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Initialize the DrawingCanvas by adding the appropriate event listeners.
     */
    initializeCanvas() {
        var drawingCanvas = this;
        function parseAction(s, e) { drawingCanvas.parseAction(s, e); }
        // Set up event listeners for drawing.
        this.canvas.addEventListener("mousemove", function (e) {
            parseAction('move', e);
        }, false);
        this.canvas.addEventListener("mousedown", function (e) {
            parseAction('down', e);
        }, false);
        this.canvas.addEventListener("mouseup", function (e) {
            parseAction('up', e);
        }, false);
        this.canvas.addEventListener("mouseout", function (e) {
            parseAction('out', e);
        }, false);
    } // initializeCanvas ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Parse an action/mouse event.
     *
     * @param action: The type of event to parse.
     * @param event: The event to parse.
     *
     */
    parseAction(action, event) {
        if (action == 'down' || (action == 'move' && this.drawing)) {
            var rect = this.canvas.getBoundingClientRect();
            this.prevCoordinate = this.currCoordinate;
            this.currCoordinate = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }
        if (action == 'down') {
            this.drawing = true;
            // Draw a dot.
            this.ctx.beginPath();
            this.ctx.fillRect(this.currCoordinate.x, this.currCoordinate.y, this.ctx.lineWidth, this.ctx.lineWidth);
            this.ctx.closePath();
        }
        else if (action == 'up' || action == 'out') {
            this.drawing = false;
        }
        if (action == 'move' && this.drawing) {
            this.draw();
        }
    } // parseAction ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Draw a stroke on the canvas based on the mouse coordinates.
     */
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevCoordinate.x, this.prevCoordinate.y);
        this.ctx.lineTo(this.currCoordinate.x, this.currCoordinate.y);
        this.ctx.stroke();
        this.ctx.closePath();
    } // draw ()
} // class DrawingCanvas
//======================================================================================================================
