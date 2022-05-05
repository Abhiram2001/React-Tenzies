import { nanoid } from 'nanoid';
import React from 'react'
import './App.css'
import Dice from './components/Dice/Dice'


export default function App() {

  function generateNewDie() {
    return {
        value:Math.ceil(Math.random()*6),
        isHeld: false,
        id : nanoid()
      }
  }

  function allNewDice() {
    const newDice = []
    for(let i=0 ;i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzie] = React.useState(false)
  const [score, setScore] = React.useState(0)

  React.useEffect( () => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if( allHeld && allSameValue) {
      setTenzie(true);
      console.log("You Won");
    }

  }, [dice])
  const diceElements = dice.map( (dieValue) => {
    return <Dice value={dieValue.value} key= {dieValue.id} isHeld = {dieValue.isHeld} holdDice = {() => holdDice(dieValue.id)} />
  })

  function holdDice(id) {
    setDice( oldDices =>
      oldDices.map(oldDice => {
        return oldDice.id === id ? {...oldDice, isHeld:!oldDice.isHeld} : oldDice
      })
    )
  }

  function rollDice() {
    if(tenzies) {
      setDice(allNewDice())
      setTenzie(false)
      setScore(0)
    }
    else {
      setDice( oldDices =>
        oldDices.map(oldDice => {
          return oldDice.isHeld ? oldDice : generateNewDie()
        })
      )
      setScore( score => score + 1)
    }
  }

  return (
    <main>
      <h1 className='title'> Tenzies </h1>
      <p className='instructions'>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='rollBtn' onClick={rollDice} > {tenzies ?  "New Game" : "Roll"} </button>
      <p className='score'> Score  : {score}</p>
      <p className='instructions'>😁 Lowest Score is Best Scorer 😁</p>
    </main>
  )
}
