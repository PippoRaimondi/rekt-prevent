import { config } from 'dotenv';

// Load environment variables
config();

import server from '../../server';

const port = process.env.PORT || 3000;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
