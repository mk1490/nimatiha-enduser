<template>
  <v-container fluid>
    <div class="v-row mb-12">
      <div
          class="v-col-12">
        <card-layout
            height="50">
          <div class="project--title-container">
            <div class="d-inline-flex">
              <strong>پروژه:</strong>
              <span>{{ initProjectTitle || '-' }}</span>
            </div>
          </div>

        </card-layout>
      </div>
      <div class="v-col-12">
        <div class="v-row"
             style="align-content: space-between">
          <div class="v-col-md-5 v-col-sm-12 block-item d-flex align-items-stretch">
            <div class="v-row">
              <div
                  class="v-col-12">
                <card-layout
                    :height="cardHeight">
                  <div style="position: relative;top: 25%; z-index: 999">
                    <div class="d-block">
                      <div class="d-flex justify-center">
                        <strong>
                          سهم انتخاب شده:
                        </strong>
                        <span class="mx-2">{{ selectedStockTitle }}</span>
                      </div>
                    </div>
                    <div class="d-flex justify-center">
                      <div class="v-col-md-5 v-col-sm-12">
                        <base-select
                            color="transparent"
                            item-text="title"
                            item-value="id"
                            variant="outlined"
                            density="compact"
                            hide-no-data
                            hide-details
                            :eager="true"
                            :readonly="stockItems.length === 1"
                            :disabled="stockItems.length === 1"
                            :items="stockItems"
                            v-model="selectedStock"
                            full-width
                            flat
                            @update:modelValue="stockSelection"
                            label="انتخاب سهمیه"
                            style="z-index: 91"
                        />
                      </div>
                    </div>
                  </div>
                </card-layout>
              </div>
              <div class="v-col-12">
                <card-layout
                    title="رتبۀ فعلی شما در پروژه"
                    :titleColor="`#66BB6A`"
                    :height="cardHeight"
                    :value="rank || 0"/>
              </div>

              <div class="v-col-12">
                <card-layout
                    title="کل مبالغ واریزی"
                    :value="`${this.getComma(totalDeposits)} ریال`"
                    :height="cardHeight">
                  <template v-slot:subtext-area>
                    <v-btn
                        variant="flat"
                        color="red"
                        @click="decreaseFund">
                      افزایش سرمایه
                    </v-btn>
                  </template>
                </card-layout>
              </div>
            </div>
          </div>

          <div
              class="v-col-md-7 v-col-sm-12 pa-2">
            <v-card
                ref="rankingTableLayout"
                id="rankingTableLayout"
                class="card-bordered"
                flat>
              <v-card-title>
                <div class="v-row">
                  <div class="v-col v-col-md-6">
                    <div class="d-flex justify-sm-start">
                      رتبه بندی
                    </div>
                  </div>
                  <div class="v-col-auto v-col-md-6">
                    <div class="justify-md-end d-flex">
                      <v-btn
                          @click="modal.rating.visible = true"
                          flat
                          small>
                        <v-icon>
                          mdi-list-box-outline
                        </v-icon>
                        <div class="hidden-sm-and-down">
                          مشاهده تمامی رتبه‌ها
                        </div>
                      </v-btn>
                    </div>

                  </div>
                </div>
              </v-card-title>
              <v-card-text>
                <v-skeleton-loader
                    v-if="profileLoading"
                    type="table"
                />
                <v-data-table
                    v-if="!profileLoading"
                    hide-no-data
                    style="max-height: 427px"
                    fixed-footer
                    :headers="table.ranking.headers"
                    :items="rankingItems">
                  <template v-slot:[`item.row`]="{ item}">
                    <div> {{ rankingItems.indexOf(item) + 1 }}</div>
                  </template>
                  <template v-slot:item.rate="{ item}">
                    <div> {{ addCommas(item.rate) }}</div>
                  </template>

                </v-data-table>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>

      <div class="v-col-12 pa-2">
        <card-layout>
          <template v-slot:default>
            <div class="mx-5 my-3">
              <div class="v-row align-center">
                <div class="v-col">
                  <div style="max-width: 700px">
                    <h3>
                      تخمین رتبه
                    </h3>
                    <h4 class="mt-5">
                      مجموع مبلغ واریزی: {{ addCommas(nextRate.totalDeposit) }} ریال
                    </h4>
                    <!--                                            <div class="d-inline-block">-->
                    <div class="d-block mt-5 mb-1">
                      <h5>
                        مبلغ سرمایه‌گذاری:
                      </h5>
                    </div>
                    <div class="v-row">
                      <div class="v-col">
                        <base-text-field
                            variant="outlined"
                            v-model="model.amountForCalculatingRank"
                            @input="convertAmount($event, result=> model.amountForCalculatingRank = result)"
                        />
                      </div>
                      <div class="v-col-auto">
                        <div class="d-block">
                          <v-btn
                              variant="flat"
                              :loading="nextRate.loading"
                              @click="calculateRate"
                              color="#aff4c7">
                            محاسبه
                          </v-btn>
                        </div>
                      </div>

                    </div>
                    <div class="d-block">
                      <small>
                        محاسبه رتبه شما در شش ماه آینده بر اساس مبلغ سرمایه‌گذاری
                      </small>
                    </div>
                  </div>
                </div>
                <div class="v-col-auto">
                  <div class="v-row" style="height: 150px">
                    <div class="v-col d-flex justify-end">
                      <v-card
                          width="150"
                          max-height="150"
                          height="150"
                          color="#aff4c7"
                          class="card-bordered fill-height d-flex align-center justify-center">
                        <div class="calc-rate-card-rate-number">
                          <strong>{{ rank }}</strong>
                          <div class="d-block">
                            <span>رتبۀ فعلی</span>
                          </div>
                        </div>
                      </v-card>
                    </div>
                    <div class="v-col d-flex justify-end">
                      <v-card
                          width="150"
                          max-height="150"
                          color="#ffe8a4"
                          class="card-bordered fill-height d-flex align-center justify-center">
                        <div class="calc-rate-card-rate-number">
                          <strong>{{ nextRate.value }}</strong>
                          <div class="d-block">
                            <span>رتبۀ 6 ماه آینده</span>
                          </div>
                        </div>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </card-layout>
      </div>


      <div class="v-col-12">
        <Slider :image-items="slider.images"/>
      </div>

      <div class="v-col-12">
        <notifications :items="projectNotifications"/>
      </div>
    </div>

    <rating-items-modal
        :visible="modal.rating.visible"
        @update:visible="modal.rating.visible = $event"
    />

    <financial-modal
        @update:visible="modal.financial.visible= $event"
        :visible="modal.financial.visible"/>
    <rate-calculate-modal
        v-if="modal.calculateRate.visible"
        :visible="modal.calculateRate.visible"
        @update:visible="modal.calculateRate.visible = false"
        :data="modal.calculateRate.data"
    />

    <decrease-fund-modal
        v-if="modal.decreaseFund.visible"
        :visible="modal.decreaseFund.visible"
        :data="modal.decreaseFund.data"
        @update:visible="modal.decreaseFund.visible = false"
    />

  </v-container>
