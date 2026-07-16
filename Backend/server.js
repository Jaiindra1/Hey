import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3002);
createApp().listen(port, () => {
  console.log(`Traffic control API listening on http://localhost:${port}`);
});
