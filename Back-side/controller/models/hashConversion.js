import bs58 from 'bs58';
import { ethers } from 'ethers';
function base58ToHex(base58str) {
  const decoded = Buffer.from(bs58.decode(base58str));
  const hexstr = '0x' + decoded.toString('hex');
  return hexstr;
}

function hexToBase58(bytes32val) {
    const hexstr = ethers.utils.hexStripZeros(bytes32val).substring(2);
  
    const buffer = Buffer.from(hexstr, 'hex');
  
    const base58str = bs58.encode(buffer);
  
    return base58str;
  }
export {base58ToHex,hexToBase58}
  