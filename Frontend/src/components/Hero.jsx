import React from 'react'
import './Hero.css'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div>
            <div className="offer-container">
                <div className="offer-child"> FLAT 30% OFF !</div>
            </div>
          
             <div className="home-container">
            
     

            <img src={assets.diya3} alt=" clothes and offer" />
            <div className="highlights">
              
              <div className="h-item">South Indian</div>
              <div className="h-item">Bandhni</div>
              <div className="h-item">Paithani</div>
              <div className="h-item">Soft Silk</div>
              <div className="h-item">Koimtur</div>
              <div className="h-item">Catlog</div>
            </div>
         
          </div>
          {/* <div className="bookorder">
          VISIT AND <span>BOOK</span>  ORDER NOW !
          </div>
          */}

        </div>
    )
}

export default Hero
