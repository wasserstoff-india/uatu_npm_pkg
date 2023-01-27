import { beforeAll, describe, expect, test } from "@jest/globals";
import UATU from "../main.ts";
import { ethers } from "ethers";

const apiKey="$2b$10$4uNxGzXx/bGfzN0PYHDBGuEfpFOijq47DztnB5b9yCHxO1qcLaxdC";
const privateKey="0x6f1ef7c82e14fd783b48f7863b94bc890a362e21bd42ca89d61c98a14852819b";

let wallet,ua;

beforeAll(async()=>{
  wallet=new ethers.Wallet(privateKey);
  const address=await wallet.getAddress();
  console.log(address);
  ua=new UATU(wallet,apiKey);
  ua=await ua.verify(wallet,apiKey);
})

describe("Npm Test",()=>{
  test("get wallet success",async()=>{
    let response=await ua.ask("wallet")
    expect(response.status).toBe(200);
    
  });
  test("get nft success",async()=>{
    let response=await ua.ask("nft")
    expect(response.status).toBe(200);
    
  });
  test("get asset success",async()=>{
    let response=await ua.ask("asset")
    expect(response.status).toBe(200);
    
  });
  test("get transaction success",async()=>{
    let response=await ua.ask("transaction")
    expect(response.status).toBe(200);    
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