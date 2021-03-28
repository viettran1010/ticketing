import {Publisher} from './base-publisher'
import {TicketCreatedEvent} from './ticket-created-event'
import {Subjects} from './subjects'

export class TicketCreatedListener extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';  
}
  