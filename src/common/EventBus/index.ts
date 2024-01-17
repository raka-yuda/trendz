interface EventBus {
  on(event: string, callback: (data: any) => void): void;
  dispatch(event: string, data: any): void;
  remove(event: string, callback: (data: any) => void): void;
}

const eventBus: EventBus = {
  on(event, callback) {
    document.addEventListener(event, (e: Event) => callback((e as CustomEvent).detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;