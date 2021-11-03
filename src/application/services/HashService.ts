export interface HashService {
    hash(plain: string): Promise<string>;
    isEquals(plain: string, hashed: string): Promise<boolean>;
  }
  