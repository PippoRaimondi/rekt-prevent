  import { Token } from '../entities/Token';
  import {
    TokenResponse,
  } from '../interfaces/responses/TokenResponse';
  
  export class TokenMapper {
    /**
     * @deprecated
     */
    static toJSON(entity: Token): TokenResponse {
      return this.map(entity);
    }
  
    static map(
      entity: Token
    ): TokenResponse {
      const {
        id,
        description,
        chain,
        price
      } = entity;
  
      return {
        id: +id,
        description,
        chain,
        price 
      };
    }
}
  