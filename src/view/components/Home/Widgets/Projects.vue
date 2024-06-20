<template>
    <div>
        <div class="row text-center">
            <div class="col-md-8 mx-auto">
                <h2 class="section-heading mb-0">پروژه‌ها</h2>
                <v-divider></v-divider>
            </div>
        </div>
        <div class="row">
            <div class="col-12 p-5">
                <v-container grid-list-sm fluid>
                    <swiper
                            centered-slides-bounds
                            centered-slides
                            :slides-per-view="3">
                        <swiper-slide
                                :zoom="false"
                                v-for="(item, index) in projectItems"
                                :key="index">
                            <v-layout row wrap>
                                <v-sheet
                                        class="pa-4"
                                        style="background:transparent">
                                    <v-card
                                            elevation="5"
                                            height="500"
                                            width="350">
                                        <v-img
                                                :src="item.fileUrl"
                                                :lazy-src="item.fileUrl"
                                                height="200px"
                                                cover
                                                class="lighten-2">
                                            <template v-slot:placeholder>
                                                <v-row
                                                        class="fill-height ma-0"
                                                        align="center"
                                                        justify="center"
                                                >
                                                    <v-img
                                                            height="200px"
                                                            cover
                                                            src="../../../../../public/images/no-image.png"/>
                                                </v-row>
                                            </template>
                                        </v-img>
                                        <v-card-title>
                                            {{ item.title }}
                                        </v-card-title>

                                        <v-card-text style="height: 140px">
                                            {{ item.summary }}
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <template v-slot:actions>
                                            <v-spacer/>
                                            <v-btn
                                                    @click="$emit('click', item)"
                                                    variant="elevated"
                                                    color="primary">
                                                ادامه مطلب
                                            </v-btn>
                                        </template>
                                    </v-card>
                                </v-sheet>
                            </v-layout>
                        </swiper-slide>
                    </swiper>

                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
    name: "Projects",
    props: {
        projectItems: Array,
    },
    components: {SwiperSlide, Swiper},
}
</script>

<style scoped>
:deep(.swiper-slide) {
    width: fit-content !important;
}
h2 {
  font-size: x-large;
}
</style>