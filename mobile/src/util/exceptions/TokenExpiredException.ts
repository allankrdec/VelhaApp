/**
 * Módulo para exceçõees de token
 * @module TokenExpiredException
 * @category Exception
 */
export default class TokenExpiredException {
  name: string;
  errors: string;
  constructor(msg: string) {
    this.name = 'TokenExpiredException';
    this.errors = msg;
  }
}
