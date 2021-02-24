# Base64 File loading, converting and saving for node.js

This is an ideal way to load and convert local and remote files to base64 either for use as a string or to save on disk.

***This works with all file types!***

install ` npm i js-base64-file `

----

# Class Methods

|method     |params                     |description|
|------     |------                     |-----------|
|load       |path,fileName,callback     |loads a local file and converts it to base64. ***note : path should always end with a slash*** |
|loadSync   |path,fileName              |same as load, but it returns the base64 string instead of passing it to a callback. This could be slow on really large files. |
|loadRemote |url,fileName,[`node-fetch` options](https://github.com/node-fetch/node-fetch#options)|loads a remote file and converts it to base64. This defaults to a simple `GET` request, but allows the full options from node-fetch for any type of request even with payloads|
|save       |data,path,fileName,callback|saves the data to the specified path and filename async callback|
|saveSync   |data,path,fileName         |saves the data to the specified path and filename sync|

## Class Instance

|callback|params|description|
|--------|------|-----------|
|load    | err, base64Data  |gives you the base64 encoded file data|
|save    | err, data        |will pass any errors back it is unlikely there will ever be data|

----

# Testing & Coverage
We have 98% coverage with the ***amazing*** [`C8` coverage tool](https://github.com/bcoe/c8). The only things not covered are empty default param functions. You can see the coverage details in the `./coverage/index.html` file.

We use the [`vanilla-test testing module`](https://github.com/RIAEvangelist/vanilla-test) for super light and fast testing, and have integrated with Travis CI.

You can run the tests and explore the coverage yourself by cloning the repo and running `npm test`. It will automatically set everything up and run coverage for you.


# Examples

You can look at and run the files in the `./example` dir and run them with `node ./example/{example}.js`

Below are some quick copy paste examples for you.

-----

## LoadSync

```javascript

    import {Base64File} from 'js-base64-file';

    const image=new Base64File;
    const file='test.png';
    const path='./';


    //this will load and convert if needed synchriouniously
    const data=image.loadSync(path,file);

    console.log(`

    SYNC: you could send this image via ws or http to the browser or save it to disk now : 

    ${data.slice(0,50)} ... ${data.slice(-50)}


    `);

```

## Load Async callback

```javascript

    import {Base64File} from 'js-base64-file';

    const image=new Base64File;
    const file='test.png';
    const path='./';


    //this will load and convert if needed synchriouniously
    image.load(path,file,asycHandler);

    function asycHandler(err,data){
        if(err){
            console.trace(err);
        }

        console.log(`

        ASYNC: you could send this image via ws or http to the browser or save it to disk now : 

        ${data.slice(0,50)} ... ${data.slice(-50)}


        `);
    }

```

## Load Remote Await

```javascript

    import {Base64File} from 'js-base64-file';

    const image=new Base64File;

    const remoteURL='https://octodex.github.com/images/';
    const remoteFile='megacat-2.png';
    const data=await image.loadRemote(remoteURL,remoteFile);

    console.log(`

    REMOTE: you could send this image via ws or http to the browser or save it to disk now : 

    ${data.slice(0,50)} ... ${data.slice(-50)}


    `);

```

## SaveSync

```javascript

    import {Base64File} from '../index.js';
    import {existsSync} from 'fs';

    const image=new Base64File;

    const remoteURL='https://octodex.github.com/images/';
    const remoteFile='megacat-2.png';

    const localPath='./';
    
    //loading an image
    const data=await image.loadRemote(remoteURL,remoteFile);

    //saving the image
    image.saveSync(data,localPath,remoteFile);

    console.log(existsSync(localPath+remoteFile));

```

## Save Async Callback

```javascript

    import {Base64File} from 'js-base64-file';
    import {existsSync} from 'fs';

    const image=new Base64File;
    const file='test.png';
    const path='./';
    const copyAsyncFile=`copy-async-${file}`;


    //load a file
    const data=image.loadSync(path,file);

    //save the file
    image.save(
        data,
        path,
        copyAsyncFile,
        function(err,data){
            if (err||!existsSync(`${path}${copyAsyncFile}`)){
                test.fail();
            }

            console.log(existsSync(path+copyAsyncFile));

            //call next test here
        }
    );

```

It's that simple! And it will work with any file type!
