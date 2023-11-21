import { BaseError } from './base.error';

export class UnsupportedResponseError extends BaseError {
  constructor(message?: string) {
    super(message || 'Unsupported Response received from server');
  }
}
