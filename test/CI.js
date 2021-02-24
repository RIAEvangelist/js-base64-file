import VanillaTest from 'vanilla-test';
import {Base64File} from '../index.js';
import { existsSync } from 'fs';

const test=new VanillaTest;

//test setup
const image=new Base64File;
const file='test.png';
const copySyncFile=`copy-sync-${file}`;
const copyAsyncFile=`copy-async-${file}`;
const path='./';
const minLength=30e3; //30k

const remoteURL='https://octodex.github.com/images/';
const remoteFile='megacat-2.png';

let data='';

const cleanup=function(){
    data='';
}

try{
    test.expects('LoadSync Local Image as Base64String');    
    data=image.loadSync(path,file);

    if(data.length<minLength){
        test.fail();
    }

}catch(err){
    console.trace(err);
    test.fail();
}
//skip cleanup and let data continue
test.pass();
test.done();

try{
    test.expects(`SaveSync to save loadsync data image to "${copySyncFile}"`);    
    image.saveSync(data,path,copySyncFile);

    if (!existsSync(`${path}${copySyncFile}`)){
        test.fail();
    }

}catch(err){
    console.trace(err);
    test.fail();
}
cleanup();
test.pass();
test.done();

//remote

try{
    test.expects('loadRemote to load Image as Base64String');    
    data=await image.loadRemote(remoteURL,remoteFile);

    if(data.length<minLength){
        test.fail();
    }

}catch(err){
    console.trace(err);
    test.fail();
}

cleanup();
test.pass();
test.done();



//async

try{
    test.expects('Load Async Local Image as Base64String');    
    image.load(
        path,
        file,
        function(err,base64){
            if(err||base64.length<minLength){
                test.fail();
            }
            
            cleanup();
            test.pass();
            test.done();

            //call next test here
            testSaveAsnyc(base64);
        }
    );

}catch(err){
    console.trace(err);
    test.fail();
}

function testSaveAsnyc(data){
    try{
        test.expects(`Save Async to save load data image to "${copyAsyncFile}"`);    
        image.save(
            data,
            path,
            copyAsyncFile,
            function(err,data){
                if (err||!existsSync(`${path}${copyAsyncFile}`)){
                    test.fail();
                }

                cleanup();
                test.pass();
                test.done();

                //call next test here
            }
        );
    
        
    
    }catch(err){
        console.trace(err);
        test.fail();
    }
}