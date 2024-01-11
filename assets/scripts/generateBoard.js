function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "letter-row row-" + [i];
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "letter-box letter-" + [j];
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()