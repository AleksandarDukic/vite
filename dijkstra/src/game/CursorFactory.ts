import { ComponentType } from "../components/ComponentTypes";
import { createInputComponent } from "../components/Cursor/InputComponent";
import { createPositionComponent } from "../components/Position/PositionComponent";
import type { IWorld } from "../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../ecs/Query";
import type { CursorEnterEvent } from "../input/Events/CursorEnterEvent";
import type { CursorLeaveEvent } from "../input/Events/CursorLeaveEvent";

export function createCursor(world: IWorld) {
    return (CursorEvent: CursorEnterEvent) => {
        const entity = world.createEntity();

        world.addComponent(entity, ComponentType.Input, createInputComponent());
        world.addComponent(entity, ComponentType.Position, createPositionComponent(CursorEvent.data.x, CursorEvent.data.y));

        return entity;
    }

}


export function destroyCursor(world: IWorld) {
    return (CursorEvent: CursorLeaveEvent) => {
        let entities = entitiesWith(world, [ComponentType.Input, ComponentType.Position]);
        entities.forEach(entity => {
            world.destroyEntity(entity)
        })
    }

}
