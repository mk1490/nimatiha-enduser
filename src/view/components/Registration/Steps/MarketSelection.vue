<template>
  <v-container>
    <div class="v-row">
      <div class="v-col-12">
        <base-select
            label="بازارچه"
            :items="items.market"
            v-model="model.market"
            return-object
        />
      </div>
      <div
          v-if="!!model.market && items.desks.length > 0"
          class="v-col-12">
        <base-select
            label="میز"
            :items="items.desks"
            v-model="model.desks"
            :multiple="true"
            chips
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import BaseCardLayout from "../../../widget/Base/BaseCardLayout.vue";
import BaseTable from "../../../widget/Base/BaseTable.vue";
import BaseSelect from "../../../widget/Base/BaseSelect.vue";

export default {
  name: "MarketSelection",
  components: {BaseSelect, BaseTable, BaseCardLayout},
  created() {
    this.httpGet(`/member-request/initialize/market`, result => {
      this.items.market = result.items;
      this.model.market = {
        id: result.selectedMarketId,
        value: result.selectedMarketId,
        title: result.selectedMarketTitle,
      };
      this.model.desks = result.selectedDeskIds.map(f => {
        return f.deskId
      });
    })
  },
  data() {
    return {
      items: {
        market: [],
        desks: [],
      },
      model: {
        market: null,
        desks: [],
      },
    }
  },
  watch: {
    'model.market': {
      handler() {
        console.log(this.model.market)
        this.httpGet(`/member-request/market-desks/${this.model.market.value || this.model.market}`, result => {
          this.items.desks = result
        })
        this.$emit('update:modelValue', this.model)
      }
    },
    'model.desks': {
      handler() {
        this.$emit('update:modelValue', this.model)
      }
    }
  },
  methods: {
    validate() {
      if (this.model.desks.length < 1) {
        this.$swal.fire({
          icon: 'error',
          text: 'انتخاب حدأقل یک میز ضروری است.'
        })
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>