<template>
  <v-container>
    <v-card elevation="8" class="roudned-lg indigo lighten-5 mt-5">
      <v-toolbar elevation="0" dark class="indigo">
        <span>Dane klienta</span>
      </v-toolbar>
      <v-container class="px-15">
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="client.name"
                  label="Imię"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="client.phone"
                  label="Numer telefonu"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="client.email"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col>
                <v-textarea
                  v-model="client.adress"
                  label="Adres do korespondencji"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  components: {},
  mounted() {
    this.client = this.$store.getters.getClientData;
    this.client.id = uuidv4();
  },
  data: () => ({
    client: {},
  }),
  methods: {},
};
</script>

<style></style>
