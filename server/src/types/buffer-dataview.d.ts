export = dataview;
declare class dataview {
    constructor(buffer: any, byteOffset: any, byteLength: any);
    buffer: any;
    byteOffset: any;
    byteLength: any;
    getFloat32(byteOffset: any, littleEndian: any, ...args: any[]): any;
    getFloat64(byteOffset: any, littleEndian: any, ...args: any[]): any;
    getInt16(byteOffset: any, littleEndian: any, ...args: any[]): any;
    getInt32(byteOffset: any, littleEndian: any, ...args: any[]): any;
    getInt8(byteOffset: any, ...args: any[]): any;
    getUint16(byteOffset: any, littleEndian: any, ...args: any[]): any;
    getUint32(byteOffset: any, littleEndian: any, ...args: any[]): any;
    getUint8(byteOffset: any, ...args: any[]): any;
    setFloat32(byteOffset: any, value: any, littleEndian: any, ...args: any[]): void;
    setFloat64(byteOffset: any, value: any, littleEndian: any, ...args: any[]): void;
    setInt16(byteOffset: any, value: any, littleEndian: any, ...args: any[]): void;
    setInt32(byteOffset: any, value: any, littleEndian: any, ...args: any[]): void;
    setInt8(byteOffset: any, value: any, ...args: any[]): void;
    setUint16(byteOffset: any, value: any, littleEndian: any, ...args: any[]): void;
    setUint32(byteOffset: any, value: any, littleEndian: any, ...args: any[]): void;
    setUint8(byteOffset: any, value: any, ...args: any[]): void;
}
