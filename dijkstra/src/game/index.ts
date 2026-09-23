// Game specific functions

import type { IWorld } from "../ecs/interfaces/World.Inteface";
import { InputEventType } from "../input/Events/Types/InputEventTypes";
import type { MessagingService } from "../message-bus/Types/Handler";
import { createCursor, destroyCursor } from "./CursorFactory";

export function attachEventListeners(bus: MessagingService, world: IWorld) {
    bus.subscribe(createCursor(world), InputEventType.CursorEnter);

    bus.subscribe(destroyCursor(world), InputEventType.CursorLeave);
}