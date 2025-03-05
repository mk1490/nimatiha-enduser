<template>
  <div>
    <v-data-table
        :dense="dense"
        :items="items"
        :headers="finalHeaders">

      <template v-slot:item.row="{ item , index}">
        <div> {{ items.indexOf(item) + 1 }}</div>
      </template>

      <template v-slot:item.actions="{ item , index}">
        <div class="d-inline-flex">
          <base-square-button
              v-for="actionItem in actions"
              :text="actionItem.title"
              :icon="actionItem.icon"
              :color="actionItem.color"
              @click="actionItem.click(item)"
              class="mr-1"
          />
        </div>
      </template>
      <template
          v-slot:[slotKey]="{item, index}"
          v-for="(slotItem, slotKey) in $slots">
        <slot :name="slotKey" :item="(item)" :index="index"></slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import BaseIconButton from "@/view/widget/Base/BaseIconButton.vue";

export default {
  name: "BaseTable",
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    BaseIconButton
  },
  props: {
    headers: Array,
    items: Array,
    actions: Array,
    dense: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      finalHeaders: [],
    }
  },
  created() {
    this.finalHeaders.push({
      text: '#',
      value: 'row',
      align: 'center',
      sortable: false,
    });
    this.headers.map(f => {
      this.finalHeaders.push({
        align: 'center',
        ...f,
      });
    })
    if (this.actions.length > 0) {
      this.finalHeaders.push({
        text: this.$i18n.t('ui.actions'),
        value: 'actions',
        align: 'center',
        sortable: false,
      });
    }
  },
  methods: {}
}
</script>

<style scoped>


</style>