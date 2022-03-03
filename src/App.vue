<template>
  <v-app>
    <v-app-bar app color="indigo" dark class="px-16">
      <v-toolbar-title>AKADEMIA IBPM 2022</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>Proces wynajmu</span>
    </v-app-bar>

    <v-main>
      <v-container>
        <ClientData />
        <OrderDetails />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ClientData from "./components/ClientData";
import OrderDetails from "./components/OrderDetails";
export default {
  name: "App",
  components: {
    ClientData,
    OrderDetails,
  },
  beforeMount() {
    this.context = window.coachViewContext;
    this.initData();
  },
  data: () => ({
    context: null,
  }),
  methods: {
    initData() {
      const leasData = this.context.binding.get("value");
      leasData.leasItems = leasData.leasItems.items;
      this.$store.commit("setLeasData", leasData);
    },
  },
};
</script>
