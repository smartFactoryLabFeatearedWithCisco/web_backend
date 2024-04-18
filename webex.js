require("dotenv").config();
const { response } = require("express");
const https = require("https");

const header = {
  Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
  "Content-Type": "application/json",
};

let sendMessage = async (machineName, parameter, character) => {
  let response = await fetch("https://webexapis.com/v1/messages/", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      roomId: process.env.MESSAGE_ROOM,
      text: `${character}관련 안내 
      현재 ${machineName}과 관련하여 비이상가동의 징후가 발생하였습니다.
      수치는 현재 ${parameter}입니다. `,
    }),
  });

  console.log(response);
};

module.exports = { sendMessage };
