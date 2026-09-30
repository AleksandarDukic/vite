import { createFpsComponent } from "../../components/FPS/FpsComponent";
import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { ComponentType } from "../../models/ComponentTypes";

export function createMainCanvasIndicator(world: World) {

    let fpsEntity = world.createEntity();
    world.addComponent(fpsEntity, ComponentType.Fps, createFpsComponent());
    world.addComponent(fpsEntity, ComponentType.Position, createPositionComponent(762,20));
    
    world.addComponent(fpsEntity, ComponentType.Graphic, createGraphicComponent(GraphicType.Fps))

}
