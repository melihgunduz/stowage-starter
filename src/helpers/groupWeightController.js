import { useGroupsWeightStore } from '@/stores/groupsWeightStore'
import {db} from "@/helpers/dataBaseFunctions";
import {computed, ref} from "vue";
import {infoAlertController} from "@/helpers/alertController";


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
            store.setGroupS(val)
        })

        await runQueryP().then((val) => {
            store.setGroupP(val)
        })
    } catch (e) {
        alert('error setting weight')
        console.log(e)
    }
};

// Group S
const getGroupS = async () => {
    const store = useGroupsWeightStore();
    try {
        const groupSWeight = ref(0);
        const groupS = computed(() => store.getGroupS())
        if (groupS.value.length === 0) {
            return 0
        } else {
            for (let i = 0; i < groupS.value.length; i++) {
                groupSWeight.value += groupS.value[i].weight
            }
            return groupSWeight.value
        }
    } catch (e) {
        console.log(e)
    }
}

//Group P
const getGroupP = async () => {
    const store = useGroupsWeightStore();
    try {
        const groupPWeight = ref(0);
        const groupP = computed(() => store.getGroupP())
        if (groupP.value.length === 0) {
            return 0
        } else {
            for (let i = 0; i < groupP.value.length; i++) {
                groupPWeight.value += groupP.value[i].weight
            }
            return groupPWeight.value
        }
    } catch (e) {
        alert('error getting weight')
        console.log(e)
    }
}
export const groupDifference = async (newWeight = 0, group) => {
    await setGroupsWeight();
    let weight1 = await getGroupS();
    let weight2 = await getGroupP();
    if (group === 'S') {
        weight1 += newWeight
    } else {
        weight2 += newWeight
    }


    const difference = Math.abs(weight1 - weight2); // absolute difference between the two weights
    const average = (weight1 + weight2) / 2; // average weight of the two weights
    const percentage = (difference / average) * 100;
    if (percentage > 20) {
        if (weight1 > weight2) {
            await infoAlertController('Grup ağırlıkları farkı 20% üzerinde', `Eklenecek yeni tank ile beraber S grubu ${Math.abs(weight1 - weight2)} kg daha ağır.`)
        } else {
            await infoAlertController('Grup ağırlıkları farkı 20% üzerinde', `Eklenecek yeni tank ile beraber P grubu ${Math.abs(weight1 - weight2)} kg daha ağır.`)
        }
        return false
    } else {
        return true
    }

}


// TODO: ağırlık karşılaştırmaları bu dosyada yapılacak. fonksiyonlar gerekirse birleştirilecek
