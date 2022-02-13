import mysql from "mysql";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12341234",
    database: "shop",
});

connection.connect((err) => {
    if (err) {
        return console.log(err);
    }
    console.log("connected to db");
    app.listen(1337); // you must start you server after a seccessful connection to the database
    console.log("====");
});

app.post("/create-product", (req, res, next) => {
    const data = req.body;
    const name = data.name;
    const price = data.price;
    const desc = data.desc;
    const imgUrl = data.imgUrl;
    createProduct(name, price, desc, imgUrl);
    res.send({ message: "User created" });
});

app.get("/products", (req, res, next) => {
    connection.query("SELECT * FROM shop.products", (err, data, field) => {
        const result = data.map((item) => {
            return `
									<div>
											<h1> ${item.name} </h1>
											<h3> ${item.price} </h3>
											<p> ${item.description} </p>
											<img height="400" src="${item.imgurl}" />  
									</div>
									`;
        });
        res.send(result);
    });
});

function createProduct(name, price, desc, imgUrl) {
    connection.query(`
	INSERT INTO shop.products (name, price, description, imgurl)
	 VALUES ('${name}', '${price}', '${desc}', '${imgUrl}');
	`);
}