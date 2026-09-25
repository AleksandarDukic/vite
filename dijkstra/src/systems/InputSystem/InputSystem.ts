import { ComponentType } from "../../components/ComponentTypes";
import { createGraphicComponent } from "../../components/Graphic/GraphicComponent";
import { GraphicType } from "../../components/Graphic/types/GraphicType";
import { createInputComponent } from "../../components/Input/InputComponent";
import type { InputComponent } from "../../components/Input/InputComponent.interface";
import { createPointerComponent } from "../../components/Pointer/PointerComponent";
import { createPointerActionComponent } from "../../components/PointerAction/PointerActionComponent";
import { createPositionComponent } from "../../components/Position/PositionComponent";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { CursorEnterEvent } from "../../input/Events/CursorEnterEvent";
import type { CursorLeaveEvent } from "../../input/Events/CursorLeaveEvent";
import type { CursorMoveEvent } from "../../input/Events/CursorMoveEvent";
import type { CursorPressEvent } from "../../input/Events/CursorPressEvent";
import type { CursorReleaseEvent } from "../../input/Events/CursorReleaseEvent";
import { InputEventType } from "../../input/Events/Types/InputEventTypes";
import type { MessagingService } from "../../message-bus/Types/Bus";
import type { Input } from "./Input.type";
import type { InputSystem } from "./InputSystem.interface";

//function 

export function createInputSystem(bus: MessagingService, world: IWorld): InputSystem {

    const input: Input = {
        position: { x: 0, y: 0 },
        leftClick: false,
        rightClick: false
    }

    function handleCursorEnter(e: CursorEnterEvent): void {
        // creating Input
        let entity = world.createEntity();
        world.addComponent(entity, ComponentType.Input, createInputComponent());
        world.addComponent(entity, ComponentType.Position, createPositionComponent(e.data.x, e.data.y));

        // creating Pointer
        entity = world.createEntity();
        world.addComponent(entity, ComponentType.Pointer, createPointerComponent());
        world.addComponent(entity, ComponentType.PointerAction, createPointerActionComponent());
        world.addComponent(entity, ComponentType.Position, createPositionComponent(e.data.x, e.data.y));
        world.addComponent(entity, ComponentType.Graphic, createGraphicComponent(GraphicType.Pointer))
    }

    function handleCursorLeave(e: CursorLeaveEvent): void {
        // deleting Input
        let entities = entitiesWith(world, [ComponentType.Input, ComponentType.Position])
        entities.forEach(entity => {
            world.removeComponent(entity, ComponentType.Input);
            world.removeComponent(entity, ComponentType.Position);
        });

        // deleting Pointer
        entities = entitiesWith(world, [ComponentType.Pointer, ComponentType.PointerAction, ComponentType.Position]);
        entities.forEach(entity => {
            world.removeComponent(entity, ComponentType.Pointer);
            world.removeComponent(entity, ComponentType.PointerAction);
            world.removeComponent(entity, ComponentType.Position);

        })
    }

    function handleCursorMove(e: CursorMoveEvent): void {
        input.position = e.data;
    }

    function handleCursorPress(e: CursorPressEvent): void {
        input.position.x = e.data.x;
        input.position.y = e.data.y;
        input.leftClick = e.data.leftClick;
        input.rightClick = e.data.rightClick;
    }

    function handleCursorRelease(e: CursorReleaseEvent): void {
        input.leftClick = false;
        input.rightClick = false;
        input.position.x = e.data.x;
        input.position.y = e.data.y;
    }

    bus.subscribe(handleCursorEnter, InputEventType.CursorEnter);
    bus.subscribe(handleCursorLeave, InputEventType.CursorLeave);
    bus.subscribe(handleCursorMove, InputEventType.CursorMove);
    bus.subscribe(handleCursorPress, InputEventType.CursorPress);
    bus.subscribe(handleCursorRelease, InputEventType.CursorRelease);

    const inputSystem: InputSystem = {
        update: function (world: IWorld, deltaTime: number) {
            const entities = entitiesWith(world, [ComponentType.Input, ComponentType.Position]);

            entities.forEach(entity => {
                const positionComponent = world.getComponent(entity, ComponentType.Position) as PositionComponent;
                if (positionComponent) {
                    positionComponent.x = input.position.x;
                    positionComponent.y = input.position.y;
                }

                const inputComponent = world.getComponent(entity, ComponentType.Input) as InputComponent;
                if (inputComponent) {
                    inputComponent.leftClick = input.leftClick;
                    inputComponent.rightClick = input.rightClick;
                }
            })
        }
    }

    return inputSystem;
}