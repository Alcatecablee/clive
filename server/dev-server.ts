import { createServer } from './index.js';

const app = createServer();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
