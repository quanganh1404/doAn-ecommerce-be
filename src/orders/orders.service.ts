import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<Order>,
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  async fakeDataByFaker(number: number) {
    // Get all users
    const users = await this.userService.findAll();
    // Get all products
    const products = await this.productService.findAll();
    // Get all orders
    const orders = await this.findAll();

    for (let i = 0; i < number; i++) {
      // Get random user
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;

      // Init Product array
      const productArr = [];

      // Number of product in array
      for (let j = 0; j < 3; j++) {
        // Random product array
        let randomProduct =
          products[Math.floor(Math.random() * products.length)];

        while (
          productArr.find((product) => product.productId == randomProduct.id) !=
          undefined
        ) {
          randomProduct = products[Math.floor(Math.random() * products.length)];
        }

        // Check random product ordered before
        let randomProductOrderedBefore = false;
        let productRatingBefore: string;

        orders.forEach((order) => {
          if (order.userId == randomUserId) {
            order.orderItems.forEach((item: any) => {
              if (randomProduct.id == item.productId) {
                randomProductOrderedBefore = true;
                productRatingBefore = item.rating;
              }
            });
          }
        });
        // If true
        if (randomProductOrderedBefore) {
          productArr.push({
            productId: randomProduct.id,
            price: randomProduct.price,
            quantity: faker.datatype.number({ min: 1, max: 5 }),
            rating: productRatingBefore,
          });
        }
        // Get rating before
        else {
          productArr.push({
            productId: randomProduct.id,
            price: randomProduct.price,
            quantity: faker.datatype.number({ min: 1, max: 5 }),
            rating: faker.datatype.number({ min: 1, max: 5 }),
          });
        }
      }

      let total = 0;
      productArr.forEach((product) => {
        total = total + product.price * product.quantity;
      });

      const taxPrice = (total * 8) / 100;
      const totalPrice = taxPrice + total + 30000;
      const paymentMethod = ['BANKING', 'CASH'][
        (Math.random() * ['BANKING', 'CASH'].length) | 0
      ];

      await this.create({
        paymentMethod: paymentMethod,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        orderItems: productArr,
        shippingAdress: {
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          fullName: faker.name.lastName(),
          phoneNum: parseInt(
            `3${faker.datatype.number({
              min: 10000000,
              max: 99999999,
            })}`,
          ),
          street: faker.address.streetName(),
        },
        shippingPrice: 30000,
        userId: randomUserId,
        // createdAt: '2022-01-19T21:10:30.258+00:00',
      });
    }

    return { message: 'Fake order success', numberOfOrders: number };
  }

  async paidUser(orderId: string) {
    const user = await this.findOne(orderId);
    const isPaid = !user.isPaid;
    await user.updateOne({ isPaid });

    return { message: 'Update isPaid success', orderId: orderId };
  }

  async create(createOrderDto: CreateOrderDto) {
    await this.orderModel.create({ ...createOrderDto });

    const { orderItems } = createOrderDto;

    orderItems.forEach(async (item) => {
      const product: any = await this.productService.findOne(item.productId);
      const productQuantity = product.countInStock - item.quantity;

      await product.updateOne({ countInStock: productQuantity });
    });

    return { message: 'Create order sucess', data: { ...createOrderDto } };
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Mongo id not right', HttpStatus.BAD_REQUEST);

    const order = await this.orderModel.findById(id);

    if (!order)
      throw new HttpException('OrderId not found', HttpStatus.NOT_FOUND);

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    await order.updateOne({ ...updateOrderDto });
    return { message: 'Update order success', data: { ...updateOrderDto } };
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await order.remove();

    return { message: 'Remove order success', data: { id: order._id } };
  }

  async dashboard() {
    const orders: any = await this.orderModel.find().sort({ date: -1 });

    let thang1 = 0,
      thang2 = 0,
      thang3 = 0,
      thang4 = 0,
      thang5 = 0,
      thang6 = 0,
      thang7 = 0,
      thang8 = 0,
      thang9 = 0,
      thang10 = 0,
      thang11 = 0,
      thang12 = 0;
    orders.forEach((data) => {
      if (data.createdAt.getMonth() + 1 == 1) {
        thang1 = thang1 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 2) {
        thang2 = thang2 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 3) {
        thang3 = thang3 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 4) {
        thang4 = thang4 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 5) {
        thang5 = thang5 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 6) {
        thang6 = thang6 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 7) {
        thang7 = thang7 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 8) {
        thang8 = thang8 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 9) {
        thang9 = thang9 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 10) {
        thang10 =
          thang10 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 11) {
        thang11 =
          thang11 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
      if (data.createdAt.getMonth() + 1 == 12) {
        thang12 =
          thang12 + data.totalPrice - data.taxPrice - data.shippingPrice;
      }
    });
    return {
      message: 'Success',
      data: [
        thang1 ? { thang: 'Tháng 1', total: thang1 } : '',
        thang2 ? { thang: 'Tháng 2', total: thang2 } : '',
        thang3 ? { thang: 'Tháng 3', total: thang3 } : '',
        thang4 ? { thang: 'Tháng 4', total: thang4 } : '',
        thang5 ? { thang: 'Tháng 5', total: thang5 } : '',
        thang6 ? { thang: 'Tháng 6', total: thang6 } : '',
        thang7 ? { thang: 'Tháng 7', total: thang7 } : '',
        thang8 ? { thang: 'Tháng 8', total: thang8 } : '',
        thang9 ? { thang: 'Tháng 9', total: thang9 } : '',
        thang10 ? { thang: 'Tháng 10', total: thang10 } : '',
        thang11 ? { thang: 'Tháng 11', total: thang11 } : '',
        thang12 ? { thang: 'Tháng 12', total: thang12 } : '',
      ],
    };
  }

  async pyGetData() {
    // const orders: any = await this.orderModel.find();
    // const final = [],
    //   usersOrder = [],
    //   productsOrder = [];
    // const users: any = await this.userService.findAll();
    // users.forEach((user, i) => {
    //   usersOrder.push({ userId: user.id, order: i });
    // });
    // const products: any = await this.productService.findAll();
    // products.forEach((product, i) => {
    //   productsOrder.push({ productId: product.id, order: i });
    // });
    // orders.forEach((data) => {
    //   const userOrder = usersOrder.find((user) => user.userId === data.userId);
    //   data.orderItems.forEach((item) => {
    //     const productOrder = productsOrder.find(
    //       (product) => product.productId === item.productId,
    //     );
    //     final.push({
    //       user_id: userOrder.order,
    //       item_id: productOrder.order,
    //       rating: item.rating,
    //       timestamp: new Date(data.createdAt).getTime(),
    //     });
    //   });
    // });
    // return { orders: final };

    const orders = await this.orderModel.find();
    const final = [];
    let i = -1;

    orders.forEach((order) => {
      const userId = order.userId;
      order.orderItems.forEach((item: any) => {
        const productId = item.productId;
        const rating = item.rating.toString();
        i++;
        final.push({
          index: i,
          userId: userId,
          productId: productId,
          rating: rating,
        });
      });
    });
    return { orders: final };
  }

  async orderdItemsByUser(userId: string) {
    await this.userService.findOne(userId);

    const orderedItems = await this.orderModel.find({ userId: userId });

    return { orderedItems };
  }
}
