const {ipcRenderer} = require("electron")
function fileHandle(){
    let filetype = document.getElementById('filetype')
    let type = filetype.value
    let dialogOptions
    if(type == "pdf"){
        dialogOptions = {
            filters: [
              { name: "PDF", extensions: ["pdf"] }
            ],
            properties: ["openFile"]
          };
    }

    else if(type == "doc"){
        dialogOptions = {
            filters: [
              { name: "doc", extensions: ["docx"] }
            ],
            properties: ["openFile"]
          };
    }
    ipcRenderer.invoke("open.file",dialogOptions).then((filepath)=>{
        console.log(filepath)
        document.getElementById('submit').disabled = false;
        document.getElementById('filepath').innerHTML = filepath
        document.getElementById('submit').addEventListener("click", function(){
            const exec = require('child_process').exec;

            function execute(command, callback) {
                exec(command, (error, stdout, stderr) => { 
                callback(stdout); 
                });
            }
            if(type=='pdf'){
                execute('perl ./src/run/pdf2john.pl '+ filepath, (output) => {
                    document.getElementById('hash').innerHTML = output;
                    });
            }
            else if(type=='doc'){
                execute('python3 ./src/run/office2john.py '+ filepath, (output) => {
                    document.getElementById('hash').innerHTML = output;
                    });      
            }
            
        });

    })
}



function fileType(){

    document.getElementById('file').disabled = false;
}