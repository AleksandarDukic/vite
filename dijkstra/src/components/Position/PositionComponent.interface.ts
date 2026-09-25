import type { Component } from "../../ecs/interfaces/Component.Inteface";

export interface PositionComponent extends Component {
    x: number,
    y: number
}