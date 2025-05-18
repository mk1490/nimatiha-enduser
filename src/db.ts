import Dexie, {type EntityTable} from 'dexie';

interface TempData {
    id: number;
    jsonData: any,
}

const db = new Dexie('Nimkatiha') as Dexie & {
    tempData: EntityTable<
        TempData,
        'id' // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
db.version(1).stores({
    tempData: '++id, jsonData' // primary key "id" (for the runtime!)
});

export type {TempData};
export {db};
