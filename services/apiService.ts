const EVMURL="http://localhost:8002";
import axios, { AxiosResponse } from "axios";

export const getWallet=async(headers:Object)=>{ 
  try {
    return await axios.get(`${EVMURL}/watch-me`,headers);    
  } catch (error:any) {
    throw new Error(error)    
  }
  
}


// export const getQueryResult=async(query:string,headers:Object)=>{
//   try {    
//     switch (query) {
//       case "transactions":
//         return await axios.get(`${EVMURL}/getTransactions`,headers); 
//       case "wallet":
//         return await axios.get(`${EVMURL}/getWAllet`,headers);
//       case "assets":
//         return await axios.get(`${EVMURL}/getAssets`,headers); 
//       case "nfts":
//         return await axios.get(`${EVMURL}/getNftAssets`,headers);
//       default:
//         throw new Error("Invalid Query");  
//     }
//   } catch (error:any) { 
//     throw new Error(error)
//   }

  export const getQueryResult=async(query:string,headers:Object)=>{
    let res;
    try {    
      switch (query) {
        case "transactions":
          res= (await axios.get(`${EVMURL}/getTransactions`,headers));
          console.log(res);
           
          return res.data.data;
        case "wallet":
          res= (await axios.get(`${EVMURL}/getWAllet`,headers)).data;
          console.log(res);          
          return res; 
        case "assets":
          res= (await axios.get(`${EVMURL}/getAssets`,headers));
          return res;  
        case "nfts":
          res= (await axios.get(`${EVMURL}/getNftAssets`,headers));
          return res;
        default:
          throw new Error("Invalid Query");  
      }
    } catch (error:any) { 
      console.log(error);
      
      throw new Error(error)
    }
  }

// interface AxiosResponseType extends AxiosResponse<InterFaceTypes>{
//   data:InterFaceTypes
//   status: number;
//   statusText: string;
//   headers: any;
//   config: any;
//   request?: any;
// }
// type InterFaceTypes= {
//   status:boolean,
//   message:string,
//   data:Wallet | Array<Transaction> | Array<Asset> | Array<NFT>;
// }
// type Wallet={
//     "walletAddress":string,
//     "assets": Array<Asset>,
//     "transactions": Array<Transaction>,
//     "nftAssets": Array<NFT>
// }
// type Transaction={
//     "hash":string,
//     "fromAddress": string,
//     "toAddress": string,
//     "value": number,
//     gas:string,
//     gasPrice:number,
//     "txnType": string,
//     "chainId": number,
//     "coin": CoinSymbol,
//     "blockNumber": number,
//     "txnStatus": boolean,
//     "txnTime": number
// }

// type NFT={
//     "token_address": string,
//     "token_id": string,
//     "owner_of": string,
//     "block_number": number,
//     "block_number_minted": number,
//     "token_hash": string,
//     "amount": number,
//     "contract_type": string,
//     "name": string,
//     "symbol": string,
//     "token_uri": null,
//     "minter_address": string,
//     "chainId": number,
//     "timestamp": number
  
// }

// type Asset={
//     "value": number,
//     "symbol": CoinSymbol,
//     "chain": ChainName,
// }

// type CoinSymbol={
//   symbol:string
// }

// type ChainName={
//   chain:string
// }
