import { OrderForCreation } from './OrderForCreation';

export interface AddOrderRequest {
  language: string;
  order: OrderForCreation;
}
