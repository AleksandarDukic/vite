import type { IComponent } from "../../ecs/interfaces/Component.Inteface";

export interface IPositionComponent extends IComponent {
    x: number,
    y: number
}