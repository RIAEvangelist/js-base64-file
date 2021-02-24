//import with relative paths to shim for browser
//this way the same code will work here as it does
import ansi from '../ansi-colors-es6/index.js';
import Is from '../strong-type/index.js';

class VanillaTest{
    constructor(){
        
    }

    get is(){
        return this.#is;
    }

    get compare(){
        return this.#is.compare;
    }

    get throw(){
        return this.#is.throw;
    }

    get strict(){
        return this.#is.strict;
    }

    set strict(strict){
        this.#is.boolean(strict);
        return this.#is.strict=strict;
    }

    expects(description){
        this.#is.string(description);

        if(this.#test){
          throw new ReferenceError(
              `${ansi.red(this.#test)} is not complete. So ${ansi.red(description)} can not be started.`
          );      
        }

        this.#test=`${
            this.#failed.length+this.#passed.length+1
            }) .expects ${description}`;
        
        console.log(`\n${ansi.bgBlack.white(this.#test)}`);
        
        if(this.#failed.includes(this.#test)
            ||this.#passed.includes(this.#test)
        ){
          this.#test='';
          throw new ReferenceError(
              `vanilla-test expects test descriptors to be unique
              ${ansi.red(this.#test)} has already been declared and run.
              Please consider a more descriptive and clear test name.`
          );      
        }

        return this.#test;
    }

    pass(strict=false){
        this.#is.boolean(strict);
        
        if(this.#passed.includes(this.#test) 
            || this.#failed.includes(this.#test)
        ){
            if(strict){
                throw new ReferenceError(
                    `${ansi.red(this.#test)} has already passed or failed and is waiting for .done()
                    it can not pass or fail again.`
                );
            }

            return this.#test;
        }    
        this.#passed.push(this.#test);
        
        console.log(
            ansi.greenBright(`   pass\n`)
        );
    
        return this.#test;
    }

    fail(strict=false){
        this.#is.boolean(strict);
        if(this.#passed.includes(this.#test) 
            || this.#failed.includes(this.#test)
        ){
            if(strict){
                throw new ReferenceError(
                    `${ansi.red(this.#test)} has already passed or failed and is waiting for .done()
                    It can not pass or fail again.`
                );
            }
    
            return this.#test;
        }    
        this.#failed.push(this.#test);
        
        console.log(
            ansi.redBright(`   fail\n`)
        );
    
        return this.#test;
    }

    done(){
        //if neither passed nor failed, it will now fail
        if(!this.#passed.includes(this.#test) 
            && !this.#failed.includes(this.#test)
        ){
            this.failed();   
        }
    
        const test=this.#test;
        this.#test='';
        return test;
    }

    report(CI=true){
        let report=`

Result : ${
    this.#failed.length? ansi.redBright('FAILED'):ansi.greenBright('PASSED')
}

Test Total : ${this.#passed.length+this.#failed.length}
${ansi.greenBright('Passed :')} ${this.#passed.length}
${ansi.redBright('Failed :')} ${this.#failed.length}\n`;

        report+=ansi.bgRedBright.black('\nFAILED TESTS :\n');

        for(let test of this.#failed){
            report+=ansi.bgBlack.redBright(`${test}\n`);
        }

        report+=ansi.bgGreenBright.black('\nPASSED TESTS :\n');

        for(let test of this.#passed){
            report+=ansi.bgBlack.greenBright(`${test}\n`);
        }
        
        console.log(ansi.bgBlack(report));

        if(!CI){
            return {
                passed:this.#passed,
                failed:this.#failed
            };
        }

        if(globalThis.process){
            process.exit(this.#failed.length);
            //just incase
            return report;
        }

        //incase you want to execute 
        //the same tests on multiple platforms or get fancy
        return this.#failed.length;
    }

    //chew on something to let async operations have a moment
    delay(delay=1000){
        this.#is.number(delay);
        let current=0;
        while(current<delay){
            current++;
        }
        return this;
    }

    #is=new Is;
    #test='';
    #passed=[];
    #failed=[];
}

export {VanillaTest as default, VanillaTest};