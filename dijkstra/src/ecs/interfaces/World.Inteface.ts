import type { ComponentType } from "../../components/ComponentTypes";
import type { MessagingService } from "../../message-bus/Types/Handler";
import type { IComponent } from "./Component.Inteface";
import type { ISystem } from "./System.Interface";

export interface IWorld {
    createEntity(): number;
    destroyEntity(entity: number): void;
    getEntities(): Set<number>;
    addComponent(entity: number, componentType: ComponentType, component: IComponent) : void;
    removeComponent(entity: number, component: IComponent) : void;
    getComponent(entity: number, component: IComponent) : IComponent;
    hasComponent(entity: number, component: IComponent) : boolean;
    addSystem(system: ISystem) : void;
    update(deltaTime: number) : void;
    attachBus(bus: MessagingService): void;
    getBus(): MessagingService
}