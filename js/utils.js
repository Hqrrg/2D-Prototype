class Utils {
    
    constructor() {}

    static getCurrentTime() {
        return new Date().getTime();
    }

    static getDeltaTime(startTime) {
        return (this.getCurrentTime() - startTime) * 120;
    }

    //Utility function for calculating the unit distance between two points in 2D space.
    static getDistance(x1, y1, x2, y2) {
        let x = x2-x1;
        let y = y2-y1;

        return Math.sqrt(x*x+y*y);
    }
}