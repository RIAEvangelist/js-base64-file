import {readFile,readFileSync,writeFile,writeFileSync} from 'fs';

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
        console.log(`${path}${fileName}`);
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
        fileName='error.txt',
        callback=function(err){}
    ){
        return writeFileSync(
            `${path}${fileName}`,
            data,
            {
                encoding: 'base64'
            }
        );
    }

    loadRemote(url){

    }
}

export {
    Base64File as default,
    Base64File
};
