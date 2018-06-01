import Notification from '../notification1';

let noticeInstance;

function getNoticeInstance () {
    noticeInstance = noticeInstance || Notification.newInstance();

    return noticeInstance;
}

function notice (content) {

    let instance = getNoticeInstance()

    instance.notice({
        content
    });
}

export default {
    info (content) {
        return notice(content);
    },
    close () {
        noticeInstance.remove()
    },
    destroy () {
        let instance = getNoticeInstance();
        noticeInstance = null;
        instance.destroy();
    }
};