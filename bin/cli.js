#! /usr/bin/env node
// #! 符号的名称叫 Shebang，用于指定脚本的解释程序, Node CLI 应用入口文件必须要有这样的文件头
const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');


// commander
// .version('0.0.1')
// .command('create <name>')
// .description('create a new project')
// .action(name => { 
//   console.log("project name is " + chalk.yellow(name))
// })

// commander.parse()




inquirer.prompt([
  {
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    name: 'name', // key 名
    message: '输入项目名', // 提示信息
    default: 'new-react-app' // 默认值
  }
]).then(answers => {
  // 打印互用输入结果
  console.log(answers)
  const cwdUrl = process.cwd() // process.cwd() 对应控制台所在目录
  // 从模版目录中读取文件
  fs.readdir('./templates', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      // 使用 ejs 渲染对应的模版文件
      // renderFile（模版文件地址，传入渲染数据）
      // ejs.renderFile(path.join(destUrl, file), answers).then(data => {
      //   // 生成 ejs 处理后的模版文件
      // })
      // fs.readFileSync()
      fs.writeFileSync(path.join(cwdUrl, file), 'fdff' )
    })
  })
})