import { getQueryResult, getWallet } from "../services/apiService";
import {Wallet} from "ethers";
import { AxiosResponse } from "axios";
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
    this.address = wallet.address;
    this.apiKey=apiKey;
    return this;
  }

  async watch() {
    try {
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first By passing wallet and apiKey");
      const headers=await this.getHeaders("wallet");
      return await getWallet(headers);      
    } catch (error:any) {   
      console.log(error);
        
      return error["response"];
    }
  }
  
  async ask(query:string) {
    try {
      console.log(query);      
      if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first  By passing wallet and apiKey");
      const headers=await this.getHeaders(query);
      const res:InterFaceTypes= await getQueryResult(query,headers);   
      return res;   
    } catch (error:any) {         
      return error["response"];      
    }
  }

  
}

// async ask<T extends "wallet" | "transactions" | "assets" | "nfts">(query :T):T extends "wallet" ? WalletObject : (T extends "transactions" ? Array<Transaction> :(T extends "assets" ? Array<Asset> : Array<NFT>)){
//   try {
//         if(this.address.length<=0 || this.apiKey.length<=0 || !this.wallet) throw new Error("Call Uatu verify first  By passing wallet and apiKey");
//         const headers=await this.getHeaders(query);
//         return await getQueryResult(query,headers);      
//       } catch (error:any) {         
//         return error["response"];      
//       }
// }
// interface AxiosResponseType extends AxiosResponse<InterFaceTypes>{
//   data:InterFaceTypes
//   status: number;
//   statusText: string;
//   headers: any;
//   config: any;
//   request?: any;
// }


type InterFaceTypes= {
  status:boolean,
  message:string,
  data:WalletObject | Array<Transaction> | Array<Asset> | Array<NFT>;
}
type WalletObject={
    "walletAddress":string,
    "assets": Array<Asset>,
    "transactions": Array<Transaction>,
    "nftAssets": Array<NFT>
}
type Transaction={
    "hash":string,
    "fromAddress": string,
    "toAddress": string,
    "value": number,
    gas:string,
    gasPrice:number,
    "txnType": string,
    "chainId": number,
    "coin": CoinSymbol,
    "blockNumber": number,
    "txnStatus": boolean,
    "txnTime": number
}

type NFT={
    "token_address": string,
    "token_id": string,
    "owner_of": string,
    "block_number": number,
    "block_number_minted": number,
    "token_hash": string,
    "amount": number,
    "contract_type": string,
    "name": string,
    "symbol": string,
    "token_uri": null,
    "minter_address": string,
    "chainId": number,
    "timestamp": number
  
}

type Asset={
    "value": number,
    "symbol": CoinSymbol,
    "chain": ChainName,
}

type CoinSymbol={
  symbol:string
}

type ChainName={
  chain:string
}




