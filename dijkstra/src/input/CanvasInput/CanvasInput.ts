
import type { Position } from "../../models/Position";
import { InputEventType } from "../Events/Types/InputEventTypes";
import type { CursorEnterEvent } from "../Events/CursorEnterEvent";
import type { CursorLeaveEvent } from "../Events/CursorLeaveEvent";
import type { CursorPressEvent } from "../Events/CursorPressEvent";
import type { CursorReleaseEvent } from "../Events/CursorReleaseEvent";
import type { CursorMoveEvent } from "../Events/CursorMoveEvent";
import type { MessageBus } from "../../message-bus/Types/Bus";
import type { ScheduledMessageProcessor } from "../../message-bus/Types/Scheduler";
import type { MessageProcessor } from "../../message-bus/Types/Handler";
import type { InputButtons } from "../../models/InputButtons";

export function createCanvasInput(canvas: HTMLCanvasElement, messageBus: MessageBus & (MessageProcessor & ScheduledMessageProcessor)): void {
    canvas.addEventListener("contextmenu", (e: MouseEvent) => {
        e.preventDefault();
    });

    canvas.addEventListener("mouseenter", (e: MouseEvent) => {
        let position = getPosition(e);
        let event: CursorEnterEvent = {
            type: InputEventType.CursorEnter,
            data: position
        };
        messageBus.publish(event);
    })
    canvas.addEventListener("mouseleave", (e: MouseEvent) => {
        let position = getPosition(e);
        let event: CursorLeaveEvent = {
            type: InputEventType.CursorLeave,
            data: position
        };
        messageBus.publish(event);

    })
    canvas.addEventListener("mousedown", (e: MouseEvent) => {
        let position = getPosition(e);
        let inputButtons: InputButtons = {
            leftClick: e.button == 0,
            rightClick: e.button == 2
        };
        let event: CursorPressEvent = {
            type: InputEventType.CursorPress,
            data: { x: position.x, y: position.y, leftClick: inputButtons.leftClick, rightClick: inputButtons.rightClick }
        };
        messageBus.publish(event);

    })

    canvas.addEventListener("mouseup", (e: MouseEvent) => {
        let position = getPosition(e);
        let event: CursorReleaseEvent = {
            type: InputEventType.CursorRelease,
            data: position
        };
        messageBus.publish(event);

    })

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
        let position = getPosition(e);
        let event: CursorMoveEvent = {
            type: InputEventType.CursorMove,
            data: position
        };
        messageBus.publish(event);
    })
}

function getPosition(e: MouseEvent): Position {
    return {
        x: e.offsetX,
        y: e.offsetY
    }
}