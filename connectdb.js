var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
//   database: "my_db",
  password: "root123",
});

con.connect((err) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("Connected!");
  }
});
