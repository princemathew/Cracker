const {ipcRenderer} = require("electron")
function fileHandle(){
    ipcRenderer.send("open.file")
    ipcRenderer.on("file.path",(event,filepath)=>{
        document.getElementById('filepath').innerHTML = filepath
        document.getElementById('submit').addEventListener("click", function(){
            const exec = require('child_process').exec;

            function execute(command, callback) {
                exec(command, (error, stdout, stderr) => { 
                callback(stdout); 
                });
            }
    
            execute('perl ./src/run/pdf2john.pl '+ filepath, (output) => {
            document.getElementById('hash').innerHTML = output;
            });
        });

    })
}

function findHash(){
    
}
