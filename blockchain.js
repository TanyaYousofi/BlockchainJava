
const SHA256 = require('crypto-js/sha256'); //[4]. import library sha256-this library is used for secure password hashing

class Block{
    constructor(index, timestamp, data, previousHash = ''){ //[1]. constructor includes properties for block
    //index = where block sits on chain, 
    //timestamp = when block was created, 
    //data = type of data eg. sender, receiver, how much $ transferred
    //previousHash = String containing hash of block before this one!

    //[2].keep track of all values listed above
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash(); //[6]. use hash function. Properties of block will run in this hash function, which happens down below
    }
    //[3]. Create method to calculate hash function of block by running properties, run thru hash function & identify hash
    calculateHash(){
        return SHA256(this.index + this.previous + this.timestamp + JSON.stringify(this.data)).toString(); //[5].function returns SHA256 of properties & cast output to string
    }
}

class Blockchain{ //[7].create new class
    constructor(){ //responsible for initializing blockchain
        this.chain =[this.createGenesisBlock()]; //create property chain inside class [9].set as array where it equals genesis block
    }
    createGenesisBlock(){ //[8].Create method for first block in blockchain aka genesis block
        return new Block(0,"12/09/2020", "Genesis block", "0"); //first block, so previousHash block can't pt to anything
    } 

    //[10]. add other methods that can be useful

    getLatestBlock(){ //this method will return the latest block in chain
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) { //this method will add a new method onto the chain
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();//This updates hash-need to recalculate hash-everytime we change properties in block, need to recalculate hash function!
        this.chain.push(newBlock);
    }

    isChainValid(){ //[12].will return true if chain is valid or false if something wrong
        for(let i=1;i<this.chain.length;i++){ //set i = 1 and loop til end of chain
            const currentBlock = this.chain[i];//grab current and recent block
            const previousBlock = this.chain[i-1]; //grab previous block

            if(currentBlock !== currentBlock.calculateHash()){ 
                return false; 
            }

            if (currentBlock.previousHash !== previousBlock.hash){ //[13].check if correct block pts to previous block
                return false; //this will say its wrong-properties don't match
            }
        }
        
        return true; //[14].if chain is true
    }
}

//[11].Now test it!
let tanyaCoin = new Blockchain();
tanyaCoin.addBlock(new Block(1, "01/12/2020", {amount: 4})); //block 1
tanyaCoin.addBlock(new Block(2, "03/12/2020", {amount: 10})); //block 2

console.log('Is blockchain valid?' + tanyaCoin.isChainValid());

tanyaCoin.chain[1].data = {amount:100};
tanyaCoin.chain[1].hash = tanyaCoin.chain[1].calculateHash(); //recalculate hash to tamper with block
console.log('Is blockchain valid?' + tanyaCoin.isChainValid());

//console.log(JSON.stringify(tanyaCoin, null, 4));
```