import type { ComponentType } from "../models/ComponentTypes";
import type { World } from "./interfaces/World.Inteface";

export function entitiesWith(world: World, componentClasses: ComponentType[]) {
    return [...world.getEntities()].filter(entity =>
        [...componentClasses].every(componentClass =>
            world.getComponent(entity, componentClass)
        )
    )
}
