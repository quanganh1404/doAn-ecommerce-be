export class Order {
  userId: string;
  isPaid: boolean;
  shippingAdress: [
    {
      fullname: string;
      address: string;
      street: string;
      phoneNum: number;
      city: string;
    },
  ];
  isDelivered: boolean;
  orderItems: [{ productId: string; price: number; quantity: number }];
  paymentMethod: string;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
