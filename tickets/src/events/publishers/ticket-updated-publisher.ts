import {Publisher, TicketUpdatedEvent, Subjects} from '@viettickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
  