import FloppyObject from './FloppyObject';
import { CanvasTexture } from 'three';
import TickerTexture from './TickerTexture';
interface LooseObject {
    [key: string]: any;
}
declare class FloppyTicker extends FloppyObject {
    ticker: TickerTexture;
    tickerHorizontal: TickerTexture;
    tickerText: CanvasTexture;
    tickerTextHorizontal: CanvasTexture;
    tickerColour: string;
    constructor(boxDimensions: LooseObject, image: string, tickerImageH: string, tickerImageV: string, tickerColour?: string);
    createShape: (boxDimensions: LooseObject) => void;
    startRender: () => void;
    stopRender: () => void;
    needsUpdate: () => void;
}
export default FloppyTicker;
