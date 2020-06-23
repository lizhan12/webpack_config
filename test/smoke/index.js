const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '1000ms'
});

 // 进入到template目录
process.chdir(path.join(__dirname, 'template'));

// 删除当前build创建目录
rimraf('./dist', () => {

  const prodConfig = require('../../lib/webpack.prod.js');

  webpack(prodConfig, (err, stats) => {
    // 如果build时，出现错误打印错误，并退出进程。
    if(err){
      console.error(err)
      process.exit(2)
    }

    // 打印build成功的信息
    console.log(stats.toString({
      colors: true, 
      modules: false,
      children: false
    }))

    console.log('Webapck build is success, begin run test.');
    
    // 开始进行冒烟测试， 检查文件的完整性
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));
    mocha.run();

  })
})