<template>
    <v-tooltip
            color="primary"
            bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="white--text sqaure-btn"
                    @click="$emit('onClick')"
                    :loading="loading"
                    color="primary">
                <v-icon>mdi-reload</v-icon>
            </v-btn>
        </template>
        بارگیری مجدد
    </v-tooltip>
</template>

<script>
export default {
    name: "AppReloadButton",
    emits: ['onClick'],
    props: {
        loading: {
            type: Boolean,

        }
    }
}
</script>

<style scoped>

</style>
<script setup>
</script>