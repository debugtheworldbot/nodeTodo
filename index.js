const  program = require('commander');

program
    .option('-d, --debug', 'output extra debugging')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const word=args.slice(1).join('').split(',').join(' ')
        console.log(word);
    });
program
    .command('clear')
    .description('clear all tasks')
    .action((...args) => {
        console.log('clear');
    });
program.parse(process.argv);
console.log(program.debug)