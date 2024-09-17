import { ZodEnvVarValidator } from '../validators';

export function makeEnvVarValidator() {
  return new ZodEnvVarValidator();
}
