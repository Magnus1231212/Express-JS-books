import express from "express";
import { router } from "./routers/bookRouter.js";

const app = express();

const port = 3000;

app.use(express.static("public"));
app.use("/books", router);

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
