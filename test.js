const Base64File=require('./Base64File.js');
const image=new Base64File;

const file='test.png';

//path should alwas end in a /
const path='./';

//this will load and convert if needed synchriouniously
const data=image.loadSync(path,file);
console.log('SYNC: you could send this image via ws or http to the browser now : \n',data,'\n\n\n');
image.save(data,path,`copy-sync-${file}`);

//this will load and convert if needed asynchriouniously
image.load(
    path,
    file,
    function(err,base64){
        if(err){
            process.exit(1);
        }
        console.log('ASYNC: you could send this image via ws or http to the browser now : \n',base64,'\n\n\n');
        image.save(base64,path,`copy-async-${file}`);
    }
);
