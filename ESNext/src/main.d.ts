import { Wallet } from "ethers";
export declare class UATU {
    private wallet?;
    private address;
    private apiKey;
    constructor(wallet?: Wallet, apiKey?: string);
    private getSignature;
    private getHeaders;
    verify(wallet: Wallet, apiKey: string): this;
    watch(): Promise<any>;
    ask<T extends "wallet" | "transactions" | "assets" | "nfts">(query: T): Promise<any>;
}
//# sourceMappingURL=main.d.ts.map