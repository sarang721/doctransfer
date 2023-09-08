import React from 'react'
import './Popup.css';
import CloseIcon from "@mui/icons-material/Close";

function Popup(props) {


  return props.trigger===false?null:(
    <div className='pop'>
        <button className='btn' onClick={()=>{
          props.strig(false);
        }
        }> Close</button>
        <img className='image' src={props.image}></img>

    </div>
  )
}

export default Popup