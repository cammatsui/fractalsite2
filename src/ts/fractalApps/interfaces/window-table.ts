//======================================================================================================================
/**
 * @file affine-table.ts
 * @author Cameron Matsui (cmatsui22@amherst.edu)
 * @date March 2022.
 */
//======================================================================================================================


//======================================================================================================================
/**
 * The WindowTable class wraps an HTML table which allows the user to change the IFS window.
 */
export class WindowTable {
//======================================================================================================================


    //==================================================================================================================
    // FIELDS

    /* The HTML table which backs the WindowTable. */
    readonly table: HTMLTableElement;

    //==================================================================================================================


    //==================================================================================================================
    // INSTANCE METHODS
    //==================================================================================================================


    //==================================================================================================================
    /**
     * The constructor for the WindowTable. 
     */
    constructor(table: HTMLTableElement) {
        this.table = table;
    } // constructor () 
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Set a preset for the table. 
     */
    public applyPreset(preset: WindowCoordinates) {
        let minRow = this.table.rows[1];
        let maxRow = this.table.rows[2];

        minRow.cells[1].innerHTML = ""+preset.a1;
        maxRow.cells[1].innerHTML = ""+preset.b1;

        minRow.cells[2].innerHTML = ""+preset.a2;
        maxRow.cells[2].innerHTML = ""+preset.b2;

    } // applyPreset ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Get the window bounds from the table. 
     */
    public getWindowBounds(): WindowCoordinates {
        let minRow = this.table.rows[1];
        let maxRow = this.table.rows[2];

        return {
            a1: WindowTable.parseTableEntry(minRow.cells[1].innerHTML),
            b1: WindowTable.parseTableEntry(maxRow.cells[1].innerHTML),
            a2: WindowTable.parseTableEntry(minRow.cells[2].innerHTML),
            b2: WindowTable.parseTableEntry(maxRow.cells[2].innerHTML),
        };

    } // getWindowBounds ()
    //==================================================================================================================


    //==================================================================================================================
    // STATIC METHODS
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Convert an entry entered by a user into a number.
     */
    protected static parseTableEntry(html: String): number {
        if (html.includes("/")) {
            // Text is a fraction; parse as such.
            let frac = html.replace(/\s/g, "").split('/');
            return (+frac[0]/(+frac[1]));
        }
        html = html.replace(/(<br ?\/?>)*/g,"");
        return (+html.replace(/\s/g, ""));
    } // parseTableEntry ()
    //==================================================================================================================


//======================================================================================================================
} // class WindowTable
//======================================================================================================================


//======================================================================================================================
/**
 * A type which specifies the coordinates of the window for an IFS.
 */
export type WindowCoordinates = {
    a1: number;
    b1: number,
    a2: number,
    b2: number
} // type WindowCoordinates
//======================================================================================================================