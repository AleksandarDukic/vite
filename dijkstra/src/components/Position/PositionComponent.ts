import { ComponentType } from "../../models/ComponentTypes";
import type { PositionComponent } from "./PositionComponent.interface";

export function createPositionComponent(x: number = 0, y: number = 0, componentType: ComponentType = ComponentType.Position) {
    const component = {
        x: x,
        y: y,
    } as PositionComponent
    return [componentType, component] as const;

}