<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../api';

const router = useRouter();
const route = useRoute();
const posts = ref([]);

const fetchDataPosts = async () => {
    await api.get(`/api/surah/${route.params.id}`).then(response => {
        posts.value = response.data;
    });
};

const goToNextSurah = () => {
    if (posts.value.surat_selanjutnya) {
        router.push({ name: 'detail', params: { id: posts.value.surat_selanjutnya.nomor } });
    }
};

const goToPreviousSurah = () => {
    if (posts.value.surat_sebelumnya) {
        router.push({ name: 'detail', params: { id: posts.value.surat_sebelumnya.nomor } });
    }
};

onMounted(() => {
    fetchDataPosts();
});

watch(() => route.params.id, (newValue, oldValue) => {
    fetchDataPosts();
});
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-4 mb-3 col-12">
                <button class="btn btn-outline-primary fw-bold w-100" v-if="posts.surat_sebelumnya"
                    @click="goToPreviousSurah"><i class="fa fa-arrow-left"></i> Surah
                    Sebelumnya</button>
            </div>
            <div class="col-md-4 mb-3 col-12 d-flex justify-content-center">
                <router-link :to="{ name: 'home' }" class="btn btn-outline-primary fw-bold w-100"><i class="fa fa-list"></i>
                    List Surah</router-link>
            </div>
            <div class="col-md-4 mb-3 col-12 d-flex" v-if="posts.surat_selanjutnya">
                <button class="btn btn-outline-primary fw-bold w-100 ms-auto" @click="goToNextSurah">Surah
                    Berikutnya <i class="fa fa-arrow-right"></i></button>
            </div>

            <div class="col-md-12 mb-3 mt-3">
                <div class="card border-0 rounded-3 shadow mt-1">
                    <div class="card-body">
                        <div class="row justify-content-between">
                            <div class="col-md-6 col-12">
                                <h3><strong>{{ posts.nama_latin }} — {{ posts.nama }}</strong></h3> <small class="me-4"><i
                                        class="fa fa-list-ol"></i>
                                    Jumlah Ayat : <strong>{{ posts.jumlah_ayat }}</strong></small> <small><i
                                        class="fas fa-map-marker"></i> Tempat
                                    Diturunkan : <strong class="text-capitalize">{{ posts.tempat_turun }}</strong></small>
                            </div>
                            <div class="col-md-6 col-12 text-end">
                                <div class="d-grid gap-2"> <audio controls :src="posts.audio" class="ms-auto">
                                        Your browser does not support the audio element.
                                    </audio></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-3" v-for="(post, index) in posts.ayat" :key="index">
                <div class="card border-0 rounded-3 shadow mt-3">
                    <div class="card-body">
                        {{ post.surah }} : {{ post.nomor }}
                        <div class="row justify-content-between order-last order-md-first">
                            <div class="col-md-6 col-12">

                                <p class="mt-2"><i>{{ post.idn }}</i></p>
                            </div>
                            <div class="col-md-6 col-12 text-end align-self-center order-first order-md-last">
                                <h2>{{ post.ar }}</h2>
                                <!-- <small><span v-html="post.tr"></span></small> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

