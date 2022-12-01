import { ethers } from 'ethers';
import Campaign from './artifacts/contracts/Campaign.sol/Campaign.json'
import CampaignFactory from './artifacts/contracts/Campaign.sol/CampaignFactory.json';
import { UploadDescoIPFS, UploadFileToIPFS } from './PinataInteractions';



//campaignfactory event address, rpc url
export const GetAllCompaignFuncJS = async (factoryaddress, rpc_url) => {
    const provider = new ethers.providers.JsonRpcBatchProvider(
        rpc_url
    );
    const contract = new ethers.Contract(
        factoryaddress,
        CampaignFactory.abi,
        provider
    );
    const getDeployedCampigns = contract.filters.CampaignCreatedEvent();
    let events = await contract.queryFilter(getDeployedCampigns);
    let jsonArray = events.map(a => {
        let obj = {
            "title": a.args.title,
            "campaignaddress": a.args.campignAddress,
            "category": a.args.category,
            "descriptionhash": a.args.descHash,
            "imghash": a.args.imgHash,
            "amountrequired": ethers.utils.formatEther(a.args.requiredAmount),
            "owner": a.args.owner,
            "publisheddate": new Date(parseInt(a.args.timestamp) * 1000).toLocaleString()
        }
        return obj
    });
    return jsonArray;
}


export const GetCompaignsByCategoryIndexFuncJS = async (factoryaddress, category,rpc_url) => {
    const provider = new ethers.providers.JsonRpcBatchProvider(
        rpc_url
    );
    const contract = new ethers.Contract(
        factoryaddress,
        CampaignFactory.abi,
        provider
    );
    const getDeployedCampigns = contract.filters.CampaignCreatedEvent(null,category);
    let events = await contract.queryFilter(getDeployedCampigns);
    let jsonArray = events.map(a => {
        let obj = {
            "title": a.args.title,
            "campaignaddress": a.args.campignAddress,
            "category": a.args.category,
            "descriptionhash": a.args.descHash,
            "imghash": a.args.imgHash,
            "amountrequired": ethers.utils.formatEther(a.args.requiredAmount),
            "owner": a.args.owner,
            "publisheddate": new Date(parseInt(a.args.timestamp) * 1000).toLocaleString()
        }
        return obj
    });
    return jsonArray;
}


//campaign created event address, rpc url
//export const GetCompaignsByOwnerAddressFuncJS = async (address, rpc_url) => {
//    if (!(typeof address !== 'undefined' && address))
//        throw "Please provide valid campaign address"
//    const provider = new ethers.providers.JsonRpcBatchProvider(
//        process.env.rpc_url
//    );
//    const contract = new ethers.Contract(
//        process.env.NEXT_PUBLIC_ADDRESS,
//        CampaignFactory.abi,
//        provider
//    );
//    const getDeployedCampigns = contract.filters.CampaignCreatedEvent(address);
//    let events = await contract.queryFilter(getDeployedCampigns);
//    console.log(events)
//    return events;
//}

export const GetUnitCompaignsByAddressFuncJS = async (factoryaddress,campaignaddress, rpc_url) => {
    if (!(typeof campaignaddress !== 'undefined' && campaignaddress))
        throw "Please provide valid campaign address"
    const provider = new ethers.providers.JsonRpcBatchProvider(
        rpc_url
    );
    const contract = new ethers.Contract(
        factoryaddress,
        CampaignFactory.abi,
        provider
    );
    const getDeployedCampigns = contract.filters.CampaignCreatedEvent();
    let events = await contract.queryFilter(getDeployedCampigns);
    let unit = events.find(x => x.args.campignAddress == campaignaddress);
    if (!(typeof unit !== 'undefined' && unit))
        throw "Campaign Not Found!"

    let obj = {
        "title": unit.args.title,
        "campaignaddress": unit.args.campignAddress,
        "category": unit.args.category,
        "descriptionhash": unit.args.descHash,
        "imghash": unit.args.imgHash,
        "amountrequired": ethers.utils.formatEther(unit.args.requiredAmount),
        "owner": unit.args.owner,
        "publisheddate": new Date(parseInt(unit.args.timestamp) * 1000).toLocaleString()
    }
    return obj;
}

