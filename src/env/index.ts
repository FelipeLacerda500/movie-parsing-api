import 'dotenv/config';
import { makeEnvVarValidator } from '../env/factories';

const envValidator = makeEnvVarValidator();

const _env = envValidator.validate({
  NODE_ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3333,
});

export const env = _env;
