import type { ComponentType } from "../components/ComponentTypes";
import type { MessagingService } from "../message-bus/Types/Bus";
import type { Component } from "./interfaces/Component.Inteface"
import type { System } from "./interfaces/System.Interface"
import type { IWorld } from "./interfaces/World.Inteface"

export function createWorld(messageBus: MessagingService): IWorld {
    let nextEntityId = 0;
    let bus: MessagingService = messageBus;
    const entities = new Set<number>();
    const components = new Map();
    const systems: System[] = [];

    const world: IWorld = {
        logComponents() { console.log(components)},
        createEntity: function (): number {
            const id = nextEntityId++;
            entities.add(id);
            return id;
        },
        destroyEntity: function (entity: number): void {
            entities.delete(entity);
            for (const componentMap of components.values()) {
                componentMap.delete(entity);
            }
        },

        getEntities(): Set<number> {
            return entities;
        },

        addComponent: function (entity: number, componentType: ComponentType, component: Component): void {
            const type = componentType;
            if (!components.has(type)) {
                components.set(type, new Map());
            }

            components.get(type).set(entity, component);
        },
        removeComponent: function (entity: number, componentType: ComponentType): void {
            const componentMap = components.get(componentType);
            if (componentMap) {
                componentMap.delete(entity);
            }
        },
        getComponent: function (entity: number, componentType: ComponentType): Component {
            const componentMap = components.get(componentType);
            return componentMap ? componentMap.get(entity) : undefined;
        },
        hasComponent: function (entity: number, component: Component): boolean {
            throw new Error("Function not implemented.")
        },
        addSystem: function (system: System): void {
            systems.push(system);
        },
        update: function (deltaTime: number): void {
            for (const system of systems) {
                system.update(this, deltaTime);
            }
        },

        attachBus(bus: MessagingService) {
            bus = bus;
        },

        getBus(): MessagingService {
            return bus;
        }

    }
    return world;
}
