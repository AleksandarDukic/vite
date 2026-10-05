import { ComponentType } from "../../models/ComponentTypes";
import type { World } from "../../ecs/interfaces/World.Inteface";
import type { CursorEnterEvent } from "../../input/Events/CursorEnterEvent";
import { componentFactory as cFactory } from "../../components/componentFactory";

export function createInput(world: World, e: CursorEnterEvent) {
    let entity = world.createEntity();
    world.addComponent(entity, ...cFactory.createInputComponent());
    world.addComponent(entity, ...cFactory.createPositionComponent(e.data.x, e.data.y));
}

export function removeInput(entity: number, world: World) {
    world.removeComponent(entity, ComponentType.Input);
    world.removeComponent(entity, ComponentType.Position);
}