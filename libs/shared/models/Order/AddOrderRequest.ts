import { OrderForCreation } from './OrderForCreation';

export interface AddOrderRequest {
  language: string;
  orderForCreation: OrderForCreation;
}
