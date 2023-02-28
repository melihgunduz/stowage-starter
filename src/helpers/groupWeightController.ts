import {db} from "@/helpers/dataBaseFunctions";
import {reactive, ref} from "vue";

const numbers = reactive({
    weight : [],
})

export const totalWeightForS = ref(0);
// const totalWeightForP = ref(0);

const runQuery = async () => {
    const query_1 = "SELECT weight FROM tank_table WHERE tankGroup = 'S'"
    const answerFromDb = await db.query(query_1) //use db.query when use SELECT
    const answerText = JSON.stringify(answerFromDb)
    const weightsFromDb = JSON.parse(answerText)
    return weightsFromDb.values
}
export const checkGroupsWeight = async () => {

    // try {
    //   await  runQuery().then((val:any) => {
    //         numbers.weight = val
    //     })
    //     for (let i = 0 ; i < numbers.weight.length; i++) {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //         totalWeightForS.value = totalWeightForS.value + numbers.weight[i].weight
    //         // TODO: ağırlıklar alındı
    //     }
    //
    // } catch (e) {
    //     alert('error getting table')
    //     console.log(e)
    // }
};


