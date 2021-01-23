/**
 * @author spm
 */
const app = require("./config/app");
const PORT = process.env.PORT || 3003;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  const express = require("express");
  const path = require("path");

  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = server;
