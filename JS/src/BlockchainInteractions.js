import { ethers } from 'ethers';
import Campaign from './artifacts/contracts/Campaign.sol/Campaign.json'
const CampaignFactory = require('./artifacts/contracts/Campaign.sol/CampaignFactory.json');


export const DonateFuncJS = async (contractAddress, donationAmount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const nrk = await provider.getNetwork()
    if (!(nrk.name == "goerli" && nrk.chainId == 5))
      throw "Connect to GoerliETH Network"
    const account = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Campaign.abi, account);
    const transaction = await contract.DonateFunc({ value: ethers.utils.parseUnits(donationAmount, "ether") })
    await transaction.wait();
  } catch (err) {
    console.log("Error DonateFuncJS")
    throw JSON.parse(JSON.stringify(err)).reason
  }
}


export const ConnectWalletFuncJS = async () => {
  if (await window?.ethereum?.request({ "method": "eth_requestAccounts" })) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const nrk = await provider.getNetwork()
    // console.log(nrk)
    if (!(nrk.name == "goerli" && nrk.chainId == 5))
      throw "Connect to GoerliETH Network"
    const account = provider.getSigner();
    const address = await account.getAddress();
    const rawBalance = await account.getBalance();
    return { address: address, balance: ethers.utils.formatEther(rawBalance) }
  } else {
    throw "Metamask not installed!";
  }
};


export const GetAllCompaignFuncJS = async () => {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );
  const getDeployedCampigns = contract.filters.CampaignCreatedEvent();
  let events = await contract.queryFilter(getDeployedCampigns);
  return events;
}


export const GetCompaignTransactionsFuncJS = async (campignAddress) => {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    campignAddress,
    Campaign.abi,
    signer
  );
  const getDeployedCampigns = contract.filters.DonatedEvent();
  let events = await contract.queryFilter(getDeployedCampigns);
  return events;
}


export const ApproveCampaignFuncJS = async (campaignContractAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const nrk = await provider.getNetwork()
    if (!(nrk.name == "goerli" && nrk.chainId == 5))
      throw "Connect to GoerliETH Network"
    const signer = provider.getSigner();
    const contract = new ethers.Contract(campaignContractAddress, Campaign.abi, signer);
    const transaction = await contract.ApproveFunc();
    var result = await transaction.wait();
    console.log(result)
  } catch (err) {
    console.log("Error ApproveCampaignFuncJS")
    console.log(JSON.parse(JSON.stringify(err)).reason)
    throw JSON.parse(JSON.stringify(err)).reason
  }
}


export const TestWallet = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const nrk = await provider.getNetwork()
  if (!(nrk.name == "goerli" && nrk.chainId == 5))
    throw "Connect to GoerliETH Network"
}

export const CreateCampaignFuncJS = async (form) => {

  for (const property in form) {
    if (!(typeof form[property] !== 'undefined' && form[property]))
      throw `${property} is not defined`
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const nrk = await provider.getNetwork()
  if (!(nrk.name == "goerli" && nrk.chainId == 5))
    throw "Connect to GoerliETH Network"
  const account = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    account
  );
  const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);
  const campaignData = await contract.CreateCampaignFunc(
    form.campaignTitle,
    CampaignAmount,
    form.imageHash,
    form.descHash,
    form.category
  );
  console.log("CreateCampaignFuncJS result: ", campaignData)
}


export const GetCompaignsByAddressFuncJS = async (address) => {
  if (!(typeof address !== 'undefined' && address))
    throw "Please provide valid campaign address"
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  // const nrk= await provider.getNetwork()
  // if (!(nrk.name=="goerli"&&nrk.chainId==5))
  //   throw "Connect to GoerliETH Network"
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );
  const getDeployedCampigns = contract.filters.CampaignCreatedEvent(address);
  let events = await contract.queryFilter(getDeployedCampigns);
  console.log(events)
  return events;
}


export const GetCompaignByAddressByFilterFuncJS = async (address) => {
  if (!(typeof address !== 'undefined' && address))
    throw "Please provide valid campaign address"
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );
  const getDeployedCampigns = contract.filters.CampaignCreatedEvent();
  let events = await contract.queryFilter(getDeployedCampigns);
  console.log(events)
  const campaign = events.filter((value) => { return value.args.campignAddress == address })
  if (campaign == undefined)
    throw "Campaign Not Found!"
  console.log("inside blockchain interactions",campaign)
  return campaign
}


const network = {
  goerli: {
    chainId: 5,
    chainName: 'Goerli test network',
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GoerliETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io']
  }
}