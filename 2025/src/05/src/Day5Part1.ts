import { readFileSync } from 'fs';

let inputFile: string = process.argv[2] ?? "test.txt"

class Range { 
    low: number; 
    high: number;

    constructor(low: number, high: number) { 
        this.low = low; 
        this.high = high;
    }

    IsInRange(val:number) { 
        return (val >= this.low && val <= this.high)
    }
}

class IngredientDatabase { 
    Ranges: Range[]; 

    constructor() { 
        this.Ranges = []; 
    }

    AddRange(rangeDescription: string) { 
        //console.log(`Add Range: ${rangeDescription}`)
        let tokens = rangeDescription.split('-');
        let lowString: string | undefined = tokens[0]
        let highString: string | undefined = tokens[1]
        if (!lowString || !highString) 
                return; 
        let range: Range = new Range( parseInt(tokens[0]??'', 10), parseInt(tokens[1]??'', 10))
        this.Ranges.push(range);
    }

    IsFresh(id: string) { 
        //console.log(`IsFresh(${id})`)
        let num:number = parseInt(id)
        for(let range of this.Ranges) {
            if(range.IsInRange(num)) return true;
        }
        return false; 
    }
}

let finishedRanges: boolean = false; 
let db = new IngredientDatabase();
let freshIngredients: number = 0; 
readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach( (value, index, array) => {
    if(value === '') { // An empty string is the break between ranges and values
        finishedRanges = true; 
        return;
    }

    if(!finishedRanges) { 
        db.AddRange(value);
    } else { 
        if(db.IsFresh(value)) { 
            freshIngredients++;
        }
    }
}) 

console.log(freshIngredients);