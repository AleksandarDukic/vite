import type { System } from "../../ecs/interfaces/System.Interface";
import type { World } from "../../ecs/interfaces/World.Inteface";

export interface PointerSystem extends System {
    update(world: World, deltaTime: number): void;

}