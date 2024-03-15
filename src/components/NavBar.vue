<template>
  <div class="NavBar">
    <v-navigation-drawer>
      <v-list class="mt-15" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashbord" value="Dashbord" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-post" title="Articles" value="Articles" router to="/articles"></v-list-item>
        <v-list-item prepend-icon="mdi-comment-multiple" title="Comments" value="Comments" to="/comments"></v-list-item>
        <v-list-item prepend-icon="mdi-cog" title="Settings" value="Settings" to="/settings"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar elevation="1">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  
}
</script>
