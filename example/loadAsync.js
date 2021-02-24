import {Base64File} from '../index.js';

const image=new Base64File;
const file='test.png';
const path='./';


//this will load and convert if needed synchriouniously
image.load(path,file,asycHandler);

function asycHandler(err,data){
    if(err){
        console.trace(err);
    }

    console.log(`

    ASYNC: you could send this image via ws or http to the browser or save it to disk now : 

    ${data.slice(0,50)} ... ${data.slice(-50)}


    `);
}