import type { Component } from "../../ecs/interfaces/Component.Inteface";

export interface PointerActionComponent extends Component {
    leftClick: boolean,
    rightClick: boolean
}