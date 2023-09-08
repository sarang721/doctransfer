import React from 'react'
import './Mainpage.css'
import { Link } from 'react-router-dom'

function Mainpage() {
    return (
        <div className="mainpagess">
            <div className="navbar">
                <div>
                    <h1>Decentralized Document Issue </h1>
                    </div>

                    <div>
                        <ul className="unordered">
                           <Link className="link" to="/login"> <li className="lists">Student Login</li>    </Link>
                            <Link className="link" to="/adminlogin"><li className="lists">Authority Login</li></Link>
                        </ul>
                    </div>

            </div>

            <div className="imgg">
               
                <img className="imagexyz" src={require("./photo/images.jpg").default}></img>
                <h1 className="simple">Document Issuing Made<br/> Simple</h1>
            </div>
            
        </div>
    )
}

export default Mainpage
