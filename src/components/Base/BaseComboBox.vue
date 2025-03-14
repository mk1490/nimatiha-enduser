<template>
    <v-combobox
            :value="value"
            @input="$emit('input', $event)"
            :label="label"
            :items="items"
            :chips="chips"
            :rules="rules"
            :multiple="multiple"
            :deletable-chips="deletableChips"
            :hide-details="hideDetails"
            :item-text="itemText"
            :item-value="itemValue"
            :search-input.sync="searchInputModel"
            :clearable="clearable"
            outlined
            :no-filter="noFilter"
            :small-chips="smallChips"
            dense>
        <template v-slot:label>
            <div class="required--symbol">
                {{ label }}
                <small v-if="requiredSymbol">*</small>
            </div>
        </template>
    </v-combobox>
</template>

<script>
export default {
    name: "BaseComboBox",
    props: {
        value: String,
        label: String,
        items: Array,
        rules: Array,
        searchInput: String,
        itemText: String,
        itemValue: String,
        hideDetails: {
            type: undefined,
            default: true
        },
        noFilter: {
            type: Boolean,
            default: false,
        },
        chips: Boolean,
        clearable: Boolean,
        multiple: Boolean,
        smallChips: Boolean,
        deletableChips: Boolean,
        requiredSymbol: Boolean,
    },
    data() {
        return {
            model: null,
            searchInputModel: null,
        }
    },
    watch: {
        'searchInputModel': {
            handler() {
                this.$emit('update:searchInput', this.searchInputModel)
            }
        }

    }
}
</script>

<style scoped>

</style>