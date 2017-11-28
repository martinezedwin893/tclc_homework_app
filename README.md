## Synopsis

This is a TCLC Homework Helper App written in React.

## Getting Started
Open "Terminal" if using Mac or "Command Line" if using Windows.
```
git clone https://github.com/paolomartinez/tclc_homework_app
```
You should see a confirmation message with "......done"

## Prerequisites
Node.js

For Windows and macOS, download version 8.9.1 LTS
```
https://nodejs.org/en/
```

Sass
```
http://sass-lang.com/
```
Click the “Install” tab on the upper-left hand corner

Scroll down on the page and click on the link that says “Koala”

Download version 2.2.0

After you finish downloading and installing, open up your terminal to confirm you have the right versions. For each, you should see the version
that corresponds to the one you just downloaded.
```
npm -v
node -v
sass -v
```

## Installing
Switch to your project directory.

```
cd tclc_homework_app
pwd
```
Path displayed should be:
```
/Users/yourname/Desktop/tclc_homework_app
```

Next, install npm by typing the following:
```
npm install
```

## To Start

```
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
