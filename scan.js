let fs = require('fs');
const chalk = require('chalk');
const path = require('node:path');

function scan(ogDir, indexDir, subDir) {
    console.log(chalk.blue('directories'));

    printDirStatus(ogDir);
    printDirStatus(indexDir);
    printDirStatus(path.join(indexDir, subDir));

    if (!fs.existsSync(ogDir)) {
        console.log(chalk.red(`no ${ogDir} directory, therefore no src files`));
    } else {
        console.log(chalk.blue('original .md files'));
        let mdFiles = getListOfFiles(ogDir, 'md');
        printFileNameList(mdFiles);
    }

    if (!fs.existsSync(path.join(indexDir, subDir))) {
        console.log(chalk.red(`no ${path.join(indexDir, subDir)} directory, therefore no converted files`));
    } else {
        console.log(chalk.blue('converted .html files'));
        let htmlFiles = getListOfFiles(path.join(indexDir, subDir), 'html');
        printFileNameList(htmlFiles);
    }

    if (!fs.existsSync(indexDir)) {
        console.log(chalk.red(`no ${indexDir} directory, therefore no index file`));
    } else {
        let indexFiles = getListOfFiles(indexDir, 'html').filter(file => file === 'index.html');
        if (indexFiles.length > 0) {
            console.log(chalk.blue('index.html file'));
            printFileNameList(indexFiles);
        } else {
            console.log(chalk.red('no index.html found'));
        }
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
