# Base64 File loading, converting and saving for node.js

This is an ideal way to load or convert local files to base64 either for use as a string or to save on disk.

install ` npm i --save js-base64-file `

[see the js-base64-file site](https://riaevangelist.github.io/js-base64-file/)


|method|params|description|
|------|------|-----------|
|load  |path,fileName,callback|loads a local file and converts it to base64 if needed. ***note : path should always end with a slash*** |
|loadSync  |path,fileName|same as load, but it returns the base64 string instead of passing it to a callback. This could be slow on really large files. |
|save  |data,path,fileName,callback|saves the data to the specified path and filename|

|callback|params|description|
|--------|------|-----------|
|load    | err, base64Data|gives you the base64 encoded file data|
|save    | err  |will pass any errors back|

# Examples

### loading and converting an image for use in the browser as a data URI

```javascript

    const Base64File=require('js-base64-file');
    const image=new Base64File;

    const file='test.png';

    //path should alwas end in a /
    const path=`${__dirname}/`;

    //this will load and convert if needed
    const data=image.loadSync(path,file);
    console.log('you could send this image via ws or http to the browser now : \n',data);

```

### saving the above converted image for later use.

```javascript

    image.save(data,path,`copy-b64-${file}`);

```

It's that simple! And it will work with any file type!
