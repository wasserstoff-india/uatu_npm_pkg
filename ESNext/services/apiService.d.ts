export declare const getWallet: (headers: Object) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getQueryResult: (query: string, headers: Object) => Promise<Wallet | Transaction[] | Asset[] | NFT[]>;
type Wallet = {
    "walletAddress": string;
    "assets": Array<Asset>;
    "transactions": Array<Transaction>;
    "nftAssets": Array<NFT>;
};
type Transaction = {
    "hash": string;
    "fromAddress": string;
    "toAddress": string;
    "value": number;
    "txnType": string;
    "chainId": number;
    "coin": CoinSymbol;
    "blockNumber": number;
    "txnStatus": boolean;
    "timestamp": number;
};
type NFT = {
    "token_address": string;
    "token_id": string;
    "owner_of": string;
    "block_number": number;
    "block_number_minted": number;
    "token_hash": string;
    "amount": number;
    "contract_type": string;
    "name": string;
    "symbol": string;
    "token_uri": null;
    "minter_address": string;
    "chainId": number;
    "timestamp": number;
};
type Asset = {
    "value": number;
    "symbol": CoinSymbol;
    "chain": ChainName;
};
type CoinSymbol = {
    symbol: string;
};
type ChainName = {
    chain: string;
};
export {};
//# sourceMappingURL=apiService.d.ts.map