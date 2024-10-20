import { useCallback } from "react"

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
            const resultFromApi = response?.data.tasks || response?.data;

            if(resultFromApi) {
                setData(resultFromApi);
                await dbManager.clearRecords();
                await Promise.all(
                    resultFromApi.map(async (item) => {
                        console.log(`Item: ${JSON.stringify(item)}`);
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