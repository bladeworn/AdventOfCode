import { readFileSync } from 'fs';

let inputFile: string = process.argv[2] ?? "test.txt"
let joltageSum = 0; 

function getJoltage(batteryArray: number[])
{
    let currentJoltage = 0; 
    
    // grab the initial 12 as a starting base line. 
    let currentBattery: number[] = batteryArray.slice(0, 12);
    currentBattery = currentBattery.filter((item): item is number => typeof item ==="number")
    let extras = batteryArray.slice(12); 
    extras.forEach( (number, index) => {
        for(let i=0; i<currentBattery.length -1; i++) 
        {
            let value = currentBattery[i]; 
            let nextValue = currentBattery[i+1]; 
            if( value !== undefined && nextValue !== undefined && value < nextValue) {
                currentBattery.splice(i, 1)
                currentBattery = currentBattery.concat(number); 
                return; 
            }
        }
        let endValue:number = currentBattery[currentBattery.length-1] || 0;
        if( number > endValue)
            currentBattery[currentBattery.length-1] = number;
    })
    console.log(currentBattery); 
    let joltage :number = parseInt(currentBattery.map( value=> value.toString()).join(''), 10);
    console.log(joltage); 
    return joltage; 
}

readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach( (value, index, array) => {
    let batteryArray: number[] = Array.from(value, Number);
    joltageSum += getJoltage(batteryArray); 
}) 
console.log(`total sum: ${joltageSum}`)