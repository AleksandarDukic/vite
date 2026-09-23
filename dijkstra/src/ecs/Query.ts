import type { ComponentType } from "../components/ComponentTypes";
import type { IComponent } from "./interfaces/Component.Inteface";
import type { IWorld } from "./interfaces/World.Inteface";

export function entitiesWith(world: IWorld, componentClasses: ComponentType[]) {
    return [...world.getEntities()].filter(entity =>
        [...componentClasses].every(componentClass =>
            world.getComponent(entity, componentClass)
        )
    )
}
