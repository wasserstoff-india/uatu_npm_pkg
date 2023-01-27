const EVMURL="http://localhost:8001";
import axios from "axios";

export const getWallet=async(headers:Object)=>{ 
  try {
    return await axios.get(`${EVMURL}/watch-me`,headers);    
  } catch (error:any) {
    throw new Error(error)    
  }
  
}

export const getQueryResult=async(query:string,headers:Object)=>{
  try {    
    switch (query) {
      case "transaction":
        return await axios.get(`${EVMURL}/getTransactions`,headers); 
      case "wallet":
        return await axios.get(`${EVMURL}/getWAllet`,headers);
      case "asset":
        return await axios.get(`${EVMURL}/getAssets`,headers); 
      case "nft":
        return await axios.get(`${EVMURL}/getNftAssets`,headers);
      default:
        throw new Error("Invalid Query");  
    }
  } catch (error:any) { 
    throw new Error(error)
  }
  
}