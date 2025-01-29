<template>
    <div
            id="progress-container"
            class="d-flex justify-content-center">
        <v-overlay
                :close-on-content-click="false"
                :model-value="realVisibility"
                opacity="0.8"
                light
                class="align-center text-center justify-center white--text"
                style="color: white"
                :z-index="999999">
            <v-progress-circular
                    indeterminate
                    size="70"
                    color="white">
            </v-progress-circular>
            <div
                    class="progress-text green--text">
                <span>درحال دریافت اطلاعات...</span>
            </div>
        </v-overlay>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "ProgressDialog",
    computed: {
        ...mapGetters(['loading'])
    },
    data() {
        return {
            progressContainer: null,
            realVisibility: false,
        }
    },
    mounted() {
        this.realVisibility = true;
        this.progressContainer = document.getElementById('progress-container');
    },
    created() {
        this.progressContainer = document.getElementById('progress-container');
    },
    watch: {
        loading: {
            handler(isVisible) {
                if (isVisible) {
                    this.realVisibility = true;
                    this.progressContainer.classList.remove('hide');
                } else {
                    this.progressContainer.classList.add('hide');
                    this.realVisibility = false;
                }
            }
        }
    }
}
</script>

<style scoped>
.progress-text {
    display: flex;
    justify-content: center;
    font-family: VazirmatnUIFD !important;
    font-size: 2rem !important;
}

.progress-text span {
    margin-top: 20px;
}


#progress-container {
    opacity: 1;
    transition: opacity 0.5s;
}

#progress-container.hide {
    opacity: 0;
}
</style>