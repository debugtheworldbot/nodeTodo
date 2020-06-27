const db=require('./db.js')
const inquirer=require('inquirer')
module.exports.add=async (title)=>{
    const list=await db.read() //读取
    list.push({title,done:false})//添加
    await db.write(list)//存储
}
module.exports.clear=async ()=>{
    await db.write([])
}
function markAsDone(list,answerIndex) {
    list[answerIndex].done=true
    db.write(list)
}
function updateTitle(list,answerIndex) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: "prompt your new task name:",
        default:list[answerIndex].title
    }).then(answer => {
        list[answerIndex].title=answer.title
        db.write(list)
    });
}

function askForAction(list,answerIndex) {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'what do you want to do?',
            choices:[
                {name:'finished',value:'markAsDone'},
                {name:'edit task name',value:'updateTitle'},
                {name:'unfinished',value:'markAsUndone'},
                {name:'delete task',value:'remove'},
                {name:'exit',value:'exit'},
            ]
        })
        .then(answer2=>{
            switch (answer2.action) {
                case 'markAsDone':
                    markAsDone(list,answerIndex)
                    break;
                case 'updateTitle':
                    updateTitle(list,answerIndex)
                    break;
                case 'markAsUndone':
                    list[answerIndex].done=false
                    db.write(list)
                    break;
                case 'remove':
                    list.splice(answerIndex,1)
                    db.write(list)
                    break;
            }
        })
}
function printTasks(list){
        inquirer
            .prompt({
                type: 'list',
                name: 'index',
                message: 'select task you want to change',
                choices: [...list.map((task,index)=>{
                    return {name:`${task.done?'[X]':'[_]'} ${index+1}-${task.title}`,value:index.toString()}
                }),
                    {name:'add',value:'-2'},
                    {name:'exit',value:'-1'}]

            })
            .then(answer => {
                const answerIndex=parseInt(answer.index)
                if(answerIndex>=0){
                    askForAction(list,answerIndex)
                }else if(answerIndex===-2){
                    askForCreateTask(list)
                }
            });
}
function askForCreateTask(list){
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: "prompt your new task name:",
    }).then(answer => {
        list.push({title:answer.title,done:false})
        db.write(list)
    });
}
module.exports.show=async ()=> {
    const list = await db.read()
    printTasks(list)
}
