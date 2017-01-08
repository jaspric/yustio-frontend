<template>
    <header>
        <div id="nav-container">
            <div id="nav">
                <div></div>
                <a href="#"><h2 id="brand">yust.io</h2></a>
                <ul id="nav-items">
                    <router-link to="home" exact><li class="nav-item">Home</li></router-link>
                    <router-link to="about" exact><li class="nav-item">About</li></router-link>
                    <router-link to="post-archive" exact><li class="nav-item">Archive</li></router-link>
                    <router-link to="manage-posts" exact><li class="nav-item">Manage Posts</li></router-link>
                </ul>
                <div id="login">
                    <span v-if="loggedIn">Jason | <span><a href="#">Logout</a></span></span>
                    <span v-else><a href="#">Login</a></span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default{

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

a, a:visited{
    color: #FAFAFA;
    text-decoration: none;
}

a:hover{
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

@media only screen 
  and (max-device-width: 1024px) {
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