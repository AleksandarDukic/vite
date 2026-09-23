import type { IWorld } from "./World.Inteface";

export interface ISystem {
    update(world: IWorld, deltaTime: number): void;
}