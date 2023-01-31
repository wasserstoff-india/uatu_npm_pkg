
import EventEmitter from "events";
import axios from "axios";
import WebSocket from "ws";
import { EVMURL, priceTickerUrl, wsEVMURL } from "../constants/urlVar";

export const getWallet=async(headers:headers)=>{ 
  try {
    await axios.get(`${EVMURL}/watch-me`,headers);
    const ws=new WebSocket(`${wsEVMURL}/watch-me/${headers["headers"]["address"]}`);
    var ee = new EventEmitter()
    ws.on("open",()=>{
      ws.on("message",(data:string)=>{
        let res=JSON.parse(data);
        switch(res.query){
          case "asset":
            ee.emit('asset', res.data);
            break;
          case "transaction":
            ee.emit("transaction",res.data);
            break;
          case "nft":
            ee.emit("nft",res.data);
            break;
          case "wallet":
            ee.emit("wallet",res.data);
            break;
          default:
            ee.emit("message",res)
        }
      })
    })
    return ee;
  } catch (error:any) {
    throw new Error(error)    
  }
  
}

export const watchPrice=async(headers:headers,query?:string)=>{
  try {
    const ws=new WebSocket(`ws://localhost:8006/price?symbol=${query}`);
    var ee = new EventEmitter()
    ws.on("open",()=>{
      ws.on("message",(data:string)=>{
        let res=JSON.parse(data);
        ee.emit("ticker",res);
      })
    });
    return ee;
  } catch (error) {
    throw new Error(error)
  }
}

export const askPriceApi=async(headers:headers,query?:string)=>{
  try {
    return await axios.get(`${priceTickerUrl}/price?symbol=${query}`,headers);
  } catch (error) {
    throw new Error(error);
  }
}
export const getQueryResult=async(query:string,headers:Object,payload:string)=>{
  let res;
  try {    
    switch (query) {
      case "transactions":
        res= await axios.get(`${EVMURL}/getTransactions`,headers);
        return transactionResponse(res.data.data);
      case "wallet":
        res= await axios.get(`${EVMURL}/getWAllet`,headers);        
        return walletResponse(res.data.data);                
      case "assets":
        res= await axios.get(`${EVMURL}/getAssets`,headers);
        return assetResponse(res.data.data);  
      case "nfts":
        res= await axios.get(`${EVMURL}/getNftAssets`,headers);
        return nftResponse(res.data.data);
      default:
        res= await axios.get(`${EVMURL}/query/${payload}`,headers);
        return res;
    }
  } catch (error:any) { 
    console.log(error);
    throw new Error(error)
  }
}


const transactionResponse=(data:Array<Transaction>)=>{
  const response:Transaction[] = [];
  for (const d of data) {
    const obj:Transaction = {
      hash: d["hash"] || null,
      fromAddress: d["fromAddress"] || null,
      toAddress: d["toAddress"] || null,
      value: d["value"] || null,
      gas: d["gas"] || null,
      gasPrice: d["gasPrice"] || null,
      txnType: d["txnType"] || null,
      chainId: d["chainId"] || null,
      coin: d["coin"] || null,
      blockNumber: d["blockNumber"] || null,
      txnStatus: d["txnStatus"] || null,
      txnTime: d["txnTime"] || null
    };
    response.push(obj);
  }
  return response;
}

const nftResponse=(data:Array<NFT>)=>{
  const response: NFT[] = [];
  for (const d of data) {
    const obj: NFT = {
      token_address: d.token_address || null,
      token_id: d.token_id || null,
      owner_of: d.owner_of || null,
      block_number: d.block_number || null,
      block_number_minted: d.block_number_minted || null,
      token_hash: d.token_hash || null,
      amount: d.amount || null,
      contract_type: d.contract_type || null,
      name: d.name || null,
      symbol: d.symbol || null,
      token_uri: d.token_uri || null,
      minter_address: d.minter_address || null,
      chainId: d.chainId || null,
      timestamp: d.timestamp || null
    };
    response.push(obj);
  }
  return response;
}

const assetResponse=(data:Array<Asset>)=>{
  const response: Asset[] = [];
  for (const d of data) {
    const obj: Asset = {
      value: d.value || null,
      symbol: d.symbol || null,
      chain: d.chain || null
    };
    response.push(obj);
  }
  return response;
}

const walletResponse=(data:Wallet)=>{
  return{
    walletAddress:data.walletAddress,
    assets:assetResponse(data["balances"]),
    transactions:transactionResponse(data["transactions"]),
    nftAssets:nftResponse(data["nftAssets"])
  }
}

type headers={
  headers:{
    address:string,
    "x-api-key":string,
    "signature":string
  }
}
 type Wallet={
    walletAddress:string,
    balances: Array<Asset>,
    transactions: Array<Transaction>,
    nftAssets: Array<NFT>
}
 type Transaction={
    hash:string,
    fromAddress: string,
    toAddress: string,
    value: number,
    gas:string,
    gasPrice:number,
    txnType: string,
    chainId: number,
    coin: string,
    blockNumber: number,
    txnStatus: boolean,
    txnTime: number
}

type NFT={
    token_address: string,
    token_id: string,
    owner_of: string,
    block_number: number,
    block_number_minted: number,
    token_hash: string,
    amount: number,
    contract_type: string,
    name: string,
    symbol: string,
    token_uri: null,
    minter_address: string,
    chainId: number,
    timestamp: number
}

type Asset={
    value: number,
    symbol: string,
    chain: string,
}

