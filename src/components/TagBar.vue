<template>
    <div class="front-tag-bar">
        <ul class="front-tags">
            <a v-for="tag in post.tags" href="#" @click.prevent="filterTags(tag)">
                <li :class="isActive(tag)">
                    {{ tag }}
                </li>
            </a>
        </ul>
    </div>
</template>

<script>
export default{
    props: ['post', 'activeTags'],
    methods: {
        filterTags(tag){
            this.$emit('filter-tags', tag)
        },
        isActive(tag){
            return this.activeTags.indexOf(tag) > -1 ? 'active-tag' : ''
        }
    }
}
</script>

<style>
</style>