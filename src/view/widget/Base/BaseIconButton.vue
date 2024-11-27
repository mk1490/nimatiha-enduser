<template>
    <v-tooltip
            :color="color"
            bottom>
        <template v-slot:activator="{on, attrs}">
            <v-btn
                    @click="$emit('click')"
                    :color="color"
                    v-bind="attrs"
                    :on="on"
                    icon>
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
        </template>
        <slot>
        </slot>
    </v-tooltip>
</template>

<script>
export default {
    name: "BaseIconButton",
    emits: ['click'],
    props: {
        icon: String,
        text: String,
        color: {
            type: String,
            default: 'blue'
        },
    }
}
</script>

<style scoped>

</style>