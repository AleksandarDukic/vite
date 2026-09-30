import type { World } from "./World.Inteface";

export interface System {
    update(world: World, deltaTime: number): void;
}