var fs = require('fs');

class Base64Img{
    constructor(){

    }

    load(
        path,
        fileName,
        callback=function(err,data){}
    ){
        fs.readFile(
            `${path}${fileName}`,
            function(err,data){
                if(err){
                    return callback(err,data);
                }

                const base64=new Buffer(data).toString('base64');

                return callback(err,base64);
            }
        );
    }

    loadSync(path,fileName) {
        console.log(`${path}${fileName}`);
        const file = fs.readFileSync(`${path}${fileName}`);
        return new Buffer(file).toString('base64');
    }

    save(
        data='err',
        path='./',
        fileName='error.txt',
        callback=function(err){}
    ) {
        fs.writeFile(
            `${path}${fileName}`,
            data,
            {
                encoding: 'base64'
            },
            callback
        );
    }
}

module.exports=Base64Img;
