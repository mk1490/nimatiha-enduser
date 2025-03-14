<template>
  <div>
    <v-data-table
      :dense="dense"
      :items="finalItems"
      :headers="finalHeaders"
      :hide-default-footer="hideDefaultFooter"
    >

      <template
        v-if="finalFilters && finalFilters.length > 0"
        v-slot:header="{props}">
        <tr>
          <th
            v-for="headerItem in props.headers">
            <div class="d-flex justify-center">
              <div
                v-if="finalFilters.find(x=> x.value == headerItem.value)"
                :style="{'width': (getHeaderFilterObject(headerItem).width ? getHeaderFilterObject(headerItem).width:  200) + 'px'}"
                class="mx-2 my-3">
                <base-text-field
                  v-if="getHeaderItemType(getHeaderFilterObject(headerItem)) === 'text'"
                  clearable
                  @keyup="filterData(headerItem.value, $event, 'text')"
                  @click:clear="clearFilter(getHeaderFilterObject(headerItem))"
                />
                <template v-if="getHeaderItemType(headerItem) === 'datetime'">
                  <v-menu
                    v-model="datePickerVisible"
                    ref="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="computedTime"
                        readonly
                        outlined
                        dense
                        hide-details
                        clearable
                        @keyup="filterData(headerItem.value, $event, 'datetime')"
                        @click:clear="clearFilter(getHeaderFilterObject(headerItem))"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="model.tempDate"
                      multiple
                      range
                      no-title
                      scrollable>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        @click="datePickerVisible = false"
                      >
                        لغو
                      </v-btn>
                      <v-btn
                        :disabled="model.tempDate.length < 2"
                        color="primary"
                        @click="applyDatePicker(model.tempDate, headerItem.value)"
                      >
                        تأیید
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                </template>

                <div v-if="getHeaderFilterObject(headerItem).type === 'select'">
                  <base-select
                    :items="getHeaderFilterSelectionItem(getHeaderFilterObject(headerItem))"
                    @input="filterData(headerItem.value, $event, 'select')"
                    @click:clear="clearFilter(getHeaderFilterObject(headerItem))"
                    clearable
                  />
                </div>
              </div>
            </div>
          </th>
        </tr>
      </template>


      <template v-slot:item.row="{ item , index}">
        <div> {{ finalItems.indexOf(item) + 1 }}</div>
      </template>
      <template v-slot:item.actions="{ item , index}">
        <div class="d-inline-flex">
          <template v-for="actionItem in finalActions">
            <base-square-button
              :text="actionItem.title"
              :icon="actionItem.icon"
              :color="actionItem.color"
              @click="actionItem.click(item)"
              class="mr-1"
            />
          </template>
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
import BaseIconButton from '@/components/Base/BaseIconButton.vue'
import BaseSquareButton from '@/components/Base/BaseSqaureButton.vue'

