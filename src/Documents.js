import React from 'react'
import './Documents.css';
import { db } from './Firebase';
import { useEffect,useState} from 'react';
import Document from './Document';
import {Link} from 'react-router-dom';
import {useAuth} from './AuthContext'
import Popup from './Popup';
import { collection, query, where, getDocs ,addDoc,doc} from "firebase/firestore";

function Documents() {


    const {currentuser}=useAuth();
    const [approved,setapproved]=useState(false);
    const [password,setpassword]=useState();
    const [pass,setpass]=useState();
    const [flag,setflag]=useState(true);
    const [vis,setvis]=useState(false);
    const [address,setaddress]=useState();
    const [trig,settrig]=useState(false);
    const [img,setimg]=useState();
    const [docs,setdocs]=useState([]);



    const getdocs=async()=>{

        if(pass!=password){
        setflag(false);
        return ;
        }

    const count=await Document.methods.count().call();
    
    const data = await Promise.all(
      Array(parseInt(count)).fill().map((element,index) =>{

      return Document.methods.docs(index+1).call()
      })
    );

    var newdata=data.filter((val,idx)=>{
            if(address.localeCompare(val.to)==0)
            return val;

    })

    setdocs(newdata);

        setvis(true);

    }

    const approvedstatus=async()=>{
        const q=await collection(db,"approved");
        const snap=await getDocs(q);
        snap.forEach((data)=>{
            if(data.data().uid===currentuser.uid)
            {   
                setpassword(data.data().password);  
                setaddress(data.data().address);  
                setapproved(true);
            }
        })
}

        useEffect(() => {

            approvedstatus();
         
        }, [])

        

  return(
    <div className="voting">

    <h1 className="vote">Get Your Documents</h1>
    <br></br>
    {
        approved==false? <h1 className='heading'>You haven't Completed your profile , please do so to get the Documents</h1>:
        <div>
            <input type='password' className='password' value={pass} onChange={(e)=>setpass(e.target.value)} placeholder='Enter your password'></input>
            <br></br>
            <button className='btnn' onClick={()=>{
                getdocs();            }}>Get Documents</button>


                {

                    flag==false?<h2 className='heading'>Invalid Password</h2>:
                (

                    vis==false?<></>:(
        <table id="customers">
            <tr>
                <th>Name</th>
                <th>Issued By</th>
                <th>Issued On</th>
                <th>Description</th>
                <th>Valid Till</th>
                <th>View Document</th>
            </tr>


                        {
                            docs.map((val,idx)=>{
                                return(
                                <tr>
           
                                <td>{val.name}</td>
                                <td>{val.issuedBy}</td>
                                <td>{val.issuedon}</td>
                                <td>{val.desc} </td>
                                <td>{val.validtill}</td>
                                <td><button value={trig}   onClick={()=>{
                                    settrig(!trig);
                                    setimg(val.imageurl);
                                }}
                                                className='btn'>View</button></td>

                                        </tr>
                                )

                            })
                        }
            
           
        </table>

                    )
                )
}

    
        </div>

    }


     <Popup trigger={trig} image={img} strig={settrig} ></Popup>

   
        
</div>
)

}

export default Documents