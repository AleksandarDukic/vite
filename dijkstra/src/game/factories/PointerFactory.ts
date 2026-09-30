import { ComponentType } from "../../models/ComponentTypes";
import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createPointerComponent } from "../../components/Pointer/PointerComponent";
import { createPointerActionComponent } from "../../components/PointerAction/PointerActionComponent";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { World } from "../../ecs/interfaces/World.Inteface";
import type { CursorEnterEvent } from "../../input/Events/CursorEnterEvent";
import { getCellSizeRoundPositionFromPosition } from "../utility/GridHelper";
import type { Position } from "../../models/Position";
import { entitiesWith } from "../../ecs/Query";
import type { Effect } from "../../components/Graphic/types/Effect";
import { EffectRenderingOrder } from "../../components/Graphic/types/EffectRenderingOrder";
import { EffectType } from "../../components/Graphic/types/EffectType";

export function createPointer(world: World, e: CursorEnterEvent) {

    let pointerEntity = world.createEntity();
    world.addComponent(pointerEntity, ComponentType.Pointer, createPointerComponent());
    world.addComponent(pointerEntity, ComponentType.PointerAction, createPointerActionComponent());
    world.addComponent(pointerEntity, ComponentType.Position, createPositionComponent(e.data.x, e.data.y));
    
    const cellPosition: Position = getCellSizeRoundPositionFromPosition(world.getCellSize(), e.data);
    world.addComponent(pointerEntity, ComponentType.CellPosition, createPositionComponent(cellPosition.x, cellPosition.y));
    world.addEntityToGrid(pointerEntity, cellPosition);

    // graphic Component
    const effects: Effect[] = [];
    const pulseEffect: Effect = {
        order: EffectRenderingOrder.Before,
        type: EffectType.Pulse,
        duration: 5
    }

    const glowEffect: Effect = {
        order: EffectRenderingOrder.After,
        type: EffectType.Glow
    }
    effects.push(pulseEffect, glowEffect);
    world.addComponent(pointerEntity, ComponentType.Graphic, createGraphicComponent(GraphicType.Pointer, effects));


}

export function removePointer(pointerEntity: number, world: World) {
    const pointerEnteties = entitiesWith(world, [ComponentType.Pointer, ComponentType.PointerAction, ComponentType.Position, ComponentType.CellPosition]);
    
    const pointerCellPosition = world.getComponent(pointerEnteties[0], ComponentType.CellPosition) as Position;
    world.removeEntityFromGrid(pointerEntity, pointerCellPosition);
    
    world.removeComponent(pointerEntity, ComponentType.Pointer);
    world.removeComponent(pointerEntity, ComponentType.PointerAction);
    world.removeComponent(pointerEntity, ComponentType.Position);
    world.removeComponent(pointerEntity, ComponentType.CellPosition);
}