import { ethers } from 'ethers';
//import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json'
//const CampaignFactory = require('../artifacts/contracts/Campaign.sol/CampaignFactory.json');


export async function ConnectWalletFuncJS() {
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