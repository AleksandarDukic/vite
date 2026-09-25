import type { PositionComponent } from "./PositionComponent.interface";

export function createPositionComponent(x: number = 0, y: number = 0) : PositionComponent {
    return {
        x: x,
        y: y,
    }

}