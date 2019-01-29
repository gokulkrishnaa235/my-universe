import React  from 'react';
import './Header.css';


export const Header = (props) => {

   return (

     <div className="header"> 
        <div className="Title">
            My Universe
        </div>
        <div className="signout-container" onClick={props.signout}>
            Sign out
        </div>
     </div>
   )
 
       

}