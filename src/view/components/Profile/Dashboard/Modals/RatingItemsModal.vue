<template>
    <v-dialog
            :model-value="visible"
            @update:modelValue="$emit('update:visible', false)"
            transition="dialog-bottom-transition"
            fullscreen>
        <v-card
                height="100%"
                width="100%">
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
                    مشاهده کل رتبه‌ها در پروژه
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-data-table
                        items-per-page="-1"
                        :headers="headers"
                        :items="rankingItems">
                    <template v-slot:[`item.row`]="{ item}">
                        <div> {{ rankingItems.indexOf(item) + 1 }}</div>
                    </template>
                    <template v-slot:item.rate="{ item , index}">
                        <div> {{ addCommas(item.rate) }}</div>
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
    name: "RatingItemsModal",
    computed: {
        ...mapGetters(['rankingItems'])
    },
    props: {
        visible: Boolean
    },
    methods: {addCommas},
    data() {
        return {
            headers: [
                {title: '#', value: 'row', align: 'center', sortable: false},
                {title: 'رتبه', value: 'rate', align: 'center'},
                {title: 'کد سهام', value: 'stockCode', align: 'center'},
            ],
            contents: [],
        }
    },
    watch: {
        'rankingItems': {
            handler() {
                this.contents = this.rankingItems;
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