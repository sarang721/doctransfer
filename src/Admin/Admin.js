import { signOut } from '@firebase/auth'
import React from 'react'
import './Admin.css'
import { useHistory } from 'react-router';
import {auth} from '../Firebase';
import {Link} from 'react-router-dom';

function Admin() {

    const history=useHistory();
    const logout=async()=>{
            signOut(auth);
            history.push("/")

    }

    return (
        <div className="sidebar">
            <h1>Welcome <br/>Admin</h1>

            <hr className="tag"/>
            <ul className="lll">
               <Link className="link" to="/adminhome"> <li className="ll">Issue a Document</li></Link>
                <li className="ll" onClick={logout} >Logout</li>
            </ul>

            
        </div>
    )
}

export default Admin
