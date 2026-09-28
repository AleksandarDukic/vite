const ComponentType = {
    Position: 'Position',
    Input: 'Input',
    Graphic: 'Graphic',
    BackGraphic: 'BackGraphic',
    FrontGraphic: 'FrontGraphic',
    Pointer: 'Pointer',
    PointerAction: 'PointerAction',
    CellPosition: 'CellPosition'

} as const;

export { ComponentType };


export type ComponentType =
    typeof ComponentType[keyof typeof ComponentType];

