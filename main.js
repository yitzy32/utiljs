/* ON WINDOW LOAD */
const result = document.getElementById('result');
foucusOnTextArea();
/* END ON WINDOW LOAD */

/* LISTENERS */
document.addEventListener('click', function (e) {
    if (e.target.id === 'collapseStr') {
        collapseAndDisplayResult();
    } else if (e.target.id === 'lineBreakToCommaDelimited') {
        lineBreakToCommaDelimitedAndDisplayResult();
    } else if (e.target.id === 'collapseStrLowerIgnoreQuoted') {
        collapseStrLowerIgnoreQuotedAndDisplayResult();
    } else if (e.target.id === 'extractQueryFromConsole') {
        extractQueryFromConsoleAndDisplayResult();
    }else if (e.target.id === 'extractAdvSearchQuery') {
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
                collapseStrLowerIgnoreQuotedAndDisplayResult();
                break;
            case "Digit3":
                lineBreakToCommaDelimitedAndDisplayResult();
                break;
            case "Digit4":
                extractQueryFromConsoleAndDisplayResult();
                break;
            case "Digit5":
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


function collapseAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = input.replace(/\s\s+/g, " ").replace(/\n/g, " ");
    highlightResult();
}

function lineBreakToCommaDelimitedAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = input.split("\n").join(", ");
    highlightResult();
}

function collapseStrLowerIgnoreQuotedAndDisplayResult() {
    const input = document.getElementById("input").value;
    result.innerHTML = collapseStrLowerIgnoreQuoted(input);
    highlightResult();
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

/* 'PRIVATE' FUNCTIONS*/

function extractAdvSearchQuery(inputStr){
    const regex = /select distinct \/\* index.+/gmi;
    return `${inputStr}`.match(regex) ? `${inputStr}`.match(regex).join(';<br>') + ';' : 'Not found';
}

function extractQueryFromConsole(inputStr) {
    const regex = /select.+|with.+|insert.+|update.+|delete.+|merge.+/gmi;
    return `${inputStr}`.match(regex) ? `${inputStr}`.match(regex).join(';<br>') + ';' : 'Not found';
}


function collapseStrLowerIgnoreQuoted(inputStr) {
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
/* END 'PRIVATE' FUNCTIONS*/
