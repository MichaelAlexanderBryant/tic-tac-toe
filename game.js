const player = (playerName) => {
    const showName = () => console.log(`${playerName}`)
    return {showName}
};

const marker = (playerMarker) => {
    const {showName} = player(playerName);
    const useMarker = () => console.log(`${playerMarker}`);
    return {showName, useMarker};
};

const gameboard = (() => {
    let history = [null, null, null, null, null, null, null, null, null];
    const makePlay = (position, person) => history[position] = person.useMarker();
    const viewBoard = () => history;
    return {makePlay, viewBoard};
})();

function checkForWin(person) {
    let winningCombinations = ["036", "147", "258", "012", "345", "678", "048", "246"];
    for (let i = 0; i < winningCombinations.length; i++) {
        let squaresToCheck = winningCombinations[i].split('');
        for (let j = 0; i < squaresToCheck.length; j++) {
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