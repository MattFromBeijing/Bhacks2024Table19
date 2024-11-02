import { useEffect, useState, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './CoffeeShop.css'

function CoffeeShop() {
    return (
        <div>
          <img className='background' src='coffee3.png' alt='coffe' />
        </div>
    )
}

export default CoffeeShop;