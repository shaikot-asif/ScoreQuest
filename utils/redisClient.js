// redisClient.js
const { createClient } = require("redis");

const client = createClient({
  url: "redis://localhost:6379", // or pass as environment variable
});

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect().then(() => {
  console.log("Redis client connected");
});

module.exports = client;
