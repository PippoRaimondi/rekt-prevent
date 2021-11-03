import { v1 } from 'uuid';

import { UniqueIdentifierService } from '../../application/services/UniqueIdentifierService';

export class UUIDService implements UniqueIdentifierService {
  create(): string {
    return v1().toString();
  }
}
