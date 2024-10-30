const DB_NAME = 'TaskerDB';
const DB_VERSION = 2;

const STORES = [
    {name: 'projects', keyPath: 'id'},
    {name: 'tasks', keyPath: 'id'},
]

const initDB = async (storeName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            STORES.forEach(store => {
                if (!db.objectStoreNames.contains(store.name)) {
                    db.createObjectStore(store.name, { keyPath: store.keyPath})
                }
            })
        };
    });
};

export const initializeDatabase = async () => {
    try {
        await initDB();
        console.log('Database initialization complete')
    } catch (error) {
        console.error('Database initialization failed')
    }
}

export const indexedDbManager = (storeName) => ({
    async getAllRecords() {
        const db = await initDB(storeName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store =  transaction.objectStore(storeName);
            const request = store.getAll();

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result)
        })
    },

    async addRecord(item) {
        const db = await initDB(storeName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(item);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(resolve.result);
        });
    },

    async deleteRecord(item) {
        const db = await initDB(storeName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(item)

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result);
        })
    },

    async clearRecords() {
        const db = await initDB(storeName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
})


