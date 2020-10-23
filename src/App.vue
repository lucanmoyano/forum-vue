<template>
  <div id="app">
    <div id="nav">
      <header class="_minavbar"> 
        <router-link to="/hilos"><sui-icon size="large" name="home"  /> Home </router-link>
      </header>
      <!--<router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  //background-color: #F4F4F4;
  color: #575757;
  h1, h2, h3, h4{
    color: #333333;
  }

  .ck-focused{
    border: 1px solid #7957D5 !important;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white !important;;

    &.router-link-exact-active {
      color: white !important;;
    }
  }
}

._minavbar{
    padding: .7rem 1.5rem;
    line-height: 2.2rem;
    z-index: 1;
    right: 0;
    height: 3.6rem;
    background-color: #714DD2;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
    position: fixed;
    top: 0;
    left: 0;
    .router-link-active{
      color: white !important;
    }
}

  .ProseMirror{
      padding: 4px 0px 4px 20px !important;
      min-height: 90px;
      //max-height: 126px;
      font-size: 14px;
      color: black;
      img{
        max-width: 340px !important;
      }
  }

  .text{
    img{
      max-width: 300px;
      height:auto;
      }
  }

    .editor p.is-editor-empty:first-child::before {
      content: attr(data-empty-text);
      float: left;
      color: #aaa;
      pointer-events: none;
      height: 0;
      font-style: italic;
  }
  .tags:not(:last-child) {
    margin-bottom: 0rem !important;
  }
  .tags:last-child{
    margin-bottom: 0rem !important;
  }
  .tags .tag{
      margin-bottom:0px !important;
  }

  blockquote{
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem !important;
    font-style: italic;
  }


</style>
