import { Publisher, OrderCancelledEvent, Subjects } from "@viettickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
