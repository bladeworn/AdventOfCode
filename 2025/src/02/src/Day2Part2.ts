
import { readFileSync } from 'fs';

function doSegmentsRepeat(id: string, count: number) { 
    let length: number = id.length; 

    if(length % count != 0) return false; 

    let base: string = id.slice(0, count);
    for( let i: number = count; i < length; i+= count) 
    {
        if (id.slice(i, i+count) !== base) return false; 
    }
    return true; 
}

function isIdValid(id: number) { 
    let idString: string = id.toString();
    for( let i=1; i<=idString.length / 2; i++)
        if( doSegmentsRepeat(idString, i)) 
            return false; 
    return true;
}

// let test: number[] = [ 22, 23, 33, 111, 101, 123123, 454545, 12345, 998998]

// test.forEach( (element, index) => { 
//      console.log(`${element} isValid(${isIdValid(element)})`)
// })

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
        if(!isIdValid(i))
        {
            console.log(`Invalid id: ${i}`)
            idSum += i;
        }
    }
});

console.log(`Final Sum: ${idSum}`)

