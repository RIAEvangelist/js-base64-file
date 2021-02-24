import {readFile,readFileSync,writeFile,writeFileSync} from 'fs';
import fetch from 'node-fetch';
import Is from 'strong-type';

const is=new Is;


class Base64File{
    constructor(){

    }

    load(
        path,
        fileName,
        callback=function(err,data){}
    ){
        return readFile(
            `${path}${fileName}`,
            //finess required
            function(err,data){
                if(err){
                    return callback(err,data);
                }

                const base64=Buffer.from(data).toString('base64');

                return callback(err,base64);
            }
        );
    }

    loadSync(path,fileName) {
        //console.log(`${path}${fileName}`);
        const file = readFileSync(`${path}${fileName}`);
        return Buffer.from(file).toString('base64');
    }

    save(
        data='err',
        path='./',
        fileName='error.txt',
        callback=function(err){}
    ){
        return writeFile(
            `${path}${fileName}`,
            data,
            {
                encoding: 'base64'
            },
            //no finessing required
            callback
        );
    }

    saveSync(
        data='err',
        path='./',
        fileName='error.txt'
    ){
        return writeFileSync(
            `${path}${fileName}`,
            data,
            {
                encoding: 'base64'
            }
        );
    }

    async loadRemote(
        url,
        file,
        fetchParams={
            // These properties are part of the Fetch Standard
            // https://github.com/node-fetch/node-fetch#options
            method: 'GET',
            headers: {},            // Request headers. format is the identical to that accepted by the Headers constructor (see below)
            body: null
        }
    ){
        is.string(url);
        is.string(file);
        is.object(fetchParams);
        const response = await fetch(`${url}${file}`,fetchParams);
        const buffer = await response.buffer();     
        return buffer.toString('base64');        
    }
}

export {
    Base64File as default,
    Base64File
};
