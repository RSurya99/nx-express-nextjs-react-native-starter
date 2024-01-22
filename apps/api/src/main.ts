// Express
import express from 'express';

// Cors
import cors from 'cors';

// Path
import * as path from 'path';

// Routes
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', routes)

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
