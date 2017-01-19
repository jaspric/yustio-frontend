<template>
    <div id="front-page">
        <div id="all-post-container">
            <div v-for="post in posts" class="front-post">
                <div class="front-post-header">
                    <h1 class="front-title">{{ post.title }}</h1>
                    <h4 class="front-read-time">{{ post.read_time }} minute read</h4>
                </div>
                <p v-html="post.body" class="front-body"></p>
                <div class="front-post-footer">
                    <span class="front-author"><strong>Yust</strong></span>
                    <span v-if="post.last_edited" class="front-date"><strong>{{ post.last_edited }}</strong></span>
                    <span v-else class="front-date"><strong>{{ post.created }}<strong></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var removeMd = require('remove-markdown');
var axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
var hljs = require('highlight.js');
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
    data: function(){
        return {
            posts: []
        }
    },
    mounted(){
            this.getPosts()
    },
    methods:{
        getPosts: function(){
            self = this
            axios.get('http://192.168.1.107:5000/api/blog/posts')
                .then((response) => {
                    response.data.sort(function(a, b){
                        if(a.created < b.created) return -1;
                        if(a.created > b.created) return 1;
                        return 0;
                    }).reverse()
                    response.data.forEach((post) => {
                        post.summary = removeMd(post.body).substring(0, 300) + '...'
                        post.read_time = this.readTime(removeMd(post.body))
                        post.body = md.render(post.body)
                        this.posts.push(post)
                        })
                });
        },
        readTime: function(str) { 
            var word_count = str.split(" ").length;
            var time_to_read = word_count / 250
            if (time_to_read < 1){
                return 'Less than 1'
            }else{
                return Math.round(time_to_read)
            }

        }
    }
}
</script>

<style>
#front-page{
    display: flex;
    justify-content: space-around;
}

#all-post-container{
    margin: 0;
    width: 70%;
}

.front-post{
    margin: 2em;
    padding: 0 50px;
    line-height: 1.8em;
    font-family: "Roboto", sans-serif;
    display: flex;
    flex-flow: column;
    background-color: #FAFAFA;
}

.front-post h1{
    font-family: "Roboto Slab", serif;
    color: #f44336;
    margin: 20px 0;
    text-align: left;
    font-size: 2.5em;
    line-height: 1.2em;
}

.front-post h2, h3, h4, h5{
    font-family: "Roboto", sans-serif;
}

.front-post code {
    background-color: #2d2d2d;
    color: #cccccc;
    font-family: Consolas, "Courier new";
    padding: 2px 4px;
    border-radius: 4px;
}

.front-post blockquote {
  background-color: #F5F5F5;
  box-shadow: 0 3px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 5px 25px 5px 60px;
  line-height: 1.5;
  text-align: justify;
  border-left: 6px solid #1A8DFF;
  position: relative;
  min-height: 54px;
  font-size: 1.5em;
  font-family: "Roboto Slab", serif;
}

.front-post blockquote::before{
  content: "\201C";
  font-family: Georgia, serif;
  font-size: 60px;
  font-weight: bold;
  color: #999;
  position: absolute;
  left: 10px;
  top: 0px;
  }

.front-post-header, .front-post-footer{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.front-post-footer{
    margin-bottom: 20px;
}

.front-author, .front-date{
    font-family: "Roboto Slab", serif;
}
@media screen only and (max-width: 1024px) {

        #all-post-container{
            margin: 2em 0;
            width: 100%;
        }

        .front-post h1{
            font-size: 4em;
        }

        .front-post h2, h3, h4, h5{
            font-size: 2em;
        }

        .front-post-footer{
            font-size: 2em;
        }

        .front-post code{
            font-size: 2em;
        }

        .front-body>p{
            font-size: 1.2em;
            line-height: 2em;
        }
}
@media (max-width: 1024px){
    #all-post-container{
            margin: 2em 0;
            width: 100%;
        }
}
</style>