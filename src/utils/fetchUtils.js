import { useCallback } from "react"

/**
 * Factory function to create a fetch function with caching and error handling.
 * 
 * @param {Function} api - The API function to fetch data from.
 * @param {Object} dbManager - The database manager for handling local storage.
 * @param {Function} setData - Function to update the state with fetched data.
 * @param {Function} setIsloading - Function to update the loading state.
 * @param {Function} setError - Function to update the error state.
 * @returns {Function} - A callback function that fetches data, either from cache or API.
 */
export const fetchFunctionFactory = (api, dbManager, setData, setIsloading, setError) => {
    return useCallback(async (forceRefresh = false) => {
        if(!forceRefresh) {
            const cacheData = await dbManager.getAllRecords();
            if(cacheData.length > 0) {
                setData(cacheData);
                console.log(`CACHED DATA: ${JSON.stringify(cacheData)}`);
                return cacheData;
            }
        }

        try {
            setIsloading && setIsloading(true)
            const response = await api();
            console.log(`RESPONSE: ${JSON.stringify(response)}`)
            const resultFromApi = response?.data.tasks || response?.data;

            if(resultFromApi) {
                setData(resultFromApi);
                await dbManager.clearRecords();
                await Promise.all(
                    resultFromApi.map(async (item) => {
                        console.log(`Item: ${JSON.stringify(item)}`);
                        console.log(`STATUS: ${item.status}`)
                        try {
                            await dbManager.addRecord(item)
                        } catch (error) {
                            console.error(`Error adding item to indexedDb: ${error}`)
                        }

                    })
                );

                setIsloading && setIsloading(false);
                return resultFromApi;
            } else {
                throw new Error("Invalid response format")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError && setError('Failed to retrieve data. Try again')
            setIsloading && setIsloading(false)
            throw error;
        }
    }, [api, dbManager, setData, setIsloading, setError])
}