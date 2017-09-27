export default class Point2D{
    constructor(xCoord,yCoord){
        this.x = xCoord||0;
        this.y = yCoord||0;
    }

    add(other){
        this.x += other.x||0;
        this.y += other.y||0;
    }

    mul(scale){
        this.x *= scale||0;
        this.y *= scale||0;
    }

    static add(point1,point2){
        return new Point2D(point1.x + point2.x,point1.y + point2.y)
    }

    static mul(point,scale){
        return new Point2D(point.x * scale,point.y * scale)
    }

    normalize(){
        let lenght = 1.0/Math.sqrt(this.x * this.x + this.y*this.y);
        return new Point2D(this.x * lenght,this.y * lenght);
    }

    clone(){
        return new Point2D(this.x,this.y);
    }

    static distance(point1,point2){
        return Math.sqrt((point1.x-point2.x) ** 2 + (point1.y-point2.y) ** 2)
    }
    
    static getRect(points) {
        let rect = {
            xMin: points[0].x,
            xMax: points[0].x,
            yMin: points[0].y,
            yMax: points[0].y,
        }
        for(let i = 1; i< points.length;i++){
            if (rect.xMin > points[i].x) {
                rect.xMin = points[i].x;
            }
            if (rect.yMin > points[i].y) {
                rect.yMin = points[i].y;
            }
            if (rect.xMax < points[i].x) {
                rect.xMax = points[i].x;
            }
            if (rect.yMax < points[i].y) {
                rect.yMax = points[i].y;
            }
        }
        return {
            x: rect.xMin,
            y: rect.yMin,
            width: rect.xMax - rect.xMin,
            height: rect.yMax - rect.yMin,
        }
    }
}