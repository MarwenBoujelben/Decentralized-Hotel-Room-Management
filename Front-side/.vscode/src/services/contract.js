import {ethers} from 'ethers'
import contractABI from './contractABI';
const getContract=()=>{
    const provider=new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    return new ethers.Contract(contractABI.address, contractABI.ABI, signer);
}

export default getContract