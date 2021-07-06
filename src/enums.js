export const DataKeyEnum = Object.freeze({
  power: "power",
  mvar: "mvar",
  voltage: "voltage",
  current: "current",
});

export const DataDecimalPlaceEnum = Object.freeze({
  [DataKeyEnum.power]: 2,
  [DataKeyEnum.mvar]: 2,
  [DataKeyEnum.voltage]: 0,
  [DataKeyEnum.current]: 0,
});

export const DataDivisorEnum = Object.freeze({
  [DataKeyEnum.power]: 1000,
  [DataKeyEnum.mvar]: 1000,
  [DataKeyEnum.voltage]: 1000,
  [DataKeyEnum.current]: 1,
});

export const DataThresholdEnum = Object.freeze({
  [DataKeyEnum.voltage]: Object.freeze({ min: 320, max: 350 }),
});

export const DataUnitEnum = Object.freeze({
  [DataKeyEnum.power]: "mw",
  [DataKeyEnum.mvar]: "mvar",
  [DataKeyEnum.voltage]: "kv",
  [DataKeyEnum.current]: "amp",
});

export const RouteEnum = Object.freeze({
  LOGIN: { path: "/login", name: "Login" },
  HOME: { path: "/", name: "Home" },
});
