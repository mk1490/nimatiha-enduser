<template>
    <v-btn
            @click="onBackClick"
            icon>
        <v-icon>
            mdi-chevron-right
        </v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "AppBackButton",
    emits: ['onBackClick'],
    props: {
        backRoute: String
    },
    methods: {
        onBackClick() {
            if (this.$listeners.onBackClick) {
                this.$emit('onBackClick')
            } else {
                this.backRoute ? this.$router.push(this.backRoute) : this.$router.push('../')
            }


        }
    }
}
</script>

<style scoped>

</style>