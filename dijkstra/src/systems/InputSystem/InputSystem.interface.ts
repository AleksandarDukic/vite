import type { ISystem } from "../../ecs/interfaces/System.Interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { MessagingService } from "../../message-bus/Types/Handler";

export interface IInputSystem extends ISystem {
    update(world: IWorld, deltaTime: number): void;

}