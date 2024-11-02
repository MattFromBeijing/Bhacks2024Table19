import { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './CoffeeShop.css'

function CoffeeShop() {
    return (
      <div className='background-wrapper'>
        <img className='background' src='coffee5.png' alt='coffee'/>
        <img className='jukebox' src='jukebox.png' alt='coffee'/>
      </div>
    )
}

export default CoffeeShop;
