var turn = 1,
cells = 7,
rows = 6,
board = [],divElt = document.getElementById("tab");

for(var i=0;i<rows;i++){
   board[i] = Array(cells).fill(0);
}

/*function set(row, column, player){
    board[row-1][column-1] = player;
}
*/


function render(element){
    
    tableElt = document.createElement('table');
    
    divElt.innerHTML =  "";

    for(var i=0; i<rows; i++){
        var trElt = document.createElement('tr');

        for(var j=0; j<cells; j++){
            var tdElt = document.createElement('td');
            tdElt.dataset.column = j;
            if(board[i][j] === 1){
                tdElt.className = "player1";
            }
            else if(board[i][j] === 2){
                tdElt.className = "player2";
            }

            trElt.appendChild(tdElt);
        }

        tableElt.appendChild(trElt);
    }

    element.appendChild(tableElt);
}

function play(column){
    var i=rows-1;
    while(board[i][column] != 0 && i>0){
        i--;
    }
    if(i <= -1){
        return false;
    }

    else if(board[i][column] === 0){
        board[i][column] = turn;
        if(turn === 1){
            turn = 2;
        }
        else turn = 1;
        
        return i;
    }
}

render(divElt);

function event(element){
    element.addEventListener('click',listener = function (e){

        if(e.target.dataset.column != undefined){
            var row = play(Number(e.target.dataset.column));
            render(divElt);

            if(row!=false && row!=undefined){
                return fourTokens(row,Number(e.target.dataset.column));
            }
        }
    });
}

event(divElt);

function fourTokens(row,column){
    
    var compteur = function (ligne,col){
        let element=1,i=1;

        while(i<4 && row +ligne*i >=0 && row + ligne*i < rows && column + col*i < cells && column + col*i >=0 && board[row][column]===board[row + ligne*i][column + col*i]){
            if (board[row][column]!==board[row + ligne*i][column + col*i] || element===4) {
                break;
            }
            else {element+=1; }

            if (element===4) {
                if (turn === 2) {
                    alert('Player1 Won!!!');
                    turn =1;
                }
                else {
                    alert('Player2 Won!!!');
                }

                if (confirm('WOULD YOU WANT TO CONTINUE ??')) {
                    board.forEach(element => {
                        element.fill(0);
                    });
                    render(divElt);
                    
                }
                else {
                    alert('Au revoir!!!');
                    divElt.innerHTML = "";
                    divElt.removeEventListener('click',listener);
                    h1Elt = document.createElement('h1');
                    h1Elt.style.textAlign = 'center';
                    h1Elt.textContent= 'THANK YOU FOR PLAYING MY GAME :) !!!';
                    divElt.appendChild(h1Elt);
                }
                return true;
            }
        
            i++;

        }
    }
    
    if (!(compteur(1,1) || compteur(1,0) || compteur(0,1) || compteur(0,-1) || compteur(-1,0) || compteur(1,-1) || compteur(-1,1))) {
        compteur(1,1);
        compteur(1,0);
        compteur(0,1);
        compteur(0,-1);
        compteur(-1,0);
        compteur(1,-1);
        compteur(-1,1);
    }
}

