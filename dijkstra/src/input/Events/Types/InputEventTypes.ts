export const InputEventType = {
  CursorEnter: 'cursor/enter',
  CursorLeave: 'cursor/leave',
  CursorRelease: 'cursor/release',
  CursorPress: 'cursor/press',
  CursorMove: 'cursor/move',
} as const;

export type InputEventType =
  (typeof InputEventType)[keyof typeof InputEventType];