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
        document.getElementById('submit').disabled = false;
        document.getElementById('filename').innerHTML = filepath
        document.getElementById('submit').addEventListener("click", function(){
            var path = require('path');
            if(type=='pdf'){
                /*for building uncomment below line */
                //var perl = require('child_process').spawn('perl',[path.join(__dirname, '../..', '/src/run/pdf2john.pl'),filepath]);
                /*for building comment below line */
                var perl = require('child_process').spawn('perl',['src/run/pdf2john.pl',filepath]);
                perl.stdout.on('data', function (data) {
                document.getElementById('hash').value = data.toString('utf8');
                });
            }
            else if(type=='doc'){
                /*for building uncomment below line */
                //var python = require('child_process').spawn('python3',[path.join(__dirname, '../..', '/src/run/office2john.py'),filepath]);
                /*for building comment below line */
                var python = require('child_process').spawn('python3',['src/run/office2john.py',filepath]);
                python.stdout.on('data', function (data) {
                  document.getElementById('hash').value = data.toString('utf8');
                });

            }
            
        });

    })
}



function fileType(){

    document.getElementById('file').disabled = false;
}