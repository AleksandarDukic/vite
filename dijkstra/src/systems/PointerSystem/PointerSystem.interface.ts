import type { System } from "../../ecs/interfaces/System.Interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";

export interface PointerSystem extends System {
    update(world: IWorld, deltaTime: number): void;

}