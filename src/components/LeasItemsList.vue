<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="leasItems"
      :hide-default-footer="true"
      class="headline itemsTable indigo lighten-5 mb-10"
    >
      <template v-slot:top>
        <v-toolbar flat class="indigo lighten-5">
          <v-toolbar-title>Prezdmioty do wynajęcia</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="indigo" dark class="mb-2" v-bind="attrs" v-on="on">
                Dodaj przedmiot
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Dodawanie przedmiotu</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-select
                        @change="getItemsByType"
                        :items="itemTypes"
                        label="Typ przedmiotu"
                        v-model="editedItem.type"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="itemsByType"
                        label="Przedmiot"
                        v-model="editedItem.name"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Anuluj
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Zapisz </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Usunąć przedmiot z listy?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Nie</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Tak</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="deleteItem(item)"> Usuń </v-btn>
      </template>
      <template slot="no-data">
        <p>Dodaj przedmioty do wynajęcia</p>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import DataService from "../DataService/DataService";
import { v4 as uuidv4 } from "uuid";
export default {
  components: {},
  mounted() {
    this.getAllItemsTypes();
    this.getAllItems();
    this.leasItems = this.$store.getters.getLeasItems;
  },
  data: () => ({
    allItems: [],
    leasItems: [],
    itemTypes: [],
    itemsByType: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Typ",
        align: "center",
        sortable: false,
        value: "type",
      },
      { text: "Przedmiot", value: "name", sortable: false, align: "center" },
      {
        text: "Cena wynajmu (1 dzień)",
        value: "leasPriceForDay",
        align: "end",
      },
      { text: "Całkowita cena wynajmu", value: "leasFullPrice", align: "end" },
      { text: "Kacuja", value: "depositPrice", align: "end" },
      { text: "Actions", value: "actions", sortable: false, align: "center" },
    ],
    editedIndex: -1,
    editedItem: {
      type: "",
      name: "",
      leasPriceForDay: 0,
      leasFullPrice: 0,
      depositPrice: 0,
    },
    defaultItem: {
      type: "",
      name: "",
      leasPriceForDay: 0,
      leasFullPrice: 0,
      depositPrice: 0,
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
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
      const filtredItems = this.allItems.filter((item) => item.type === type);
      filtredItems.map((item) => this.itemsByType.push(item.name));
    },

    deleteItem(item) {
      this.editedIndex = this.leasItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.commit("removeItem", this.editedIndex);
      this.$store.commit(
        "subtractFinalLeasPrice",
        this.editedItem.leasFullPrice
      );
      this.$store.commit(
        "subtractFinalDepositPrice",
        this.editedItem.depositPrice
      );
      const finalPrice =
        this.editedItem.leasFullPrice + this.editedItem.depositPrice;
      this.$store.commit("subtractFinalPrice", finalPrice);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.leasItems[this.editedIndex], this.editedItem);
      } else {
        const searchedItem = this.allItems.find(
          (item) => item.name === this.editedItem.name
        );
        searchedItem.leasFullPrice =
          searchedItem.leasPriceForDay *
          this.$store.getters.getLeasData.daysOfLeas;
        this.editedItem = searchedItem;
        this.$store.commit("sumFinalLeasPrice", this.editedItem.leasFullPrice);
        this.$store.commit(
          "sumFinalDepositPrice",
          this.editedItem.depositPrice
        );
        const finalPrice =
          this.editedItem.leasFullPrice + this.editedItem.depositPrice;
        this.$store.commit("sumFinalPrice", finalPrice);
        this.editedItem.id = uuidv4();
        this.$store.commit("addItem", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.itemsTable {
  width: 100%;
}

td {
  font-size: 1.2rem !important;
}
</style>
