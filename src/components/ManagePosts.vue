<template>
    <div id="manage-posts">
        <div id="manage-posts-header">
            <h1>Manage Posts</h1>
        </div>
        <div id="manage-posts-body">
            <div id="edit-post">
                <add-post :post="postInForm" @submit="onFormSubmit" @input="compileMarkdown" @cancel="resetPostInForm" @save="saveDraft" @remove="removePost"></add-post>
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

var hljs = require('highlight.js');
var axios = require('axios')
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
            isActive: false
        },
        posts: [
                {
                    title: "Reasons why my girlfriend is the best",
                    summary: 'A few reasons why she is amazing.',
                    body: '## Reasons why my girlfriend is the best\n* Makes me smile and laugh every day\n* Is gorgeous\n* Is my best friend\n* Loves Dogs\n* Loves Tacos\n* Is passionate and driven\n* Laughs at my dumb jokes',
                    author: 'Jason',
                    date: '2015-06-03 6:32 PM',
                    id: 1,
                    isActive: false
                },
                {
                    title: 'How to make a blog with Vue 2',
                    summary: 'An in-depth, well thought out guide designed to help you create better a better blog.',
                    body: '# Refer to tutorials\n---',
                    author: 'Blog Person',
                    date: '2012-06-21 4:17 AM',
                    id: 2,
                    isActive: false
                },
                {
                    title: 'Peanut Butter OR Jelly - How to Make Better Decisions',
                    summary: 'In this article, Line explains creative ways to make swift, concise decisions.',
                    body: '# Its Peanut Butter Jelly Time',
                    author: 'Border H. Line',
                    date: '2013-10-03 5:34 PM',
                    id: 3,
                    isActive: false
                },
                {
                    title: 'New Frameworks',
                    summary: "It may take a little bit of persistence to learn a new framework, and it doesn't always seem like it will pay off in the end, but once you get a flow going, it's totally worth it.",
                    body: '# test',
                    author: 'Jason',
                    date: '2017-01-05 5:23 PM',
                    id: 4,
                    isActive: false
                } 
        ],
        drafts: [],
        compiledMarkdown: ''
    }
}

export default {
    components: {
        PostList,
        AddPost,
        MarkdownViewer,
        DraftList
    },
    mounted(){
        axios.get('http://192.168.1.107:5000/api/blog/posts')
            .then(response => 
                    for(var i=0; i < response.data.length; i++){
                        reponse.data[i].isActive = false;
                    };
                    console.log(response.data)
                );
            
    },
    data: initialData,
    methods: {

        onFormSubmit(post) {
            const index = this.posts.findIndex((p) => p.id === post.id);
            console.log(this.posts)
            if (index !== -1){
                this.posts.splice(index, 1, post)
                this.resetPostInForm();
            } else {
                if(post.title != '' && post.summary != '' && post.body != ''){
                    this.posts.push(post);
                    this.resetPostInForm();
                }
                else{
                    console.log('title is null')
                    console.log(JSON.stringify(post))
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
        },
        saveDraft(draft){
            const index = this.drafts.findIndex((p) => p.title === draft.title);

            console.log(index)

            if (index !== -1){
                this.drafts.splice(index, 1, draft)
                this.resetPostInForm();
            } else {
                this.drafts.push(draft);
                this.resetPostInForm();
            }
        },
        removePost(post){
            const pindex = this.posts.findIndex((p) => p.id === post.id);
            const dindex = this.drafts.findIndex((p) => p.title === post.title);

            if(post.id){
                if (pindex !== -1){
                    this.posts.splice(pindex, 1)
                }
            } else {
                if (dindex !== -1){
                    this.drafts.splice(dindex, 1)
                }
            }
            this.resetPostInForm();
        },
        getData: function(){
            
        },
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
    justify-content: center;
    align-content: space-between;
    flex-flow: row wrap;
}

#draft-list, #entry-list{
    margin: 20px;
    width: 45%;
}

#draft-list>h1, #entry-list>h1{
    text-align: center;
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