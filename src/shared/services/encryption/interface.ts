export interface IEncryptionService {
  hashString: (plainString: string) => Promise<string>;
  doStringAndHashedStringMatch: (
    plainString: string,
    hashedString: string,
  ) => Promise<boolean>;
}
