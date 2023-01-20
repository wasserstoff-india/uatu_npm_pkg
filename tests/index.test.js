import { beforeAll, describe, expect, test } from "@jest/globals";

import { ethers } from "ethers";
import { UATU } from "../src/index";

const apiKey="$2b$10$4uNxGzXx/bGfzN0PYHDBGuEfpFOijq47DztnB5b9yCHxO1qcLaxdC";
const privateKey="0x6f1ef7c82e14fd783b48f7863b94bc890a362e21bd42ca89d61c98a14852819b";

let wallet,ua;

// beforeAll(async()=>{
//   wallet=new ethers.Wallet(privateKey);
//   ua=new UATU();
//   ua=await ua.verify(wallet,apiKey);
  
// })

describe("Npm Test",()=>{
  test("get wallet success",async()=>{
    wallet=new ethers.Wallet(privateKey);
    ua=new UATU();
    ua=await ua.verify(wallet,apiKey);
    let response=await ua.ask("wallet");

    expect(response).not.toBe(null);
    
  });
  // test("get nft success",async()=>{
  //   let response=await ua.ask("nfts)
  //   expect(response.status).toBe(200);
    
  // });
  // test("get asset success",async()=>{
  //   let response=await ua.ask("assets")
  //   expect(response.status).toBe(200);
    
  // });
  test("get transaction success",async()=>{
    wallet=new ethers.Wallet(privateKey);
    ua=new UATU();
    ua=await ua.verify(wallet,apiKey);
    let response=await ua.ask("getMETransaction");
    console.log(response);
    expect(response).not.toBe(null);    
  });
  test("get transaction success",async()=>{
    wallet=new ethers.Wallet(privateKey);
    ua=new UATU();
    ua=await ua.verify(wallet,apiKey);
    let response=await ua.ask("getMETransactionandwallet");
    console.log(response);
    expect(response).not.toBe(null);    
  });

  // test("get wallet Fail as wrong address that does not exist in db is being passed",async()=>{
  //   const options={
  //     apikey:apiKey,
  //     address:"0xF2f5C73fa04406b1995e397B55c24aB1f3eA726B",
  //     privateKey:privateKey
  //   }
  //   const ua=new UATU(options);
  //   let response=await ua.ask("wallet") 
  //    expect(response.status).toBe(500);    
  // });
  // test("get transaction Fail as wrong address that does not exist in db is being passed",async()=>{
  //   const options={
  //     apikey:apiKey,
  //     address:"0xF2f5C73fa04406b1995e397B55c24aB1f3eA726B",
  //     privateKey:privateKey
  //   }
  //   const ua=new UATU(options);
  //   let response=await ua.ask("transaction") 
  //    expect(response.status).toBe(500);    
  // });
  // test("get asset Fail as wrong address that does not exist in db is being passed",async()=>{
  //   const options={
  //     apikey:apiKey,
  //     address:"0xF2f5C73fa04406b1995e397B55c24aB1f3eA726B",
  //     privateKey:privateKey
  //   }
  //   const ua=new UATU(options);
  //   let response=await ua.ask("asset") 
  //    expect(response.status).toBe(500);    
  // });
  // test("get nft Fail as wrong address that does not exist in db is being passed",async()=>{
  //   const options={
  //     apikey:apiKey,
  //     address:"0xF2f5C73fa04406b1995e397B55c24aB1f3eA726B",
  //     privateKey:privateKey
  //   }
  //   const ua=new UATU(options);
  //   let response=await ua.ask("nft") 
  //    expect(response.status).toBe(500);    
  // });


  
})