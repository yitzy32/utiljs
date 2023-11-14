/* ON WINDOW LOAD */
const result = document.getElementById('result');
foucusOnTextArea();
/* END ON WINDOW LOAD */

/* LISTENERS */
document.addEventListener('click', function () {
    if (event.target.id === 'collapseStr') {
        collapseAndDisplayResult();
    } else if (event.target.id === 'join') {
        joinAndDisplayResult();
    } else if (event.target.id === 'toLowerCase') {
        toLowerCaseAndDisplayResult();
    } else if (event.target.id === 'stripGitBashPluses') {
        replacePlusAndDisplayResult();
    } else if (event.target.id === 'extractQueryFromConsole') {
        extractQueryFromConsoleAndDisplayResult();
    }else if (event.target.id === 'extractAdvSearchQuery') {
        extractAdvSearchQueryAndDisplayResult()
    }
})
/* HOT KEYS */
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.altKey) {
        switch (event.code) {
            case "Digit1":
                collapseAndDisplayResult();
                break;
            case "Digit2":
                joinAndDisplayResult();
                break;
            case "Digit3":
                toLowerCaseAndDisplayResult();
                break;
            case "Digit4":
                replacePlusAndDisplayResult();
                break;
            case "Digit5":
                extractQueryFromConsoleAndDisplayResult();
                break;
            case "Digit6":
                extractAdvSearchQueryAndDisplayResult();
                break;
            case "KeyT":
                foucusOnTextArea();
                break;
            case "KeyR":
                highlightResult();
                break;
            default:
                break;
        }
    }
});
/* END HOT KEYS */
/* END LISTENERS */

/* 'PRIVATE' FUNCTIONS*/
function collapseAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = input.replace(/\s\s+/g, " ").replace(/\n/g, " ");
    highlightResult();
}

function joinAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = input.split("\n").join(", ");
    highlightResult();
}

function toLowerCaseAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = lowerCaseNotSingleQuoted(input);
    highlightResult();
}

function replacePlusAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = stripGitBashPluses(input);
    highlightResult();
}

function stripGitBashPluses(str){
    let output = '';
    for(let i = 0; i < str.length; i++){
        if(str[i]=='+'&& str.substring(i+1, i+4)=='   '){
            continue
        }
        output+= str[i]
    }
    return output.replace(/\n/g,'');
}

function extractQueryFromConsoleAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = extractQueryFromConsole(input);
    highlightResult();
}

function extractAdvSearchQueryAndDisplayResult(){
    const input = document.getElementById("input").value;
    result.innerHTML = extractAdvSearchQuery(input);
    highlightResult();
}

function extractAdvSearchQuery(inputStr){
    return `${inputStr}`.match(/select distinct \/\* index.+/gmi).join(';<br>') + ';'
}

function extractQueryFromConsole(inputStr) {
    return `${inputStr}`.match(/select.+|with.+|insert.+|update.+|delete.+|merge.+/gmi).join(';<br>') + ';'
}

function highlightResult() {
    const sel = window.getSelection();
    const el = document.getElementById('result')
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
}

function foucusOnTextArea() {
    const input = document.getElementById("input")
    input.blur()
    document.getSelection().removeAllRanges()
    input.focus()
}

function lowerCaseNotSingleQuoted(inputStr) {
    let output = "";
    let quoteCount = 0;
    for (let i = 0; i < inputStr.length; i++) {
        if (inputStr[i] == "'") {
            quoteCount++;
        }
        quoteCount % 2 == 0 ? output += inputStr[i].toLowerCase() : output += inputStr[i]
    }
    return output
}

/*function insertArrayIntoString() {
    let output = '';
    const string = prompt('Please enter string with question mark placeholder');
    if (!string.includes('?')) {
        alert('String must contain question mark');
        return;
    }
    let array = prompt('Please enter array');
    (array[0] != '[') ? array = array.split(',') : array = JSON.parse(array);
    for (let i = 0; i < array.length; i++) {
        output += string.replace(/\?/, array[i]);
        output += '<br>';
    }
    return output;
}*/

/* END 'PRIVATE' FUNCTIONS*/