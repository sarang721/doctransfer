import logo from './logo.svg';
import {useState,useEffect} from 'react';
import web3 from './web3';
import Document from './contracts/Document.json'
import './App.css';
import { firebase } from './Firebase';
import Home from './Home';
import Login from './Login';
import Adminlogin from './Adminlogin';
import RegisterVoter from './Admin/RegisterVoter';
import Signup from './Signup';
import { AuthProvider } from './AuthContext';
import Registration from './Registration';
import Mainpage from './Mainpage';
import Admin from './Admin/Admin';
import Documents from './Documents';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';


function App() {


  const getaccounts=async()=>{

    const accounts=await web3.eth.getAccounts();
    console.log(accounts[0]);

  }

  const deploycontract=async()=>{

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(
      Document.abi
    )
      .deploy({ data: Document.bytecode })
      .send({ gas: '1000000', from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);

  }

  useEffect(() => {

   // getaccounts();
    //deploycontract();
    //  0x9E0C3E63aaeE665A6732EA43Cf502130601B001f
    
  
  }, [])

  return (

    <AuthProvider>
    <div className="App">
      
      <Router>

      <Switch>

      <Route exact path="/">

      <Mainpage></Mainpage>
      </Route>

      <Route exact path="/login">
        <Login></Login>

      </Route>

      

      <Route exact path="/adminlogin">
        <Adminlogin></Adminlogin>

      </Route>

      <Route exact path="/adminhome">
        <div className="adminhome">
        <Admin></Admin>
        <RegisterVoter></RegisterVoter>
        </div>

      </Route>



      <Route exact path="/signup">
        <Signup></Signup>

      </Route>
      <Route exact path="/home">

<div className="home1">
 
<Home></Home>
<Registration></Registration>

</div>
</Route>

<Route exact path="/getdocuments">

<div className="home1">
 
<Home></Home>
<Documents></Documents>

</div>
</Route>



    </Switch>

      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
