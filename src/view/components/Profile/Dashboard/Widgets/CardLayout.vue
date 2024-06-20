<template>
    <v-card
            v-if="profileLoading"
            class="card-bordered"
            flat>
        <v-skeleton-loader
                v-model="profileLoading"
                type="list-item-two-line"
        />
    </v-card>
    <v-card
            v-if="!profileLoading && !$slots.default"
            class="card-bordered"
            flat
            :min-height="minHeight"
            :height="height">
        <div class="card-container">
            <v-layout
                    full-height
                    style="place-content: center;align-items: center">
                <div class="d-inline-block">
                    <strong :style="{color: titleColor}">
                        {{ title }}
                    </strong>
                    <h5>
                        {{ value }}
                    </h5>
                    <small class="sub-text">
                        {{ subtext }}
                    </small>
                    <div
                            v-if="slots['subtext-area']"
                            class="mt-3 d-block">
                        <slot
                                name="subtext-area"></slot>
                    </div>
                </div>
            </v-layout>

        </div>
    </v-card>
    <v-card
            v-if="$slots.default"
            flat
            :height="height"
            class="card-bordered">
        <slot></slot>
    </v-card>
</template>

<script>
import {mapGetters} from "vuex";
import {useSlots} from 'vue'

export default {
    name: "CardLayout",
    props: {
        title: String,
        titleColor: String,
        value: undefined,
        subtext: String,
        height: Number,
        minHeight: Number,
        loading: Boolean,
    },
    computed: {
        ...mapGetters(['profileLoading'])
    },
    data() {
        return {
            slots: useSlots()
        }
    }
}
</script>

<style scoped>
strong {
    font-family: VazirmatnUIFD, serif;
    color: #4a4a53;
    font-weight: 800 !important;
    font-size: 0.95rem !important;
}

h5 {
    font-family: VazirmatnUIFD, serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: black;
}

.sub-text {
    font-family: VazirmatnUIFD, serif;
    font-size: 1rem;
}

.card-container {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>