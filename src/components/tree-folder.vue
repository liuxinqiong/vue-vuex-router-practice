<template>
    <p>
        <span>{{ folder.name }}</span>
        <tree-folder-contents :children="folder.children" />
    </p>
</template>

<script>
export default {
    props: ['folder'],
    components: {
        TreeFolderContents: () => import('./tree-folder-contents.vue')
    }
}
</script>
