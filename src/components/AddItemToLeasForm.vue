<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          @change="getItemsByType"
          :items="itemTypes"
          label="Typ przedmiotu"
          outlined
        ></v-select>
      </v-col>

      <v-col>
        <v-select :items="itemsByType" label="Przedmiot" outlined></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn elevation="5" rounded x-large class="mb-8">
          Dodaj do listy
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../DataService/DataService";
export default {
  data: () => ({
    allItems: [],
    itemTypes: [],
    itemsByType: [],
    selectedItem: null,
  }),
  mounted() {
    this.context = window.coachViewContext;
    this.initData();
    this.getAllItemsTypes();
    this.getAllItems();
  },
  methods: {
    initData() {
      const contextBinding = this.context.binding.get("value");
      this.leasItems = contextBinding.leasItems;
    },
    async getAllItems() {
      const items = await DataService.getAllItems();
      items.map((item) => this.allItems.push(item));
    },
    async getAllItemsTypes() {
      const types = await DataService.getItemsTypes();
      types.map((type) => this.itemTypes.push(type));
    },
    getItemsByType(type) {
      this.itemsByType = [];
      console.log('TYP PRZEDMIOTU:',type)
      const filtredItems = this.allItems.filter((item) => item.type == type);
      filtredItems.map((item) => this.itemsByType.push(item.name));
    },
  },
};
</script>

<style></style>
