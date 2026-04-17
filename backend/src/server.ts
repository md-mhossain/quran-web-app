import app from "./app";

const PORT = process.env.PORT || 3000;

import { initQuran } from "./lib/quran.loader";

const startServer = async () => {
  await initQuran();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
