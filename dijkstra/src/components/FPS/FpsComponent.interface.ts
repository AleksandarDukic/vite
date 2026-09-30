import type { Component } from "../../ecs/interfaces/Component.Inteface";

export interface FpsComponent extends Component {
    fps: number;
}