</template>

<script>
import CardLayout from "@/view/components/Profile/Dashboard/Widgets/CardLayout.vue";
import {mapGetters} from "vuex";
import {
  VueFlux,
  FluxControls,
} from 'vue-flux';
import {addCommas} from "@persian-tools/persian-tools";
import RateCalculateModal from "@/view/components/Profile/Dashboard/Widgets/RateCalculateModal.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import FinancialModal from "@/view/components/Profile/Dashboard/Modals/FinancialModal.vue";
import RatingItemsModal from "@/view/components/Profile/Dashboard/Modals/RatingItemsModal.vue";
import DecreaseFundModal from "@/view/components/Profile/Dashboard/Modals/DecreaseFundModal.vue";
import Notifications from "@/view/components/Home/Widgets/Notifications.vue";
import Slider from "@/view/components/Home/Widgets/Slider.vue";

export default {
  name: "Dashboard",
  components: {
    Slider,
    Notifications,
    DecreaseFundModal,
    BaseTextField,
    BaseSelect,
    RateCalculateModal,
    FinancialModal,
    RatingItemsModal,
    CardLayout,
    VueFlux,
    FluxControls
  },
  computed: {
    ...mapGetters([
      'profileLoading',
      'initProjectTitle',
      'selectedProjectId',
      'totalDeposits',
      'rank',
      'rankingItems',
      'profileSliders',
      'stockItems',
      'selectedStockId',
      'selectedStockTitle',
      'projectNotifications',
    ]),
  },
  mounted() {
    this.calculateHeight();
    this.selectedStock = this.selectedStockId
  },
  created() {
    this.handleImages();
    this.emitter.on('onBottomMenuClick', (callback) => {
      if (callback == 'deposit') {
        this.modal.financial.visible = true;
      }
    })

    window.onresize = () => {
      this.calculateHeight();
    }
  },
  data() {
    return {
      cardHeight: '150',
      modal: {
        rating: {
          visible: false
        },
        financial: {
          visible: false
        },
        calculateRate: {
          visible: false,
          data: null,
        },
        decreaseFund: {
          visible: false,
          data: null,
        }
      },
      slider: {
        images: [],
        options: [],
      },
      table: {
        ranking: {
          headers: [
            {title: '#', value: 'row', align: 'center', sortable: false},
            {title: 'امتیاز', value: 'rate', align: 'center'},
            {title: 'کد سهام', value: 'stockCode', align: 'center'},
          ],
          contents: [],
        },
        notifications: [],
      },
      selectedStock: null,
      model: {
        amountForCalculatingRank: 0
      },
      nextRate: {
        value: '-',
        loading: false,
        totalDeposit: 0,
      }
    }
  },
  watch: {
    'profileSliders': {
      handler() {
        console.log("CHANGE PROFILE")
        this.handleImages()
      }
    },
    'selectedStockId': {
      handler(value) {
        this.selectedStock = value;

      }
    },
    '$vuetify.breakpoint.width': {
      handler(value) {
        this.calculateHeight()
      }
    },
    'stockItems': {
      handler() {
        this.calculateHeight();
      }
    },
    'totalDeposits': {
      handler(value) {
        this.nextRate.totalDeposit = value;
      }
    }
  },
  methods: {
    addCommas,
    handleImages() {
      this.slider.images = [];
      this.profileSliders.map(f => {
        this.slider.images.push(this.serverAddress + f)
      })
    },
    stockSelection() {
      if (!this.selectedStock)
        return;
      this.nextRate.value = '-';
      this.emitter.emit('onStockSelection', this.selectedStock);
    },
    calculateHeight() {
      // if (this.$refs.rankingTableLayout.$el) {
      //     const rankingTableLayoutHeight = this.$refs.rankingTableLayout.$el.clientHeight;
      //     if (this.stockItems.length > 1) {
      //         this.cardHeight = (rankingTableLayoutHeight / 3) - 10;
      //     } else {
      //         this.cardHeight = (rankingTableLayoutHeight / 3);
      //     }
      // }
    },
    showRatingCalculateModal() {
      this.modal.calculateRate.data = {
        projectId: this.selectedProjectId,
        customerId: this.selectedStockId,
      }
      this.modal.calculateRate.visible = true;
    },
    calculateRate() {
      this.nextRate.loading = true;
      this.httpPost(`/core/calculateRatingNextSixMonth`,
          {
            projectId: this.selectedProjectId,
            customerId: this.selectedStockId,
            amountValue: this.convertAmountToPlainAmountValue(this.model.amountForCalculatingRank)
          }, (result) => {
            this.nextRate.loading = false;
            this.nextRate.value = result.nextRate;
            this.nextRate.totalDeposit = result.totalDeposit;
          }, error => {
            this.nextRate.loading = false;
          })
    },
    decreaseFund() {
      this.modal.decreaseFund.data = {
        projectId: this.selectedProjectId,
        depositId: this.selectedStockId
      }
      this.modal.decreaseFund.visible = true;
    }
  },

}
</script>

<style scoped>
::v-deep .flux-image {
  border-radius: 30px !important;
}

::v-deep .v-data-table__wrapper {
  overflow-x: hidden !important;
}

::v-deep .v-text-field.v-text-field--enclosed {
  border-radius: 1rem !important;
}

::v-deep .v-data-table-header-mobile {
  visibility: collapse !important;
}

.project--title-container {
  position: relative;
  top: 25%;
  margin-inline: .5em;
  font-family: VazirmatnUIFD;
}

.project--title-container span {
  margin-right: 0.3em;
}

:deep(.v-data-table-footer) {
  display: none !important;
}


.calc-rate-card-rate-number {
  display: inline-block;
  text-align: center;
  font-family: VazirmatnUIFD;

  strong {
    font-size: 2rem;
  }

  span {
    font-size: .8rem;
  }
}

</style>