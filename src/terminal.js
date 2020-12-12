const ipc = require("electron").ipcRenderer;
function openShell(){

    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
    } 
    else {
        localStorage.clickcount = 1;
    }
    
     
    document.getElementById('close').disabled = false;
    document.getElementById('close').style.display = 'inline';
    document.getElementById("tab").disabled = true;
    document.getElementById('terminal').style.display = 'inline';
    var term = new Terminal({
        cols: 50,
        rows: 10,
        screenKeys: true,
        cursorBlink: true
        });
    if(localStorage.clickcount==1){
    
    term.open(document.getElementById('terminal'));
    ipc.send("terminal.keystroke", 'clear\n');
    }
    ipc.on("terminal.incomingData", (event, data) => {
        term.write(data);
    });

    term.onData(e => {
        ipc.send("terminal.keystroke", e);
    });
}

function closer(){
    document.getElementById('terminal').style.display = 'none';
    document.getElementById("tab").disabled = false;
    document.getElementById('close').disabled = true;
    
}