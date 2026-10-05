import { ComponentType } from "../../models/ComponentTypes";
import type { PointerComponent } from "./PointerComponent.interface";

export function createPointerComponent() {
    const component = {} as PointerComponent
    return [ComponentType.Pointer, component] as const
}