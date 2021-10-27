interface Origin {
    x: number;
    y: number;
    isFlanked: boolean;
}
declare class TickerTexture {
    imageTexture: HTMLImageElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    curPosition: Origin;
    imageArray: any;
    orientation: string;
    tickerColour: string;
    requestID: number;
    textLoaded: boolean;
    constructor(orientation: string, ticketColour: string, tickerImage: string);
    update: () => void;
    startRender: () => void;
    stopRender: () => void;
}
export default TickerTexture;
