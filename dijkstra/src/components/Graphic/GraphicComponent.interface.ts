import type { IComponent } from "../../ecs/interfaces/Component.Inteface";
import type { Effect } from "./types/Effect";
import type { GraphicType } from "./types/GraphicType";

export interface IGraphicComponent extends IComponent {
        type: GraphicType,
        effect?: Effect
}