import type { GraphicComponent } from "./GraphicComponent.interface";
import type { Effect } from "./types/Effect";
import type { GraphicType } from "./types/GraphicType";
export function createGraphicComponent(graphicType: GraphicType, effects?: Effect[], color?: string): GraphicComponent {
    return {
        type: graphicType,
        effects: effects,
        color: color
    }

}