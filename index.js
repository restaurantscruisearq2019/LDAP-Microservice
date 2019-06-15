const express = require("express");
const app = express();

const cors = require("cors");

require("./routes/index")(app);

app.use(router);
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 5004;
app.listen(PORT);

console.log("App listening at localhost:" + PORT);
