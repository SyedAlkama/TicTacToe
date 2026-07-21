let game = (function(){
    let gameboard = [1,2,3,4,5,6,7,8,9];

    let players = ['X','O'];
    let scores = {
        [players[0]]:0,
        [players[1]]:0
    };

    let playerTurn = players[0];

    function gameWinBy(winner){
        if(!players.includes(winner)){
            throw new Error("This Player Doesn't exist");
        }
        scores[winner]++;
    }
    function resetGame(){
        for(player of players){
            scores[player] = 0;
        }
    }
    function playSquare(square){
        gameboard[square] = playerTurn;
        if (playerTurn == 'X'){
            playerTurn='O';
        } else {
            playerTurn='X';
        }
        return gameboard;
    }
    function getScore(){
        return scores;
    }
    function getPlayerTurn(){
        return playerTurn;
    }
    return {gameWinBy,resetGame,playSquare,getScore,getPlayerTurn};
})();
let gameOn = true;
while (gameOn){
    gameON()
    gameOn = false;
}
function gameON(){
    let gameTurn = 0;
    while(gameTurn != 9){

        let playing = game.getPlayerTurn();

        console.log(`${playing} Turn!`);

        let chance = prompt("pick a square between 1-9:");
        let gameboard = game.playSquare(chance-1);
        console.log(gameboard);

        if (winCondition(gameboard)){
            game.gameWinBy(playing);
            gameTurn = 0;
            console.log(`${playing} WONNNN!!!`);
            break;
        }
        gameTurn++;

    }
    if (gameTurn==9){
        console.log("TIEEEEEEE!!!")
    }
    console.log(game.getScore());
}

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