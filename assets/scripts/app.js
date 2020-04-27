
const enterdValue=prompt('max life for you ','100');

let chosenMaxLife = parseInt(enterdValue);
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE= 17;
const MONSTER_ATTACK_VALUE=14;
const HEAL_VALUE=20;
const LOG_EVENT_PLAYER_ATTACK='PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK='PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER='GAME_OVER';
let currentMonsterHealth= chosenMaxLife;
let currentPLayerHealth= chosenMaxLife;
let hasBonusLife=true;
let battleLog=[];
//const enterdValue=prompt('max life for you ','100');
adjustHealthBars(chosenMaxLife);

function writeToLog(ev,val,monsterHealth,pLayerHealth)
{
    let logEntry={
            event:ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: pLayerHealth,

        
        };
    
        if(ev=== LOG_EVENT_PLAYER_ATTACK)
        {
            logEntry.target= 'MONSTER';
        }
        else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK)
         {  logEntry.target= 'MONSTER';}
        
        else if(ev=== LOG_EVENT_MONSTER_ATTACK)
        {
                logEntry.target= 'PLAYER';
              
        }
        else if(ev=== LOG_EVENT_PLAYER_HEAL)
        {
            logEntry.target= 'PLAYER';
            
        }

        else if(ev=== LOG_EVENT_GAME_OVER)
        {
           
           
            

        }
        battleLog.push(logEntry);
        
        
}

if(isNaN(chosenMaxLife)|| chosenMaxLife<=0)
{
    chosenMaxLife=100;
}
function reset()
{
    currentMonsterHealth=chosenMaxLife;
    currentPLayerHealth=chosenMaxLife;
    resetGame(chosenMaxLife);
}

    function endRound()
    {
        const initialPlayerHealth= currentPLayerHealth;
        
        const playerDamage= dealPlayerDamage(MONSTER_ATTACK_VALUE);
        currentPLayerHealth -= playerDamage;
        writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage ,currentMonsterHealth,currentPLayerHealth);
        if(currentPLayerHealth<=0 && hasBonusLife === true )
        {
            hasBonusLife=false;
            removeBonusLife();
            currentPLayerHealth=initialPlayerHealth;
            console.log(initialPlayerHealth);
            alert('Bonus Life saved you!');
            setPlayerHealth(initialPlayerHealth);''
        }
        if(currentMonsterHealth <=0 && currentPLayerHealth>0 )
        {
            alert("you won");
            writeToLog(LOG_EVENT_GAME_OVER,'PLATER WON',currentMonsterHealth,currentPLayerHealth);
    
            reset();
        }
        else if(currentPLayerHealth <=0 && currentMonsterHealth>0) 
        {
            alert("Monster won!");
            writeToLog(LOG_EVENT_GAME_OVER,'MONSTER WON',currentMonsterHealth,currentPLayerHealth);
    
            reset();
        }
        else if(currentMonsterHealth<=0 &&currentPLayerHealth<=0)
        {
            alert("you have a draw!");
            writeToLog(LOG_EVENT_GAME_OVER,'DRAW',currentMonsterHealth,currentPLayerHealth);
    
            reset();
        }
    

    }
function attackMonster(mode)
{
    let maxDamage;
    let logEvent;
        if(mode ==='ATTACK')
        {
            maxDamage=ATTACK_VALUE;
            logEvent=LOG_EVENT_PLAYER_ATTACK;
        }
        else if(mode==='STRONG_ATTACK')
        {
            maxDamage=STRONG_ATTACK_VALUE;
            logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;
        }
        const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -=damage;
    writeToLog(logEvent,damage,currentMonsterHealth,currentPLayerHealth);
    
        endRound();


}
function attackHandler()
{
    attackMonster('ATTACK');
}
function strongAttackHandler()
{
    attackMonster('STRONG_ATTACK');
}
function healPlayerHandler()
{
    let healValue;
    if(currentPLayerHealth >= chosenMaxLife - HEAL_VALUE)
    {
            alert("cant heal to more than maxhealth");
            healValue=chosenMaxLife-currentPLayerHealth;
    }
    else{

        healValue=HEAL_VALUE;
    }

    increasePlayerHealth(HEAL_VALUE);
    currentPLayerHealth +=healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPLayerHealth);
    
    endRound();
}
function printLogHandler()
{
    console.log(battleLog);
}
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);