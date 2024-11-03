import { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './CoffeeShop.css'

function CoffeeShop() {
    return (
      <div className='background-wrapper'>
        <img className='coffeehouse' src='coffeehouse.png' alt='coffeehouse'/>
        <img className='jukebox' src='jukebox.png' alt='juke'/>
        <img className='coffee' src ='coffee.png' alt='coffee'/>
        <img className='bread' src ='bread.png' alt='bread'/>
      </div>
    )
}

export default CoffeeShop;
