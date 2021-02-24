import {Base64File} from '../index.js';
import {existsSync} from 'fs';

const image=new Base64File;

const remoteURL='https://octodex.github.com/images/';
const remoteFile='megacat-2.png';
const data=await image.loadRemote(remoteURL,remoteFile);

const localPath='./';

console.log(`

SAVING: ./${remoteFile} 

${data.slice(0,50)} ... ${data.slice(-50)}


`);

image.saveSync(data,localPath,remoteFile);

console.log(existsSync(localPath+remoteFile));