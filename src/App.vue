<template>
  <v-app>
    <v-app-bar app color="purple darken-3" dark elevation="4">
      <div class="d-flex align-center">
        <span>AKADEMIA IBPM 2022</span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <ClientData />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ClientData from "./components/ClientData";
export default {
  name: "App",
  components: {
    ClientData,
  },
  data: () => ({
    //
  }),
};
</script>
