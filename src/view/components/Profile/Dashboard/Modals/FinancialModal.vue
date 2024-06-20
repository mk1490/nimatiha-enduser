<template>
    <v-dialog
            :model-value="visible"
            @update:modelValue="$emit('update:visible', false)"
            transition="dialog-bottom-transition"
            fullscreen>
        <v-card>
            <v-toolbar>
                <v-toolbar-items>
                    <v-btn
                            @click="$emit('update:visible', false)">
                        <v-icon>
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-title>
                    مشاهده سوابق واریزی
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-data-table
                        :items-per-page="-1"
                        :headers="headers"
                        :items="contents">
                    <template v-slot:item.row="{ item , index}">
                        <div> {{ depositItems.indexOf(item) + 1 }}</div>
                    </template>
                    <template v-slot:item.value="{ item , index}">
                        <div> {{ addCommas(item.value) }}</div>
                    </template>
                    <template v-slot:item.time="{ item , index}">
                        <div> {{ getPersianTime(item.time) }}</div>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";
import {addCommas} from "@persian-tools/persian-tools";

export default {
    name: "FinancialModal",
    computed: {
        ...mapGetters(['depositItems'])
    },
    props: {
        visible: Boolean
    },
    methods: {addCommas},
    created() {
        this.contents = this.depositItems;
    },
    data() {
        return {
            headers: [
                {title: '#', value: 'row', align: 'center', sortable: false},
                {title: 'مبلغ واریزی (ریال)', value: 'value', align: 'center'},
                {title: 'زمان', value: 'time', align: 'center'},
            ],
            contents: [],
        }
    },
    watch: {
        'depositItems': {
            handler(value) {
                this.contents = this.depositItems;
            }
        }
    }
}
</script>

<style scoped>

::v-deep .v-data-table-header-mobile {
    visibility: collapse !important;
}


:deep(.v-data-table-footer) {
    display: none !important;
}
</style>