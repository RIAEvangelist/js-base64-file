import {Base64File} from '../index.js';
import {existsSync} from 'fs';

const image=new Base64File;
const file='test.png';
const path='./';
const copyAsyncFile=`copy-async-${file}`;


//load a file
const data=image.loadSync(path,file);

//save the file
image.save(
    data,
    path,
    copyAsyncFile,
    function(err,data){
        if(err){
            console.trace(err);
        }
        
        console.log(existsSync(path+copyAsyncFile));

    }
);