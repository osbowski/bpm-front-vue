<template>
      <v-row class="mt-15 mb-10 px-7 d-flex justify-space-around" >
      <v-col>
        <v-card class="summaryCard" elevation="5">
          <v-card-title class="justify-center">
            {{leasData.finalLeasPrice}}
          </v-card-title>
          <v-card-text class="text-center">
            Całkowity koszt wynajmu
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="5" class="summaryCard">
          <v-card-title class="justify-center">
            {{leasData.finalDepositPrice}}
          </v-card-title>
          <v-card-text class="text-center">
            Całkowita Kaucja
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="5" class="summaryCard">
          <v-card-title class="justify-center">
            {{leasData.finalPrice}}
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
  mounted(){
    this.leasData = this.$store.getters.getLeasData
  },
  data:()=>({
    leasData:{}
  }),


}
</script>

<style>
.summaryCard{
    transition: 300ms;
}
.summaryCard:hover{
    transform: translateY(-20px);
}

</style>