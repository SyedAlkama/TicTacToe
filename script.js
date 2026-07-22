let game = (function(){  // Factory Function for the game object
    let gameboard = [1,2,3,4,5,6,7,8,9];

    let scores = {
        'X':0,
        'O':0
    };

    let playerTurn = 'X'; // Which Player's Turn 
    let roundMoves = 0; // How many moves in this round

    // reset all variables to start the new round but keeps the score
    function startNewRound(){
        roundMoves = 0;
        playerTurn = 'X';
        gameboard = [1,2,3,4,5,6,7,8,9];
    }

    // If the player exists increase its score
    function gameWinBy(winner){
        scores[winner]++;
    }

    // Reset the score to 0-0
    function resetScore(){
        scores['X']=0;
        scores['O']=0;
    }

    // play in one of the squares(1-9), changes the player itself 
    function playSquare(square){
        gameboard[square-1] = playerTurn;
        if (playerTurn == 'X'){
            playerTurn='O';
        } else {
            playerTurn='X';
        }
        roundMoves++;
    }

    // Gets the score
    function getScore(){
        return scores;
    }

    // Tells which player's turn it is
    function getPlayerTurn(){
        return playerTurn;
    }

    // Check if all the squares are filled
    function roundComplete(){
        return (roundMoves==9);
    }

    //Returns the Gameboard
    function getGameboard(){
        return gameboard;
    }

    return {gameWinBy,resetScore,playSquare,getScore,getPlayerTurn,roundComplete,getGameboard,startNewRound};
})();

let squares = document.getElementsByName("squares");
let feedback = document.getElementById("feedback");


// Reset Everything and start a New round 
document.getElementById("resetBtn").addEventListener("click",()=>{
    resetGrid();
    game.resetScore();
    updateScore();
    game.startNewRound();
    feedback.textContent= `${game.getPlayerTurn()} Turn!`;
})

Array.from(squares).forEach((square)=>{
    square.addEventListener('click',()=>{
        // Get which player turn , fill the square clicked with that player
        let player = game.getPlayerTurn();
        square.textContent = player;
        // play on that sqaure and disable the button 
        game.playSquare(square.id);
        square.disabled = true;
        // Check for a win or tie
        checkIfGameEnd(player);
    })
})

function checkIfGameEnd(player){
    if (winCondition(game.getGameboard())){
        game.gameWinBy(player);
        feedback.textContent= `${player} WONNNN!!!`;
        game.startNewRound();
        resetGrid();
        updateScore();
    }else if(game.roundComplete()){
        feedback.textContent = "Its a TIEEEEEE";
        game.startNewRound();
        resetGrid();
    }else{
        feedback.textContent= `${game.getPlayerTurn()} Turn!`;
    }
}

// reset the grid to blank 
function resetGrid(){
    squares.forEach((square)=>{
        square.textContent = "";
        square.disabled = false;
    })
}

// All winning conditions 
function winCondition(board){
    return ((board[0]==board[1] && board[1]==board[2])
            || (board[2]==board[5] && board[5]==board[8])
            || (board[6]==board[7] && board[7]==board[8])
            || (board[0]==board[3] && board[3]==board[6])
            || (board[0]==board[4] && board[4]==board[8])
            || (board[2]==board[4] && board[4]==board[6])
            || (board[3]==board[4] && board[4]==board[5])
            || (board[1]==board[4] && board[4]==board[7]));
}

// Update the Score counter
function updateScore(){
    let scoreCounter = document.getElementById("scoreCounter");
    let score = game.getScore();
    scoreCounter.textContent = `X: ${score['X']} | O : ${score['O']}`;
}