const interopRequire = (m: any) => m.default || m;

export const setupStore = () => {
    if (typeof window === undefined || !window.Worker) {
        const createStore = interopRequire(require("stockroom/inline"));
        return createStore(interopRequire(require("./store.worker")));
    }

    const createStore = interopRequire(require("stockroom"));
    return createStore(require("worker-loader!./store.worker")());
};
