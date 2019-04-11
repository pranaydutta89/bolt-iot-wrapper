export enum PINS {
  zero = 0,
  one,
  two,
  three,
  four,
}

export enum STATE {
  high = 'HIGH',
  low = 'LOW',
}

export enum CONSTANTS {
  defaultLoopTime = 3100,
  defaultApiDiff = 3000,
  baseUrl = 'https://cloud.boltiot.com/remote',
}

export enum STATUS {
  online = 'online',
  offline = 'offline',
}

export enum EVENT {
  api,
  message,
}
export enum LOG_TYPE {
  info,
  warn,
  error,
}

export enum API_PHASE {
  start,
  inProgress,
  completed,
}
