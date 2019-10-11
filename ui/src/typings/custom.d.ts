declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
        constructor();
    }

    export default WebpackWorker;
}

declare module "stockroom" {
    import { Store } from "unistore";

    export default function createStore<K>(worker: Worker): Store<K>;
}

declare module "stockroom/worker" {
    import { Store } from "unistore";

    export default function createWorkerStore<K>(
        initialState?: K
    ): WorkerStore<K>;
    export interface WorkerStore<K> extends Store<K> {
        freeze: () => void;
        unfreeze: () => void;
        registerActions<K>(reducer: (store: WorkerStore<K>) => any): void;
    }
    export default function createInlineStore<K>(
        workerStore: WorkerStore<K>
    ): WorkerStore<K>;
}

declare module "preact-virtual-list" {
    import { h, FunctionComponent } from "preact";

    export interface Props<T> {
        data: T[];
        renderRow: (row: T) => h.JSX.Element;
        rowHeight?: number;
        sync?: boolean;
        overscanCount?: number;
        class?: string;
    }

    const VirtualList: FunctionComponent<Props<any>>

    export default VirtualList;
}
