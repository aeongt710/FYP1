import{ethers as r}from"./_snowpack/pkg/ethers.js";import m from"./artifacts/contracts/Campaign.sol/Campaign.json.proxy.js";import p from"./artifacts/contracts/Campaign.sol/CampaignFactory.json.proxy.js";export const GetAllCompaignFuncJS=async(e,n)=>{const a=new r.providers.JsonRpcBatchProvider(n),s=new r.Contract(e,p.abi,a),o=s.filters.CampaignCreatedEvent();return(await s.queryFilter(o)).map(t=>({title:t.args.title,campaignaddress:t.args.campignAddress,category:t.args.category,descriptionhash:t.args.descHash,imghash:t.args.imgHash,amountrequired:r.utils.formatEther(t.args.requiredAmount),owner:t.args.owner,publisheddate:new Date(parseInt(t.args.timestamp)*1e3).toLocaleString()}))},GetUnitCompaignsByAddressFuncJS=async(e,n,a)=>{if(!(typeof n!="undefined"&&n))throw"Please provide valid campaign address";const s=new r.providers.JsonRpcBatchProvider(a),o=new r.Contract(e,p.abi,s),i=o.filters.CampaignCreatedEvent();let t=(await o.queryFilter(i)).find(d=>d.args.campignAddress==n);if(!(typeof t!="undefined"&&t))throw"Campaign Not Found!";return{title:t.args.title,campaignaddress:t.args.campignAddress,category:t.args.category,descriptionhash:t.args.descHash,imghash:t.args.imgHash,amountrequired:r.utils.formatEther(t.args.requiredAmount),owner:t.args.owner,publisheddate:new Date(parseInt(t.args.timestamp)*1e3).toLocaleString()}},GetCompaignTransactionsFuncJS=async(e,n)=>{const s=new r.providers.JsonRpcBatchProvider(n).getSigner(),o=new r.Contract(e,m.abi,s),i=o.filters.DonatedEvent();return(await o.queryFilter(i)).map(g=>({amount:r.utils.formatEther(g.args.amount),donar:g.args.donar,timestamp:new Date(parseInt(g.args.timestamp)*1e3).toLocaleString()}))},DonateFuncJS=async(e,n)=>{try{console.log(e,n);const a=new r.providers.Web3Provider(window.ethereum,"any"),s=await a.getNetwork(),o=a.getSigner();await(await new r.Contract(e,m.abi,o).DonateFunc({value:r.utils.parseUnits(n.toString(),"ether")})).wait()}catch(a){throw console.log("Error DonateFuncJS",a),JSON.parse(JSON.stringify(a)).reason}},CreateCampaignFuncJS=async e=>{for(const t in e)if(!(typeof e[t]!="undefined"&&e[t]))throw`${t} is not defined`;const n=new r.providers.Web3Provider(window.ethereum,"any"),a=await n.getNetwork();if(!(a.name=="goerli"&&a.chainId==5))throw"Connect to GoerliETH Network";const s=n.getSigner(),o=new r.Contract(process.env.NEXT_PUBLIC_ADDRESS,p.abi,s),i=r.utils.parseEther(e.requiredAmount),c=await o.CreateCampaignFunc(e.campaignTitle,i,e.imageHash,e.descHash,e.category);console.log("CreateCampaignFuncJS result: ",c)};
