import define from './define.js'
export const enBufferAddType = {
    BYTE : 1,
    SHORT:2,
    INT: 4,
    ARRAY: 5,
    STRING: 6,
};
export class VDataView
{
    constructor(sz)
    {
        this.size = sz;
        this.buffer = new ArrayBuffer(sz);
        this.dataView = new DataView(this.buffer);    
        this.offset = 0;
        this.encoder = new TextEncoder();
    }

    get(sz, pos, len = 0)
    {
        
        switch(sz)
        {
            case enBufferAddType.BYTE: 
                console.log(this.dataView.getInt8(pos));
                 return this.dataView.getInt8(pos);  
            break;
            case  enBufferAddType.SHORT: 
                return this.dataView.getInt16(pos);  
            break;
            case  enBufferAddType.INT: 
                return this.dataView.getInt32(pos);  
            break;
            case enBufferAddType.ARRAY:
                var buf = [];
                var p = pos;
                for( var i = 0; i < len; ++i)
                {
                    var re = this.dataView.getUint8(p); p += 1;
                    buf.push(p); 
                }
                return buf;
            break;
        }
        
    }
    addUint8(val)
    {
        this.dataView.setUint8(this.offset, val); 
        this.offset += 1;
    }
    addUint16(val)
    {
        this.dataView.setUint16(this.offset, val, true); 
        this.offset += 2;
    }
    addUint32(val)
    {
        this.dataView.setUint16(this.offset, val, true); 
        this.offset += 4;
    }
    addArray(arr, len)
    {
        console.log("add array " + arr + " len: " + len);
        for( var i=0 ; i < len; ++i)
        {
            this.dataView.setUint8(this.offset, arr[i]); 
            this.offset += 1;
        }
    }
    addArray(arr)
    {
        console.log("add array " + arr + " len: " + arr.length);
        for( var i=0 ; i < arr.length; ++i)
        {
            this.dataView.setUint8(this.offset, arr[i]); 
            this.offset += 1;
        }
    }
    addString(str)
    {
        var arrUtf8 = this.encoder.encode(str);
        this.addArray(arrUtf8, arrUtf8.length);
    }
    add( type, val)
    {
       
        switch(type)
        {
            case enBufferAddType.BYTE:
                this.addUint8(val);
            break;
            case  enBufferAddType.SHORT: 
                this.addUint16(val);
            break;
            case  enBufferAddType.INT: 
                this.addUint32(val);
            break;
            case enBufferAddType.STRING:
                this.addString(val)
            break;
            case enBufferAddType.ARRAY:            
                this.addArray(val);
            break;
        }

    }    
}
