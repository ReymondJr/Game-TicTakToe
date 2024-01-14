import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import { Square } from './Componets/Square';
import { Turns} from './constant';
import { chechWinner } from './Componets/Checkwinner';
import {Winner} from "./Componets/Winner.jsx"
import { checkEndGame } from './Componets/Winner.jsx';

function App() {

  const [winner, setWinner] = useState(null)
  // const [board, setBoard] = useState(Array(9).fill(null))
  // const [board, serBoard] = useState(
  //   ["x", "x", "x","o","o","o","x","o","x"]
  //   )

  //Ahora vamos a ponerle algo de localstorage
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : 
    Array(9).fill(null)
  })

  const [turn, setTurns] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? Turns.X
  })
  // const [ turn, setTurns] = useState(Turns.X)
  
  // null es que no hay ganador, false es que hay un empate
 

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurns(Turns.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem(turn)
  }

  const updateBoard = (index) => {
    
    //esta linea verifica que el board no tenga nada 
    if(board[index] || winner) return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] =turn
    setBoard(newBoard)
    //cambiar turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurns(newTurn);
    //
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
   // verificar si hay un ganador
   const newWinner = chechWinner(newBoard)
   if(newWinner){
    confetti()
    setWinner(newWinner)
  }else if (checkEndGame(newBoard)){
    setWinner(false)
  }
  }

  //uso e implementacion de useEffect
  useEffect(() => {
    console.log("ganador")
  }, [winner])

  return (
    <main className='board'>
      <h1>Juego de Tic Tak Toc</h1>
      <button onClick={resetGame} >Reiniciar Juego</button>
      <section className='game'> 
        {
          board.map((bo, index) => {
            return (
               <Square 
               key={index}
               index={index}
               updateBoard={updateBoard}
               >
                {board[index]}
               </Square>
              )
            })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === Turns.X} >
          {Turns.X}
        </Square>
        <Square isSelected={turn === Turns.O}>
          {Turns.O}
        </Square>
      </section>

      <Winner winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
