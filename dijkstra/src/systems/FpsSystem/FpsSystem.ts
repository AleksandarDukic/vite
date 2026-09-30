import type { FpsComponent } from "../../components/FPS/FpsComponent.interface";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import { ComponentType } from "../../models/ComponentTypes";
import type { FpsSystem } from "./FpsSystem.interface";

export function createFpsSystem(): FpsSystem {

    let frames = 0;
    let fps = 0;
    let lastTime = performance.now();

    const renderSystem: FpsSystem = {
        update: function (world: World, deltaTime: number) {
            const now = performance.now();
            frames++;

            const fpsEntities = entitiesWith(world, [ComponentType.Fps]);
            fpsEntities.forEach(fpsEntity => {
                const fpsComponent = world.getComponent(fpsEntity, ComponentType.Fps) as FpsComponent;
                fpsComponent.fps = fps;
            });

            if (now - lastTime >= 1000) {
                fps = frames;
                frames = 0;
                lastTime = now;
            }
        }
    }

    return renderSystem;
}