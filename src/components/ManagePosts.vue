<template>
    <div id="manage-posts">
        <modal-box v-if="showDeleteModal" :post="postInForm" @close="showDeleteModal = false" @remove="removePost"></modal-box>
        <div id="manage-posts-header">
            <h1>Manage Posts</h1>
        </div>
        <div id="manage-posts-body">
            <div id="edit-post">
                <add-post :post="postInForm" @submit="onFormSubmit" @input="compileMarkdown" @cancel="resetPostInForm" @save="saveDraft" @remove="removeCheck"></add-post>
            </div>
            <div id="markdown-container">
                <markdown-viewer :compiledMarkdown="compiledMarkdown"></markdown-viewer>
            </div>
        </div>
        <div id="draft-entry">
            <div id="draft-list">
                <h1>Drafts</h1>
                <draft-list :drafts="drafts" @edit="onEditClicked"></draft-list>
            </div>
            <div id="entry-list">
                <h1>Entries</h1>
                <span><strong>Sort by: </strong></span> 
                <a @click="sortPosts('date')" class="sort-link">Date</a> | <a @click="sortPosts('author')" class="sort-link">Author</a> | <a @click="sortPosts('title')" class="sort-link">Title</a>
                <post-list :posts="posts" @edit="onEditClicked"></post-list>
            </div>
        </div>
    </div>
</template>

<script>
import AddPost from './AddPost'
import PostList from './PostList'
import MarkdownViewer from './MarkdownViewer'
import DraftList from './DraftList'
import ModalBox from './ModalBox'

import uuid from 'uuid';

require('smoothscroll-polyfill').polyfill();
var removeMd = require('remove-markdown');
var hljs = require('highlight.js');

var axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

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

const initialData = () => {
    return{
        postInForm: {
            id: null,
            title: '',
            summary: '',
            body: '',
            tags: '',
            isActive: false,
            isDraft: false
        },
        posts: [],
        drafts: [],
        compiledMarkdown: '',
        showDeleteModal: false,
        sortOrder: 'desc'
    }
}

