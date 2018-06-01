<template>
    <div>
        {{content}}
    </div>
</template>
<script>
    export default {
        props: ['content'],
        created(){
            console.log(this.content)
        }
    };
</script>