# Base64 File loading, converting and saving for node.js

This is an ideal way to load or convert local files to base64 either for use as a string or to save on disk.

|method|params|description|
|------|------|-----------|
|load  |path,fileName|loads a local file and converts it to base64 if needed. ***note : path should always end with a slash*** |
|save  |data,path,fileName,cb|saves the data to the specified path and filename|

# Examples

### loading and converting an image for use in the browser as a data URI

```javascript

    const Base64File=require('Base64File.js');
    const image=new Base64File;

    const file='test.png';

    //path should alwas end in a /
    const path=`${__dirname}/`;

    //this will load and convert if needed
    const data=image.load(path,file);
    console.log('you could send this image via ws or http to the browser now : \n',data);

```

### saving the above converted image for later use.

```javascript

    image.save(data,path,`copy-b64-${file}`);

```

It's that simple! And it will work with any file type!
