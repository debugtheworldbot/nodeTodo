const homedir=require('os').homedir()
const home=process.env.HOME || homedir
const p=require('path')
const dbPath=p.join(home,'.todo')
const fs=require('fs')
module.exports.add=(title)=>{
    fs.readFile(dbPath, {flag:'a+'},(error,data)=>{
        if(error){console.log(error)} else {
            let list
            try{
                list=JSON.parse(data.toString())
            }catch (err) {
                list=[]
            }
            console.log(list)
            const task={
                title,
                done:false
            }
            list.push(task)
            const string=JSON.stringify(list)
            fs.writeFile(dbPath,string+'\n',(err2)=>console.log(err2))
        }
        }
    );

}