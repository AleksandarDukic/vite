//export type GraphicType = 'Pointer' | 'Vertex' | 'Edge' | 'TopLeftCell' | 'TopCell' | 'TopRightCell' | 'LeftCell' | 'BottomLeftCell' | 'BottomCell' | 'BottomRightCell' | 'RightCell';

const GraphicType = {
    Pointer: 'Pointer',
    Vertex: 'Vertex',
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

