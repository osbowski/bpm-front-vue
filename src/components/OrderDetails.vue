<template>
  <v-card elevation="8" class="roudned-lg indigo lighten-5 mt-5">
    <v-toolbar elevation="0" class="indigo" dark>
      <span>Szczegóły zamówienia</span>
    </v-toolbar>
    <v-container class="px-15">
    <v-row class="my-8 mx-4">
      <v-col>
        <v-text-field
          label="Czas wypożyczenia (w dniach)"
          v-model="daysOfLeas"
          required
        ></v-text-field>
      </v-col>

      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="leasStartDate"
              label="Wybierz datę rozpoczęcia wynajmu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="leasStartDate" no-title scrollable>
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="my-0 mx-4">
      <LeasItemsList :daysOfLeas="daysOfLeas" />
      <OrderSummary />
    </v-row>
    <v-container class="d-flex justify-end px-11">
      <v-btn color="indigo" dark class="mb-10" @click='sendData'>
        Wyślij zamówienie
      </v-btn>
    </v-container>
    </v-container>
  </v-card>
</template>

<script>
// import AddItemToLeasForm from "./AddItemToLeasForm";
import LeasItemsList from "./LeasItemsList.vue";
import OrderSummary from "./OrderSummary.vue";
export default {
  components: {
    OrderSummary,
    LeasItemsList,
  },
  mounted() {
    this.context = window.coachViewContext;
    this.initData();
  },
  data: () => ({
    daysOfLeas: 0,
    leasStartDate: new Date().toISOString().substr(0, 7),
    menu: false,
    dateOfLeas: null,
    leasItems: null,
    context: null,
  }),
  methods: {
    initData() {
      const contextBinding = this.context.binding.get("value");
      this.daysOfLeas = contextBinding.daysOfLeas;
      this.leasStartDate = contextBinding.leasStartDate;
    },
    sendData(){
      console.log(this.$store.getters.getClientData)
    }
  },
};
</script>

<style></style>
