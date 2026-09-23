import type { Event } from "./Event";

export interface EventsPublisher {
  publish<EventType extends Event = Event>(event: EventType): Promise<void>;
}
