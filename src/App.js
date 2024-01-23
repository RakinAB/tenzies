import './App.css';
import Die from './components/Die'
import React from 'react'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  
  const[dice, setDice] = React.useState(allNewDice())
  const[tenzies, setTenzies] = React.useState(false)  //endgame state
  const[rolls, setRolls] = React.useState(0)
  const[hs,setHs] = React.useState(0)
  
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            updateHighScore();
    }
  }, [dice]);

  React.useEffect(() => {
    saveHighScore();
  }, [hs]);

  function getHighScore() {
    // Retrieve high score from localStorage
    const storedHighScore = localStorage.getItem('highScore');
    return storedHighScore ? parseInt(storedHighScore, 10) : null;
  }

  function saveHighScore() {
    // Save high score to localStorage
    localStorage.setItem('highScore', hs.toString());
  }

  function updateHighScore() {
    if (rolls > hs) {
      setHs(rolls);
    }
  }
  //helper function to prevent repetitive code
  function generateNewDie(){
    return{
      value:Math.ceil(Math.random()*6), 
      isHeld: false,
      id: nanoid()
    }
  }

  //create the dice
  function allNewDice(){
    const newDie = []
    for(let i = 0; i < 10; i++){
      newDie.push(generateNewDie())
    }
    return newDie
  }


  function rollDice(){
    //Clicking New Game
    if(tenzies){
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
    } else{ //Normal Roll
      //only dice that isn't held will be rolled
      setRolls(prevRolls => prevRolls+1)
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ? die : generateNewDie()
      }))
    }
  }

  //map the dice array to see which dice are being held
  function holdDice(id){
    setDice(oldDice => oldDice.map(die=> {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
    }))
  }


  //Display all dice
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld = {die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    
    <main>
      {tenzies && <Confetti />}
      <div className='score'>
        <h1 className="numRolls"># of Rolls : {rolls}</h1>
        <h1 className="numRolls">High Score : {hs}</h1>
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceElements}
      </div>
      <button 
          className= 'roll-dice'
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  );
}

