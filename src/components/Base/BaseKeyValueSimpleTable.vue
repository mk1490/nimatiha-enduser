<template>
    <v-simple-table>
        <template v-slot:default>
            <tbody>
            <tr v-for="item in items">
                <th class="text-right">
                    {{ item.title }}
                </th>
                <td class="text-center">{{ item.value }}</td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    name: "BaseKeyValueSimpleTable",
    props: {
        items: Array,
    }
}
</script>

<style scoped>

</style>