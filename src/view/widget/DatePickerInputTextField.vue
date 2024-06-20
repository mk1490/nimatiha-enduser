<template>
    <div class="row">
        <div class="col">
            <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                            class="start-input"
                            :value="formattedDate(startDate)"
                            v-on="on"
                            v-bind="attrs"
                            clearable
                            :label="$t('timeRangeItems.startTime')"
                            readonly
                            outlined
                            hide-details
                            dense
                            @click:clear="startDate = null"
                    ></v-text-field>
                </template>


            </v-menu>
        </div>
        <div class="col">
            <v-menu
                    v-model="endMenu"
                    :close-on-content-click="false"
                    max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                            class="end-input"
                            :value="formattedDate(endDate)"
                            v-on="on"
                            v-bind="attrs"
                            clearable
                            :label="$t('timeRangeItems.endTime')"
                            readonly
                            outlined
                            hide-details
                            dense
                            @click:clear="date = null"
                    ></v-text-field>
                </template>


            </v-menu>
        </div>

        <date-picker
                v-model="startDate"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                custom-input=".start-input"
        />

        <date-picker
                v-model="endDate"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                custom-input=".end-input"
        />
    </div>

</template>

<script>
import * as moment from "moment-jalali";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
    name: "DatePickerInputTextField",
    components: {
        DatePicker: VuePersianDatetimePicker
    },
    props: {
        value: undefined,
    },
    created() {
        this.startDate = new Date(parseInt(this.value.start)).toISOString();
        this.endDate = new Date(parseInt(this.value.end)).toISOString();
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            datePicker: false,
            menu: false,
            endMenu: false,
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('jYYYY/jM/jD HH:mm');
        },
        formattedDate(date) {
            return date ? this.formatDate(date) : ''
        },
        updateModel() {
            this.$emit('input', {
                start: this.startDate,
                end: this.endDate,
            });
        }
    },
    watch: {
        'startDate': {
            handler() {
                this.updateModel();
            }
        },
        'endDate': {
            handler() {
                this.updateModel();
            }
        }
    }

}
</script>

<style scoped>

</style>