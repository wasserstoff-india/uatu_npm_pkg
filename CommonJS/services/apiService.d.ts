export declare const getWallet: (headers: Object) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getQueryResult: (query: string, headers: Object, payload: string) => Promise<import("axios").AxiosResponse<any, any> | Transaction[] | NFT[] | Asset[] | {
    walletAddress: string;
    assets: Asset[];
    transactions: Transaction[];
    nftAssets: NFT[];
}>;
type Transaction = {
    hash: string;
    fromAddress: string;
    toAddress: string;
    value: number;
    gas: string;
    gasPrice: number;
    txnType: string;
    chainId: number;
    coin: string;
    blockNumber: number;
    txnStatus: boolean;
    txnTime: number;
};
type NFT = {
    token_address: string;
    token_id: string;
    owner_of: string;
    block_number: number;
    block_number_minted: number;
    token_hash: string;
    amount: number;
    contract_type: string;
    name: string;
    symbol: string;
    token_uri: null;
    minter_address: string;
    chainId: number;
    timestamp: number;
};
type Asset = {
    value: number;
    symbol: string;
    chain: string;
};
export {};
//# sourceMappingURL=apiService.d.ts.map