require("dotenv").config();
const { response } = require("express");
const https = require("https");

const header = {
  Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
  "Content-Type": "application/json",
};

let sendMessage = async () => {
  let response = await fetch("https://webexapis.com/v1/messages/", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      roomId: process.env.MESSAGE_ROOM,
      text: "hahaha",
    }),
  });
  console.log(response);
};

module.exports = { sendMessage };
