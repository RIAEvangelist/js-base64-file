var fs = require('fs');

class Base64Img{
    constructor(){

    }

    load(path,fileName) {
        const img = fs.readFileSync(`${path}${fileName}`);
        return new Buffer(img).toString('base64');
    }

    save(data, path, fileName) {
        fs.writeFile(
            `${path}${fileName}`,
            data,
            {
                encoding: 'base64'
            },
            function(){
                console.log(arguments)
            }
        );
    }
}

module.exports=Base64Img;
