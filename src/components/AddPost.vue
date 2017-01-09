<template>
        <form id="blog-post-entry">
            <div class="form-group">
                <!-- <label for="postTitle" class="input-label">Post title</label> -->
                <input type="text" v-model="post.title" class="input-text" id="postTitle" placeholder="Title">
            </div>
            <div class="form-group">
                <!-- <label for="postSummary" class="input-label">Post summary</label> -->
                <input type="text" v-model="post.summary" class="input-text" id="postSummary" placeholder="Summary">
            </div>
            <div class="form-group">
                 <textarea v-model="post.body" @input="markdownPreview" id="post-body" rows="12" columns="100" placeholder="Start typing..."></textarea> 
            </div>
            <div class="form-group">
                <!-- <label for="tags" class="input-label">Tags</label> -->
                <input type="text" v-model="post.tags" class="input-text" id="tags" placeholder="Tags">
            </div>
            <div id="post-button-holder">
                <button type="submit" v-if="post.title && post.summary && post.body" @click.prevent="onSubmit" id="post-submit">{{ post.isDraft ? 'Add Post' : 'Update Post' }}</button>
                <button type="submit" v-if="post.isDraft || (post.id == null && post.title && post.summary && post.body)" @click.prevent="saveDraft" id="post-save">Save Draft</button>
                <button type="submit" v-if="post.title || post.id || post.body || post.summary || post.tags" @click.prevent="cancelPost" id="post-cancel">Cancel</button>
                <button type="submit" v-if="post.id" @click.prevent="removePost" id="post-delete">{{ post.isDraft ? 'Delete Draft' : 'Delete Post'}}</button>
            </div>
        </form>
</template>

<script>
var moment = require('moment');
moment().format()

export default {
    props: ['post'],
    methods: {
        onSubmit(){
            this.post.author = 'Yust Test';
            this.post.created = moment().format('MMM DD, YYYY [ at ] hh:mm a')
            this.$emit('submit', this.post);
        },
        saveDraft(){
            this.post.author = 'Yust Test';
            this.post.created = moment().format('MMM DD, YYYY [ at ] hh:mm a')
            this.$emit('save', this.post);
        },
        markdownPreview(){
            this.$emit('input', this.post.body);
        },
        cancelPost(){
            this.$emit('cancel', this.post);
        },
        removePost(post){
            this.$emit('remove', this.post);
        }
    }
}
</script>

<style>
input, label{
    display: block;
}

.input-label{
    padding: 5px;
}

.input-text, #post-body{
    font-size: 1em;
    padding: 5px;
    margin: 10px auto;
    width: 98%;
    box-shadow: 0 -1px 0 0 #1A8DFF inset;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.input-text:focus, #post-body:focus{
    box-shadow: 0 -3px 0 0 #1A8DFF inset;
    outline: none;
}

#post-body{
    display: block;
    resize: none;
    font-family: Consolas, "Courier new";
    margin-top: 20px;
    height: 370px;
    overflow-y: auto;
}
#post-button-holder{
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    min-height: 100px;
}

#post-save, .save{
    background-color: #4CAF50;
    box-shadow: 0 -5px 0 0 #388E3C inset;
}

#post-save:hover, .save:hover{
    background-color: #66BB6A;
}

#post-save:active, .save:active{
    box-shadow: 0 -2px 0 0 #388E3C inset;
}

#post-delete, .delete{
    background-color: #e53935;
    box-shadow: 0 -5px 0 0 #c62828 inset;  
}

#post-delete:hover, .delete:hover{
    background-color: #e57373;
}

#post-delete:active, .delete:active{
    box-shadow: 0 -2px 0 0 #c62828 inset;
}

#post-submit, .submit{
    background-color: #2196F3;
    box-shadow: 0 -5px 0 0 #1976D2 inset;
}

#post-submit:hover, .submit:hover{
    background-color: #42A5F5;
}

#post-submit:active, .submit:active{
    box-shadow: 0 -2px 0 0 #1976D2 inset;
}

#post-cancel, .cancel{
    background-color: #FF7043;
    box-shadow: 0 -5px 0 0 #FF5722 inset;  
}

#post-cancel:hover, .cancel:hover{
    background-color: #FF8A65;
}

#post-cancel:active, .cancel:active{
   box-shadow: 0 -2px 0 0 #FF5722 inset;
}

.input-text{
    height: auto;
}

@media only screen 
  and (max-device-width: 768px) {
    #post-button-holder{
        min-height: 280px;
    }
}
</style>