import { ComponentType } from "../../models/ComponentTypes";
import type { PointerActionComponent } from "./PointerActionComponent.interface";

export function createPointerActionComponent() {
    const component = {
        leftClick: false,
        rightClick: false
    } as PointerActionComponent;

    return [ComponentType.PointerAction, component] as const
}