import Notification from './notification.vue';
import Vue from 'vue';

Notification.newInstance = () => {

    const div = document.createElement('div');
    div.innerHTML = `<notification></notification>`;
    document.body.appendChild(div);

    const notification = new Vue({
        el: div,
        data: {},
        components: { Notification }
    }).$children[0];

    return {
        notice (options) {
            // notification vm实例
            notification.add(options);
        },
        remove () {
            notification.close();
        },
        component: notification,
        destroy () {
            document.body.removeChild(div);
        }
    };
};

export default Notification;