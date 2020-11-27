import base from './firebase';
import { message } from 'antd';

const auth = {
    
    async createNewAccount(user) {
        try {
            const userAuth = await base.auth().createUserWithEmailAndPassword(user.email, user.password);

            base.database().ref('users/' + userAuth.user.uid).set({uid: userAuth.user.uid, ...user}).catch(error => {
                message.error(error.message, 2);
            });

            return userAuth.user.uid;
            
        } catch (error) {
            message.error(error.message, 2);
        }
    },

    async loginAccount(user) {
        try {
            const userAuth = await base.auth().signInWithEmailAndPassword(user.email, user.password);

            let userData;
            await base.database().ref('users/' + userAuth.user.uid).once("value", snap => {

                userData = snap.val();
            }).catch(error => {
                
                message.error(error.message, 2);
            });

            return userData;
        } catch(error) {
            message.error(error.message, 2);
        };
    },

    async logoutAccount() {
        await base.auth().signOut();
        localStorage.clear();
    }
}

export default auth;