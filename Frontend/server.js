import { createApp } from '../Backend/app.js';

const port = Number(process.env.PORT ?? 3001);
createApp().listen(port, () => {
  console.log(`Traffic control API listening on http://localhost:${port}`);
});
