
import {
  EffectOccurrence,
  EffectRenderingOrder,
  EffectType,
  type Effect,
} from "./types/Effect";

type AnimationStage = {
  static(): OrderStage;
  animated(durationInSeconds: number): OrderStage;
};

type OrderStage = {
  before(): TypeStage;
  after(): TypeStage;
};

type TypeStage = {
  disappear(): OccurrenceStage;
  pulse(): OccurrenceStage;
  glow(): OccurrenceStage;
};

type OccurrenceStage = {
  once(): BuildStage;
  repeating(): BuildStage;
};

type BuildStage = {
  build(): Effect;
};

export const effectFactory = (): AnimationStage => {
  const config: Partial<Effect> = {};

  const createBuildStage = (): BuildStage => ({
    build: () => ({
      createdAt: new Date(),
      isAnimated: config.isAnimated!,
      order: config.order!,
      type: config.type!,
      occurrence: config.occurrence!,
      duration: config.duration,
    }),
  });

  const createOccurrenceStage = (): OccurrenceStage => ({
    once: () => {
      config.occurrence = EffectOccurrence.Once;
      return createBuildStage();
    },
    repeating: () => {
      config.occurrence = EffectOccurrence.Repeating;
      return createBuildStage();
    },
  });

  const createTypeStage = (): TypeStage => ({
    disappear: () => {
      config.type = EffectType.Disappear;
      return createOccurrenceStage();
    },
    pulse: () => {
      config.type = EffectType.Pulse;
      return createOccurrenceStage();
    },
    glow: () => {
      config.type = EffectType.Glow;
      return createOccurrenceStage();
    },
  });

  const createOrderStage = (): OrderStage => ({
    before: () => {
      config.order = EffectRenderingOrder.Before;
      return createTypeStage();
    },
    after: () => {
      config.order = EffectRenderingOrder.After;
      return createTypeStage();
    },
  });

  return {
    static: () => {
      config.isAnimated = false;
      config.duration = 0;
      return createOrderStage();
    },
    animated: (durationInSeconds) => {
      config.isAnimated = true;
      config.duration = durationInSeconds;
      return createOrderStage();
    },
  };
};
