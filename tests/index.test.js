import { beforeAll, describe, expect, test } from "@jest/globals";
import UATU from "../main.ts";
const apiKey="$2b$10$4uNxGzXx/bGfzN0PYHDBGuEfpFOijq47DztnB5b9yCHxO1qcLaxdC";
const address="0xF2f5C73fa04406b1995e397B55c24aB1f3eA726C";
const privateKey="wasssup";



describe("Npm Test",()=>{
  test("get wallet success",async()=>{
    const options={
      apikey:apiKey,
      address:address,
      privateKey:privateKey
    }
    const ua=new UATU(options);
    let response=await ua.ask("wallet")
    
    expect(response.status).toBe(200);
    
  });
  test("get nft success",async()=>{
    const options={
      apikey:apiKey,
      address:address,
      privateKey:privateKey
    }
    const ua=new UATU(options);
    let response=await ua.ask("nft")
    expect(response.status).toBe(200);
    
  });
  test("get asset success",async()=>{
    const options={
      apikey:apiKey,
      address:address,
      privateKey:privateKey
    }
    const ua=new UATU(options);
    let response=await ua.ask("asset")
    expect(response.status).toBe(200);
    
  });
  test("get transaction success",async()=>{
    const options={
      apikey:apiKey,
      address:address,
      privateKey:privateKey
    }
    const ua=new UATU(options);
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
  // });
  // test("get wallet Fail for missing headers",async()=>{
  //   const options={
  //     apikey:apiKey,
  //     address:"0xF2f5C73fa04406b1995e397B55c24aB1f3eA726B",
  //   }
  //   const ua=new UATU(options);
  //   let response=await ua.ask("wallet")
  // });


  
})