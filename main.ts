import { getQueryResult, getWallet } from "./services/apiService";
import crypto from "crypto";
export default class UATU {
  private address:string = '';
  private apiKey:string = '';
  private privateKey:string = '';
  private version:string="1.0.1"
  constructor(options?: {address: string, apikey: string, privateKey: string}) {
    if(options && Object.keys(options).length > 0) {
      this.verify(options)
    }
  }

  private getSignature(address:string,privateKey:string){
    return crypto.createHmac('sha512',privateKey).update(address).digest('hex');
  }

  private getHeaders(){
    const signature= this.getSignature(this.address,this.privateKey);
    return {
      headers:{
        address:this.address,
        "x-api-key":this.apiKey,
        "signature":signature
      }
    }
  }

  verify({address,apikey,privateKey}:{address:string, apikey:string, privateKey:string}) {
    this.address = address;
    this.apiKey = apikey;
    this.privateKey = privateKey;
    return this;
  }

  async watch() {
    try {
      if(!this.address || !this.apiKey || !this.privateKey) throw new Error("Call Uatu verify first");
      const headers=this.getHeaders();
      return await getWallet(headers);      
    } catch (error:any) {
      console.log(error);      
      return null;
    }
  }
  
  async ask(query:string) {
    try {
      if(!this.address || !this.apiKey || !this.privateKey) throw new Error("Call Uatu verify first");
      const headers=this.getHeaders();
      return await getQueryResult(query,headers);      
    } catch (error) {
      console.log(error);      
      return null;      
    }
  }

  
}

/**
 * 
 * 
const options = {
  address = "address";
  apikey = "apikey";
  privateKey = "privateKey";
} 
const ua = new UATU(options) // new UATU()

ua.verify({options})

ua.watch()

uas.ask()
1. npm install --save-dev jest babel-jest @babel/core @babel/preset-env @babel/preset-typescript
**/