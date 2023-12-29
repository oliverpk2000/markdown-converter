let marked = require('marked');
let fs = require('fs');
const chalk = require('chalk');

const mainFileHead =
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>`;

const mainFileEnd =
    `</body>
    </html>`;

function main(ogDir, indexDir, subDir) {
    console.log(chalk.blue('starting md-convert'));
    if (!fs.existsSync(indexDir)) {
        fs.mkdirSync(indexDir);
        console.log(chalk.green('created directory html'));
    }
    const mdfiles = fs.readdirSync(ogDir, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(item => item.name);
    mdfiles.forEach(file => convert(ogDir, `${indexDir}\\${subDir}`, file))
    let htmlpaths = [];
    for (let file of mdfiles) {
        let fileHtml = file.split('.')[0] + '.html';
        let pathToHtml = `${subDir}/${fileHtml}`;
        htmlpaths.push(pathToHtml);
    }
    build(indexDir, htmlpaths);
    console.log(chalk.blue('thanks for using md-convert :)'));
}

function convert(ogDir, newDir, file) {
    let cwd = process.cwd().toString().trim();
    let md = fs.readFileSync(`${cwd}\\${ogDir}\\${file}`, 'utf-8');
    let html = marked.parse(md);
    let fileNoExt = file.split('.')[0];
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
        console.log(chalk.green('created directory pages'));
    }
    fs.writeFileSync(`${cwd}\\${newDir}\\${fileNoExt}.html`, html);
    console.log(chalk.green(`converted file ${fileNoExt}.md --> ${fileNoExt}.html`));
}

function build(dir, paths) {
    let cwd = process.cwd().toString().trim();
    let indexfile = '';
    indexfile = indexfile + mainFileHead;
    for (let path of paths) {
        let htmltag = `
        <div>
            <iframe src="${path}" onload='(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this));' 
            style="height:200px;width:100%;border:none;overflow:hidden;">    
        </iframe>
        </div>`
        indexfile = indexfile + htmltag;
    }
    indexfile = indexfile + mainFileEnd;
    fs.writeFileSync(`${cwd}\\${dir}\\index.html`, indexfile);
}

module.exports = {main};