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
    this.version = '1.0.1'
  }

  private getSignature(address:string,privateKey:string){
    return crypto.createHmac('sha512',privateKey).update(address).digest('hex');
  }

  private getHeaders(){
    const signature= this.getSignature(this.address,this.privateKey);
    return {
      address:this.address,
      "x-api-key":this.apiKey,
      "signature":signature
    }
  }

  verify({address,apikey,privateKey}:{address:string, apikey:string, privateKey:string}) {
    this.address = address;
    this.apiKey = apikey;
    this.privateKey = privateKey;
  }

  async watch() {
    const headers=this.getHeaders();
    const res=await getWallet(headers);
  }

  async ask(query:string) {
    const headers=this.getHeaders();
    const res=await getQueryResult(query,headers);
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