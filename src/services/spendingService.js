import axios from 'axios';
import React from 'react'

const SpendingService = {
    link: 'https://61986846164fa60017c23067.mockapi.io/pv',
    getSpendings: async () => {
        try {
            const {data} = await axios.get(SpendingService.link)
            return {
                data: data[0],
                spendings: data[0]?.spendings
            }
        } catch (e) {
            return false
        }
    },
    changeSpendings: async (datas, spendings) => {
        datas.spendings = spendings
        const {data} = await axios.put(SpendingService.link + '/1', datas)
        return data
    },
}

export default SpendingService