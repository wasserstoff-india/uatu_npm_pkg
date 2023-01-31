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
    watchPrice(query?: Array<string>): Promise<any>;
    askPrice(query?: Array<string>): Promise<any>;
    ask(que: string): Promise<any>;
    private makeQueryString;
    private filterQuery;
}
//# sourceMappingURL=main.d.ts.map