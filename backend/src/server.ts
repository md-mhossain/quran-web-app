import app from "./app";
import { CONFIG } from './config';

import { initQuran } from "./lib/quran.loader";

const PORT = CONFIG.PORT || 8000;

const startServer = async () => {
  await initQuran();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
