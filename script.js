  const cells = document.querySelectorAll('.cell')
  const statusText = document.querySelector('.status span')
  const restartBtn = document.querySelector('.restart-btn')
  const modeBtns = document.querySelectorAll('.mode-btn')
  
  //this is the grid representation 
  let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]
  
  let winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  
  let currentPlayer = 'x'
  let gameActive = true
  let vsComputer = true
  
  cells.forEach((cell,index) => {
    cell.addEventListener('click',() => handleClick(cell,index))
  })
  
  function handleClick(cell,index) {
    if(board[index] !== "" || !gameActive) return
    
    playMove(index, currentPlayer)
    
    if(!gameActive) return
    
    if(vsComputer) {
      currentPlayer = 'o'
      setTimeout(computerMove, 300)
    }else {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
      statusText.textContent = currentPlayer.toUpperCase();
    }
  }
  
  function checkWinner() {
    for(let pattern of winPattern) {
      let [a,b,c] = pattern
      
      if(
        board[a] && 
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        statusText.textContent = board[a].toUpperCase() + " Wins!"
        gameActive = false
        return
      }
    }
    
    if(!board.includes("")) {
      statusText.textContent = "Draw!";
      gameActive = false;
    }
  }
  
  restartBtn.addEventListener('click', restartGame)
  
  function restartGame() {
    board = ["","","","","","","","",""]
    gameActive = true
    currentPlayer = 'x'
    statusText.textContent = 'X'
    
    cells.forEach(cell => {
      cell.textContent = ""
      cell.classList.remove("x", "o"); 
    })
  }
  
  modeBtns.forEach(btn => {
    btn.addEventListener('click',() => {
      modeBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      
      vsComputer = btn.textContent.includes('Computer')
      restartGame()
    })
  })
  
  function computerMove() {
    if(!gameActive) return;
    
    let move = findWinningMoves('o')
    
    if(move === -1) move = findWinningMoves('x')
    if(move === -1 && board[4] === '') move = 4
    if(move === -1) move = randomMove()
    
    playMove(move,'o')
    
    if(!gameActive) return
    currentPlayer = 'x'
    statusText.textContent = 'X'
  }
  
  function findWinningMoves(player) {
    for(let pattern of winPattern) {
      let [a,b,c] = pattern
      
      let line = [board[a],board[b],board[c]]
      //check 2 same + 1 empty
      if(line.filter(v => v === player).length === 2 && line.includes('')) {
        
        if(board[a] === "") return a
        if(board[b] === "") return b
        if(board[c] === "") return c
      }
    }
    return -1
  }
  
  function randomMove() {
    let empty = board.map((v,i) => v === '' ? i : null)
    .filter(v => v !== null)
    
    return empty[Math.floor(Math.random() * empty.length)]
  }
  
  function playMove(index,player) {
    if(board[index] !== "" || !gameActive) return
    
    board[index] = player
    cells[index].textContent = player
    cells[index].classList.add(player)
    
    checkWinner()
  }
  
  