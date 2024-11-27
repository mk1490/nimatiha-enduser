<template>
    <div>
        <template v-if="text">
            <v-tooltip
                    v-if="text"
                    :color="color"
                    bottom>
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                            class="sqaure-btn"
                            @click="$emit('click')"
                            :color="color"
                            :disabled="disabled"
                            v-bind="attrs"
                            v-on="on">
                        <v-icon
                                color="white">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </template>
                <span v-if="!!$slots.default">{{ text }}</span>
                <slot>
                    {{ text }}
                </slot>
            </v-tooltip>

        </template>
        <template v-else>
            <v-btn
                    class="sqaure-btn"
                    @click="$emit('click')"
                    :color="color"
                    :disabled="disabled">
                <v-icon
                        color="white">
                    {{ icon }}
                </v-icon>
            </v-btn>
        </template>
    </div>
</template>

<script>
export default {
    name: "BaseSqaureButton",
    emits: ['click'],
    props: {
        icon: String,
        text: String,
        disabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'blue'
        },
    }
}
</script>

<style scoped>

</style>