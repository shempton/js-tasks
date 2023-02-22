class Item {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

function getFilteredArray(str) {
    let results = classes.filter(function(item){
        return isCorrectItem(str, item); // item.quantity < 3;
    });

    return results;
}


function isCorrectItem(str, item) {
    let KeysArr = getArrayBySplit(str);

    for (let data of KeysArr) {
        if (data.includes("name") || data.includes("description")) {
            if (!isCorrectStringData(data, item)) return false;
            continue;
        }
        
        if (!isCorrectNumberData(data, item)) return false;
        
    }

    return true;
}

function getArrayBySplit(str) {
    return str.split('&');
}

function isCorrectStringData(data, item) {
    let splitData = data.split('-');
    if (splitData[0] == 'name') {
        return doOperationString(splitData[1], splitData[2].toLowerCase(), item.name.toLowerCase());
    }
    return doOperationString(splitData[1], splitData[2].toLowerCase(), item.description.toLowerCase());
}

function doOperationString(operation, val, item) {
    switch(operation) {
        case 'contains':
            return item.includes(val);
        case 'starts':
            return item.startsWith(val);
        case 'ends':
            return item.endsWith(val);
    }
}

function isCorrectNumberData(data, item) {
    let splitData = data.split('-');
    let operation;

    if (splitData[1].includes('>=') || splitData[1].includes('<=')){
        operation = splitData[1].slice(0, 2);
        splitData[1] = +splitData[1].slice(2);
    } else {
        operation = splitData[1].slice(0, 1);
        splitData[1] = +splitData[1].slice(1);
    }

    if (splitData[0] == 'price') {
        return doOperationNumber(operation, splitData[1], item.price);
    }
    return doOperationNumber(operation, splitData[1], item.quantity);
}

function doOperationNumber(operation, val, item) {
    switch (operation) {
        case '>=':
            return item >= val;
        case '<=':
            return item <= val;
        case '<':
            return item < val;
        case '>':
            return item > val;
        case '=':
            return item == val;
    }
}

let classes = [];
let names = ['Screen', 'Mouse', 'Keyboard', 'CPU', 'GPU', 'RAM', 'Power unit'];
let prices = [15700, 2100, 4750, 25000, 79999, 14600, 10999];
let quantityArr = [3, 1, 1, 7, 2, 4, 10];
let descriptions = ['The terms descriptor, screen recognition, and screen description',
                    'Small device that a computer user pushes across a desk surface in order to point', 
                    'Is for putting information including letters, words and numbers into your computer', 
                    'The component of a computer system that controls the interpretation and execution of instructions', 
                    'a specialized processor originally designed to accelerate graphics rendering', 
                    "a computer's short-term memory, where the data that the processor is currently using is stored", 
                    'a measure of electric power'];

for (let i = 0; i < 7; i++) {
    classes.push(new Item(names[i], prices[i], quantityArr[i], descriptions[i]));
}

let str1 = "name-contains-fd&price-=2&quantity->5&description-ends-abc";
let str2 = "name-starts-fd&quantity-=5";
let myStr = "name-contains-c&price-<27000&quantity->=7&description-ends-ions";
console.log(getFilteredArray(myStr));