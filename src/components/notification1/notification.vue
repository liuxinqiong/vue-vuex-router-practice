<template>
    <div>
        <notice v-for="(notice, index) in notices" :key="index"
            :content="notice.content">
        </notice>
    </div>
</template>
<script>
    import notice from './notice.vue';
    export default {
        components: { notice },
        props: {
            content: {
                type: String
            }
        },
        data () {
            return {
                notices: []
            };
        },
        methods: {
            add (notice) {
                this.notices.push(notice);
                console.log(this.notices);
            },
            close () {
                this.notices = []
            }
        }
    };
</script>