export interface AppDatabaseSecretsInterface {
  USER: string;
  DATABASE: string;
  PASSWORD: string;
  PORT: number;
  HOST: string;
}

export abstract class AppSecretsInterface {
  abstract DATABASE: AppDatabaseSecretsInterface;
}
