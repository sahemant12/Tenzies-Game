import "./App.css"
import Die from "../component/die"
import {React,useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
const [dice, setDice] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)
const [isDark, setIsDark] = useState(false)

useEffect(()=>{
  const allHeld = dice.every((die)=>die.isHeld)
  const firstValue = dice[0].value
  const allvalueSame = dice.every((die)=>firstValue===die.value)
  if(allHeld && allvalueSame){
    setTenzies(true)
    console.log("You Won!")
  }
},[dice])

function generateNewDice(){
  return {
    value:Math.floor(Math.random()*6)+1,
    isHeld:false,
    id:nanoid()
  }
}
  function allNewDice(){
    let array=[]
    for(let i=0; i<10; i++){
      array.push(generateNewDice())
    }
    return array
  }
  const diceValue = dice.map((num)=>{
    return <Die 
              value={num.value} 
              key={num.id} 
              isHeld={num.isHeld} 
              holdDice={()=>holdDice(num.id)}
            />
  })
function rollDice(){
  if(!tenzies){
    setDice((oldDice)=>oldDice.map((die)=>{
      return die.isHeld ? die : generateNewDice()      
  }))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }
  
}
function holdDice(id){
  setDice((oldDice)=>oldDice.map((value)=>{
    return value.id===id? {...value, isHeld: !value.isHeld}: value
    
  }))
}
//Dark-Mode Function
function toggleTheme(){
  setIsDark((prev)=>!prev)
  if(!isDark){
    document.body.classList.remove('bodyLight_bgColor')
    document.body.classList.add('bodyDark_bgColor')
    console.log(isDark)
  }else{
    document.body.classList.add('bodyLight_bgColor')
    console.log(isDark)
  }
}
  return (
    <>
     <main className={isDark? "main_DarkbgColor":"main_LightbgColor"}>

     <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'></label>
        </div>
      {tenzies && <Confetti/>}
      <div className="title"
            style={{color: isDark ? 'white' : ''}}>
            Tenzies</div>
      <p className="instructions" style={{color: isDark ? 'white' : ''}}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
      {diceValue}
      </div>
      <div className="roll-button">
      <button onClick={rollDice} className="btn">{tenzies?"New Game":"Roll"}</button>
      </div>
     </main>
    </>
  )
}

export default App
