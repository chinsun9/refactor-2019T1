const fs = require("fs");
const express = require("express");
const router = express.Router();
const mysql = require("sync-mysql");
const ejs = require("ejs");

router.get("/", (req, res) => {
  res.render("chinsung_graph_wrapper.ejs", {
    title: "Tool",
  });
});

router.post("/", (req, res) => {
  res.render("chinsung_graph_wrapper.ejs");
});

module.exports = router;
