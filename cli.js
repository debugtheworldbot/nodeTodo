const program = require('commander');
const api=require('./index.js')

program
    .option('-d, --debug', 'output extra debugging')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const word=args.slice(1).join('').split(',').join(' ')
        api.add(word).then(()=>console.log('success!'),()=>console.log('error'))
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(()=>console.log('success!'),()=>console.log('error'))
    });
program
    .command('show')
    .description('show all tasks')
    .action(()=>{
        void api.show()
    })


program.parse(process.argv);

