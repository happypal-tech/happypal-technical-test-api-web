export enum Events {
  UnauthorizedError = 'UnauthorizedError',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventListener<T = any> = (data?: T) => void | Promise<void>;
type EventListeners = Record<Events, EventListener[]>;

class _EventBus {
  private eventListeners: EventListeners;

  constructor() {
    const listeners: Partial<EventListeners> = {};

    Object.values(Events).map((evt) => {
      listeners[evt] = [];
    });

    this.eventListeners = listeners as EventListeners;
  }

  on(type: Events, listener: EventListener) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }

    this.eventListeners[type].push(listener);
  }

  off(type: Events, listener: EventListener) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }

    this.eventListeners[type] = this.eventListeners[type].filter((cb) => cb !== listener);
  }

  async emit<T>(type: Events, data?: T) {
    await Promise.all(this.eventListeners[type].map((listener) => listener(data)));
  }
}

export const EventBus = new _EventBus();
