import type { IWorld } from "./World.Inteface";

export interface System {
    update(world: IWorld, deltaTime: number): void;
}