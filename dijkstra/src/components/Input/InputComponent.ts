import { ComponentType } from "../../models/ComponentTypes";

export function createInputComponent() {
    const component = {
        leftClick: false,
        rightClick: false
    };
    return [ComponentType.Input, component] as const
}