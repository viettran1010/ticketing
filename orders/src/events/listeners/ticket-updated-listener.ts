import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@viettickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = Ticket.findOne({
      _id: data.id,
      version: data.version-1
    })

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = data;
    await ticket.update({ price, title }).exec();

    // await ticket.save();

    msg.ack();
  }
}
