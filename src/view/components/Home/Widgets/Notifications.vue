<template>
  <div class="container">
    <div class="col-md-12">
      <v-data-table
          :headers="headers"
          :items="items"
          hide-no-data
          hide-default-footer
          no-results-text="false">
        <template v-slot:item.row="{ item , index}">
          <div> {{ items.indexOf(item) + 1 }}</div>
        </template>
        <template v-slot:item.attachmentFile="{item}">

          <template v-if="item.attachmentFile">
            <a :href="item.attachmentFile">
              <v-icon>
                mdi-download
              </v-icon>
            </a>
          </template>
          <template v-else>
            <div>-</div>
          </template>
        </template>

      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        {title: '#', value: 'row', align: 'center'},
        {title: 'عنوان', value: 'title', align: 'center'},
        {title: 'شرح', value: 'description', align: 'center'},
        {title: 'پیوست', value: 'attachmentFile', align: 'center'},
      ],
    }
  }
}
</script>

<style scoped>
:deep(.v-data-table-footer) {
  display: none !important;
}

:deep(.v-data-table-header__content) {
  justify-content: center !important;
}

:deep(thead) {
  background-color: #1F2DA7 !important;
  color: white !important;
}

:deep(.v-data-table) {
  border-radius: 0.5rem !important;
  border-width: .125rem;
  border-style: solid;
  border-color: #E0E0E0;
}

</style>