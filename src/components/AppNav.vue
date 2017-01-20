<template>
    <header>
        <div id="nav-container">
            <div id="nav">
                <a href="#"><h2 id="brand">yust.io</h2></a>
                <ul id="nav-items">
                    <router-link to="/" tag="li" class="nav-item" exact><a>Home</a></router-link>
                    <router-link to="/about" tag="li" class="nav-item" exact><a>About</a></router-link>
                    <router-link v-if="user.isAdmin" to="/manage-posts" tag="li" class="nav-item" exact><a>Manage Posts</a></router-link>
                    <router-link v-if="user.isAuthenticated" to="/logout" tag="li" class="nav-item" exact><span v-if="user.isAuthenticated"><a>Logout</a></span></router-link>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default{
    props: ['user']
}
</script>

<style>
#nav-container{
    width: 100%;
    font-family: 'Roboto Slab', Serif;
}

#nav{
    width: 100%;
    display: block;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 75px;
    background-color: #263238;
    color: #F5F5F5;
    box-shadow: 0 -2px 0 0 #1A8DFF inset;
}

#nav-items{
    padding: 0;
    margin: 0;
}

#brand{
    margin: 5px 20px;
    font-size: 2em;
}

#login{
    margin: 15px 20px;
}

#nav a, #nav a:visited{
    color: #FAFAFA;
    text-decoration: none;
}

#nav a:hover{
    color: #E3F2FD;
}

.nav-item{
    padding: 24px;
    display: inline-block;
    box-shadow: 0 -1px 0 0 #1A8DFF inset;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    font-size: 1.2em;
    text-decoration: none;
}

#login{
    font-size: 1.2em;
}

.nav-item:hover, .nav-item:active{
    box-shadow: 0 -4px 0 0 #1A8DFF inset;
}

#nav-items>.router-link-active{
     box-shadow: 0 -4px 0 0 #1A8DFF inset;
}

@media screen only and (max-width: 1024px) {
    #nav-items{
        
    }
    .nav-item, #login{
        font-size: 1.5em;
    }
    #brand{
        font-size: 2.1em;
    }

}

</style>