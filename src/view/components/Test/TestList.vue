<script>
export default {
    name: "TestList",
    data() {
        return {
            items: [],
        }
    },
    created() {
        this.httpGet(`/test/list`, result => {
            if (result.isAuth == false) {
                this.$router.push({
                    // name: 'complete-profile',
                    // query: {
                    //     redirectTo: '/profile/test'
                    // }
                })
            } else {
                this.items = result;
            }

        }, error => {

        })
    },
    methods: {
        examTake(item) {
            if (item.status === 1)
                return;


            this.httpGet(`/test/status/${item.id}`, result => {
                this.$swal.fire({
                    title: 'شرکت در آزمون',
                    text: `پس از تأیید این پیعام و ورود به صفحه جدید، آزمون شما شروع شده و به مدّت 16 دقیقه زمان خواهید داشت و پس از گذشت زمان فوق امکان شرکت مجدد در این آزمون برای شما وجود نخواهد داشت.`,
                    icon: 'warning',
                    showConfirmButton: true,
                    showCloseButton: true,
                    showDenyButton: true,
                    denyButtonText: 'لغو',
                    confirmButtonText: "بزن بریم!"
                }).then(confirm => {
                    if (confirm.isConfirmed) {
                        this.$router.push({
                            name: 'test-details',
                            params: {
                                id: item.id
                            }
                        })
                    }

                })
            }, error => {

            })


        }
    }
}
</script>

<template>
    <v-container>
        <div class="d-inline-flex flex-wrap justify-center">
            <v-card
                    class="ma-5"
                    v-for="item in items"
                    width="300"
            >
                <v-card-title class="text-center">
                    {{ item.title }}
                </v-card-title>

                <v-card-text style="height: 20px">
                    {{ item.description }}
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            @click="examTake(item)"
                            block
                            color="primary"
                            flat variant="flat">
                        {{ item.status === 1 ? 'قبلا در این آزمون شرکت کرده‌اید' : 'شرکت در آزمون' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<style scoped>

</style>
