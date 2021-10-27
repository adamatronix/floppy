export var findPointBetweenTwo = function (percent, x1, y1, x2, y2) {
    return {
        x: x1 + (x2 - x1) * percent,
        y: y1 + (y2 - y1) * percent
    };
};
export default findPointBetweenTwo;
//# sourceMappingURL=findPointBetweenTwo.js.map