import {db} from "@/helpers/dataBaseConnection";

export const getTanks = async () => {
    try {
        const query = 'SELECT * FROM tank_table'
        const test = await db.query(query) //use db.query when use SELECT
        const jso = JSON.stringify(test)
        const obj = JSON.parse(jso)
        return obj.values
        // tanks.value = obj.values

    } catch (e) {
        alert('error getting table')
        console.log(e)
    }
}
