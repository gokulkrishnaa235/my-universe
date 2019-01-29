import React from 'react';
import './Search.css';


export const ShowDetails = (props) => {
   return (

     <div className="cartStyle">
        <h1 className="cardHeader">{props.displayData.name}</h1>
        <div className="descriptionMainStyle">
          <table>
            <tbody>
              <tr>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </tbody>  
            <tbody>  
              <tr>
                <td>Diameter</td>
                <td>{props.displayData.diameter}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Population</td>
                <td>{props.displayData.population}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Gravity</td>
                <td>{props.displayData.gravity}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Climate</td>
                <td>{props.displayData.climate}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Orbital Period</td>
                <td>{props.displayData.orbital_period}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Rotation Period</td>
                <td>{props.displayData.rotation_period}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Surface Water:</td>
                <td>{props.displayData.surface_water}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Terrain</td>
                <td>{props.displayData.terrain}</td>
              </tr>
            </tbody>
          </table> 
        </div>
     </div>
   )
 
       

}