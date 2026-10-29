//Import the express module
import express from 'express';

//Create an instance of an express application
const app = express();

//Define a port number for our server to listen on
const PORT = 3000;

//Enable static file serving
app.use(express.static('public'));

// Add "middleware" to allow the app to parse form data 
//access form data through req.body
app.use(express.urlencoded({extended: true}))

//Set view engine to EJS
app.set('view engine', 'ejs');

//Defining default root ("/")
app.get('/', (req, res) => {
    //res.send('Welcome to Pizza :)');
    //res.sendFile(`${import.meta.dirname}/views/home.html`);
    //changed code above to res.render
    res.render('home');
});

//Add a contact route to display a contact view page
app.get('/contact', (req, res) => {
    // res.sendFile(`${import.meta.dirname}/views/contact.html`);
    res.render('contact');
})

app.get('/test', (req, res) => {
    res.send("this is a test");
})

// Add an order number confrmation route
// app.get('/confirm-order', (req, res) => {
//     // res.sendFile(`${import.meta.dirname}/views/confirm.html`)
//     res.render('confirm');
// })

//Create an array to store our orders
const orders = []; 

//Add a route to process a pizza order
app.post('/submit-order', (req, res) => {

    //Create a JSON object to store order data
    const order = req.body;
    order['timestamp'] = new Date();


    console.log(order);

    //Add order objects to orders array

    orders.push(order);
    console.log(orders)

    //Display the confirmation page
    // res.sendFile(`${import.meta.dirname}/views/confirm.html`);
    res.render('confirm', {order});
});

//Add an admin route
app.get('/admin', (req, res) => {
    res.render('admin', {orders});
})

//Start server on the designated PORT
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});