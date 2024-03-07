import { Environment } from 'src/enums';
import { EnvironmentVariables } from 'src/interfaces/env.interface';

export default (): EnvironmentVariables => ({
  port: parseInt(process.env.PORT),
  baseUrl: process.env.BASE_URL,
  nodeEnv: (process.env.NODE_ENV as Environment) || Environment.Development,
  sentryDsn: process.env.SENTRY_DSN,
  databaseUrl: process.env.DATABASE_URL,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
