import { ComponentType } from "../../models/ComponentTypes";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import type { World } from "../../ecs/interfaces/World.Inteface";
import type { CursorEnterEvent } from "../../input/Events/CursorEnterEvent";
import { getCellPosition } from "../utility/GridHelper";
import type { Position } from "../../models/Position";
import { componentFactory as cFactory} from "../../components/componentFactory" ;
import { effectFactory as eFactory } from "../../components/Graphic/effectFactory-1";

export function createPointer(world: World, e: CursorEnterEvent) {

    let pointerEntity = world.createEntity();
    world.addComponent(pointerEntity, ...cFactory.createPointerComponent());
    world.addComponent(pointerEntity, ...cFactory.createPointerActionComponent());
    world.addComponent(pointerEntity, ...cFactory.createPositionComponent(e.data.x, e.data.y));
    
    const cellPosition: Position = getCellPosition(world.getCellSize(), e.data);
    world.addComponent(pointerEntity, ...cFactory.createPositionComponent(cellPosition.x, cellPosition.y, ComponentType.CellPosition));

    world.addTennantToGrid(pointerEntity, cellPosition);

    // graphic Component
    let pulse = eFactory().animated(4).before().pulse().repeating().build();
    let glow = eFactory().static().after().glow().once().build();

    world.addComponent(pointerEntity, ...cFactory.createGraphicComponent(GraphicType.Pointer, [pulse, glow]));
}

export function removePointer(pointerEntity: number, world: World) {
    
    const pointerCellPosition = world.getComponent(pointerEntity, ComponentType.CellPosition) as Position;
    world.removeEntityFromGrid(pointerEntity, pointerCellPosition);

    world.removeComponent(pointerEntity, ComponentType.Pointer);
    world.removeComponent(pointerEntity, ComponentType.PointerAction);
    world.removeComponent(pointerEntity, ComponentType.Position);
    world.removeComponent(pointerEntity, ComponentType.CellPosition);
}