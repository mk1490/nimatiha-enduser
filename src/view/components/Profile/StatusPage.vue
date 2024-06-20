<template>
    <v-container>
        <v-alert
                dir="rtl"
                style="direction: rtl"
                class="white--text"
                color="info">
            {{ statusText }}
        </v-alert>
    </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "StatusPage",
    computed: {
        ...mapGetters(['statusText'])
    }
}
</script>

<style scoped>
::v-deep .v-alert__content {
    text-align: center;
}
</style>