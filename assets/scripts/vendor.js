
const monsterHealthBar= document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeE1= document.getElementById('bonus-life');

const attackBtn= document.getElementById('attack-btn');
const strongAttackBtn= document.getElementById('strong-attack-btn');
const healBtn= document.getElementById('heal-btn');
const logBtn= document.getElementById('log-btn');

function adjustHealthBars(maxlife)
{
    monsterHealthBar.max= maxlife;
    monsterHealthBar.value=maxlife;
    playerHealthBar.max=maxlife;
    playerHealthBar.value=maxlife;

}
function dealMonsterDamage(damage)
{
   const dealthDamage= Math.random() *damage;
   monsterHealthBar.value= +monsterHealthBar.value-dealthDamage;
   return dealthDamage;
}
function dealPlayerDamage(damage)
{
    const dealthDamage= Math.random() *damage;
    playerHealthBar.value= +playerHealthBar.value - dealthDamage;
    return dealthDamage;
}
function increasePlayerHealth(healValue)
{
    playerHealthBar.value= +playerHealthBar.value +healValue;
}
function resetGame(value)
{
    monsterHealthBar.value=value;
    playerHealthBar.value=value;
}
function removeBonusLife()
{
    bonusLifeE1.parentNode.removeChild(bonusLifeE1);
}
function setPlayerHealth(health) {
    playerHealthBar.value = health;
  }