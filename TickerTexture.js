var TickerTexture = /** @class */ (function () {
    function TickerTexture(orientation, ticketColour, tickerImage) {
        var _this = this;
        this.curPosition = { x: null, y: null, isFlanked: false };
        this.imageArray = new Array();
        this.textLoaded = false;
        this.update = function () {
            _this.requestID = requestAnimationFrame(_this.update);
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.ctx.fillStyle = _this.tickerColour;
            _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
            if (_this.textLoaded) {
                _this.imageArray.forEach(function (image, index) {
                    var refAxis = _this.orientation === 'vertical' ? image.y : image.x;
                    var edge = _this.orientation === 'vertical' ? _this.canvas.height : _this.canvas.width;
                    if (refAxis > 0 && !image.isFlanked) {
                        var x = _this.orientation === 'vertical' ? 0 : 0 - 2575;
                        var y = _this.orientation === 'vertical' ? 0 - 2575 : 0;
                        _this.imageArray.push({ x: x, y: y, isFlanked: false });
                        image.isFlanked = true;
                    }
                    if (refAxis > edge) {
                        _this.imageArray.splice(index, 1);
                    }
                });
                _this.imageArray.forEach(function (image) {
                    var width = _this.orientation === 'vertical' ? 2575 * _this.imageTexture.width / _this.imageTexture.height : 2575;
                    var height = _this.orientation === 'vertical' ? 2575 : 2575 * _this.imageTexture.height / _this.imageTexture.width;
                    _this.ctx.drawImage(_this.imageTexture, image.x, image.y, width, height);
                    if (_this.orientation === 'vertical') {
                        image.y += 4;
                    }
                    else {
                        image.x += 4;
                    }
                });
            }
        };
        this.startRender = function () {
            _this.update();
        };
        this.stopRender = function () {
            cancelAnimationFrame(_this.requestID);
            _this.requestID = undefined;
        };
        var self = this;
        this.orientation = orientation;
        this.tickerColour = ticketColour;
        this.canvas = document.createElement('canvas');
        //document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width = this.orientation === 'vertical' ? 200 : 1400;
        this.ctx.canvas.height = this.orientation === 'vertical' ? 1400 : 200;
        this.ctx.fillStyle = this.tickerColour;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        var x = this.orientation === 'vertical' ? 0 : 0 - (2575 - self.canvas.width);
        var y = this.orientation === 'vertical' ? 0 - (2575 - self.canvas.height) : 0;
        this.imageArray.push({ x: x, y: y, isFlanked: false });
        this.imageTexture = new Image();
        this.imageTexture.crossOrigin = "Anonymous";
        this.imageTexture.src = tickerImage;
        this.imageTexture.onload = function () {
            var width = self.orientation === 'vertical' ? 2575 * self.imageTexture.width / self.imageTexture.height : 2575;
            var height = self.orientation === 'vertical' ? 2575 : 2575 * self.imageTexture.height / self.imageTexture.width;
            self.ctx.drawImage(self.imageTexture, self.imageArray[0].x, self.imageArray[0].y, width, height);
            self.textLoaded = true;
            self.startRender();
        };
    }
    return TickerTexture;
}());
export default TickerTexture;
//# sourceMappingURL=TickerTexture.js.map