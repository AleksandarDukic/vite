import type { InputComponent } from "./InputComponent.interface";

export function createInputComponent() : InputComponent {
    return {
        leftClick: false,
        rightClick: false
    };

}