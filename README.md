# Password Cracker



## Developing

1. Install nodejs
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -  

sudo apt-get install -y nodejs
```
2. Goto the project folder in terminal, then execute following commands to run
 * ```npm install```

 For npm start to work please change the paths of python & perl scripts called in file.js line number 37 & 46 respectively
 * ```npm start```
 


## Packaging

I used electron-builder, I had some issues while building : windows installer from ubuntu and ubuntu installer from windows.

```npm run dist```


## Credits

pdf2john.pl and office2john.py source - https://github.com/openwall/john/
hashcat - https://hashcat.net/hashcat/


		



  
