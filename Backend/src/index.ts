import {config} from './configs/config';
import app from './app';
import { connectDB } from './configs/database';

async function main() {
  try {
    await connectDB();
    app.listen(config.port_backend);
    console.log(`Listening on port https://localhost:${config.port_backend}`);
    console.log(`Environment: ${process.env.NODE_ENV}`)
  } catch (error) {
    console.error(error);
  }
}
main();