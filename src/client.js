import {enBufferAddType,VDataView} from './VDataView.js'
import {enMessageType, enTypeClient} from './define.js'


const URL = 'ws://localhost:20131'

export class CClient
{
    constructor(url){
        this.ws = new WebSocket(url);
    }

    componentDidMount() {
        this.ws.onopen = () => {
          // on connecting, do nothing but log it to the console
            console.log('connected')
            this.authenticate();   
        }
    
        this.ws.onmessage = evt => {
          // on receiving a message, add it to the list of messages
         
        }
    
        this.ws.onclose = () => {
          console.log('disconnected')
          // automatically try to reconnect on connection loss
          this.setState({
            ws: new WebSocket(URL),
          })
        }
    }

    authenticate(){
        var us = "baoson202@gmail.com";
        var pw = "baoson023946772";
        
        var en = new TextEncoder();
        var utf8_us = en.encode(us);
        var utf8_pw = en.encode(pw);
    
        var len = 1 + 1 + 4 + utf8_us.length + 4 + utf8_pw.length + 1;
        
        var dv = new VDataView(len);
        dv.add(enBufferAddType.BYTE, 124);
        dv.add(enBufferAddType.BYTE, enMessageType.MT_AUTHENTICATE);
        dv.add(enBufferAddType.INT, utf8_us.length); 
        dv.addArray(utf8_us);
        dv.add(enBufferAddType.INT, utf8_pw.length); 
        dv.addArray(utf8_pw);  
        dv.addUint8(enTypeClient.TC_WEB);      
        console.log(dv.buffer);
        this.ws.send(dv.buffer);  
    }
};