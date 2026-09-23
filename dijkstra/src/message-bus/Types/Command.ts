import type { Flavour } from "./Flavour";

export type Command<
  CommandType extends string = string,
  CommandData extends Record<string, unknown> = Record<string, unknown>,
  CommandMetaData extends Record<string, unknown> = Record<string, unknown>,
> = Flavour<
  Readonly<{
    type: CommandType;
    data: Readonly<CommandData>;
    metaData?: Readonly<CommandMetaData>;
  }>,
  'Command'
>;