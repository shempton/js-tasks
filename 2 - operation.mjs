function sum(first, second) { 
    first = [...first].reverse();
    second = [...second].reverse();
    
    for (let i = 0; i < second.length; i++) {
        if ((first[i] = ~~first[i] + ~~second[i]) > 9) {
            first[i] -= 10;
            second[i+1] = ~~second[i+1] + 1;
        }
    }
    
    return first.reverse().join("");
}

function sub(first, second) {
    first = [...first].reverse();
    second = [...second].reverse();
    let num1, num2, flag;
    if (first.length > second.length){
        num1 = first, num2 = second;
    } else {
        num1 = second, num2 = first;
        flag = true;
    }
    let result = [];
    for (let i = 0, b = 0, c = 0; i < num1.length; i++) {
        b = num1[i] - (num2[i] || 0) + c;
        result[i] = b < 0 ? (c = -1, 10 + b) : (c = 0, b);
    }

    result = result.reverse().join('').replace(/^0+/, '')
    if (flag) result = '-' + result;

    return result;
}

function mul(first, second) {
    first = [...first].reverse();
    second = [...second].reverse();
  
    let stack = [];
    let m;
    for (let i = 0; i < first.length; i++) {
        for (let j = 0; j < second.length; j++) {
            m = first[i] * second[j];
            stack[i + j] = (stack[i + j]) ? stack[i + j] + m : m;
        }
    }
  
    for (let i = 0; i < stack.length; i++) {
        let num = stack[i] % 10;
        let move = Math.floor(stack[i] / 10);
        stack[i] = num;
    
        if (stack[i + 1])
            stack[i + 1] += move;
        else if (move != 0)
            stack[i + 1] = move;
    }  
  
    return stack.reverse().join('').replace(/^(0(?!$))+/, "");
}

function div(first, second) {

    let ans="";

    let idx = 0;
    let temp=first[idx]-'0';

    while (temp < second)
    {
        temp = (temp * 10 + (first[idx + 1]).charCodeAt(0) - ('0').charCodeAt(0));
        idx += 1;
    }
    idx += 1;
    
    while(first.length>idx)
    {
        ans += String.fromCharCode(Math.floor(temp / second) + ('0').charCodeAt(0));    
        temp = ((temp % second) * 10 + (first[idx]).charCodeAt(0) - ('0').charCodeAt(0));
        idx += 1;
    }
    
    ans += String.fromCharCode(Math.floor(temp / second) + ('0').charCodeAt(0));
    
    if(ans.length==0)
        return "0";
    
    return ans;
}

export {sum, sub, mul, div};