import { readFileSync } from 'fs';

class Map { 
    height: number; 
    width: number; 

    map: string[][]; 

    constructor(value: string[][] ){
        this.map = value; 
        this.height = value.length; 
        this.width = value[0]?.length || 0;
    }

    isOccupied(x: number, y: number) : boolean { 
        if( x < 0 || x >= this.width) return false;
        if( y < 0 || y >= this.height) return false; 

        if(this.map[y]?.[x] !== undefined && (this.map[y][x] === '@' || this.map[y][x] == 'x')) return true;
        else return false;
    }

    isAvailable(x: number, y: number) : boolean { 
        let occupiedNeighbors = 0; 

        if(!this.isOccupied(x,y)) return false; // not a roll, therefore not available

        if(this.isOccupied(x-1, y-1)) occupiedNeighbors++;
        if(this.isOccupied(x  , y-1)) occupiedNeighbors++;
        if(this.isOccupied(x+1, y-1)) occupiedNeighbors++;
        if(this.isOccupied(x-1, y  )) occupiedNeighbors++;
        if(this.isOccupied(x+1, y  )) occupiedNeighbors++;
        if(this.isOccupied(x-1, y+1)) occupiedNeighbors++;
        if(this.isOccupied(x  , y+1)) occupiedNeighbors++;
        if(this.isOccupied(x+1, y+1)) occupiedNeighbors++;

        if(occupiedNeighbors < 4) {
            this.map[y]??=[];
            this.map[y][x] = 'x'; // set to removal value 
            return true; 
        } 
        else {
            return false;
        }
    }

    countAvailable() : number { 
        let available = 0; 
        for(let y=0; y<this.height; y++)
            for(let x=0; x<this.width;x++)
                if(this.isAvailable(x,y)) available++;
        return available;
    }

    removeAvailable() : number { 
        let removed = 0;
        for(let y=0; y<this.height; y++)
            for(let x=0; x<this.width;x++)
                if(this.map[y]?.[x] !== undefined && this.map[y]?.[x] === 'x'){
                    const row = this.map[y];
                    if(row) row[x] = '.';
                    removed ++;
                }
        return removed; 
    }

    log() { 
        console.log();
        for(let y=0; y<this.height; y++)
        {
            console.log( this.map[y]?.join(''));
        }
        console.log();
    }
}


let inputFile: string = process.argv[2] ?? "test.txt"
let joltageSum = 0; 

let paperMap: string[][] = []; 

readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach( (value, index, array) => {
    paperMap[index] = [...value];
}) 

let map = new Map(paperMap);
let totalRemoved = 0; 
let numberRemoved = 0; 
map.log();
do { 
    map.countAvailable(); 
    map.log();
    numberRemoved = map.removeAvailable(); 
    map.log();
    totalRemoved += numberRemoved; 
} while( numberRemoved > 0 )

console.log(`Rolls removed: ${totalRemoved}`);

