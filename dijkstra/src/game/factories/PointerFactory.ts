import { ComponentType } from "../../models/ComponentTypes";
import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createPointerComponent } from "../../components/Pointer/PointerComponent";
import { createPointerActionComponent } from "../../components/PointerAction/PointerActionComponent";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { CursorEnterEvent } from "../../input/Events/CursorEnterEvent";

export function createPointer(world: IWorld, e: CursorEnterEvent) {

    let entity = world.createEntity();
    world.addComponent(entity, ComponentType.Pointer, createPointerComponent());
    world.addComponent(entity, ComponentType.PointerAction, createPointerActionComponent());
    world.addComponent(entity, ComponentType.Position, createPositionComponent(e.data.x, e.data.y));
    world.addComponent(entity, ComponentType.Graphic, createGraphicComponent(GraphicType.Pointer))
}

export function removePointer(entity: number, world: IWorld) {
    world.removeComponent(entity, ComponentType.Pointer);
    world.removeComponent(entity, ComponentType.PointerAction);
    world.removeComponent(entity, ComponentType.Position);
}