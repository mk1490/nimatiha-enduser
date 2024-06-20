<template>
    <base-modal
            title="افزایش سرمایه"
            :visible="visible"
            @submit="sendToServer"
            @close="$emit('update:visible', false)">
        <div class="v-row">
            <div class="v-col-12">
                <base-text-field
                        label="میزان مبلغ واریزی"
                        v-model="model.amount"
                        @input="convertAmount($event, result=> model.amount = result)"
                />
            </div>
        </div>
    </base-modal>
</template>

<script>
import BaseModal from "@/view/widget/Base/BaseModal.vue";
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

export default {
    name: "DecreaseFundModal",
    emits: ['update:visible'],
    methods: {
        sendToServer() {
            this.httpPost(`/core/increase-fund`, {
                amount: this.convertAmountToPlainAmountValue(this.model.amount),
                projectId: this.data.projectId,
                depositId: this.data.depositId,
            }, result => {

            })
        }
    },
    components: {BaseTextField, BaseModal},
    data() {
        return {
            model: {
                amount: 0,
            }
        }
    },
    props: {
        visible: Boolean,
        data: Object,
    },
}
</script>

<style scoped>

</style>