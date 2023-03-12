const { app } = require("./app");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

async function start() {
  await connectToDatabase();
  app.listen(PORT || 3003, () => {
    console.log("Server is running on port:", PORT);
  });
}

start();
