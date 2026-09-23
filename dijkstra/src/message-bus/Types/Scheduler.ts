import type { Command } from "./Command";
import type { Event } from "./Event";

export type ScheduleOptions = { afterInMs: number } | { at: Date };

export interface MessageScheduler<CommandOrEvent extends Command | Event> {
	schedule<MessageType extends CommandOrEvent>(
		message: MessageType,
		when?: ScheduleOptions,
	): void;

	scheduleEvent(
		message: Event,
		when?: ScheduleOptions
	): void;

	scheduleCommand(
		message: Command,
		when?: ScheduleOptions
	): void;
}

export type ScheduledMessage = {
	message: Event | Command;
	options?: ScheduleOptions;
};

export type ScheduledEventMessage = {
	message: Event;
	options?: ScheduleOptions;
};

export type ScheduledCommandMessage = {
	message: Command;
	options?: ScheduleOptions;
};

export interface ScheduledMessageProcessor {
	dequeue(): ScheduledMessage[];
	getPendingMessages(): ScheduledMessage[];
	getPendingEventMessages(): ScheduledEventMessage[];
	getPendingCommandMessages(): ScheduledCommandMessage[];
	deletePendingEventMessages(): void;
	deletePendingCommandMessages(): void;
}