export const GetCompaignTransactionsFuncJS = async (campignAddress, rpc_url) => {
  const provider = new ethers.providers.JsonRpcBatchProvider(
      rpc_url
  );
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    campignAddress,
    Campaign.abi,
    signer
  );
  const getDeployedCampigns = contract.filters.DonatedEvent();
  let events = await contract.queryFilter(getDeployedCampigns);
  let jsonArray = events.map(a => {
        let obj = {
            "amount": ethers.utils.formatEther(a.args.amount),
            "donar": a.args.donar,
            "timestamp": new Date(parseInt(a.args.timestamp) * 1000).toLocaleString()
        }
        return obj
  });
    return jsonArray;
}


export const DonateFuncJS = async (contractAddress, donationAmount) => {
    try {
    console.log(contractAddress, donationAmount)
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const nrk = await provider.getNetwork()
    const account = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Campaign.abi, account);
        const transaction = await contract.DonateFunc({ value: ethers.utils.parseUnits(donationAmount.toString(), "ether") })
    await transaction.wait();
  } catch (err) {
    console.log("Error DonateFuncJS",err)
    throw JSON.parse(JSON.stringify(err)).reason
  }
}


//export const ApproveCampaignFuncJS = async (campaignContractAddress) => {
//  try {
//    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
//    const nrk = await provider.getNetwork()
//    if (!(nrk.name == "goerli" && nrk.chainId == 5))
//      throw "Connect to GoerliETH Network"
//    const signer = provider.getSigner();
//    const contract = new ethers.Contract(campaignContractAddress, Campaign.abi, signer);
//    const transaction = await contract.ApproveFunc();
//    var result = await transaction.wait();
//    console.log(result)
//  } catch (err) {
//    console.log("Error ApproveCampaignFuncJS")
//    console.log(JSON.parse(JSON.stringify(err)).reason)
//    throw JSON.parse(JSON.stringify(err)).reason
//  }
//}


export const CreateCampaignFuncJS = async (form, key, secret, factoryaddress) => {

    let submitForm = null;
    console.log("json form",form)
    let descTask=UploadDescoIPFS(form.description,key,secret);
    let imgTask = UploadFileToIPFS(form.imgClassGuid, form.imgClassGuid, key, secret);

    await Promise.all([imgTask, descTask]).then((res) => {
        submitForm = {
            title: form.title,
            amount: form.amount,
            category: form.category,
            imageHash: res[0].pinataHASH,
            descHash: res[1].pinataHASH
        }
        console.log("sibmit form",submitForm)
    })

  //for (const property in form) {
  //  if (!(typeof form[property] !== 'undefined' && form[property]))
  //    throw `${property} is not defined`
  //}
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const account = provider.getSigner();
        const contract = new ethers.Contract(
            factoryaddress,
            CampaignFactory.abi,
            account
        );
        const CampaignAmount = ethers.utils.parseEther(form.amount+"");
        const campaignData = await contract.CreateCampaignFunc(
            submitForm.title,
            CampaignAmount,
            submitForm.imageHash,
            submitForm.descHash,
            submitForm.category
        );
        console.log("CreateCampaignFuncJS result: ", campaignData)
    } catch (err) {
        console.log("Error CreateCampaignFuncJS", err)
        throw JSON.parse(JSON.stringify(err)).reason
    }
  
}





//export const GetCompaignByAddressByFilterFuncJS = async (address) => {
//  if (!(typeof address !== 'undefined' && address))
//    throw "Please provide valid campaign address"
//  const provider = new ethers.providers.JsonRpcBatchProvider(
//    process.env.NEXT_PUBLIC_RPC_URL
//  );
//  const contract = new ethers.Contract(
//    process.env.NEXT_PUBLIC_ADDRESS,
//    CampaignFactory.abi,
//    provider
//  );
//  const getDeployedCampigns = contract.filters.CampaignCreatedEvent();
//  let events = await contract.queryFilter(getDeployedCampigns);
//  console.log(events)
//  const campaign = events.filter((value) => { return value.args.campignAddress == address })
//  if (campaign == undefined)
//    throw "Campaign Not Found!"
//  console.log("inside blockchain interactions",campaign)
//  return campaign
//}


//const network = {
//  goerli: {
//    chainId: 5,
//    chainName: 'Goerli test network',
//    nativeCurrency: {
//      name: 'GoerliETH',
//      symbol: 'GoerliETH',
//      decimals: 18
//    },
//    rpcUrls: ['https://goerli.infura.io/v3/'],
//    blockExplorerUrls: ['https://goerli.etherscan.io']
//  }
//}