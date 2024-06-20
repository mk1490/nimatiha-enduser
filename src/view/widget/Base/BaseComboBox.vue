<template>
    <v-combobox
            :value="value"
            @input="$emit('input', $event)"
            :label="label"
            :items="items"
            :chips="chips"
            :multiple="multiple"
            :deletable-chips="deletableChips"
            hide-details
            outlined
            :small-chips="smallChips"
            dense>
    </v-combobox>
</template>

<script>
export default {
    name: "BaseComboBox",
    props: {
        value: String,
        label: String,
        items: Array,
        chips: Boolean,
        multiple: Boolean,
        smallChips: Boolean,
        deletableChips: Boolean,
    },
    data() {
        return {
            model: null,
        }
    }
}
</script>

<style scoped>

</style>