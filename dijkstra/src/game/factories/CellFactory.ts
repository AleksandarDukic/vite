import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { ComponentType } from "../../models/ComponentTypes";
import type { Position } from "../../models/Position";

export function createCell(entity: number, world: World, position: Position, componentType: ComponentType = ComponentType.Graphic) {
    world.addComponent(entity, componentType, createGraphicComponent(GraphicType.Cell));
    world.addComponent(entity, ComponentType.Position, createPositionComponent(position.x, position.y));
}