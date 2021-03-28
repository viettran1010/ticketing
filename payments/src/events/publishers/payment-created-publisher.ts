import { Publisher, PaymentCreatedEvent, Subjects } from "@viettickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}
