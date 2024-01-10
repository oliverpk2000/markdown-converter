let marked = require('marked');
let fs = require('fs');
const chalk = require('chalk');
const path = require('node:path');

const mainFileHead =
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>
        <!I hope you have an autoformatter if you try to edit this>`;

const mainFileEnd =
    `</body></html>`;

function main(ogDir, indexDir, subDir) {
    console.log(chalk.blue('starting md-convert'));
    if (!fs.existsSync(indexDir)) {
        try {
            fs.mkdirSync(indexDir);
            console.log(chalk.green('created directory html'));
        } catch (error) {
            console.log(chalk.red('could not create /html directory'));
        }
    }
    if (!fs.existsSync(ogDir)) {
        console.log(chalk.red(`markdown file source directory ${ogDir} doesn't exist`));
        process.exit();
    }
    const mdfiles = fs.readdirSync(ogDir, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .filter(item => item.name.split('.')[1] === 'md')
        .map(item => item.name);
    mdfiles.forEach(file => convert(ogDir, path.join(indexDir, subDir), file))
    let htmlpaths = [];
    for (let file of mdfiles) {
        let fileHtml = file.split('.')[0] + '.html';
        let pathToHtml = path.join(subDir, fileHtml);
        htmlpaths.push(pathToHtml);
    }
    build(indexDir, htmlpaths);
    console.log(chalk.blue('thanks for using md-convert :)'));
}

function convert(ogDir, newDir, file) {
    let cwd = process.cwd().toString().trim();
    let md = fs.readFileSync(path.join(cwd, ogDir, file), 'utf-8');
    let html = marked.parse(md);
    let fileNoExt = file.split('.')[0];
    if (!fs.existsSync(newDir)) {
        try {
            fs.mkdirSync(newDir);
            console.log(chalk.green('created directory pages'));
        } catch (error) {
            console.log('could not create /html/pages directory');
        }
    }
    try {
        fs.writeFileSync(path.join(cwd, newDir, fileNoExt + '.html'), html);
        console.log(chalk.green(`converted file ${fileNoExt}.md --> ${fileNoExt}.html`));
    } catch (error) {
        console.log(chalk.red(`could not convert file ${fileNoExt}.md --> ${fileNoExt}.html`));
    }
}

function build(dir, paths) {
    let cwd = process.cwd().toString().trim();
    let indexfile = '';
    indexfile = indexfile + mainFileHead;
    for (let pagepath of paths) {
        try {
            let page = fs.readFileSync(path.join(cwd, dir, pagepath), 'utf-8');

            let htmltag =
                `<div class="page">${page}</div>`
            indexfile = indexfile + htmltag;
        }catch (error) {
            console.log(chalk.red(`unable to read page ${path.join(cwd, dir, pagepath)}`));
        }
    }
    indexfile = indexfile + mainFileEnd;
    try {
        fs.writeFileSync(path.join(cwd, dir, 'index.html'), indexfile);
        console.log(chalk.green('created index.html file'));
    } catch (error) {
        console.log(chalk.red('could not create index.html file'));
    }
}

module.exports = {main: main};