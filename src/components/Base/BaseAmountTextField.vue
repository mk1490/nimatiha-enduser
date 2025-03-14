<template>
    <v-text-field
            :value="_value"
            outlined
            hide-details
            length="8"
            @keypress="setMaxLength($event)"
            @input="convertToAmount"
            :suffix="$t('IRR')"
            dense
            clearable
            :label="label">
    </v-text-field>
</template>

<script>
export default {
    name: "BaseAmountTextField",
    data() {
        return {
            model: {
                _value: 0,
            },
            vm: this,
        }
    },
    created() {
        this._value = this.value;
    },
    props: {
        value: undefined,
        label: String,
    },
    methods: {
        convertToAmount(event) {
            this.convertAmount(event, this, '_value');
            this.$emit('input', this.model._value);
        }

    }
}
</script>

<style scoped>

</style>