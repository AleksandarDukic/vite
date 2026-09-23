import type { IGraphicComponent } from "./GraphicComponent.interface";
import type { Effect } from "./types/Effect";
import type { GraphicType } from "./types/GraphicType";
export function createGraphicComponent(graphicType: GraphicType, effect: Effect): IGraphicComponent {
    return {
        type: graphicType,
        effect: effect ? effect : undefined
    }

}