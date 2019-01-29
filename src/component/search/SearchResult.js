import React from 'react';
import './Search.css';


export const SearchResult = (props) => {

   return (

     <div className={props.population > 2000000 ? "highlightedStyle":"searchResultStyle"} 
     onClick={() => props.showData(props.showDetailsUrl)}>{props.searchData.name}
     <div className="populationContainer">
     <span className="populationCount">{ props.searchData.population}</span>
     {props.population > 2000000 ? <span className="highPopulatedLabel">Highly Populated</span> : null}
     </div>
     </div>
   )
 
       

}