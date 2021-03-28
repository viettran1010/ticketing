import {Publisher, TicketCreatedEvent, Subjects} from '@viettickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
  