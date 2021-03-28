import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@viettickets/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    let order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    }); // find by id and version to make sure we are processing the correct order
    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();

    msg.ack();
  }
}
