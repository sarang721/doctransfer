import React ,{useState,useEffect} from 'react'
import { db } from './Firebase';
import './Registration.css'
import web3 from './web3';
import {useAuth} from './AuthContext'
import { collection, query, where, getDocs ,addDoc,doc} from "firebase/firestore";


function Registration() {



    const {currentuser}=useAuth();
    const [approved,setapproved]=useState(false);
    const [address,setaddress]=useState(null);
    const [name,setname]=useState();
    const [wallet,setwallet]=useState();
    const [password,setpassword]=useState();

    
    const approvedstatus=async()=>{
            const q=await collection(db,"approved");
            const snap=await getDocs(q);
            snap.forEach((data)=>{
                if(data.data().uid===currentuser.uid)
                {  setwallet(data.data().address)
                        setapproved(true);
                }
            })
    }
    const getwallet=async()=>{

        const accounts=await web3.eth.getAccounts();
        console.log(accounts[0]);
        setaddress(accounts[0]);

    }
    const getname=async()=>{

        const q = query(collection(db, "users"), where("uid", "==", currentuser.uid));
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
           setname(doc.data().name)
    });

    }



    useEffect(() => {
        getwallet();
        getname();
        approvedstatus();

    }, [])

    const proceed=async()=>{

        if(approved)
        {
            alert("Profile already Filled")
            return;
        }

        const q=await collection(db,"registration");

        const snap=await getDocs(q);

        var flag=0;

        snap.forEach((doc)=>{
            if(doc.data().address===address)
            {
                flag=1;
                alert("Ethereum address already taken")
                return ;
            }

        })

        if(flag==0){

        try{
        const docRef = await addDoc(collection(db, "approved"), {
            uid:currentuser.uid,
            password:password,
            address:address,
            name:name, 
          });

          alert("Profile Updated")

        }
        catch(e){
            alert(e.message)
        }

    }

    }



    return (

        <div className="regis">

                
            <h1 className="head">Update Your Profile</h1>

        <div className="registration">
            <label className="label">Enter Password (Needed during document Retrieval)</label>
            <br/>
            <input className="input"  value={password} onChange={(e)=>setpassword(e.target.value)}  type="password"></input>
            <br/>

            <label className="label">Your Ethereum Wallet Address(From Metamask wallet)</label>
            <br/>
            <input className="input"  type="text" placeholder={address} readOnly ></input>
            <br/>

            <button className="button1" onClick={proceed} >Proceed</button>
            
        </div>
                


        <table id="customers">
            <tr>
                <th>Name</th>
                <th>Your Wallet Address</th>
                <th>Profile Status</th>
            </tr>
            <tr>
           
    <td>{name}</td>
    <td>{wallet}</td>
    {
        approved? 
        <td><button  style={{backgroundColor:"green"}} className="btn">Completed</button></td>
        :
        <td><button className="btn">Incomplete</button></td>

    }
  
            </tr>
        </table>
        </div>
    )
}

export default Registration
