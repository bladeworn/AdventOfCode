
import { readFileSync } from 'fs';

let inputFile: string = process.argv[2] ?? "test.txt"
let idSum = 0; 
readFileSync(inputFile, 'utf-8').split(',').forEach( (value, index, array) => {
    //console.log(value);
    let tokens: number[] = value.split('-').map( (str) => { return parseInt(str, 10); })

    let rangeLow : number | undefined = tokens[0]; 
    let rangeHigh : number | undefined = tokens[1];

    if(!rangeLow || !rangeHigh) {
        console.log(`failed to parse range. value`)
        return; 
    }

    for( let i=rangeLow; i <= rangeHigh; i++) 
    {
        let id : string = i.toString(); 
        let length: number = id.length; 
        if (length % 2 == 1) 
            continue; 
        let halfLength = Math.floor(length / 2);
        if(id.slice(0, halfLength) === id.slice(halfLength))
        {
            console.log(`Invalid id: ${id}`)
            idSum += i;
        }
    }
});

console.log(`Final Sum: ${idSum}`)