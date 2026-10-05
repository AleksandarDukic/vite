import { createFpsComponent } from "./FPS/FpsComponent";
import { createBackGraphicComponent, createGraphicComponent, creatFrontGraphicComponent } from "./Graphic/GraphicComponent";
import { createInputComponent } from "./Input/InputComponent";
import { createPointerComponent } from "./Pointer/PointerComponent";
import { createPointerActionComponent } from "./PointerAction/PointerActionComponent";
import { createPositionComponent } from "./Position/PositionComponent";

export const componentFactory = {
    createPositionComponent: createPositionComponent,
    createPointerComponent: createPointerComponent,
    createPointerActionComponent: createPointerActionComponent,
    createGraphicComponent: createGraphicComponent,
    createBackGraphicComponent: createBackGraphicComponent,
    createFrontGraphicComponent: creatFrontGraphicComponent,
    createFpsComponent: createFpsComponent,
    createInputComponent: createInputComponent
}