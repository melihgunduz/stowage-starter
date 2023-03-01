import { defineStore } from 'pinia';

interface DetailsInterface {
    weight: null | number;

}


interface GroupInterface {
    groupS: DetailsInterface[]
    groupP: DetailsInterface[]
}
const groupsInitialValue = {
    groupS: [],
    groupP: [],
}



type GroupWeightInterface = {
    groups: GroupInterface;
};

export const useGroupsWeightStore = defineStore('groupWeight', {
        state: () =>
            ({
                groups: groupsInitialValue,
            } as GroupWeightInterface),
    getters: {
        getGroupS: (state: GroupWeightInterface) => {
            return state.groups.groupS;
        },
        getGroupP: (state: GroupWeightInterface) => {
            return state.groups.groupP;
        },
    },
    actions: {
        setGroupS(groupData: DetailsInterface[]) {
    this.groups.groupS = groupData;
},
clearStore() {
    this.groups = groupsInitialValue;
},
},
});
