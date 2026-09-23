import { InputEventType } from "./Types/InputEventTypes";
import type { Event } from "../../message-bus/Types/Event";
import type { Position } from "../../models/Position";

export type CursorReleaseEvent = Event<
    typeof InputEventType.CursorRelease,
    Position
>