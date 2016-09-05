var fs = require('fs');

class Base64Img{
    constructor(){

    }

    load(
        path,
        fileName,
        callback=function(err,data){}
    ){
        const img = fs.readFile(
            `${path}${fileName}`,
            function(err,data){
                if(err){
                    return callback(err,data);
                }

                const base64=new Buffer(img).toString('base64');

                return callback(err,base64);
            }
        );
        return new Buffer(img).toString('base64');
    }

    loadSync(path,fileName) {
        const img = fs.readFileSync(`${path}${fileName}`);
        return new Buffer(img).toString('base64');
    }

    save(
        data,
        path,
        fileName,
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
