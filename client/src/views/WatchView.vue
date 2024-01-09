<template>
  <div class="flex">
    <div class="flex-auto flex flex-col align-middle gap-2 justify-center">
      <fwb-heading v-if="video" tag="h2" :color="'text-gray-400'" class="text-center">{{ video.replace(".mp4", "") }}</fwb-heading>
      <video v-if="video" id="videoPlayer" controls autoplay :key="url" ref="videoRef">
        <source :src="url" type="video/mp4" />
      </video>
      <div v-else class="text-center">
        <fwb-heading tag="h2" :color="'text-gray-400'">No video selected</fwb-heading>
      </div>
    </div>
    <div class="p-2 max-h-svh">
      <Suspense>
        <VideoSelector :selected="video" ref="selectorRef" />
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbHeading } from 'flowbite-vue'
import { computed, ref, watch } from 'vue'
import VideoSelector from '@/components/VideoSelector.vue'
import { useRoute } from 'vue-router';
import { CONSTANTS } from '@/constants';

const parseUrlParam = (param: any) => {
  if (param) {
    return decodeURIComponent(String(param))
  }
  return ""
}

const videoRef = ref<HTMLVideoElement | null>(null)
const selectorRef = ref<InstanceType<typeof VideoSelector> | null>(null)
const video = ref(parseUrlParam(useRoute().params.video))
const route = useRoute()

const setTitle = () => {
  if (video.value) {
    document.title = video.value.replace(".mp4", "")
  }
}

setTitle()

watch(videoRef, (v) => {
  if (v) {
    v.focus()
    v.addEventListener("ended", () => {
      selectorRef.value?.nextVideo()
    })
  }

})

watch(route, (v) => {
  video.value = parseUrlParam(v.params.video)
  setTitle()
})

const url = computed(() => {
  if (!video.value) {
    return ""
  }
  return CONSTANTS.API_URL + "/videos/" + encodeURIComponent(video.value)
})

</script>