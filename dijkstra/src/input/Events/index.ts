import type { CursorEnterEvent } from "./CursorEnterEvent";
import type { CursorLeaveEvent } from "./CursorLeaveEvent";
import type { CursorMoveEvent } from "./CursorMoveEvent";
import type { CursorPressEvent } from "./CursorPressEvent";
import type { CursorReleaseEvent } from "./CursorReleaseEvent";

export type InputEvent = CursorEnterEvent | CursorLeaveEvent | CursorMoveEvent | CursorPressEvent | CursorReleaseEvent