import { app } from "./src/app.js";

import conf from "./src/conf/conf.js";

const PORT = conf.PORT || 8080;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
