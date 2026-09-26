import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import { ComponentType } from "../../models/ComponentTypes";
import type { Position } from "../../models/Position";

export function createCell(entity: number, world: IWorld, position: Position, graphicType: ComponentType = ComponentType.Graphic) {
    world.addComponent(entity, graphicType, createGraphicComponent(GraphicType.Cell));
    world.addComponent(entity, ComponentType.Position, createPositionComponent(position.x, position.y));
}