import Anthropic from "@anthropic-ai/sdk";
import {trades,wallets} from "./data.js";
export async function analyze(){
if(!process.env.ANTHROPIC_API_KEY)return {summary:"Opus 5.5 is not connected. Add ANTHROPIC_API_KEY.",observations:["Demo observations are shown in the UI."],caveat:"No live signal is generated from demo data."};
const client=new Anthropic({apiKey:process.env.ANTHROPIC_API_KEY});
const r=await client.messages.create({model:process.env.ANTHROPIC_MODEL||"claude-opus-5-5",max_tokens:700,output_config:{effort:"medium"},system:"You are TRENCHAI. Analyze only supplied on-chain observations. Never invent transactions, prices or performance. Separate observations from hypotheses.",messages:[{role:"user",content:`Analyze these observations and return concise JSON with summary, observations array and caveat. Data: ${JSON.stringify({trades,wallets:wallets()})}`} ]});
const text=r.content.find(x=>x.type==="text")?.text||"";
try{return JSON.parse(text)}catch{return {summary:text,observations:[],caveat:"AI returned non-JSON text."}}
}