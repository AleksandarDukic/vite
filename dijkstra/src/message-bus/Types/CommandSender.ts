import type { Command } from "./Command";

export interface CommandSender {
  send<CommandType extends Command = Command>(
    command: CommandType,
  ): Promise<void>;
}