import express from "express";import path from "node:path";import {fileURLToPath} from "node:url";import {tokens,trades,wallets,network} from "./data.js";import {analyze} from "./ai.js";
const app=express();const dir=path.dirname(fileURLToPath(import.meta.url));app.use(express.json());app.use(express.static(path.join(dir,"../public")));
app.get("/api/status",(_,r)=>r.json({mode:process.env.HELIUS_API_KEY?"provider-configured":"demo",ai:process.env.ANTHROPIC_API_KEY?"opus-5-5":"not-configured"}));
app.get("/api/radar",(_,r)=>r.json({tokens,trades:trades.slice(0,20)}));app.get("/api/wallets",(_,r)=>r.json(wallets()));app.get("/api/network",(_,r)=>r.json(network()));
app.post("/api/analyze",async(_,r)=>{try{r.json(await analyze())}catch(e){r.status(500).json({error:String(e)})}});
app.get("*splat",(_,r)=>r.sendFile(path.join(dir,"../public/index.html")));
app.listen(Number(process.env.PORT||3000),()=>console.log("TRENCHAI on http://localhost:3000"));