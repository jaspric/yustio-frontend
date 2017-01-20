<template>
    <div v-html="compiledMarkdown" id="compiled-markdown">
    </div>

</template>

<script>
export default {
    props: ['compiledMarkdown']
}
</script>

<style>

#compiled-markdown{
    padding: 25px;
}

/* Tomorrow Comment */
.hljs-comment,
.hljs-quote {
  color: #999999;
}

/* Tomorrow Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #f2777a;
}

/* Tomorrow Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #f99157;
}

/* Tomorrow Yellow */
.hljs-attribute {
  color: #ffcc66;
}

/* Tomorrow Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #99cc99;
}

/* Tomorrow Blue */
.hljs-title,
.hljs-section {
  color: #6699cc;
}

/* Tomorrow Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #cc99cc;
}

.hljs {
  display: block;
  overflow-x: auto;
  background-color: #2d2d2d;
  color: #cccccc;
  padding: 9.5px;
  font-family: Consolas, "Courier new";
  width: 80%;
  border-radius: 4px;
  margin: 25px auto;
  max-height: 300px;
  line-height: 1.5;
  border: 1px solid #BDBDBD;
}

#markdown-container{
  line-height: 1.8em;
}
#markdown-container code {
    background-color: #2d2d2d;
    color: #cccccc;
    font-family: Consolas, "Courier new";
    padding: 2px 4px;
    border-radius: 4px;
}

#markdown-container blockquote {
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

#markdown-container blockquote::before{
  content: "\201C";
  font-family: Georgia, serif;
  font-size: 60px;
  font-weight: bold;
  color: #999;
  position: absolute;
  left: 10px;
  top: 0px;
  }

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

</style>