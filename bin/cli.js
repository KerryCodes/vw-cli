#! /usr/bin/env node
// #! 符号的名称叫 Shebang，用于指定脚本的解释程序, Node CLI 应用入口文件必须要有这样的文件头
const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');


inquirer.prompt([
  {
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    name: 'name', // key 名
    message: '输入项目名', // 提示信息
    default: 'new-react-app' // 默认值
  },
  {
    type: 'input',
    name: 'description',
    message: '输入项目描述',
    default: '无'
  }
]).then(answers => {
  try{
    const templateSrc= path.resolve(__dirname, '../templates') // 模版文件所在目录
    const cwdUrl = process.cwd() // process.cwd() 对应控制台所在目录
    const dirPath= path.join(cwdUrl, answers.name) // 新建项目目录
    copyFiles(dirPath, templateSrc, answers)
    console.log('完成创建项目：' + chalk.yellow(answers.name)) // 打印互用输入结果
  }catch(e){
    console.log(e)
  }
})


function copyFiles(dirPath, templateSrc, answers){
  fsPromises.mkdir(dirPath) // 创建新项目目录
  // 从模版目录中读取文件
  fs.readdir(templateSrc, (err, files) => {
    files.forEach(file => {
      const dirPathNext= path.join(dirPath, file)
      const templateSrcNext= path.join(templateSrc, file)
      const isDirectory= fs.statSync(templateSrcNext).isDirectory()
      if(isDirectory){
        copyFiles(dirPathNext, templateSrcNext, answers)
        return;
      }
      fsPromises.copyFile(templateSrcNext, dirPathNext)
      .then(() => {
        const { name, description }= answers
        if(file === 'index.html'){
          fs.readFile(dirPathNext, 'utf8', (err, data) => {
            const result = data.replace(/PROJECT_NAME/g, name)
            fsPromises.writeFile(dirPathNext, result)
          })
        }
        if(file === 'package.json' || file === 'README.md'){
          fs.readFile(dirPathNext, 'utf8', (err, data) => {
            const result = data.replace(/PROJECT_NAME/g, name).replace(/DESCRIPTION/g, description)
            fsPromises.writeFile(dirPathNext, result)
          })
        }
      })
    })
  })
}



// commander
// .version('0.0.1')
// .command('create <name>')
// .description('create a new project')
// .action(name => { 
//   console.log("project name is " + chalk.yellow(name))
// })

// commander.parse()