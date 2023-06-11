const cellElements=document.querySelectorAll('[data-cell]');
const x_class='x';
const o_class='o';
let oturn
const board=document.getElementById('board')
const winning_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const winningmessagetext=document.querySelector('[data-winning-message]');
const winningMessageElement=document.getElementById('winning-message-text')
const restartbutton=document.getElementById('restart-button')
function startgame(){
    oturn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setboardhover();
    winningMessageElement.classList.remove('show')
}

startgame()
restartbutton.addEventListener('click', startgame)
function handleClick (e){
    //place mark
    const cell= e.target
    const currentclass=oturn ? o_class:x_class
    placemark(cell,currentclass);

    

    //check for win
    if(checkwin(currentclass)){
        endgame(false)
       
    }
    else if(isdraw()){
        endgame(true);
    }
    else{  
        swapturns()
        setboardhover()
    }
    //check for draw
    //switch turn

}

function isdraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(x_class)||
        cell.classList.contains(o_class)
    })
}


function endgame(draw){
    if(draw){
        winningmessagetext.innerText='DRAW!!...'
    }
    else{
        winningmessagetext.innerText=`${oturn? "O's":"X's"} wins`
    }
winningMessageElement.classList.add('show')
}

function placemark(cell,currentclass){
    cell.classList.add(currentclass)
}

function swapturns(){
    oturn=!oturn
}

function setboardhover(){
    board.classList.remove(x_class);
    board.classList.remove(o_class);
if(oturn){
    board.classList.add(o_class)
}
else{
    board.classList.add(x_class)
}

}

function checkwin(currentclass)
{
    return winning_combinations.some( combination =>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentclass)}
            )
    }

    )
}