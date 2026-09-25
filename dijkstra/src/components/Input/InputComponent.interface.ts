import type { Component } from "../../ecs/interfaces/Component.Inteface";

export interface InputComponent extends Component {
    leftClick: boolean;
    rightClick: boolean;
}