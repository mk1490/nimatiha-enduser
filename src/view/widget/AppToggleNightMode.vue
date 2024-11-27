<template>
    <v-btn
            icon
            @click="toggleThemeDark"
    >
        <v-icon>{{ toggleThemeDarkIcon }}</v-icon>
    </v-btn>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'AppToggleNightMode',
    computed: {
        ...mapGetters([
            'themeDark',
        ]),
        toggleThemeDarkIcon() {
            return this.themeDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night';
        },
    },
    methods: {
        toggleThemeDark() {
            this.$store.dispatch('ThemeDarkToggle');
        },
    },
};
</script>
