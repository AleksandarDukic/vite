import type { Command } from "./Command";
import type { CommandSender } from "./CommandSender";
import type { Event } from "./Event";
import type { EventsPublisher } from "./EventPublisher";
import type { CommandHandler, CommandTypeOf, EventHandler, EventTypeOf, MessageHandler, MessageProcessor } from "./Handler";
import type { MessageScheduler, ScheduledCommandMessage, ScheduledEventMessage, ScheduledMessage, ScheduledMessageProcessor, ScheduleOptions } from "./Scheduler";

interface EventBus extends EventsPublisher, MessageScheduler<Event> {}

interface CommandBus extends CommandSender, MessageScheduler<Command> {}

export interface MessageBus extends CommandBus, EventBus {
  schedule<MessageType extends Command | Event>(
    message: MessageType,
    when?: ScheduleOptions,
  ): void;
}
export type MessagingService = MessageBus & MessageProcessor & ScheduledMessageProcessor

export const getInMemoryMessageBus = ():
	MessagingService => {

	const allHandlers = new Map<string, MessageHandler[]>();
	let pendingMessages: ScheduledMessage[] = [];
	// let pendingEventMessages: ScheduledEventMessage[] = [];
	// let pendingCommandMessages: ScheduledCommandMessage[] = []

	return {
		subscribe<EventType extends Event>(
			eventHandler: EventHandler<EventType>,
			...eventTypes: EventTypeOf<EventType>[]
		): void {
			for (const eventType of eventTypes) {
				if (!allHandlers.has(eventType)) allHandlers.set(eventType, []);

				allHandlers.set(eventType, [
					...(allHandlers.get(eventType) ?? []),
					eventHandler as MessageHandler,
				]);
			}
		},

		publish: async <EventType extends Event = Event>(
			event: EventType,
		): Promise<void> => {
			const handlers = allHandlers.get(event.type) ?? [];

			for (const handler of handlers) {
				const eventHandler = handler as EventHandler<EventType>;

				await eventHandler(event);
			}
		},

		send: async <CommandType extends Command = Command>(
			command: CommandType,
		): Promise<void> => {
			const handlers = allHandlers.get(command.type);

			if (handlers === undefined || handlers.length === 0)
				throw new Error(
					`No handler registered for command ${command.type}!`,
				);

			const commandHandler = handlers[0] as CommandHandler<CommandType>;

			await commandHandler(command);
		},
		handle: <CommandType extends Command>(
			commandHandler: CommandHandler<CommandType>,
			...commandTypes: CommandTypeOf<CommandType>[]
		): void => {
			const alreadyRegistered = [...allHandlers.keys()].filter((registered) =>
				commandTypes.includes(registered),
			);

			if (alreadyRegistered.length > 0)
				throw new Error(
					`Cannot register handler for commands ${alreadyRegistered.join(', ')} as they're already registered!`,
				);
			for (const commandType of commandTypes) {
				allHandlers.set(commandType, [commandHandler as MessageHandler]);
			}
		},

		schedule: async <MessageType extends Command | Event>(
			message: MessageType,
			when?: ScheduleOptions,
		): Promise<void> => {
			pendingMessages = [...pendingMessages, { message, options: when }];
		},

		// scheduleEvent: async (
		// 	message: Event,
		// 	when?: ScheduleOptions,
		// ): Promise<void> => {
		// 	pendingEventMessages = [...pendingEventMessages, { message, options: when }];
		// },
		// scheduleCommand: async (
		// 	message: Command,
		// 	when?: ScheduleOptions,
		// ): Promise<void> => {
		// 	pendingCommandMessages = [...pendingCommandMessages, { message, options: when }];
		// },

		dequeue: (): ScheduledMessage[] => {
			const pending = pendingMessages;
			pendingMessages = [];
			return pending;
		},
		getPendingMessages: (): ScheduledMessage[] => {
			return pendingMessages
		},
		
		// getPendingEventMessages: (): ScheduledEventMessage[] => {
		// 	return pendingEventMessages;
		// },
		// deletePendingEventMessages: (): void => {
		// 	pendingEventMessages = [];
		// },

		// getPendingCommandMessages:(): ScheduledCommandMessage[] => {
		// 	return pendingCommandMessages;
		// },
		// deletePendingCommandMessages: (): void => {
		// 	pendingCommandMessages = [];
		// },

		// (...) here will go the interfaces methods definition
	}

};