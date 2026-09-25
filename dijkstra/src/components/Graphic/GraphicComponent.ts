import type { GraphicComponent } from "./GraphicComponent.interface";
import type { Effect } from "./types/Effect";
import type { GraphicType } from "./types/GraphicType";
export function createGraphicComponent(graphicType: GraphicType, effect?: Effect): GraphicComponent {
    return {
        type: graphicType,
        effect: effect
    }

}