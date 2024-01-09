<template>
    <div class="max-h-svh">
        <fwb-input v-model="search" placeholder="Search" @focus="$event.target.select()" />
        <div class="overflow-y-auto max-h-svh mt-3">
            <div>
                <fwb-list-group class="w-96">
                    <fwb-list-group-item hover v-for="video in filtered" v-bind:key="video"
                        :class="(video == props.selected) ? 'bg-green-700' : ''">
                        <div v-if="video == props.selected" class="hidden" ref="scrollAnchor"></div>
                        <router-link :to="'/watch/' + encodeURIComponent(video)">
                            <button class="w-full hover:underline">{{ video.replace(".mp4",
                                "") }}</button>
                        </router-link>
                    </fwb-list-group-item>
                </fwb-list-group>
            </div>
            <div class="my-20"></div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import { computed, ref, onMounted, watch } from 'vue'
import { FwbInput } from 'flowbite-vue'
import { CONSTANTS } from '@/constants';
import { useRoute, useRouter } from 'vue-router';

const nextVideo = () => {
    const index = videos.indexOf(props.selected)
    if (index == -1) {
        return
    }
    if (index + 1 >= videos.length) {
        return
    }
    videoSelected(videos[index + 1])
}

defineExpose({
    nextVideo,
})

const props = defineProps<{
    selected: string
}>()

const emit = defineEmits<{
    select: [string]
}>()

const search = ref('')
const scrollAnchor = ref<HTMLDivElement[] | null>(null)
const router = useRouter()

const scrollToSelected = () => {
    scrollAnchor.value?.[0]?.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })

}

onMounted(() => {
    setTimeout(() => {
        scrollToSelected()
    }, 500)
})

const { videos } = await fetch(CONSTANTS.API_URL + '/videos').then((r) => r.json());

const videoSelected = (video: string) => {
    emit('select', video)
    router.push('/watch/' + encodeURIComponent(video))
    scrollToSelected()
}

const filtered = computed(() => {
    return videos.filter((video: string) => {
        return video.toLowerCase().includes(search.value.toLowerCase())
    })
})

</script>