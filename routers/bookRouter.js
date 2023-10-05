import { Router } from "express";
import fs from "fs";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Works");
});

router.get("/all", (req, res) => {
  let data = fs.readFileSync("./data.json");
  data = data.toString();
  data = JSON.parse(data);
  res.send(data);
});

router.get("/search/:type/:name", (req, res) => {
  let name = req.params.name;
  let type = req.params.type;
  let data = fs.readFileSync("./data.json");
  data = data.toString();
  data = JSON.parse(data);
  let results;
  try {
    results = data.filter((d) =>
      d[type].toLowerCase().includes(name.toLowerCase())
    );
  } catch (Error) {
    res.status(500).send("Error filtering data");
  }
  res.status(200).send(results);
});

router.delete("/by-name/:name", (req, res) => {
  let found = false;
  let name = req.params.name;

  let data = fs.readFileSync("./data.json");
  data = data.toString();
  data = JSON.parse(data);

  for (let i = 0; i < data.length; i++) {
    let title = data[i].Title.toLowerCase();
    name = name.toLowerCase();

    if (title.includes(" ")) {
      title = title.replaceAll(" ", "_");
    }
    if (name.includes(" ")) {
      name = name.replaceAll(" ", "_");
    }

    if (title == name) {
      data.splice(i, 1);
      fs.writeFileSync("./data.json", JSON.stringify(data));
      res.status(200).send("Deleted Entry");
      console.log("Deleted Entry");
      found = true;
    }
  }

  if (!found) {
    res.status(500).send("No Entry Found");
    console.log("No Entry Found");
  }
});

router.post("/add/:title/:author/:genre/:height/:publisher", (req, res) => {
  let title = req.params.title;
  let author = req.params.author;
  let genre = req.params.genre;
  let height = req.params.height;
  let publisher = req.params.publisher;

  let data = fs.readFileSync("./data.json");
  data = data.toString();
  data = JSON.parse(data);

  try {
    data.push({
      Title: title,
      Author: author,
      Genre: genre,
      Height: height,
      Publisher: publisher,
    });

    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.status(200).send("Added Entry");
    console.log("Added Entry");
  } catch (Error) {
    res.status(500).send("Error adding entry");
    console.log("Error adding entry");
  }
});
