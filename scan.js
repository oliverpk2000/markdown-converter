let fs = require('fs');
const chalk = require('chalk');

function scan(ogDir, indexDir, subDir) {
    console.log(chalk.blue('directories'));

    printDirStatus(ogDir);
    printDirStatus(indexDir);
    printDirStatus(`${indexDir}/${subDir}`);

    if (!fs.existsSync(ogDir)) {
        console.log(chalk.red(`no ${ogDir} directory, therefore no src files`));
    } else {
        console.log(chalk.blue('original .md files'));
        let mdFiles = getListOfFiles(ogDir, 'md');
        printFileNameList(mdFiles);
    }

    if (!fs.existsSync(`${indexDir}/${subDir}`)) {
        console.log(chalk.red(`no ${indexDir}/${subDir} directory, therefore no converted files`));
    } else {
        console.log(chalk.blue('converted .html files'));
        let htmlFiles = getListOfFiles(`${indexDir}/${subDir}`, 'html');
        printFileNameList(htmlFiles);
    }

    if(!fs.existsSync(indexDir)){
        console.log(chalk.red(`no ${indexDir} directory, therefore no index file`));
    }else{
        console.log(chalk.blue('index file'));
        console.log(chalk.green(`-- index.html`));
    }
}

function printDirStatus(dir) {
    if (!fs.existsSync(dir)) {
        console.log(chalk.red(`-- directory ${dir} doesn't exist`));
    } else {
        console.log(chalk.green(`-- directory ${dir} exists`));
    }
}

function printFileNameList(fileNameList) {
    fileNameList.forEach(file => {
        console.log(chalk.green(`-- ${file}`))
    });
}

function getListOfFiles(dir, fileExt) {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .filter(item => item.name.split('.')[1] === fileExt)
        .map(item => item.name);
}


module.exports = {scan: scan};
