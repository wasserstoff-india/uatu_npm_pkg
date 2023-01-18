const EVMURL="http://localhost:8001";
import axios from "axios";

export const getWallet=async(headers:Object)=>{ 
  const res=await axios.get(`${EVMURL}/watch-me`,headers);
  return res;
}

export const getQueryResult=async(query:string,headers:Object)=>{
  let res;
  switch (query) {
    case "transaction":
      res=await axios.get(`${EVMURL}/getTransactions`,headers); 
      break;
    case "wallet":
      res=await axios.get(`${EVMURL}/getWAllet`,headers);
      break;
    case "asset":
      res=await axios.get(`${EVMURL}/getAssets`,headers);
      break; 
    default:
      res=await axios.get(`${EVMURL}/getNftAssets`,headers);
      break;
  }
  return res;
}