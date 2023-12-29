let marked = require('marked');
let fs = require('fs');
const fileHead =
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>index</title>
    </head>
    <body>`;

const fileEnd =
    `</body>
    </html>`;

function main(ogDir, indexDir, subDir) {
    if(!fs.existsSync(indexDir)){
        fs.mkdirSync(indexDir);
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
}

function convert(ogDir, newDir, file) {
    let cwd = process.cwd().toString().trim();
    let md = fs.readFileSync(`${cwd}\\${ogDir}\\${file}`, 'utf-8');
    let html = marked.parse(md);
    let fileNoExt = file.split('.')[0];
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
    }
    fs.writeFileSync(`${cwd}\\${newDir}\\${fileNoExt}.html`, html);
}

function build(dir, paths) {
    let cwd = process.cwd().toString().trim();
    let indexfile = '';
    indexfile = indexfile + fileHead;
    for (let path of paths) {
        let htmltag = `<div>
            <object data="${path}" type="text/html"></object>
        </div>`
        indexfile = indexfile + htmltag;
    }
    indexfile = indexfile + fileEnd;
    fs.writeFileSync(`${cwd}\\${dir}\\index.html`, indexfile);
}

module.exports = {main};