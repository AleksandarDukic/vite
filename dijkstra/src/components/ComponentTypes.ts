const ComponentType = {
    Position: 'Position',
    Input: 'Input',
    Graphic: 'Graphic',

} as const;

export { ComponentType };


export type ComponentType =
    typeof ComponentType[keyof typeof ComponentType];

