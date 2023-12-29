# markdown-converter
also known as md-to-html-converter on npm

## installation and use
install the package using this command: 

`npm i -g md-to-html-converter`

convert your md files using this command:

`md-convert convert <ogDir> <indexDir> <subDir>`

`ogDir` is the directory where your markdown files are. It has to be a direct child of the directory where you executed the command

`indexDir` is the directory where the `index.html` will be generated

`subDir` is a subdirectory of `indexDir`, where the generated html files will be saved 
(does not have to exist, this is just to link the files together in the html, it will be created by the program)
