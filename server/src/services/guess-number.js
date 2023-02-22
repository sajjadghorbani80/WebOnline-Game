let chance = 5;
let randomNum = (Math.random() * 100).toFixed(0);

function checkanswer(guess){
    chance--;
    console.log(randomNum);
    if(chance <0)
        return `You lose, play again. My number was ${randomNum}`
    
    if(guess < randomNum)
            return `My number is greater than  ${guess}`
    else if(guess > randomNum)
            return `My number is less than  ${guess}`
    else if(guess == randomNum)
            return `You win.`
 
}

export {chance,checkanswer};