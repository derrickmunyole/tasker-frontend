const DB_NAME = 'TaskerDB';
const DB_VERSION = 1;


const initDB = async (storeName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStoreName(storeName, { keyPath: 'id' })
            }
        };
    });
};

const createIndexedDbManager = (storeName) => ({
    async getAllRecords() {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store =  transaction.objectStore(storeName);
            request = store.getAllRecords()

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result)
        })
    },

    async addRecord(item) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            request = store.addRecord(item);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(resolve.result);
        });
    },

    async deleteRecord(item) {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            request = store.deleteRecord(item)

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result);
        })
    },

    async clearRecords() {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            request = store.clearRecords();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
})


