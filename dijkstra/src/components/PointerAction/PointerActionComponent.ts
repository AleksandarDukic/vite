import type { PointerActionComponent } from "./PointerActionComponent.interface";


export function createPointerActionComponent() : PointerActionComponent {
    return {
        leftClick: false,
        rightClick: false
    };
}