let fs = require('fs');
const path = require('node:path');

function createCssFile(dir, cssFileName) {

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

module.exports = {
    styler: {
        createCssFile,
        getBodyStyle,
        getPageClassStyle,
        getTableStyle
    }
}