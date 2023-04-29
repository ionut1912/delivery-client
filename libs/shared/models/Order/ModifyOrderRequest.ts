import { OrderForUpdate } from './OrderForUpdate';

export interface ModifyOrderRequest {
  language?: string;
  orderForEdit: OrderForUpdate;
}
