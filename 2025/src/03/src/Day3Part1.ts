import { readFileSync } from 'fs';

let inputFile: string = process.argv[2] ?? "test.txt"
let joltageSum = 0; 

function getJoltage(batteryArray: number[])
{
    console.log(batteryArray);
    let first: number = 0; 
    let second: number = 0;
    
    let max: number = 0; 

    batteryArray.forEach( (value, index) => { 
        if(value > first && index < batteryArray.length - 1) {
            first = value; 
            second = 0; 
        }
        else { 
            second = value;
            let currentVal = (first * 10) + second; 
            if(currentVal > max) max = currentVal; 
        }
    })
    console.log(max)
    return max;
}

readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach( (value, index, array) => {
    let batteryArray: number[] = Array.from(value, Number);
    joltageSum += getJoltage(batteryArray); 
}) 
console.log(`total sum: ${joltageSum}`)