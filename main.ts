import { getQueryResult, getWallet } from "./services/apiService";
import {ethers,Wallet} from "ethers";
export default class UATU {
  private address:string = '';
  private version:string="1.0.1";
  private apiKey:string="";
  private wallet:Wallet;
  constructor(wallet?:Wallet,apiKey?:string) {
    if(wallet) {
      this.verify(wallet,apiKey!).then((data)=>{return data});
    }
  }

  // constructor(wallet) 

  private async getSignature(query:string){
    const message={
      key:this.apiKey,
      query:query
    }
    return await this.wallet.signMessage(JSON.stringify(message));
  }

  private async getHeaders(query:string){
    const signature= await this.getSignature(query);
    return {
      headers:{
        address:this.address,
        "x-api-key":this.apiKey,
        "signature":signature
      }
    }
  }

  async verify(wallet:Wallet,apiKey:string) {
    this.wallet=wallet;
    this.address = await wallet.getAddress();
    this.apiKey=apiKey;
    return this;
  }

  async watch() {
    try {
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first By passing wallet and apiKey");
      const headers=await this.getHeaders("wallet");
      return await getWallet(headers);      
    } catch (error:any) {     
      return error["response"];
    }
  }
  
  async ask(query:string) {
    try {
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first  By passing wallet and apiKey");
      const headers=await this.getHeaders(query);
      return await getQueryResult(query,headers);      
    } catch (error:any) {         
      return error["response"];      
    }
  }
  
}

/**
 * 
 * 
 * const wallet = new ethers.Wallet( privateKey )
 * new UATU(wallet)
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