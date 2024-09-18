import { env } from '@/env';
import { app } from './config';

const { PORT } = env;

app
  .listen({
    host: '0.0.0.0',
    port: Number(PORT),
  })
  .then(() => {
    console.log(`✅ HTTP Server running on PORT: ${PORT}.`);
  });
