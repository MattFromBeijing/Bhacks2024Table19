import { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './Park.css'

function Park() {
    return (
      <div className='background-wrapper'>
        <img className='park' src='park.png' alt='park'/>
        <img className='world' src ='world.png' alt='world'/>
      </div>
    )
}

export default Park;
