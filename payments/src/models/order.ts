import mongoose from "mongoose";
import { OrderStatus } from "@viettickets/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
  // list of properties needed to build an order
  id: string;
  status: OrderStatus;
  version: number; // maintained by mongoose update-if-current !!!
  userId: string;
  price: number;
}

interface OrderDoc extends mongoose.Document {
  // list of properties an order has
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  // list of properties the model itself contains
  build(attrs: OrderAttrs): OrderDoc; //takes OrderAttrs and returns a new OrderDoc
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // to transform _id to id
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version"); // tells mongoose not to use __v
orderSchema.plugin(updateIfCurrentPlugin); // use plugin

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
