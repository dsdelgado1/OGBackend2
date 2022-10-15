# Node.js Notes

## Starting off

- One thing we need to account for is we should have "type": "module" in our package.json so we can import things
## Creating a server

- To create a server, we need certain modules
    - https/http
        - We would do this in our app.js file
    - We then do 
    
    ```javascript
    const server = http.createServer((req, res) => {
        [Stuff we want here]
    })

    server.listen([destination]);
    ```
    - To stop the server from running, you do 
    ```javascript
    process.exit()
    ```
    - Other meaningful things you can do are `req.url` to get url, `req.headers` to get headers, and `req.method` to get the method you're using
- To make html code, you write it within `res.write()` functions and end with `res.end()`
    - e.g.
    ```javascript
    res.write('<html>');
    res.write('<stuff you want>')
    res.write('</html>');
    res.end();
    ```

- To create a new file and save text to it, use `fs.writeFileSync(file_name, file_text)`
    - If you have a user input, you can utilize the user text by utilizing *__streams and buffers__*
        - An incoming request starts with a stream and each part of the request has a body. A buffer is like a bus that the body rides on. 
        - Utilizing the `req.on()` function allows us to listen to requests. Use `req.on('data', (chunk) => {stuff to do})
    - Note that `fs.writeFileSync(stuff)` is *__synchronous__* which is fine in small scale stuff but the beauty of node (I believe) is that good good *__async__*. So should just use `fs.writeFile`
        - `fs.writeFile` takes a third argument which is an anonymous callback function for errors.
            ```javascript
            fs.writeFile('file_to_write_to', message_written, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
            ```

## Node Behind the Scenes

### Single Thread, Event Loop, & Blocking Code
- The *__Event Loop__* is automatically started by node. 
    - This loop handles event callbacks
- We also have the *__Worker pool__* which does all of the heavy lifting (runs on multiple threads)
- I know this stuff is important but god is is boring...

## Understanding NPM Scripts

- To make a package.json file, run `npm init`
- Within our package.json file, there is a section called "scripts"
    - Under it, you can write scripts that allow you to do cool things.
        - An example of one is "start": "node app.js" which allows you to write npm start instead of node app.js
        - You can also write custom scripts such as `"start-server": "node app.js"`
            - To run this, you write `npm run start-server` in the terminal

## Error Handling!

- Three kinds of errors
    - Syntax, runtime, and logic
    - How to handle syntax errors:
        - Kinda just read the error messages you're already given (for now)
    - How to handle runtime errors:
        - Same as syntax
    - What about logic errors?:
        - Use the node.js debugger (it's the little play button with the bug next to it)
            - The way it works is you run your code, click the *red dot* on the left of the text file line (like left of the line number) and then do the thing on your site that will lead to that. That will result in the red dot being highlighted yellow meaning it passed through it.
            - It gives you lots of information as to what's doing what.
            - You can also click on the debug console panel (next to terminal above the terminal window) to test what variables you have access to (I'ts like rails console or the `debugger` keyword in JS) 
            - To work with nodemon, you have to add a configuration, set "restart": true, and then set "runtimeExecutable": "nodemon"
                - Other things you can do are like "console": "integratedTerminal" (which is good for nodemon)
        - There's certainly going to be a better 3rd party package that will make this process better

## Express JS
- What is Express?
    - It's a framework for making the code you write better and more convenient
    - There are other alternatives
        - You could use vanilla node.js, but why would you
        - Adonis.js, Koa, Sails.js, etc.
        - We're gonna do Express.js 
- How to add Express.js to your project
    - first start by installing it (npm install express --save).
    - If you have a routes file, get rid of it
    - import express in your app.js file
    - Create a function in your app file like this:
        - `const app_name = express();`
    - Then finally create a server and set the inside of the function to `app_name` instead of the routes function
- Express is all about middleware
    - The way to utilize it is through functions like:
        - `app.use((req, res, next) => {
            console.log('In the middleware!')
            next();
        })`
        `app.use((req, res, next) => {
            console.log('In the middleware!')
        })`
            - Notice the `next()` call. That sends it to the next app.use thing.
        - We can also get a view through `res.send()`.
            - This sends a response 
        - We can also replace the const server = ... with `app.listen(3000)`

- We can utlize Express also to access different routes
    - In the previous bullet point, we talked about app.use. What we can do is add a route prior to the whole (req, res,next) thing. If you put nothing, like we did there, it would default to '/'
        - ```javascript
            app.use('/page-extension',(req,res,next) => {
                stuff you want done
            })
          ```
    - The order and whether or not you use next matters
        - Whenver you're sending a request, you don't want to use a next since you want to only send one
        - With order, let's say you put a '/' before something else, you would always run it, even if you're not going to that page (I'll figure this out more later)
            - This actually only matters when you use `app.use()`. If you use get or post or whatever, it doesn't matter

- Parsing incoming requests
    - You can send a form, and then use the function `res.redirect(redirect_link)` to redirect to it!
    - To parse the body, you need to use express's built-in bodyParser value like this:
        - `app.use(express.urlencoded({extended: true}));`
        `app.use(express.json());`
    - Then you simply do req.body.title to get the value saved in the thing.
- The issue is though that we're using app.use, which is a little too vague. What we should be using is things like `app.get()`, `app.post()`, etc.

- Using express router
    - We may want to split our routing code over various files so we don't have to make all of our routes be in one file. 
        - Start by making a routes folder
        - Within that folder, make route files and utilize the method `express.Router();`
        - We then export that router individually and then import it in our app.js file so we can use it as if it were in the app.js file without all of the clutter
- Setting up a 404 page
    - You can do `app.use((req, res, next) => {
        res.status(404).send('<h1>Page not found</h1>)
    })`
-  Filtering Paths
    - Let's say all admin routes are `/admin/...`. Rather than making multiple routes in our admin file with `/admin/...`, we can just put `app.use('/admin', adminRoutes)` in app so that we don't need to keep doing it over and over again.
- Using HTML files
    - Instead of the obnoxious res.send() bullshit, we can use the `path` module to just import an external html file to act as that code.
    ```
    import path from 'path';
    router.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    })
    ```
    - Notice the lack of slashes. Do it like that.
    - This is actually really useful because it allows us to find the location without worrying about OS specifics (like on windows, we use \\ rather than /)

    - You can also make a utils folder, put a path file in it, then use the helper function `path.dirname(process.mainModule.filename)` and replace `..` with the imported rootpath.

- Styling our pages
    - He just put css in the html file which is gross 

## MVC 

- Controllers
    - named in the plural since that's the convention
        - e.g. products.js
    - You'd put all of the different things that act as controllers in the files then in routes, you would just call them in as references
        - In controller:
        ```javascript
        const productIndex = (req, res, next) => {
            res.render('add-product', {
                css stuff...

            })
        }

        const productCreate = (req,res,enxt) => {
            products.push({stuff})
        }

        export productIndex
        export productCreate
        ```
        - Then in routes:
            ```javascript
            router.get('/add-product', productsController.productIndex)
            router.post('/add-product', productsController.productCreate)
            export router
            ```
    - 404 should also be accomplished in routes
- Models
    - Named in the singular
    - Make a class and define the shape of the element
    ```javascript
    class Product {
        constructor(t, products) {
            this.title = t;
            this.products = products
        }

        save() {
            products.push(this);
        }
    }
    static fetchAll() {
        //Static so you can get all
        return this.products;
    }
    ```

    - To utilize models in controllers, just import the product class then utilize it's methods
    ```javascript
    const product = new Product(req.body.title)
    product.save();
    res.redirect('/')
    ```
    - Starting to look a lot more like Rails!

## SQL
- We have our utils folder, much like we have a db folder in rails
- In our util, we have a database.js file
- Unlike in rails, where the functions we use are pre-made for us (e.g. findByID, delete, etc.), we need to make them on our own, utlizing SQL commands on our own. We do this in our model file and make them static methods within the class
    ```javascript
    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }
    ```
- Note we need to have made the db file and to import it into this file
- After, in our controllers, we will need to utlizie the promise with .then().catch()
    ```javascript
    Product.fetchAll().then(([rows, fieldData]) =>{
        res.render('shop/index', {
            prods: rows, pageTitle: 'Shop', path: '/'
        })
        .catch(err => console.log(err))
    } )
    ```
- To add elements, we use INSERT INTO
    - Essentially, we need to just know SQL well since we do it all manually

## Sequelize

- So in the last section, we had talked about doing all of the SQL by ourselves, but we actually can just use Sequelize which basically does it all for us (At a first glance, this makes it look like rails)
- See database.js and product.js for some information