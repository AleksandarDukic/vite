import type { Command } from "./Command";
import type { Event } from "./Event";

export type EventHandler<EventType extends Event = Event> = (
	event: EventType,
) => Promise<void> | void;

export type EventProcessor = {
	subscribe<EventType extends Event>(
		eventHandler: EventHandler<EventType>,
		...eventTypes: EventTypeOf<EventType>[]
	): void;
}

export type CommandHandler<CommandType extends Command = Command> = (
	command: CommandType,
) => Promise<void> | void;

export interface CommandProcessor {
	handle<CommandType extends Command>(
		commandHandler: CommandHandler<CommandType>,
		...commandTypes: CommandTypeOf<CommandType>[]
	): void;
}

export type CommandTypeOf<T extends Command> = T['type'];

export type EventTypeOf<T extends Event> = T['type'];

export type MessageHandler = EventHandler | CommandHandler;

export type MessageProcessor = EventProcessor & CommandProcessor;
