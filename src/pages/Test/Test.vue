<script>

import BaseTextArea from "@/views/Base/BaseTextArea.vue";
import ProfileCompleteForm from "@/pages/Shared/ProfileCompleteForm.vue";

export default {
    name: "Test",
    components: {ProfileCompleteForm, BaseTextArea},
    computed: {
        isProfileCompleteLevel() {
            return this.view == 'profile-complete';
        }
    },
    data() {
        return {
            result: [],
            model: {},
            profileModel: null,
            initialize: {},
            view: null,
        }
    },
    created() {
        const params = this.$route.params
        this.httpPost(`/test/initialize/${params.slug || params.id}`, {}, result => {
            this.initialize = result['initialize']
            this.result = result;


            if (result['authenticationRequired']) {

            } else {
                if (!result.memberId) {
                    this.view = 'profile-complete';
                }
            }

            result.questions.map(f => {
                this.model[f.id] = null;
            })
        }, error => {
            this.$router.push({
                name: 'test'
            })
        })
    },
    methods: {
        send() {
            this.httpPost(`/test/`, {
                testId: this.$route.params.id,
                items: this.model,
            }, result => {
                this.$swal.fire({
                    icon: 'success',
                    text: this.result.endDescription,
                })
                this.$router.push({
                    name: 'profile-test'
                })
            })
        },
        profileCompleteSuccess(data) {
            localStorage.setItem('accessToken', data['access_token']);
            location.reload();
        }
    }
}
</script>

<template>
    <v-container class="d-flex justify-center align-items-center align-center">

        <profile-complete-form
                v-if="isProfileCompleteLevel"
                v-model="profileModel"
                :initialize="initialize"
                mobile-number-visible
                @update="profileCompleteSuccess"
        />

        <v-card
                v-if="!isProfileCompleteLevel"
                width="600">
            <v-card-text>


                <v-card
                        class="mb-4"
                        v-for="(item, index) in result.questions">
                    <v-card-text>
                        <div class="block">
                            <p>
                                {{ (index + 1) + '. ' + item.title }}
                            </p>
                        </div>

                        <div class="d-block">

                            <v-radio-group
                                    v-if="item.type === 1"
                                    class="align-self-right full-width"
                                    v-model="model[item.id]">
                                <div class="row">
                                    <div
                                            v-for="(childItem, childIndex) in item.items"
                                            class="col-6">
                                        <v-radio
                                                :value="childItem.value"
                                                :label="childItem.label">
                                        </v-radio>
                                    </div>
                                </div>
                            </v-radio-group>
                            <div v-if="item.type ===2 ">
                                <base-text-area
                                        v-model="model[item.id]"
                                        placeholder="محل نوشتن پاسخ..."
                                />
                            </div>

                        </div>
                    </v-card-text>

                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                        @click="send"
                        flat
                        size="large"
                        variant="flat"
                        block
                        color="green-darken-1">
                    {{ isProfileCompleteLevel ? 'ذخیره' : 'ارسال' }}
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-container>
</template>

<style scoped>
::v-deep .v-selection-control-group {
    align-self: center !important;
    width: 100%;
}

</style>
