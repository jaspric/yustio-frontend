<template>
    <div id="front-page">
        <div id="front-page-container">
            <div id="paginator-container">
                <pagination :posts-length="this.posts.length" :current-page="this.pageNumber" @page-change="pageChanged"></pagination>
            </div>
            <div id="all-post-container">
                <div v-for="post in paginatedPosts" class="front-post" v-if="post.notHidden">
                    <div class="front-post-header">
                        <h1 class="front-">{{ post.title }}</h1>
                        <h4 class="front-read-time">{{ post.read_time }} to read</h4>
                    </div>
                    <tag-bar :post="post" :active-tags="filteredTags" @filter-tags="filterTags"></tag-bar>
                    <p v-html="post.summary" class="front-body"></p>
                    <router-link :to="'/posts/' + post.entry_id" class="read-more"> Read More </router-link>
                    <div class="front-post-footer">
                        <span class="front-author"><strong>Yust</strong></span>
                        <span :title="post.last_edited" v-if="post.last_edited"  class="front-date"><strong>About {{ post.face_date }}</strong></span>
                        <span :title="post.created" v-else class="front-date"><strong>{{ post.face_date }}<strong></span>
                    </div>
                </div>
            </div>
            <div id="paginator-container">
                <pagination :posts-length="this.posts.length" :current-page="this.pageNumber" @page-change="pageChanged"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import TagBar from './TagBar';
import Pagination from './Pagination';
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
        Pagination,
        TagBar
    },
    data: function(){
        return {
            originalPosts: [],
            posts: [],
            pageNumber: 1,
            filteredTags: [],
            filteredOutPosts: []
        }
    },

    mounted(){
            this.getPosts()
    },

    computed:{
        paginatedPosts: function(){
            let first = 0 + ((this.pageNumber - 1) * 5)
            let last = 5 + ((this.pageNumber - 1) * 5)
            return this.posts.slice(first, last)    
        }
    },
    methods:{
        getPosts: function(){
            self = this
            axios.get('http://192.168.1.107:5000/api/blog/posts')
                .then((response) => {
                    response.data.sort(function(a, b){
                        if(a.entry_id < b.entry_id) return -1;
                        if(a.entry_id > b.entry_id) return 1;
                        return 0;
                    }).reverse()
                    response.data.forEach((post) => {
                        post.face_date = moment(Date.parse(post.created)).fromNow()
                        post.created = moment(Date.parse(post.created)).format('llll')
                        post.notHidden = true;
                        if(post.tags){
                            post.tags = post.tags.split(',')
                        }
                        if (post.last_edited){   
                            post.face_date = moment(Date.parse(post.last_edited)).fromNow()
                            post.last_edited = moment(Date.parse(post.last_edited)).format('llll')
                        }
                        post.summary = removeMd(post.body).substring(0, 500) + '...'
                        post.read_time = this.readTime(removeMd(post.body))
                        post.body = md.render(post.body)
                        this.posts.push(post)
                        this.originalPosts.push(post)
                        })
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
        },
        pageChanged: function(pageNum){
            this.pageNumber = parseInt(pageNum)
        },
        filterTags(tag){
            if(this.filteredTags.indexOf(tag) > -1){
                let i = this.filteredTags.indexOf(tag)
                this.filteredTags.splice(i, 1)
                console.log('working')
            } else {
                this.filteredTags.push(tag)

            }
            this.filteredList()
        },
        findOne: function(haystack, arr) {
            arr.some(v=> haystack.indexOf(v) >= -1)
        },
        filteredList: function(){
            if(this.filteredTags.length > 0){
                self = this
                this.posts.forEach(function(post){
                    var index = self.posts.indexOf(post)
                    if(post.tags){
                        if( self.filteredTags.some(v => post.tags.indexOf(v) >= 0) ){
                            post.notHidden = true
                        } else {
                            post.notHidden = false
                        }
                    }else{
                        post.notHidden = false
                    }
                })
            } else{
                this.posts.forEach(function(post){
                    post.notHidden = true
                })
            }
        }
    }
}
</script>

<style>
#front-page{
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
}

#front-page-container{
    width: 70%;
    max-width: 1024px;
}

#all-post-container{
    margin: 0;
    width: 100%;
}

.front-post{
    margin: 2em;
    padding: 0 50px;
    line-height: 1.8em;
    font-family: "Roboto", sans-serif;
    display: flex;
    flex-flow: column;
    background-color: #FAFAFA;
    box-shadow: 0 4px 10px rgba(0,0,0,.01), 0 4px 10px rgba(0,0,0,.1);
}

.front-post h1{
    font-family: "Roboto Slab", serif;
    color: #f44336;
    margin: 20px 0;
    text-align: left;
    font-size: 2.5em;
    line-height: 1.2em;
}

.front-post h2, h3, h4, h5, h6{
    font-family: "Roboto", sans-serif;
    margin: 0;
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
  font-size: 1.1em;
  font-family: "Roboto Slab", serif;
  margin: 15px;
}

.front-post blockquote::before{
  content: "\201C";
  font-family: Georgia, serif;
  font-size: 64px;
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
    margin: 20px 0;
}

.front-author, .front-date{
    font-family: "Roboto Slab", serif;
}
.read-more{
    align-self: flex-end;
    color: #999;
    text-decoration: none;
}

.read-more:visited{
    color: #ef9a9a;
}

.read-more:hover{
    color: #f44336;
}
@media only screen and (max-width: 1024px) {
        
        #front-page-container{
            width: 100%;
            max-width: 100%;
        }
        #all-post-container{
            margin: 2em 0;
            width: 100%;
        }

        .front-post h1{
            font-size: 4em;
        }

        .front-post h2, h3, h4, h5, h6{
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