
//const axios = require('axios');
//const FormData = require('form-data');

//const NEXT_PINATA_API_KEY=process.env.NEXT_PUBLIC_PINATA_API_KEY
//const NEXT_PINATA_API_SECRET=process.env.NEXT_PUBLIC_PINATA_API_SECRET

//// const NEXT_PINATA_API_KEY=process.env.NEXT_PINATA_API_KEY
//// const NEXT_PINATA_API_SECRET=process.env.NEXT_PINATA_API_SECRET


//export const uploadJSONToIPFS = async(JSONBody) => {
//    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
//    return axios 
//        .post(url, JSONBody, {
//            headers: {
//                pinata_api_key: NEXT_PINATA_API_KEY,
//                pinata_secret_api_key: NEXT_PINATA_API_SECRET
//            }
//        })
//    //     .then(function (response) {
//    //        return {
//    //            success: true,
//    //            pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//    //        };
//    //     })
//    //     .catch(function (error) {
//    //         console.log(error)
//    //         return {
//    //             success: false,
//    //             message: error.message,
//    //         }
//    // });
//};

//export const uploadFileToIPFS = async(title,file) => {
//    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//    let data = new FormData();
//    data.append('file', file);

//    const metadata = JSON.stringify({
//        name: title
//    });
//    data.append('pinataMetadata', metadata);

//    // pinataOptions are optional
//    const pinataOptions = JSON.stringify({
//        cidVersion: 0,
//        customPinPolicy: {
//            regions: [
//                {
//                    id: 'FRA1',
//                    desiredReplicationCount: 1
//                },
//                {
//                    id: 'NYC1',
//                    desiredReplicationCount: 2
//                }
//            ]
//        }
//    });
//    data.append('pinataOptions', pinataOptions);

//    return axios 
//        .post(url, data, {
//            maxBodyLength: 'Infinity',
//            headers: {
//                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//                pinata_api_key: NEXT_PINATA_API_KEY,
//                pinata_secret_api_key: NEXT_PINATA_API_SECRET
//            }
//        })
//    //     .then(function (response) {
//    //         console.log("image uploaded", response.data.IpfsHash)
//    //         return {
//    //            success: true,
//    //            pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//    //        };
//    //     })
//    //     .catch(function (error) {
//    //         console.log(error)
//    //         return {
//    //             success: false,
//    //             message: error.message,
//    //         }
//    // });
//};
//export const PinataPublicGateway='https://gateway.pinata.cloud/ipfs';

//export const GetDescriptionFromPinata=async(hash)=>{
//    const url = `${PinataPublicGateway}/${hash}`;
//    return axios.get(url)
//}