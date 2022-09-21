import { EventType } from "./event-type";

export interface EventArgs<T> {
    type: EventType;
    data: T[];
}


