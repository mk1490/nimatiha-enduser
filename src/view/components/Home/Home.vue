<template>
  <v-container>
    <section class="mt-4">
      <div class="d-flex">
        <slider
            class="image-slider"
            :image-items="slider.images"
        />
      </div>
    </section>

    <section id="intro">
      <intro
          :title="introTitle"
          :description="introSummaryDescription"
      />
    </section>

    <section>
      <company-actions/>
    </section>

    <section
        v-if="someProjects.items.length > 0"
        class="features mt-3" id="some-projects">
      <projects
          :project-items="someProjects.items"
      />
    </section>


    <section
        v-if="notifications.contents.length > 0"
        class="mt-6"
        id="notifications">
      <div class="v-row text-center">
        <div class="col-md-8 mx-auto">
          <h2 class="section-heading">اطلاعیه‌های شرکت</h2>
        </div>
        <notifications
            class="mt-2"
            :items="notifications.contents"
        />
      </div>
    </section>


    <project-details-modal
        v-if="modal.visible"
        :visible="modal.visible"
        :data="modal.data"
        @click="clickForShowDetails"
    />

  </v-container>
</template>

<script>
import ProjectDetailsModal from "@/view/components/Home/Widgets/ProjectDetailsModal.vue";
import Slider from "@/view/components/Home/Widgets/Slider.vue";
import Projects from "@/view/components/Home/Widgets/Projects.vue";
import Intro from "@/view/components/Home/Widgets/Intro.vue";
import Notifications from "@/view/components/Home/Widgets/Notifications.vue";

export default {
  name: "Home",
  components: {
    Notifications,
    Intro,
    Projects,
    Slider,
    ProjectDetailsModal,
  },
  created() {
    this.httpGet(`/core/initialize`, (data) => {
      this.slider.images = data.images.map(f => {
        return this.serverAddress + f.fileUrl
      })


      this.someProjects.items = data.someProjects.map(f => {
        f.fileUrl = this.serverAddress + f.fileUrl;

        return f;
      });


      this.notifications.contents = data.notifications.map(f => {
        if (f.description == 'null') {
          f.description = '-'
        }
        if (f.attachmentFile) {
          f.attachmentFile = this.serverAddress + f.attachmentFile;
        } else {
          f.attachmentFile = null;
        }
        return f;
      });
      this.introTitle = data.title;
      this.introSummaryDescription = data.summary;


      let menuItems = [
        {text: 'معرفی شرکت', to: '#intro'}
      ]


      if (data.someProjects.length > 0) {
        menuItems.push({text: 'پروژه‌ها', to: '#some-projects'})
      }
      if (data.notifications.length > 0) {
        menuItems.push({text: 'اطلاعیه‌های شرکت', to: '#notifications'})
      }

      this.$store.commit('SET_MENU_ITEMS', menuItems)
    })
  },
  data() {
    return {

      modal: {
        visible: false,
        data: null,
      },
      slider: {
        images: [],
        options: {
          autoplay: true,
          delay: 5000,
          allowFullscreen: true,
        },
        transitions: ['fade']
      },
      someProjects: {
        items: [],
      },
      notifications: {
        contents: [],
      },
      introTitle: null,
      introSummaryDescription: null,
    }
  },
  methods: {
    clickForShowDetails(item) {
      this.modal.data = {
        title: item.title,
        description: item.summary
      }
      this.modal.visible = true;
    },
  }
}
</script>

<style scoped>
:deep (.flux-image) {
  border-radius: 2em !important;
}

:deep(.vue-flux) {
  height: 450px;
  width: 90%
}

:deep(.vue-flux .flux-pagination li) {
  display: block;
  margin: 0 10px 20px 20px;
  cursor: pointer;
  width: 15px;
  height: 15px;
  padding-bottom: 0;
  position: relative;
  box-sizing: border-box;
}

:deep(.v-container) {
  padding: 0 !important;
  @media (min-width: 1280px) {
    width: 100% !important;
  }
}

section {
  padding: 1em 0;
}


:deep(.section-heading) {
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
}

:deep(tr td) {
  color: #616161 !important;
  padding: 0.25rem 2rem !important;
  @media (min-width: 480px) {
    font-size: 1rem;
  }
}

.image-slider {
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 1rem;
}


h2 {
  font-size: x-large;
}

::v-deep table {


}

</style>