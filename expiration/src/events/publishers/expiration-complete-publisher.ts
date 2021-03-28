import { Publisher, ExpirationCompleteEvent, Subjects } from "@viettickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;    
}
