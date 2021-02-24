import {Base64File} from '../index.js';

const image=new Base64File;
const file='test.png';
const path='./';


//this will load and convert if needed synchriouniously
const data=image.loadSync(path,file);

console.log(`

SYNC: you could send this image via ws or http to the browser or save it to disk now : 

${data.slice(0,50)} ... ${data.slice(-50)}


`);