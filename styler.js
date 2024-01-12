let fs = require('fs');
const path = require('node:path');
const chalk = require("chalk");

function createAndWriteCssFile(dir, cssFileName) {
    let cwd = process.cwd();
    try {
        fs.writeFileSync(path.join(cwd, dir, cssFileName), compoundStyles());
        console.log(chalk.green(`created ${cssFileName} file`));
    } catch (error) {
        console.log(chalk.red(`couldn't created ${cssFileName} file`));
    }
}

function getBodyStyle() {
    return `body {
    font-family: Helvetica, serif;
    padding: 20px;
    background: #000000;
    color: white;}\n`;
}

function getPageClassStyle() {
    return `.page {
    border: 1px solid #d3d3d3;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 20px;
    background: #181818;}\n`;
}

function getTableStyle() {
    return `table, th, td {
    border: 1px solid;
    border-collapse: collapse;
    padding: 2px;}\n`;
}

function compoundStyles() {
    return getBodyStyle() + getPageClassStyle() + getTableStyle();
}

module.exports = {
    styler: {
        createAndWriteCssFile,
        compoundStyles,
        getBodyStyle,
        getPageClassStyle,
        getTableStyle
    }
}