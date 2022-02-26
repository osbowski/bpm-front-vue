<template>
      <v-row class="mt-15 mb-10 px-7 d-flex justify-space-around" >
      <v-col>
        <v-card elevation="5">
          <v-card-title class="justify-center">
            2500
          </v-card-title>
          <v-card-text class="text-center">
            Całkowity koszt wynajmu
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="5">
          <v-card-title class="justify-center">
            4000
          </v-card-title>
          <v-card-text class="text-center">
            Całkowita Kaucja
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="5">
          <v-card-title class="justify-center">
            6500
          </v-card-title>
          <v-card-text class="text-center">
            Pełny koszt zamówienia
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
export default {

}
</script>

<style>
.v-card{
    transition: 300ms;
}
.v-card:hover{
    transform: translateY(-20px);
}

</style>