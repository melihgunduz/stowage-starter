import {alertController} from "@ionic/vue";
import {ref} from "vue";


export const appAlertController = (header:string,message:string) => {
    const presentAlert = async () => {
        const status = ref('');
        const roleMessage = ref('');
        const alert = await alertController.create({
            header: header,
            backdropDismiss: false,
            message: message,
            buttons: [
                {
                    text: 'Vazgeç',
                    role: 'cancel',
                    handler: async () => {
                        status.value = 'cancel'
                    }
                },
                {
                    text: 'Onayla',
                    role: 'confirm',
                    handler: async () => {
                        status.value = 'confirm'
                    }
                },
            ],
        });
        await alert.present()
        const { role } = await alert.onDidDismiss();
        roleMessage.value = `${role}`;
        return roleMessage.value
    };
    const foo = new Promise((resolve) => {
        presentAlert().then(value => resolve(value))
    });

    return foo.then((res) => {
        return res
    })
};
