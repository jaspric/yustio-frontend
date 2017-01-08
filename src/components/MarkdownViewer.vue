<template>
    <div v-html="compiledMarkdown" id="compiled-markdown">
        <div>Title</div>
        <div>asdasd</div>
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
  width: 100%;
  border-radius: 4px;
  margin: 25px auto;
  max-height: 300px;
  line-height: 1.5;
  border: 1px solid #BDBDBD;
}

code {
    background-color: #2d2d2d;
    color: #cccccc;
    font-family: Consolas, "Courier new";
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 90%;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

</style>