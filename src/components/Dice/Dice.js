import React from 'react'
import './Dice.css'
export default function Dice(props) {
  return (
    <div className='die-face' style={{backgroundColor : props.isHeld ? "#59E391": "white"}} onClick={props.holdDice}>
      <h2 className='dice-num'>{props.value}</h2>
    </div>
  )
}
