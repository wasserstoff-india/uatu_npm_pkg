import { askPriceApi, getQueryResult, getWallet, watchPrice } from "./services/apiService";
import {Wallet} from "ethers";
import { indexOfQueryArray,queryArray,routeArray } from "./constants/constant";

export class UATU {
  private address:string = '';
  // private version:string="1.0.1";
  private apiKey:string="";
  constructor(private wallet?:Wallet,apiKey?:string) {
    if(wallet) {
      this.verify(wallet,apiKey!);
    }
  }

  private async getSignature(query:string){
    const message={
      key:this.apiKey,
      query:query
    }
    return await this.wallet?.signMessage(JSON.stringify(message));
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

  verify(wallet:Wallet,apiKey:string) {
    this.wallet=wallet;
    this.address = wallet.address.toLowerCase();
    this.apiKey=apiKey;
    return this;
  }

  async watch() {
    try {
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first By passing wallet and apiKey");
      const headers=await this.getHeaders("watch");
      return await getWallet(headers);      
    } catch (error:any) {   
      console.log(error);        
      return error["response"];
    }
  }
  
  async watchPrice(query?:Array<string>){
    try {
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first By passing wallet and apiKey");
      const headers=await this.getHeaders("watchPrice");
      let queryParam:string=this.makeQueryString(query);
      return await watchPrice(headers,queryParam);      
    } catch (error:any) {   
      console.log(error);        
      return error["response"];
    }
  }
  async askPrice(query?:Array<string>){
    try {
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first By passing wallet and apiKey");
      const headers=await this.getHeaders("askPrice");
      let queryParam:string=this.makeQueryString(query);
      return await askPriceApi(headers,queryParam);      
    } catch (error:any) {   
      console.log(error);        
      return error["response"];
    }
  }
  async ask(que:string) {
    try {      
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first  By passing wallet and apiKey");
      let query=que;
      if(que!=="wallet" && que!== "transactions" && que!=="assets" && que!=="nfts"){
        query=this.filterQuery(que);
      }
      const headers=await this.getHeaders(query);
      return await getQueryResult(query,headers,que);   
    } catch (error:any) {         
      return error["response"];      
    }
  }

  private makeQueryString(query:Array<string>){
    if(!query || query.length==0)return "ALL";
    let res="";
    for(let coin of query){
      if(coin.toUpperCase()=="ALL"){
        return "ALL";
      }
      res+=coin.toUpperCase();
    }
    return res;
  }

  private filterQuery(input:string){
    let match=[];
    let j=0;
    input=input.toLowerCase();
    for(let i=0;i<queryArray.length;i++){
      if(input.includes(queryArray[i])){
        if(match[0]==routeArray[j])continue;
        if(match[0]!=routeArray[j] && match.length<1) match.push(routeArray[j]);
        else return "query";
      }
      if(indexOfQueryArray[j]==i)j++;
    }
    return match[0]??"query";
  }
  
}



