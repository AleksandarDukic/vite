const GraphicType = {
    Pointer: 'Pointer',
    Vertex: 'Vertex',
    Fps: 'Fps',
    Edge: 'Edge',
    Cell: 'Cell',
    TopLeftCell: 'TopLeftCell',
    TopCell: 'TopCell',
    TopRightCell: 'TopRightCell',
    LeftCell: 'LeftCell',
    BottomLeftCell: 'BottomLeftCell',
    BottomCell: 'BottomCell',
    BottomRightCell: 'BottomRightCell',
    RightCell: 'RightCell',

} as const;

export { GraphicType };


export type GraphicType =
    typeof GraphicType[keyof typeof GraphicType];

