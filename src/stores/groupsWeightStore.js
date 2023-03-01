import { defineStore } from 'pinia';
import { ref } from "vue";
export const useGroupsWeightStore = defineStore('groupWeight', () => {

    const groupS = ref([])
    const groupP = ref([])

    const getGroupS = () => {
       return groupS.value;
    }
    const getGroupP = () => {
       return groupP.value;
    };
    const setGroupS = (groupData) => {
        groupS.value = groupData;
    }
    const setGroupP = (groupData) => {
        groupP.value = groupData;
    };
    const clearStore = () => {
        groupS.value = [];
        groupP.value = [];
    };
    return { groupS, groupP, getGroupS, getGroupP, setGroupS,setGroupP,clearStore }
});
