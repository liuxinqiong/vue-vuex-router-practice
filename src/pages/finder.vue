<template>
    <tree-folder :folder='root'></tree-folder>    
</template>

<script>
  import TreeFolder from '@/components/tree-folder.vue'
  export default {
    components: {
      TreeFolder
    },
    data() {
      return {
        root: {

        }
      }
    },
    created() {
      this.root = {
        name: 'aaa',
        children: [{
          name: 'bbb',
          children: [{
            name: 'ccc',
            children: []
          }]
        }]
      }
    }
  }

</script>
