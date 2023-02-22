function Capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function removeSpaces(str) {
    let newStr = str.replace(/^ +| +$|( ) +/g,"$1").replace(' ,', ',').replace(' .', '.').
                replace(',', ', ').replace('.', '. ');
    return newStr;
}

function getCountWords(str) {
    const count = str.split(' ');
    return count.length;
}

function getCountUniqueWords(str) {
    let wordsMap = new Map();
    str = str.replace('.', '').replace(',', '');
    let arr = str.split(' ');
    let num;
    for (let item of arr) {
        item = item.toLowerCase();

        if (!wordsMap.has(item)){
            wordsMap.set(item, 1);
            continue;
        }

        num = wordsMap.get(item);
        num++;
        wordsMap.set(item, num);        
    }

    let result = '';
    for (let val of wordsMap) {
        result += `${val}\n`;
    }
    return result;
}

export {Capitalize, removeSpaces, getCountWords, getCountUniqueWords};