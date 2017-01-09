<template>
    <transition name="modal">
        <div id="delete-modal" :message="message" :post="post">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h1 v-if=post.isDraft>Are you sure you want to delete this draft?</h1>
                            <h1 v-else>Are you sure you want to delete this post?</h1>
                        </div>
                        <div class="modal-body">
                            <h2>{{ post.title }}</h2>
                            <p><strong>Summary: </strong>{{ post.summary }}</p>
                            <p><strong>Written By: </strong>{{ post.author }}</p>
                            <p><strong>Created: </strong>{{ post.created }}</p>
                        </div>
                        <div class="modal-footer">
                            <button class="save" @click="$emit('close')">No</button>
                            <button class="delete" @click.prevent="removePost">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default{
    props: ['message', 'post'],
    methods: {
        removePost(post){
            this.$emit('remove', this.post);
        }
    }
}
</script>

<style>
.modal-mask{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    display: table;
    opacity: 100%;
    transition: opacity .3s ease;
}

.modal-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-container{
    border: 3px solid #263238;
    background-color: #EEEEEE;
    width: 800px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}

.modal-header{
    background-color: #263238;
    color: #FAFAFA;
    padding: 10px;
    text-align: center;
}

.modal-body{
    padding: 10px;
}

.modal-body>h2 {
    font-family: "Roboto Slab", Serif;
    color: #F44336;
}

.modal-body>p{
    padding-left: 20px;
}

.modal-footer{
    display: flex;
    justify-content: center;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>