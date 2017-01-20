<template>
    <ul class="paginator" v-if="postsLength>5">
        <a href="#" @click.prevent="changePage('prev5')" class="paginated-button">
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
                </svg>
            </li>
        </a>
        
        <a href="#" @click.prevent="changePage('previous')" class="paginated-button">
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                </svg>
            </li>
        </a>

        <a v-for="n in paginationRange" href="#" @click.prevent="pageChanged(n)">
            <li class="paginated-button" :class="activePage(n)">
                {{ n }}
            </li>
        </a>


        <li>
            <a href="#" @click.prevent="changePage('next')" class="paginated-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </a>
        </li>

        <li>
            <a href="#" @click.prevent="changePage('next5')" class="paginated-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
export default{
    props: {
        postsLength: Number,
        currentPage: Number
    },
    methods: {
        changePage(direction){
            if(direction == 'previous'){
                if(this.currentPage > 1){
                    this.pageChanged(this.currentPage - 1)
                }

            } else if (direction == 'next'){
                if (this.currentPage < Math.ceil(this.postsLength/5)){
                    this.pageChanged(this.currentPage + 1)
                }

            } else if (direction == 'next5'){
                if(this.currentPage + 5 < Math.ceil(this.postsLength/5)){
                    this.pageChanged(this.currentPage + 5)
                } else {
                    this.pageChanged(Math.ceil(this.postsLength/5))
                }

            } else if (direction == 'prev5'){
                if(this.currentPage - 5 > 0){
                    this.pageChanged(this.currentPage - 5)
                } else {
                    this.pageChanged(1)
                }
            }
        },
        pageChanged(n){
            this.$emit('page-change', n)
        },
        activePage(n){
            return this.currentPage === n ? 'active-page-button' : ''
        }
    },
    computed: {
        paginationRange(postsLength, currentPage){
            var postLengthArray = []

            for(var i=0; i<this.postsLength; i++){
                postLengthArray.push(i)
            }

            if(this.currentPage < 4){
                if(Math.ceil(this.postsLength/5) < 6){
                    return postLengthArray.slice(
                        1, Math.ceil(this.postsLength/5) + 1
                    )
                } else {
                    return postLengthArray.slice(
                        1, 6
                    )
                }
            } else if(this.currentPage > Math.ceil(this.postsLength/5) - 2){
                return postLengthArray.slice(
                    Math.ceil(this.postsLength/5) - 4, Math.ceil(this.postsLength/5) + 1
                ) 
            } else {
            return postLengthArray.slice(
                this.currentPage - 2, this.currentPage + 3
            )
            }
        }
    }
}
</script>

<style>
.paginator{
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
}
.paginator li{
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #FAFAFA;
    color: #f44336;
    font-family: "Roboto Slab", sans-serif;
    font-size: 1.2em;
    box-shadow: 0 4px 10px rgba(0,0,0,.1);
}

.paginator li a{
    color: red;
}

.active-page-button{
    border: 2px solid #f44336;
    box-shadow: 0 3px 10px rgba(0,0,0,.5) !important;
    width: 65px !important;
    height: 65px !important;
}
</style>