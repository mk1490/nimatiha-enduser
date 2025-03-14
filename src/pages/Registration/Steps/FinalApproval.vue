<template>
  <v-container fluid>
    <v-table>
      <tr
          v-for="item in items">
        <th class="text-right">
          {{ item.text }}:
        </th>
        <td class="text-center">
          {{ item.value }}
        </td>
      </tr>
    </v-table>
  </v-container>
</template>

<script>
export default {
  name: "FinalApproval",
  created() {
    this.httpGet(`/member-request/initialize/final-approve`, result => {
      this.mappingItems.map((item) => {
        let value = result[item.key];

        switch (item.key) {
          case 'educationLevel': {
            value = this.$store.getters.educationLevels.find(x => x.value === value).title;
            break
          }
          case 'disabilityStatus': {
            value = this.$store.getters.disabilityStatus.find(x => x.value === value).title;
            break;
          }
          case 'maritalStatus': {
            value = this.$store.getters.maritalStatus.find(x => x.value === value).title;
            break;
          }
          case 'disabilityDescription':
            if (result['disabilityStatus'] !== 2)
              return;
            break;
        }

        this.items.push({
          text: item.title,
          value: value
        })
      })
    })


  },
  data() {
    return {
      items: [],
      mappingItems: [
        {title: 'شماره تلفن', key: 'mobileNumber'},
        {title: 'نام', key: 'name'},
        {title: 'نام خانوادگی', key: 'family'},
        {title: 'نام پدر', key: 'fatherName'},
        {title: 'کد ملّی', key: 'nationalCode'},
        {title: 'وضعیت ازدواج', key: 'maritalStatus'},
        {title: 'تعداد فرزندان', key: 'childrenCounts'},
        {title: 'میزان تحصیلات', key: 'educationLevel'},
        {title: 'وضعیت معلولیت', key: 'disabilityStatus'},
        {title: 'شرح معلولیت', key: 'disabilityDescription'},
        {title: 'نشانی محلّ سکونت', key: 'address'},
      ]
    }
  }
}
</script>
<style scoped>

</style>