const homedir=require('os').homedir()
const home=process.env.HOME || homedir
const p=require('path')
const dbPath=p.join(home,'.todo')
const fs=require('fs')
const db=require('./db.js')
module.exports.add=async (title)=>{
    //读取
    const list=await db.read()
    //添加
    list.push({title,done:false})
    //存储
    await db.write(list)


}