import web3 from "./web3";
import Docabi from './contracts/Document.json';

const instance=new web3.eth.Contract(
    Docabi.abi,
    "0x9E0C3E63aaeE665A6732EA43Cf502130601B001f"
);



export default instance;