export default {
    components: {
        PostList,
        AddPost,
        MarkdownViewer,
        DraftList,
        ModalBox
    },
    mounted(){
        this.getPosts()
        if(this.getCookie('drafts')){
            var draftCookie = JSON.parse(this.getCookie('drafts'))
            draftCookie.forEach((draft) => {
                draft.isActive = false;
                this.drafts.push(draft)
            })
        }
    },
    data: initialData,
    methods: {

        onFormSubmit(post) {
            var self = this;
            if(post.isDraft){
                this.resetPostInForm();
                this.removePost(post);
                post.id = "";
                var json_post = JSON.stringify(post);
                axios.post('http://192.168.1.107:5000/api/blog/posts', json_post)
                    .then(function (response){
                        self.getPosts()
                    })
            }else{
                const index = this.posts.findIndex((p) => p.id === post.id);
                if (index !== -1){
                    console.log('this is a post')
                    this.resetPostInForm();
                    var json_post = JSON.stringify(post);
                    var url = 'http://192.168.1.107:5000/api/blog/posts/' + post.entry_id
                    axios.put(url, json_post)
                    .then(function (response){
                        self.getPosts()
                    })
                    
                } else {
                    if(post.title != '' && post.body != ''){
                        console.log('this is going too')
                        this.resetPostInForm();
                        post.id = "";
                        post = JSON.stringify(post)
                        console.log(post)
                        axios.post('http://192.168.1.107:5000/api/blog/posts', post)
                            .then(function (response){
                                console.log(response + ' success');
                                self.getPosts()
                            })

                    }
                    else{
                        console.log('title is null')
                        console.log(JSON.stringify(post))
                    }
                }
            }
        },
        resetPostInForm() {
            for(var i=0; i < this.posts.length; i++){
                this.posts[i].isActive = false;
            };
            for(var i=0; i < this.drafts.length; i++){
                this.drafts[i].isActive = false;
            };
            this.postInForm = initialData().postInForm;
            this.compileMarkdown('');
        },
        compileMarkdown(rawData){
            this.compiledMarkdown = md.render(rawData)
        },
        onEditClicked(post){
            for(var i=0; i < this.posts.length; i++){
                this.posts[i].isActive = false;
            };
            for(var i=0; i < this.drafts.length; i++){
                this.drafts[i].isActive = false;
            };
            post.isActive = true;
            this.postInForm = { ...post };
            this.compileMarkdown(this.postInForm.body);
            var scrollPos = window.pageYOffset;
            document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
        },
        saveDraft(draft){
            draft.isDraft = true;
            draft.isActive = false;
            draft.summary = removeMd(draft.body).substring(0, 139) + '...'
            if(draft.id){
                const index = this.drafts.findIndex((p) => p.id === draft.id);

                if (index !== -1){
                    this.drafts.splice(index, 1, draft)
                    this.resetPostInForm();
                }
            } else {
                    draft.id = uuid.v4();
                    this.drafts.push(draft);
                    this.resetPostInForm();
                    this.createDraftCookie(this.drafts)
            }
        },
        removePost(post){
            const pindex = this.posts.findIndex((p) => p.id === post.entry_id);
            const dindex = this.drafts.findIndex((p) => p.id === post.id);

            if(!post.isDraft){
                if (pindex == -1){
                    console.log('deleting post')
                    this.posts.splice(pindex, 1)
                    var url = 'http://192.168.1.107:5000/api/blog/posts/' + post.entry_id
                    var self = this
                    axios.delete(url)
                            .then(function (response){
                                console.log(response + ' success');
                                self.getPosts()
                            })
                }
            } else {
                if (dindex !== -1){
                    this.drafts.splice(dindex, 1)
                    this.createDraftCookie(this.drafts)
                }
            }
            this.resetPostInForm()
            this.showDeleteModal = false
            
        },
        removeCheck(post){
            this.showDeleteModal = true
        },
        createDraftCookie(drafts){
            var userDrafts = JSON.stringify(drafts)
            this.createCookie('drafts', userDrafts)
        },
        createCookie: function(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        getCookie: function(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        },
        getPosts: function(){
            this.posts = []
            console.log('getting posts...')
            axios.get('http://192.168.1.107:5000/api/blog/posts')
                .then((response) => {
                    response.data.sort(function(a, b){
                        if(a.created < b.created) return -1;
                        if(a.created > b.created) return 1;
                        return 0;
                    }).reverse()
                    response.data.forEach((post) => {
                        post.summary = removeMd(post.body).substring(0, 139) + '...'
                        post.isActive = false;
                        this.posts.push(post)
                        })
                });
        },
        sortPosts: function(method){
            if(!method || method == 'date'){
                if(this.sortOrder == 'desc'){
                    this.sortOrder = 'asc'
                    return this.posts.sort(function(a,b){
                        if(a.created < b.created) return -1;
                        if(a.created > b.created) return 1;
                        return 0;
                    })
                } else {
                    this.sortOrder = 'desc'
                    return this.posts.sort(function(a,b){
                        if(a.created > b.created) return -1;
                        if(a.created < b.created) return 1;
                        return 0;
                    })
                }
            }
            if(method == 'title'){
                if(this.sortOrder == 'desc'){
                    this.sortOrder = 'asc'
                    return this.posts.sort(function(a,b){
                        if(a.title < b.title) return -1;
                        if(a.title > b.title) return 1;
                        return 0;
                    })
                } else {
                    this.sortOrder = 'desc'
                    return this.posts.sort(function(a,b){
                        if(a.title > b.title) return -1;
                        if(a.title < b.title) return 1;
                        return 0;
                    })
                }
            }
            if(method == 'author'){
               if(this.sortOrder == 'desc'){
                    this.sortOrder = 'asc'
                    return this.posts.sort(function(a,b){
                        if(a.author < b.author) return -1;
                        if(a.author > b.author) return 1;
                        return 0;
                    })
                } else {
                    this.sortOrder = 'desc'
                    return this.posts.sort(function(a,b){
                        if(a.author > b.author) return -1;
                        if(a.author < b.author) return 1;
                        return 0;
                    })
                }
            }
        }
    }
}
</script>

<style>

#manage-posts-header{
    padding-top: 10px;
    font-size: 1.2em;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
}

#manage-posts-body{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

#edit-post{
    width: 48%;
    padding: 10px;
    min-height: 708px;
}

#markdown-container{
    width: 48%;
    padding: 10px;
    margin: 10px 0 0 0;
    background-color: #FAFAFA;
    overflow-y: auto;
    height: 650px;
    border: 1px solid #9E9E9E;
}

#draft-entry{
    display: flex;
    width: 100%;
    margin-top: 20px;
    justify-content: space-between;
    align-content: space-between;
    flex-flow: row wrap;
}
#posts, #drafts{
    height: 750px;
    overflow-y: auto;
    overflow-x: hidden;
}
#draft-list, #entry-list{
    width: 50%;

}

#draft-list>h1, #entry-list>h1{
    text-align: center;
}

#draft-list>h1{
    margin-bottom: 25px;
}

#entry-list>a{
    color: black;
}

.sort-link{
    cursor: pointer;
}
@media only screen 
  and (max-device-width: 1024px) {
    #edit-post, #manage-posts-header{
        font-size: 2em;
    }
    #edit-post, #markdown-container{
        width: 90%;
    }
    .input-label{
        font-size: 1.3em;
    }
    .post-footer{
        font-size: 2em;
    }

    #draft-list, #entry-list{
    width: 95%;
    }

}
</style>