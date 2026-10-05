import { GraphicType } from "../../components/Graphic/types/GraphicType";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { componentFactory as cFactory } from "../../components/componentFactory";

export function createMainCanvasIndicator(world: World) {

    let fpsEntity = world.createEntity();
    world.addComponent(fpsEntity, ...cFactory.createFpsComponent());
    world.addComponent(fpsEntity, ...cFactory.createPositionComponent(762,20));
    world.addComponent(fpsEntity, ...cFactory.createGraphicComponent(GraphicType.Fps))
}
