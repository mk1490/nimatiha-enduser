<template>
    <div>
        <base-card-layout
                @buttonClick="openModal(null)"
                :title="title"
                :button-title="!buttonTitle? modalTitle : buttonTitle">
            <base-table :items="_items"></base-table>
        </base-card-layout>
        <base-modal
                :visible.sync="modal.visible"
                :title="modalTitle">
            <slot name="modalContent">

            </slot>
        </base-modal>
    </div>
</template>

<script>
export default {
    name: "BaseFullLayout",
    props: {
        title: String,
        modalTitle: String,
        buttonTitle: String,
        headers: Array,
        items: Array,
        getUrlAddress: String,
    },
    data() {
        return {
            _items: [],
            modal: {
                data: null,
                visible: false,
            }
        }
    },
    methods: {
        openModal(data) {
            this.modal.data = data;
            this.modal.visible = true;
        },
        async fetchData(url) {
            let requestAddress = !url ? this.getUrlAddress : url;
            const [err, data] = await this.to(this.http.get(requestAddress));
            if (!err) {
                this._items = data;
            }
        }
    }
}
</script>

<style scoped>

</style>