export default {
  name: 'BaseTable',
  components: {
    BaseSquareButton,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    BaseIconButton,
  },
  props: {
    headers: Array,
    items: Array,
    actions: Array,
    filters: Array,
    dense: {
      type: Boolean,
      default: false,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      datePickerVisible: false,
      finalItems: [],
      finalFilters: [],
      filteredKeys: [],
      model: {
        filteredDates: [],
        tempDate: [],
      },
    }
  },
  created() {
    // this.initializeHeaders();
    this.initializeContents()
    this.$nextTick(() => {
      this.initializeFilters()
    })

  },
  methods: {
    initializeContents() {
      this.finalItems = this.items
    },
    initializeFilters() {
      this.finalFilters = this.filters
    },
    getHeaderFilterObject(headerValue) {
      return this.finalFilters.find(x => x.value === headerValue.value)
    },
    getHeaderItemType(headerFilterObject) {
      return this.getHeaderFilterObject(headerFilterObject).type
    },
    filterData(key, filterValue, type) {
      if (!filterValue)
        this.clearFilter(this.getHeaderFilterObject(this.headers.find(x => x.value == key)))
      const keyHasOwnProperty = this.filteredKeys.find(x => x.key === key)
      const payload = {
        key,
        value: filterValue,
        type: type,
      }
      if (keyHasOwnProperty) {
        this.filteredKeys.splice(this.filteredKeys.findIndex(x => x.key === key), 1, payload)
      } else {
        if (!!filterValue) {
          this.filteredKeys.push(payload)
        }
      }
      this.applyFilter()
    },
    getHeaderFilterSelectionItem(headerObject) {
      const finalItems = []
      if (headerObject) {
        this.items.map(f => {
          if (!finalItems.includes(x => x[f.value])) {
            let title = f[headerObject.value]
            let key = f[headerObject.value]
            if (headerObject.selectionMapping) {
              const selectionMappingItem = headerObject.selectionMapping.find(x => x.value === f[headerObject.value])
              if (!!selectionMappingItem) {
                title = selectionMappingItem.text
                key = selectionMappingItem.value
              }
            }
            finalItems.push({
              text: title,
              value: key,
            })
          }
        })
      }
      return finalItems
    },
    clearFilter(headerFilterObject) {
      this.filteredKeys.splice(this.filteredKeys.findIndex(x => x.key === headerFilterObject.value), 1)
      this.applyFilter()
    },
    applyDatePicker(dateRange, headerItemValue) {
      this.model.filteredDates = dateRange
      this.datePickerVisible = false
      this.filterData(headerItemValue, this.model.filteredDates, 'datetime')
    },
    applyFilter() {
      let finalData = this.items
      for (let i = 0; i < this.filteredKeys.length; i++) {
        const filterKeyItem = this.filteredKeys[i]
        finalData = finalData.filter(x => {
          const tableItemValue = x[filterKeyItem['key']]
          switch (filterKeyItem.type) {
            case 'select':
              return tableItemValue === filterKeyItem.value
            case 'text':
              if (tableItemValue) {
                if (typeof tableItemValue == 'number') {

                  return (tableItemValue + '').includes(filterKeyItem.value)

                } else {
                  return tableItemValue.includes(filterKeyItem.value)
                }
              }
            case 'datetime': {
              const tableItemDate = new Date(x[filterKeyItem['key']]).getTime()
              const startDate = new Date(this.model.filteredDates[0]).getTime()
              const endDate = new Date(this.model.filteredDates[1]).getTime()
              return (tableItemDate >= startDate && tableItemDate <= endDate)
            }
          }
        })
      }
      this.finalItems = finalData
    },
  },
  watch: {
    'headers': {
      handler() {
        // this.initializeHeaders();
      },
    },
    'items': {
      handler() {
        this.initializeContents()
      },
    },
    'filters': {
      handler() {
        // this.initializeFilters()
      },
    },
    'model.filteredDates': {
      handler() {

      },
    },
  },
  computed: {
    computedTime: function() {
      const format = 'YYYY/MM/DD'
      if (this.model.filteredDates && this.model.filteredDates.length === 2) {
        return this.getPersianTime(this.model.filteredDates[0], format) + ' الی ' + this.getPersianTime(this.model.filteredDates[1], format)
      }
      return ''
    },
    finalHeaders() {
      const headers = []
      headers.push({
        title: '#',
        value: 'row',
        align: 'center',
        sortable: false,
      })
      this.headers.map(f => {
        headers.push({
          align: 'center',
          title: f.title,
          value: f.value,
        })
      })

      if (this.finalActions && this.finalActions.length > 0) {
        headers.push({
          title: 'عملیات',
          value: 'actions',
          align: 'center',
          sortable: false,
        })
      }

      return headers
    },
    finalActions() {
      const actions = []
      if (this.actions) {
        this.actions.map(f => {
          if (f.role) {
            if (this.checkPermission(f.role)) {
              actions.push(f)
            }
          } else {
            actions.push(f)
          }
        })
      }
      return actions
    },
  },
}
</script>

<style scoped>

</style>
