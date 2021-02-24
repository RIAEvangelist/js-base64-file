import {Base64File} from '../index.js';

const image=new Base64File;

const remoteURL='https://octodex.github.com/images/';
const remoteFile='megacat-2.png';
const data=await image.loadRemote(remoteURL,remoteFile);

console.log(`

REMOTE: you could send this image via ws or http to the browser or save it to disk now : 

${data.slice(0,50)} ... ${data.slice(-50)}


`);