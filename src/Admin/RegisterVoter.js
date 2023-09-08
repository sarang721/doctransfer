import React ,{useEffect,useState}from 'react'
import './RegisterVoter.css'
import Document from '../Document';
import web3 from '../web3';
import {db} from '../Firebase'
import { collection, doc,query, where, getDocs ,deleteDoc,addDoc} from "firebase/firestore";


function RegisterVoter() {


  const [name,setname]=useState(null);
  const [address,setaddress]=useState(null);
  const [url,seturl]=useState(null);
  const [issuedby,setissuedby]=useState(null);
  const [issuedon,setissuedon]=useState(null);
  const [desc,setdesc]=useState(null);
  const [valid,setvalid]=useState(null);
  const [manager,setmanager]=useState();


  const issue=async()=>{

    if(name==null || address==null || url==null || issuedby==null || issuedon==null || desc==null || valid==null)
    return ;


    try{
      const accounts=await web3.eth.getAccounts();
      await Document.methods.senddocument(name,address,url,issuedby,issuedon,desc,valid).send({from:accounts[0],gas:12000000});

      alert("Document Issued Successfully");
    }
    catch(e)
    {
        alert(e);
    }


  }

  const getmanager=async()=>{

    const data=await Document.methods.manager().call();
    setmanager(data);

  }
  

    useEffect(() => {

      getmanager();

     
    }, [])


       

    return (
        <div className="registervoter">
            <h1 className="vote">Your Ethereum Wallet Address is {manager}</h1>
            
            <br/><br/>
            <h2 className="vote">Issue A Document</h2>
            <br></br>
            <br></br>

            <label>
         <h2 className='head'>Name</h2>
    <input className='' type="text" name="name"  value={name}  onChange={(e)=>setname(e.target.value)} />
  </label>
                <br/>
                <br></br>

                <label>
         <h2 className='head'>Student's Ethereum Wallet Address</h2>
    <input className='' type="text" name="name"  value={address}  onChange={(e)=>setaddress(e.target.value)}/>
  </label>
                <br/>
                <br></br>

                <label>
         <h2 className='head'>Image Url of Document</h2>
    <input className='' type="text" name="name" value={url}  onChange={(e)=>seturl(e.target.value)} />
  </label>
                <br/>
                <br></br>

                
                <label>
         <h2 className='head'>Issued By</h2>
    <input className='' type="text" name="name"  value={issuedby}  onChange={(e)=>setissuedby(e.target.value)} />
  </label>
                <br/>
                <br></br>

                
                <label>
         <h2 className='head'>Issued On</h2>
    <input className='' type="date" name="name" value={issuedon}  onChange={(e)=>setissuedon(e.target.value)} />
  </label>
                <br/>
                <br></br>

                <label>
         <h2 className='head'>Description</h2>
    <input className='' type="text" name="name"  value={desc}  onChange={(e)=>setdesc(e.target.value)}/>
  </label>
                <br/>
                <br></br>  

                <label>
         <h2 className='head'>Valid Till</h2>
    <input className='' type="date" name="name" value={valid}  onChange={(e)=>setvalid(e.target.value)} />
  </label>
                <br/>
                <br></br>
                <br></br>

                <button className="buttonn" onClick={()=>{
                  issue();
                    
                }}>Issue </button>
                <br></br>
                <br></br>

        </div>
    )
}

export default RegisterVoter
