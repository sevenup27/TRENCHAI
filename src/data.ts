export const tokens=[
{symbol:"TRENCH",priceUsd:.084,liquidityUsd:1850000,volume24hUsd:9200000},
{symbol:"RADAR",priceUsd:.021,liquidityUsd:720000,volume24hUsd:4100000},
{symbol:"AIPEPE",priceUsd:.0064,liquidityUsd:430000,volume24hUsd:2800000}
];
export const trades=[
["7xWalletA","TRENCH","BUY",42],["9xWalletB","TRENCH","BUY",31],["4xWalletC","TRENCH","BUY",18],
["8xWalletD","RADAR","BUY",27],["2xWalletE","RADAR","BUY",11],["7xWalletA","RADAR","BUY",15],
["9xWalletB","RADAR","BUY",21],["4xWalletC","AIPEPE","BUY",14],["8xWalletD","TRENCH","BUY",12],
["2xWalletE","TRENCH","SELL",9],["7xWalletA","AIPEPE","BUY",22],["9xWalletB","AIPEPE","BUY",13],
["4xWalletC","RADAR","SELL",8],["8xWalletD","AIPEPE","BUY",17],["2xWalletE","RADAR","SELL",6]
].map((x,i)=>({id:`demo-${i}`,wallet:x[0],token:x[1],side:x[2],sol:Number(x[3]),timestamp:new Date(Date.now()-i*540000).toISOString()}));
export function wallets(){
const ws=[...new Set(trades.map(x=>x.wallet))];
return ws.map(w=>{const r=trades.filter(x=>x.wallet===w);return {wallet:w,trades:r.length,buys:r.filter(x=>x.side==="BUY").length,sells:r.filter(x=>x.side==="SELL").length,tokens:[...new Set(r.map(x=>x.token))]}})
}
export function network(){
const nodes=[...new Set(trades.flatMap(x=>[x.wallet,x.token]))];
return {nodes,edges:trades.map(x=>({source:x.wallet,target:x.token,label:`${x.side} ${x.sol} SOL`}))}
}
