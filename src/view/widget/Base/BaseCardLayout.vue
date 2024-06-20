<template>
    <v-container fluid>
        <v-card>
            <v-card-title>

                <div class="col">
                    <div class="d-inline-flex">
                        <app-back-button
                            v-if="backRoute"
                            :back-route="backRoute"/>
                        {{ title }}
                    </div>
                </div>
                <div
                        v-if="!!buttonTitle"
                        class="col-auto">
                    <v-btn
                            @click="submit"
                            color="primary">
                        {{ buttonTitle }}
                    </v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <slot></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>


        <slot name="outsideCard">

        </slot>

    </v-container>
</template>

<script>
import AppBackButton from "@/view/widget/AppBackButton.vue";

export default {
    name: "BaseCardLayout",
    components: {AppBackButton},
    emits: ['buttonClick'],
    props: {
        title: String,
        buttonTitle: String,
        backRoute: String,
    },
    methods: {
        submit() {
            this.$emit('buttonClick')
        }
    }
}
</script>

<style scoped>

</style>