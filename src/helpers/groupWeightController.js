import { useGroupsWeightStore } from '@/stores/groupsWeightStore'
import {db} from "@/helpers/dataBaseFunctions";
import {reactive} from "vue";
import {computed} from "vue";



const numbers = reactive({
    weight : [],
})

const runQueryS = async () => {
    const query = "SELECT weight FROM tank_table WHERE tankGroup = 'S'"
    const answerFromDb = await db.query(query) //use db.query when use SELECT
    const answerText = JSON.stringify(answerFromDb)
    const weightsFromDb = JSON.parse(answerText)
    return weightsFromDb.values
}
const runQueryP = async () => {
    const query = "SELECT weight FROM tank_table WHERE tankGroup = 'P'"
    const answerFromDb = await db.query(query) //use db.query when use SELECT
    const answerText = JSON.stringify(answerFromDb)
    const weightsFromDb = JSON.parse(answerText)
    return weightsFromDb.values
}
export const setGroupsWeight = async () => {
    const store = useGroupsWeightStore();
    try {
        await runQueryS().then((val) => {
            console.log(val)
            store.setGroupS(val)
        })

        await runQueryP().then((val) => {
            store.setGroupP(val)
            console.log()
        })
        // return numbers.weight //dizi dönüyor içinde .weight var
    } catch (e) {
        alert('error setting weight')
        console.log(e)
    }
};
export const getGroupsWeight = async () =>{
    const store = useGroupsWeightStore();
    try {
        const groupS = computed(() => store.getGroupS())
        if (!(groupS.value[0] === undefined))
        console.log(groupS.value[0].weight)

        const groupP = computed(() => store.getGroupP())
        if (!(groupP.value[0] === undefined))
        console.log(groupP.value[0].weight)

    } catch (e) {
        alert('error getting weight')
        console.log(e)
    }
}



