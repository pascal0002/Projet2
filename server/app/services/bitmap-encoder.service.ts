import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";

@injectable()
export class BitmapEncoder {

    public pixels: Array<number>;
    public width: number;
    public height: number;
    public extraBytes: number;
    public rgbSize: number;
    public headerInfoSize: number = 40;
    public flag:string = "BM";
    public reserved:number = 0;
    public offset:number = 54;
    public fileSize:number;
    public planes:number = 1;
	public bitPP:number = 24;
	public compress:number = 0;
	public hr:number = 0;
	public vr:number = 0;
	public colors:number = 0;
    public importantColors:number = 0;
    public pos:number = 0;


   public encodeBitmap(image: IBitmapImage): Buffer{

    this.pixels = image.pixels;
    this.width = image.width;
    this.height = image.height;
    this.extraBytes = this.width%4;
    this.rgbSize = this.height*(3*this.width + this.extraBytes);
    this.fileSize = this.rgbSize + this.offset;

    let tempBuffer = new Buffer(this.offset+this.rgbSize);
	// Write the header
    tempBuffer.write(this.flag,this.pos,2);this.pos+=2;
	tempBuffer.writeUInt32LE(this.fileSize,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.reserved,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.offset,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.headerInfoSize,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.width,this.pos);this.pos+=4;
	tempBuffer.writeInt32LE(-this.height,this.pos);this.pos+=4;
	tempBuffer.writeUInt16LE(this.planes,this.pos);this.pos+=2;
	tempBuffer.writeUInt16LE(this.bitPP,this.pos);this.pos+=2;
	tempBuffer.writeUInt32LE(this.compress,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.rgbSize,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.hr,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.vr,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.colors,this.pos);this.pos+=4;
	tempBuffer.writeUInt32LE(this.importantColors,this.pos);this.pos+=4;

    var i=0;
	var rowBytes = 3*this.width+this.extraBytes;

	// Write the pixels
	for (var y = this.height - 1; y >= 0 ; y--){
		for (var x = 0; x < this.width; x++){
			var p = this.pos+y*rowBytes+x*3;
			tempBuffer[p]= this.pixels[i++];//b
			tempBuffer[p+1] = this.pixels[i++];//g
			tempBuffer[p+2]  = this.pixels[i++];//r
		}
		if(this.extraBytes>0){
			var fillOffset = this.pos+y*rowBytes+this.width*3;
			tempBuffer.fill(0,fillOffset,fillOffset+this.extraBytes);
		}
	}

    return tempBuffer;
   }

}
