<template>
    <div class="text-center">
        <v-overlay
                opacity="0.2"
                light
                :z-index="999"
                style="align-items: center;place-content: center"
                :model-value="showing">
            <div class="d-flex justify-center">
                <v-progress-circular
                        indeterminate
                        size="40"
                        color="primary">
                </v-progress-circular>
            </div>
        </v-overlay>
    </div>
</template>

<script>
export default {
    name: "ProgressDialog",
    props: {
        showing: Boolean
    },
}
</script>

<style scoped>

</style>