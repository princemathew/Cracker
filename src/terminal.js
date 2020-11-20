const ipc = require("electron").ipcRenderer;
function openShell(){

    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
    } 
    else {
        localStorage.clickcount = 1;
    }
    
    console.log(localStorage.clickcount);
     
    document.getElementById('close').disabled = false;
    document.getElementById('close').style.display = 'inline';
    document.getElementById("tab").disabled = true;
    document.getElementById('terminal').style.display = 'inline';
    if(localStorage.clickcount==1){
    var term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.write("$");
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