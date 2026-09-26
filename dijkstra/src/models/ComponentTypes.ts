const ComponentType = {
    Position: 'Position',
    Input: 'Input',
    Graphic: 'Graphic',
    BackGraphic: 'BackGraphic',
    FrontGraphic: 'FrontGraphic',
    Pointer: 'Pointer',
    PointerAction: 'PointerAction',

} as const;

export { ComponentType };


export type ComponentType =
    typeof ComponentType[keyof typeof ComponentType];

