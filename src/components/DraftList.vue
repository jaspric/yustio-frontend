<template>
    <div id="drafts">
        <div v-for="draft in drafts" class="post-container" track-by="id" @click.prevent="onEdit(draft)" :class=" { active : draft.isActive } ">
                <div class="post-title">
                    <h1>{{ draft.title }}</h1>
                </div>
                <div class="post-summary">
                    <h3>{{ draft.summary }}</h3>
                </div>
                <div class="post-footer">
                    <div class="post-author">
                        {{ draft.author }}
                    </div>
                    <div class="post-date">
                        {{ draft.date }}
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default{
    props: ['drafts'],
    methods: {
        onEdit(draft){
            this.$emit('edit', draft)
        }
    }
}
</script>

<style>
#drafts{
    width: 100%;
}
</style>