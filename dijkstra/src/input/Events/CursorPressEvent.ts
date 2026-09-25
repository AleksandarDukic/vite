import { InputEventType } from "./Types/InputEventTypes";
import type { Event } from "../../message-bus/Types/Event";
import type { Position } from "../../models/Position";
import type { InputButtons } from "../../models/InputButtons";

export type CursorPressEvent = Event<
    typeof InputEventType.CursorPress,
    Position & InputButtons
>