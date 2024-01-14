import { Square } from "./Square"
export function Winner ({winner, resetGame}) {
    
    if(winner === null)return null

    const winnerText = winner === false ? 'Empate' : 'Gano'
    return (
   <section className='winner'>
            <div className='text' >
              <h2>
                {
                  winner === false ? 'Empate' : 'Gano'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
      )
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((Square) => Square !== null)
}

