export class Color {

    public readonly chroma: number;
    public readonly hue: number;
    public readonly sat: number;
    public readonly val: number;
    public readonly luma: number;
    public readonly red: number;
    public readonly green: number;
    public readonly blue: number;

    constructor(public readonly hex: string) {
        /* Get the RGB values to calculate the Hue. */
        this.red = parseInt(hex.substring(0, 2), 16) / 255;
        this.green = parseInt(hex.substring(2, 4), 16) / 255;
        this.blue = parseInt(hex.substring(4, 6), 16) / 255;

        /* Getting the Max and Min values for Chroma. */
        const maxChroma = Math.max(this.red, this.green, this.blue);
        const minChroma = Math.min(this.red, this.green, this.blue);

        /* Variables for HSV value of hex color. */
        this.chroma = maxChroma - minChroma;
        this.hue = 0;
        this.val = maxChroma;
        this.sat = 0;

        if (this.val > 0) {
            /* Calculate Saturation only if Value isn't 0. */
            this.sat = this.chroma / this.val;
            if (this.sat > 0) {
                if (this.red == maxChroma) {
                    this.hue = 60 * (((this.green - minChroma) - (this.blue - minChroma)) / this.chroma);
                    if (this.hue < 0) {
                        this.hue += 360;
                    }
                } else if (this.green == maxChroma) {
                    this.hue = 120 + 60 * (((this.blue - minChroma) - (this.red - minChroma)) / this.chroma);
                } else if (this.blue == maxChroma) {
                    this.hue = 240 + 60 * (((this.red - minChroma) - (this.green - minChroma)) / this.chroma);
                }
            }
        }

        this.luma = 0.3 * this.red + 0.59 * this.green + 0.11 * this.blue;
    }
}