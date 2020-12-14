function crack(){
    if(checkValue()){
        document.getElementById('cracksub').disabled = true;
        var hashtype=document.getElementById('hashtype').value;
        var hash = document.getElementById('hashin').value;
        var chars = document.getElementById('chars').value
        var len = document.getElementById('passwdlen').value
        require('fs').writeFileSync('src/run/hash.txt',hash)
        if(hashtype == '9400' || hashtype == '9500'||hashtype == '9600'||hashtype == '10400'||hashtype == '10500')
            hash = "--username src/run/hash.txt"
        else 
            hash = "src/run/hash.txt"
        var potcmd = "src/run/hashcat.bin -m "+hashtype+" "+hash+" --show";
        var potfile=checkhc(potcmd);
        if(potfile!=-1){
            
                var cracked=0
                if(potfile.toString('utf8')){
                    document.getElementById('result').value=potfile.toString('utf8')
                    document.getElementById('cracksub').disabled = false;
    
                }
                else{
                    var charset=""
                    for(var i=0;i<len; i++)
                        charset+="?1"
                    var hashc = "src/run/hashcat.bin"+" -m "+hashtype+" -a 3 "+hash+" -1 "+chars+" "+charset+ " --quiet";
                    var hashcat = require('child_process').exec(hashc);
                    document.getElementById('result').value="cracking..."
                   
        
                    hashcat.stdout.on('data', function (data) {
                        document.getElementById('result').value = data.toString('utf8');
                        cracked =1;
                    });
                    hashcat.on('close', () => {
                        if(cracked ==0){
                            document.getElementById('cracksub').disabled = false; 
                            document.getElementById('result').value="keyspace exhausted"
                        }
                    });
    
                }
           
        }       
            
    }
    
}


function checkValue(){
    if(document.getElementById('passwdlen').value!="default"&& 
        document.getElementById('hashtype').value!="default"&&
        document.getElementById('chars').value!="default"&&
        document.getElementById('passwdlen').value!="")    
        return 1;
    else 
        return 0;

}

function checkhc(potcmd){
    try{
        var potfile = require('child_process').execSync(potcmd);
    }
    catch(error){
        document.getElementById('result').value=error;
        document.getElementById('cracksub').disabled = false; 
        return -1;
    }
    return potfile
}