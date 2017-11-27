## Synopsis

This is a TCLC Homework Helper App written in React.

## To Start

Click Clone/download 

Copy link

Open “Terminal” if using Mac or “Command line” if using Windows
```
cd Desktop
git clone https://github.com/paolomartinez/tclc_homework_app 
``

and press enter
You should see a confirmation message with "......done" meaning you successfully cloned the repository

## Download and install programs
Node.js:
https://nodejs.org/en/
For windows and macOS: download version 8.9.1 LTS

Sass:
http://sass-lang.com/
Click the “Install” tab on the upper-left hand corner
Scroll down on the page and click on the link that says “koala”
Download version 2.2.0

```
npm install
npm start
```

Go to [http://localhost:8100/](http://localhost:8100/ "http://localhost:8100/") in your web-browser

## For Styling

We're using Sass for styling. Most of the stylesheets should be named properly and added to scss/partials. If you add a new sheet here, make sure to include it into scss/globals.scss.

To compile your Sass, open a new tab in your terminal and run:

```
sass --watch scss/globals.scss:css/globals.css
```

If you keep this running, the css will update after changes to your .scss files.


## For Homepage - SP17

Implemented success messages using sweetalert2 package

