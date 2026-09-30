import type { FpsComponent } from "./FpsComponent.interface";

export function createFpsComponent() : FpsComponent {
    return {
        fps: 0
    };

}