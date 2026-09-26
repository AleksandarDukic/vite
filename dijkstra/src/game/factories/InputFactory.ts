import { ComponentType } from "../../models/ComponentTypes";
import { createInputComponent } from "../../components/Input/InputComponent";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { CursorEnterEvent } from "../../input/Events/CursorEnterEvent";

export function createInput(world: IWorld, e: CursorEnterEvent) {
    let entity = world.createEntity();
    world.addComponent(entity, ComponentType.Input, createInputComponent());
    world.addComponent(entity, ComponentType.Position, createPositionComponent(e.data.x, e.data.y));
}


export function removeInput(entity: number, world: IWorld) {
    world.removeComponent(entity, ComponentType.Input);
    world.removeComponent(entity, ComponentType.Position);
}