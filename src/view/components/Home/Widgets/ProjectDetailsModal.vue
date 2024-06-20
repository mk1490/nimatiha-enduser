<template>
    <base-modal
            :title="data.title"
            hide-submit-button
            :visible="visible"
            @close="$emit('update:visible', false)">
        <p>{{ data.description }}</p>
    </base-modal>
</template>

<script>
import BaseModal from "@/view/widget/Base/BaseModal.vue";

export default {
    name: "ProjectDetailsModal",
    components: {BaseModal},
    props: {
        visible: Boolean,
        data: Object
    }
}
</script>

<style scoped>
p {
    font-family: IranVazirmatnUIFD !important;
}
</style>