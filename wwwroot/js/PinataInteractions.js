import p from"./_snowpack/pkg/axios.js";import l from"./_snowpack/pkg/form-data.js";export const UploadDescoIPFS=async(a,n,i)=>{const s="https://api.pinata.cloud/pinning/pinJSONToIPFS";return p.post(s,{desc:a},{headers:{pinata_api_key:n,pinata_secret_api_key:i}}).then(function(t){return{pinataHASH:t.data.IpfsHash}}).catch(function(t){throw console.log(t),t.message})},UploadFileToIPFS=async(a,n,i,s)=>{var t=document.getElementsByClassName(n)[0].files[0];const c="https://api.pinata.cloud/pinning/pinFileToIPFS";let e=new l;e.append("file",t);const r=JSON.stringify({name:a});e.append("pinataMetadata",r);const d=JSON.stringify({cidVersion:0,customPinPolicy:{regions:[{id:"FRA1",desiredReplicationCount:1},{id:"NYC1",desiredReplicationCount:2}]}});return e.append("pinataOptions",d),p.post(c,e,{maxBodyLength:"Infinity",headers:{"Content-Type":`multipart/form-data; boundary=${e._boundary}`,pinata_api_key:i,pinata_secret_api_key:s}}).then(function(o){return console.log("Img post response",o),{pinataHASH:o.data.IpfsHash}}).catch(function(o){throw console.log(o),o.message})},PinataPublicGateway="https://gateway.pinata.cloud/ipfs",GetDescriptionFromPinata=async a=>{const n=`${PinataPublicGateway}/${a}`;return(await p.get(n)).data.desc};