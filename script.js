let mode='pvp',player='X',current='X',board=[];
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function showAI()
{
    home.classList.add('hidden');
    setup.classList.remove('hidden');
}
function startPVP()
{
    mode='pvp';startMatch();
}
function startAI()
{
    mode='ai';
    setup.classList.add('hidden');
    startMatch();
}
function startMatch()
{
home.classList.add('hidden');
setup.classList.add('hidden');
let toss=Math.random()<.5?'X':'O';
let p=document.createElement('div');
p.className='popup';
p.innerHTML='<div class=win>🪙 Coin Toss<br>'+toss+' Starts First</div>';
document.body.appendChild(p);
setTimeout(()=>{p.remove();game.classList.remove('hidden');
                current=toss;restart();
                if(mode==='ai'&&current!==player)setTimeout(aiMove,700)},2000);
}
function restart()
{
    board=['','','','','','','','',''];
    let b=document.getElementById('board');
    b.innerHTML='';for(let i=0;i<9;i++){let c=document.createElement('div');c.className='cell';c.onclick=()=>move(i);b.appendChild(c)}draw()
}
function draw()
{
    document.querySelectorAll('.cell').forEach((c,i)=>c.textContent=board[i]);
    status.textContent='Turn: '+current;
}
function move(i)
{
    if(board[i])return;
    if(mode==='ai'&&current!==player&&current) return;
     board[i]=current;draw();
     let w=check(current);
     if(w){
           victory(current);
           return;
           }
    if(board.every(x=>x))
        {
            victory('DRAW');
            return;
        }
    current=current==='X'?'O':'X';
    draw();
    if(mode==='ai'&&current!==player)
        setTimeout(aiMove,700);
}
function aiMove()
{
    let e=[];
    for(let i=0;i<9;i++)
        if(!board[i])e.push(i);
    if(!e.length)
        return;
    board[e[Math.floor(Math.random()*e.length)]]=current;
    draw();
    let w=check(current);
    if(w)
        {
            victory(current);
            return;
        }
    if(board.every(x=>x))
        {
            victory('DRAW');
            return;
        }
    current=current==='X'?'O':'X';
    draw();
}
function check(p)
{
    return wins.some(a=>a.every(i=>board[i]===p));
}
function victory(t)
{
    let p=document.createElement('div');
    p.className='popup';
    p.innerHTML='<div class=win>'+(t==='DRAW'?'🤝 DRAW':'🏆 '+t+' WINS!')+'</div>';
    document.body.appendChild(p);
    setTimeout(()=>{p.remove();restart();},2500);
}
function goHome()
{
    game.classList.add('hidden');
    home.classList.remove('hidden');
}
function exitGame()
{
    window.close();
}
