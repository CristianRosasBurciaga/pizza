//Import the express module
import express from 'express';

// Import the mysql2 module
// mysql2 allows Node.js to communicate with a MySQL database
import mysql2 from 'mysql2';

//Import .env
import dotenv from 'dotenv';
dotenv.config();
/* ==================== DATABASE CONNECTION POOL ====================


 * Create a CONNECTION POOL to the database
 * A "pool" is like a bucket of ready-to-use database connections.
 * Instead of creating a new connection every time we need to talk
 * to the database (which is slow), we create several connections
 * upfront and reuse them. This makes our app much faster.
 * 
 * .promise() converts the pool to use modern JavaScript Promises
 * This allows us to use 'async/await' syntax which simplifies our code.
 */
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

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

app.get('/db-test', async(req,res) => {

    try {
        const orders = await pool.query('SELECT * FROM orders')
        res.send(orders[0]);
    } catch(err) {
        console.error('Database err: ', err);
        res.status(500).send('Database error occured.')
    } 
});
 
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
app.post('/submit-order', async(req, res) => {

    //Create a JSON object to store order data
    const order = req.body;
    console.log(order);

    //Define an SQL query to INSERT new order
    const sql = `INSERT INTO orders (fname, lname, email, size, method, toppings, comment)
                VALUES(?, ?, ?, ?, ?, ?, ?)`;

    //Create an array of parameters form order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.comment,
    ];

    //Execute the query
    const [result] = await pool.execute(sql, params)

    //Display the confirmation page
    // res.sendFile(`${import.meta.dirname}/views/confirm.html`);
    res.render('confirm', {order});
});

//Add an admin route
app.get('/admin', async(req, res) => {
    try {
        const orders = await pool.query('SELECT * FROM orders')
        console.log(orders[0]);
        res.render('admin', {orders:orders[0]});
    } catch(err) {
        console.error('Database err: ', err);
        res.status(500).send('Database error occured.')
    } 
});

//Start server on the designated PORT
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});