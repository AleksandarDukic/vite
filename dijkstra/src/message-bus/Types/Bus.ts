import type { Command } from "./Command";
import type { CommandSender } from "./CommandSender";
import type { Event } from "./Event";
import type { EventsPublisher } from "./EventPublisher";
import type { MessageScheduler, ScheduleOptions } from "./Scheduler";

interface EventBus extends EventsPublisher, MessageScheduler<Event> {}

interface CommandBus extends CommandSender, MessageScheduler<Command> {}

export interface MessageBus extends CommandBus, EventBus {
  schedule<MessageType extends Command | Event>(
    message: MessageType,
    when?: ScheduleOptions,
  ): void;
}