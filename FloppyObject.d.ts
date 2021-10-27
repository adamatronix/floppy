import * as THREE from 'three';
import { CanvasTexture } from 'three';
import TickerTexture from './TickerTexture';
interface LooseObject {
    [key: string]: any;
}
declare class FloppyObject {
    mesh: THREE.Mesh;
    image: string;
    ticker: TickerTexture;
    tickerHorizontal: TickerTexture;
    tickerText: CanvasTexture;
    tickerTextHorizontal: CanvasTexture;
    tickerColour: string;
    constructor(boxDimensions: LooseObject, image: string, tickerColour: string, tickerImageH: string, tickerImageV: string);
    createShape: (boxDimensions: LooseObject) => void;
}
export default FloppyObject;
