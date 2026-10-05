import { ComponentType } from "../../models/ComponentTypes";
import type { FpsComponent } from "./FpsComponent.interface";

export function createFpsComponent() {
    const component = {
        fps: 0
    };
    return [ComponentType.Fps, component] as const
}