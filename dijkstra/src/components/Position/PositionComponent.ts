import type { IPositionComponent } from "./PositionComponent.interface";

export function createPositionComponent(x: number = 0, y: number = 0) : IPositionComponent {
    return {
        x: x,
        y: y,
    }

}