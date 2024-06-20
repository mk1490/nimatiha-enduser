<template>
    <base-modal
            title="محاسبۀ رتبه در 6 ماه آینده"
            @close="$emit('update:visible' , false)"
            @submit="calculateRate()"
            submit-button-text="محاسبه"
            :visible="visible">
        <div class="row">
            <div class="col-12">
                <base-text-field
                        label="مبلغ واریزی"
                        v-model="model.amount"
                        @input="convertAmount($event, result=> model.amount = result)"
                />
            </div>
            <template v-if="result.visible">
                <div class="col-12 mt-5">
                    <div class="d-flex justify-center align-center">
                        <strong class="me-2">
                            رتبۀ فعلی شما:
                        </strong>
                        <span>
                        {{ result.currentRate }}
                    </span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-center align-center">
                        <strong class="me-2">
                            کل مبالغ واریزی:
                        </strong>
                        <span>
                        {{ addCommas(result.totalDeposit) }}
                    </span>
                        <strong class="ms-2">ریال</strong>
                    </div>
                </div>
                <div class="col-12 mt-2">
                    <div class="d-block d-flex justify-center">
                        <strong>
                            رتبۀ شما در صورت واریز مبلغ {{ result.amount }} ریال:
                        </strong>
                    </div>
                    <div class="d-block d-flex justify-center">
                        <span>
                        {{ result.nextRate }}
                    </span>
                    </div>
                    -
                </div>
            </template>
        </div>
    </base-modal>
</template>

<script>
import BaseModal from "@/view/widget/Base/BaseModal.vue";
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import {addCommas} from "@persian-tools/persian-tools";

export default {
    name: "RateCalculateModal",
    components: {BaseTextField, BaseModal},
    emits: ['update:visible'],
    props: {
        visible: Boolean,
        data: Object
    },
    data() {
        return {
            model: {
                amount: 0
            },
            result: {
                visible: false,
                currentRate: 0,
                nextRate: 0,
                amount: 0,
                totalDeposit: 0,
            }
        }
    },
    methods: {
        addCommas,

    },
}
</script>

<style scoped>
strong {
    font-family: VazirmatnUIFD;
    color: red;
}

span {
    font-family: VazirmatnUIFD;
    color: red;
    font-size: 1.6rem !important;
}
</style>