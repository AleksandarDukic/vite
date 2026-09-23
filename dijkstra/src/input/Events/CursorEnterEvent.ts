import { InputEventType } from "./Types/InputEventTypes";
import type { Event } from "../../message-bus/Types/Event";
import type { Position } from "../../models/Position";

export type CursorEnterEvent = Event<
    typeof InputEventType.CursorEnter,
    Position
>