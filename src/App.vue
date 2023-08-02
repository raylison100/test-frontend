<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-btn
          v-for="link in links"
          :key="link.link"
          text
      >
        {{ link.name }}
      </v-btn>

      <v-spacer></v-spacer>

    </v-app-bar>
    <v-main>
      <home-view/>
    </v-main>
  </v-app>
</template>

<script>

import HomeView from "@/views/HomeView.vue";

export default {
  name: 'App',
  components: {HomeView},

  data: () => ({
    links: [
      {
        name: 'Eletrodomésticos',
        link: 'appliance'
      }
    ],
  }),
};
</script>
