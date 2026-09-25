import type { Component } from "../../ecs/interfaces/Component.Inteface";
import type { Effect } from "./types/Effect";
import type { GraphicType } from "./types/GraphicType";

export interface GraphicComponent extends Component {
        type: GraphicType,
        effect?: Effect
}