import { combosWinner } from "../constant"

export const chechWinner = (boardCheck) => {
    for(const combo of combosWinner){
      const [ a, b, c] = combo 
      if(
          boardCheck[a] && 
          boardCheck[a] === boardCheck[b] &&
          boardCheck[a] === boardCheck[c]
        )
        {
          return boardCheck[a]
        }
    }
    return null
  }