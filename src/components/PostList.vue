<template>
    <div id="posts">
        <div v-for="post in posts" class="post-container" track-by="id" @click.prevent="onEdit(post)" :class=" { active : post.isActive } ">
                <div class="post-title">
                    <h1>{{ post.title }}</h1>
                </div>
                <div class="post-summary">
                    <h3>{{ post.summary }}</h3>
                </div>
                <div class="post-footer">
                    <div class="post-author">
                        {{ post.author }}
                    </div>
                    <div class="post-date">
                        {{ post.created }}
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
var moment = require('moment');
export default{
    props: ['posts'],
    methods: {
        onEdit(post){
            this.$emit('edit', post)
        }
    },
    mounted(){
        for(var i = 0; i<this.posts.length; i++){
            this.posts[i].created = moment(Date.parse(this.posts[i].created)).format('YYYY/MM/DD, h:mm:ss a')
        }
    }
}
</script>

<style>

#posts{
    width: 95%;
    margin: 10px auto;

}

.post-container{
    width: 95%;
    margin: 2em auto;
    padding:  0;
    background-color: #ECEFF1;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    color: #FAFAFA;
    border-left: 6px solid #1A8DFF;
    cursor: pointer;
}
.post-container:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,0.22);
    border-left: 6px solid #f44336;
}

.post-container:active{
    box-shadow: 0 7px 14px rgba(0,0,0,.25), 0 5px 5px rgba(0,0,0,0.22);
    border-left: 6px solid #FFEB3B;
}

.active{
    box-shadow: 0 7px 14px rgba(0,0,0,.25), 0 5px 5px rgba(0,0,0,0.22);
    border-left: 6px solid #FFEB3B;
}

.post-container:focus{

}

.post-container>a{
    color: #FAFAFA;
}

.post-title, .post-summary, .post-author, .post-date{
    margin: 0 2%;
}

.post-title{
    padding: .75em .75em 0 .75em;
    font-family: "Roboto Slab", Serif;
    color: #F44336;
}

.post-summary{
    padding: 0 .7em .75em 2em;
    color: #263238;
    text-align: justify;
}

.post-footer{
    display: flex;
    justify-content: space-between;
    padding: .75em;
    color: #263238;
}
.post-author>span{
    font-size: 1.5em;
}

.post-date>span{
    font-size: 1.5em;
}
</style>