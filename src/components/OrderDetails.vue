<template>
  <v-card elevation="8" class="roudned-lg indigo lighten-5 mt-5">
    <v-toolbar elevation="0" class="indigo lighten-3">
      <span>Szczegóły zamówienia</span>
    </v-toolbar>
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
      <LeasItemsList />
    </v-row>
  </v-card>
</template>

<script>
// import AddItemToLeasForm from "./AddItemToLeasForm";
import LeasItemsList from "./LeasItemsList.vue";
export default {
  components: {
    // AddItemToLeasForm,
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
  },
};
</script>

<style></style>
