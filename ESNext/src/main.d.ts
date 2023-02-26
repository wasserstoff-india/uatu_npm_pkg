import { Wallet } from "ethers";
export declare class UATU {
    private wallet?;
    private address;
    private apiKey;
    constructor(apiKey?: string, address?: string, wallet?: Wallet);
    private getSignature;
    private getHeaders;
    verify(apiKey: string, address?: string, wallet?: Wallet): this;
    watch(): Promise<any>;
    watchPrice(query?: Array<string>): Promise<any>;
    private askPrice;
    ask(que: string, coinsPayload?: string): Promise<any>;
    private makeQueryString;
    private filterQuery;
}
//# sourceMappingURL=main.d.ts.map