const marker = (playerMarker) => {
    const useMarker = () => playerMarker;
    return {useMarker}
};

const player = (playerName, playerMarker) => {
    const {useMarker} = marker(playerMarker);
    const showName = () => playerName;
    return {showName, useMarker};
};

const gameboard = (() => {
    let history = [null, null, null, null, null, null, null, null, null];
    const makePlay = (position, person) => history[position] = person.useMarker();
    const viewBoard = () => history;
    const resetBoard = () => history = [null, null, null, null, null, null, null, null, null];
    return {makePlay, viewBoard, resetBoard};
})();

function checkForWin(person) {
    let winningCombinations = ["036", "147", "258", "012", "345", "678", "048", "246"];
    for (let i = 0; i < winningCombinations.length; i++) {
        let squaresToCheck = winningCombinations[i].split('');
        for (let j = 0; j < squaresToCheck.length; j++) {
            if (gameboard.viewBoard()[+squaresToCheck[j]] != person.useMarker()){
                break;
            };
            if (j == (squaresToCheck.length - 1)) {
                return true;
            };
        };
    };
    return false;
};

function checkForTie() {
    if (gameboard.viewBoard().includes(null) == true) {
        return false;
    }
    else {
        return true;
    };
};

let squares = document.querySelectorAll('div.square');
let playerOne = player("Michael", "X");
let playerTwo = player("Kathryn", "O");
let currentPlayer = playerOne;

squares.forEach((square) => { square.addEventListener('click', () => { 
    let playerSelection = square.id;
    if (gameboard.viewBoard()[+playerSelection] == null) {
        const squareSelected = document.getElementById(playerSelection);
        let markerImg = document.createElement('img');
        let marker = currentPlayer.useMarker();
        let imgSrc = "./img/" + marker + ".png";
        markerImg.src = imgSrc;
        squareSelected.appendChild(markerImg);
        
        gameboard.makePlay(+playerSelection, currentPlayer);

        if (checkForWin(currentPlayer)) {
            alert(currentPlayer.showName() + " WINS!");
            gameboard.resetBoard();
            for (let i = 0; i < squares.length; i++) {
                squares[i].textContent = ''
            };
            currentPlayer = playerOne;

        }
        else if (checkForTie(currentPlayer)) {
            alert("It's a draw!");
            gameboard.resetBoard();
            for (let i = 0; i < squares.length; i++) {
                squares[i].textContent = ''
            };
            currentPlayer = playerOne;
        }
        else {
        if (currentPlayer.useMarker() == 'X') {
            currentPlayer = playerTwo;
        }
        else {
            currentPlayer = playerOne;
        }; 
    };
};

})});