import { GraphicType } from "../../components/Graphic/types/GraphicType";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { ComponentType } from "../../models/ComponentTypes";
import type { Position } from "../../models/Position";
import { componentFactory as cFactory } from "../../components/componentFactory";
import type { GraphicComponent } from "../../components/Graphic/GraphicComponent.interface";
import { effectFactory as eFactory } from "../../components/Graphic/effectFactory-1";
import type { GridCell } from "../../models/GridCell";

export function createGridCell(world: World, position: Position, componentType: ComponentType = ComponentType.Graphic) {
    let entity = world.createEntity();
    const gridCell: GridCell = {
        host: entity,
        tennants: []
    };
    world.addComponent(entity, ...cFactory.createBackGraphicComponent(GraphicType.Cell));
    world.addComponent(entity, ...cFactory.createPositionComponent(position.x, position.y));
    return gridCell;
}

export function gridCellRemoveEffects(world: World, entity: number,) {
    const graphicComponent = world.getComponent(entity, ComponentType.BackGraphic) as GraphicComponent;
    if (graphicComponent && graphicComponent.effects) {
        graphicComponent.effects.length = 0
    }
}

export function gridCellAddPulseEffect(world: World, entity: number) {
    const graphicComponent = world.getComponent(entity, ComponentType.BackGraphic) as GraphicComponent;
    if (graphicComponent) {
        const effect = eFactory().animated(3).after().pulse().repeating().build();
        graphicComponent.effects?.push(effect);
    }
}