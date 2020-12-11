function crack(){
    if(checkValue()){
        document.getElementById('cracksub').disabled = true;
        var path = require('path');
        var hashtype=document.getElementById('hashtype').value;
        var hash = document.getElementById('hashs').value;
        var chars = document.getElementById('chars').value
        var len = document.getElementById('passwdlen').value
        /*for building uncomment below line */
        //var perl = require('child_process').spawn('perl',[path.join(__dirname, '../..', '/src/run/pdf2john.pl'),filepath]);
        /*for building comment below line */
        require('fs').writeFileSync('src/run/hash.txt',hash)
        if(hashtype == '9400' || hashtype == '9500'||hashtype == '9600'||hashtype == '10400'||hashtype == '10500')
            hash = "--username src/run/hash.txt"
        else 
            hash = "src/run/hash.txt"
        var checkpotfile = "src/run/hashcat.bin -m "+hashtype+" "+hash+" --show";
        var potfile = require('child_process').execSync(checkpotfile);
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
        
                document.getElementById('result').value="processing..."
               
    
                hashcat.stdout.on('data', function (data) {
                    document.getElementById('result').value = data.toString('utf8');
                    cracked =1;
                });
                hashcat.on('close', () => {
                    document.getElementById('cracksub').disabled = false;
                    if(cracked ==0){
                        document.getElementById('result').value="keyspace exhausted"
                    }
                });

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