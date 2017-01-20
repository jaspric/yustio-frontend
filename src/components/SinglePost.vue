<template>
    <div id="front-page">
        <div id="front-page-container">
            <div id="all-post-container">
                <div class="front-post">
                    <div class="single-post-header">
                        <h1>{{ post.title }}</h1>
                        <span class="post-read-time">{{ post.readTime }} to read</span>
                    </div>
                    <tag-bar :post="post" :active-tags="filteredTags"></tag-bar>
                    <div class="front-post-footer">
                        <span class="front-author">By {{ post.author }}</span>
                        <span class="front-date">on {{ post.created }}</span>
                    </div>
                    <hr class="header-sep">
                    <p v-html="post.body"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TagBar from './TagBar';
var removeMd = require('remove-markdown');
var axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
var hljs = require('highlight.js');
var moment = require('moment');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

export default{
    components: {
        TagBar
    },
    data: function(){
        return{
            post: {title: null},
            postID: this.$route.params.id,
            filteredTags: []
        }
    },
    methods:{
        getPost(postID){
            var url = 'http://192.168.1.107:5000/api/blog/posts/' + postID
            self = this
            axios.get(url)
                .then((response) => {
                    this.post = response.data[0]
                    this.post.readTime = this.readTime(removeMd(this.post.body))
                    this.post.body = md.render(this.post.body)
                    if(this.post.tags){
                        this.post.tags = this.post.tags.split(',')
                    }
                    console.log(this.post.author)
                    console.log(response.status)
                })
                .catch(function (error) {
                    if(error.response.status = 404){
                        self.post.title = "404: We couldn't find that post!"
                    }
                });
        },
        readTime: function(str) { 
            var word_count = str.split(" ").length;
            var time_to_read = word_count / 200
            if (time_to_read < 1){
                return 'Less than 1 minute'
            }else if(Math.round(time_to_read) == 1){
                return 'About' + Math.round(time_to_read) + ' minute'
            }else{
                return 'About ' + Math.round(time_to_read) + ' minutes'
            }
        }
    },
    mounted(){
        this.getPost(this.postID)
    }
}
</script>

<style>

.single-post-header{
    text-align: center;
    margin-bottom: 30px;
    width: 100%;
}

.single-post-header h1{
    text-align: center;
    margin-bottom: 5px;
}

#single-post-container{
    width: 70%;
    max-width: 900px;
    display: flex;
    justify-content: center;

}

.front-tag-bar{
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row wrap;
}

.front-tag-bar a{
    color: #999;
}

.front-tag-bar ul{
    padding: 0;
    display: flex;
    justify-content: flex-start;
    list-style-type: none;
    margin: 0;
    flex-flow: row wrap;
}

.front-tag-bar ul li{
    padding: 2px 10px;
    margin: 5px 10px;
    list-style-type: none;
    border: 1px solid #999;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,0.2);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    background-color: #EEEEEE;
}

.front-tag-bar ul li:hover{
    box-shadow: 0 3px 5px rgba(0,0,0,.15), 0 3px 5px rgba(0,0,0,0.15);
    color: white;
    background-color: #546E7A;
}

.active-tag{
    color: white;
    background-color: #546E7A !important;
}

.header-sep{
    border: 1px solid #E0E0E0;
    width: 100%;
}
@media only screen and (max-width: 1024px) {
    .front-tag-bar ul li{
        font-size: 2em;
        padding: 25px;
    }
}

</style>