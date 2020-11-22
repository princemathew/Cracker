# Password Cracker



## Developing

1. To edit and test code you should have nodejs installed in your system
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -  

sudo apt-get install -y nodejs
```
2. Goto the project folder in terminal, then execute following commands
 * ```npm install```
 
 For npm start to work please change the paths of python & perl scripts called in file.js line number 37 & 46 respectively
 * ```npm start```
 


## Packaging

I used electron-builder, I had some issues while building : windows installer from ubuntu and ubuntu installer from windows.

```npm run dist```


		



  
