# Website Performance Optimization portfolio project

To get started, check out the [my repository](https://github.com/jkc1996/front-end-nanodegree-mobile-portfolio) and follow the following steps to run the file:

## Getting started

1. Download the project by clicking on **Clone or download** button.
2. Open the **index.html** file in your favourite browser.
3. And have fun !!

### Part 1: Optimize PageSpeed Insights score for index.html

_To achieve page speed of **more than 90** I followed the below steps:_

1. Biggest issue is that **blocking of page rendering due to CSS**
    - As the solution it's better if we include the both CSS styles inside the HTML.i.e **"inline the css"**.
    - Another issue is **google web font**.for this i found this amazing css trick called **"@font face"**.for solution of this i downloaded the both sans sarif file for 400px and 700px and included in our css style.

2. Added my google analytics id inside my code and called the **analytics script aysnc** at the end of body tag.
3. **Added the perfmetters.js** file inside index.html
4. On main page pizza image is too big.**Using Gulp** i compressed the image.

### Part 2: Optimize Frames per Second in pizza.html & reducing pizza resizing time

_To optimize views/pizza.html, we need to modify `views/js/main.js` until our frames per second rate is 60 fps or higher._
1. In the `resizePizzas()`function, replaced `querySelector()` with the `document.getElementById()` because this api calls faster.
2. for variable `randomPizzas` replaced `querySelector()` with `document.getElementsByClassName()`.
3. Saved `randomPizza.length()` inside variable called `len` and defined this variable inside the for-loop.
4. Using **Chrome Dev Timeline Tool**, you will find that the sliding background pizza are the root cause of our less fps rate. the code for that is inside the `updatePositions() function`. So I made following changes:
    - Defined a new variable called `scrollTop` to store the no. of pixels bar was scrolled to the top.
    - Too much phases of pizzas also creating the our frame rate.for that i defined phase as an array variable to store only 5 values and moved it outside of the loop.
    - Then Replaced the referance to items array using `getElementsByClassName` instead of `querySelectorAll`.
    - Defined the variable `elem` inside the for-loop.that will prevent it from being created every time loop is executed.
    - Then replace `querySelector` with `getElementById` and moved it outside the loop. **Also reduced the no pizzas to 24**.

5. **Chrome Dev Tools** shows that when we move the **Pizza slider**,it is causing the **Forced Synchronous Layout**.
    - `changePizzaSizes(size)` is responsible for this FSL. There is also the violation of DRY.Replaced the queryselector with variable called randomPizza and moved it out of loop.
    - No need of dx inside this function it is constant based on the size.also only addidng 8% additional width, `newWidth` is doing nothing. So i removed it and made 3 cases for newWidth.

6. In `src/views/css/style.css`, I included the CSS properties called `transform: tarnslateZ(0)` and added `backface-visibility` with `hidden` value. Both will accelerate our site performance. 

## What is Gulp ?

_Gulp is the webtool to automically perform the optimizations like minification of CSS and JS files and image optimization._

#### Prerequicite for Gulp

First you have to install the **node.js** and **npm** inside your root directory.following links will help you how to use them (and don't forget to check their documentation):

1. Link for [node.js](https://nodejs.org/en/download/)
2. Link for using [npm](https://docs.npmjs.com/getting-started/installing-node)

For using gulp in your project you will require the package called **Package.json**.This package will include the dependancies which is require for your task like minify JS and CSS and for image compression. 

After that we have to make one JS called **gulpfile.js**. This file include the gulp plugins for the minification and for the compression. It will also cover the source and destination path for your CSS, JS and images.

### How to run Gulp ?

1. Open cmd or your terminal and change the directory using following commands:
     ```bash
        $> cd /path/to/your-project-folder
    ```
2. Check that npm and node.js are installed correctly (this will show you the version no of both):
     ```bash
        $> node -v
        $> npm -v
    ```
3. Following command will install all the gulp dependancies:
    ```bash
        $> npm install
    ```
4. After finishing of your package download type the following command and you will get your minified versions of CSS, JS and compressed images inside your destination folder:
    ```bash
         $> gulp
    ```
    
## What is ngrok ?

_ngrok allows you to expose a web server running on your local machine to the internet. Just tell ngrok what port your web server is listening on._

Some useful tips to help you get started:

1. Check out the repository
2. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
2. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* [The fewer the downloads, the better](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html)
* [Reduce the size of text](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html)
* [Optimize images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html)
* [HTTP caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html)

### Customization with Bootstrap
The portfolio was built on Twitter's [Bootstrap](http://getbootstrap.com/) framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* [Bootstrap's CSS Classes](http://getbootstrap.com/css/)
* [Bootstrap's Components](http://getbootstrap.com/components/)
