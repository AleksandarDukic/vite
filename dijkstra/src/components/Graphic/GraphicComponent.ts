import { ComponentType } from "../../models/ComponentTypes";
import type { GraphicComponent } from "./GraphicComponent.interface";
import type { Effect } from "./types/Effect";
import type { GraphicType } from "./types/GraphicType";

export function createGraphicComponent(graphicType: GraphicType, effects?: Effect[], color?: string) {
    const component = materializeGraphicComponent(graphicType, effects, color);
    return [ComponentType.Graphic, component] as const
}

export function createBackGraphicComponent(graphicType: GraphicType, effects?: Effect[], color?: string) {
    const component = materializeGraphicComponent(graphicType, effects, color);
    return [ComponentType.BackGraphic, component] as const
}

export function creatFrontGraphicComponent(graphicType: GraphicType, effects?: Effect[], color?: string) {
    const component = materializeGraphicComponent(graphicType, effects, color);
    return [ComponentType.FrontGraphic, component] as const
}

function materializeGraphicComponent(graphicType: GraphicType, effects: Effect[] = [], color?: string): GraphicComponent {
    return {
        type: graphicType,
        effects: effects,
        color: color
    } as GraphicComponent;
}

