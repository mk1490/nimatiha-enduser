<template>
    <v-autocomplete
            outlined
            hide-details
            dense
            label="ارجاع به"
            chips
            deletable-chips
            :items="items">
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</template>

<script>
export default {
    name: "ReferToAutoComplete",
    props: {
        referObject: Object,
    },
    async mounted() {
        this.initialize();
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        initialize() {
            this.items = [];
            if (this.referObject) {
                this.items.push({header: 'افراد'})
                if (this.referObject.peopels) {
                    this.referObject.peopels.map(f => {
                        this.items.push({
                            name: f.key,
                            group: 'افراد'
                        });
                    })
                }


                this.items.push({header: 'گروه‌ها'})
                if (this.referObject.groups) {
                    this.referObject.groups.map(f => {
                        this.items.push({
                            name: f.key,
                            group: 'گروه‌ها'
                        });
                    })
                }


            }

        }
    },
    watch: {
        'referObject': {
            handler(val) {
                this.initialize()
            }
        }
    }
}
</script>

<style scoped>

</style>