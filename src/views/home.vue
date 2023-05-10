<script setup>

//import ref and onMounted
import { ref, onMounted } from 'vue';

//import api
import api from '../api';

//define state
const posts = ref([]);
const searchQuery = ref('');

//method fetchDataPosts
const fetchDataPosts = async () => {

    //fetch data 
    await api.get('/api/surah')

        .then(response => {

            //set response data to state "posts"
            posts.value = response.data

        });
}

const filterPosts = () => {
    const query = searchQuery.value.toLowerCase();
    return posts.value.filter(post => {
        return (
            post.nama.toLowerCase().includes(query) ||
            post.nama_latin.toLowerCase().includes(query) ||
            post.arti.toLowerCase().includes(query)
        );
    });
};

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDataPosts"
    fetchDataPosts();
});

</script>

<template>
    <div class="px-4 py-5 text-center bg-white shadow-sm">
        <img class="d-block mx-auto mb-4" src="/logo.png" alt="" width="200" height="180">
        <h1 class="display-5 fw-bold">Al-Qur'an Online</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">Baca Al-Qur'an secara Online dimana dan kapanpun saja dengan mudah.</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <input type="text" class="form-control shadow-sm" placeholder="Cari surah..." v-model="searchQuery">
            </div>
        </div>
    </div>
    <div class="container mt-5 mb-5">

        <div class="row mb-3">
            <div class="col-md-6">

            </div>
        </div>
        <div class="row">
            <!-- <div v-for="(post, index) in filterPosts()" :key="index" class="col-md-4 mb-3">
                                                    <router-link :to="{ name: 'detail', params: { id: post.nomor } }" class="text-decoration-none">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <blockquote class="blockquote mb-0">
                                                                    <p>{{ post.nama_latin }} ({{ post.jumlah_ayat }})</p>
                                                                    <footer class="blockquote-footer"><cite title="Source Title">{{ post.arti }}</cite></footer>
                                                                </blockquote>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div> -->
            <div class="col-md-4 mb-4" v-for="(post, index) in filterPosts()" :key="index">
                <router-link :to="{ name: 'detail', params: { id: post.nomor } }" class="text-dark text-decoration-none">
                    <div class="card h-100 border-0 rounded-3 shadow">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    {{ post.nomor }}
                                </div>
                                <div class="flex-grow-1 ms-3"><strong>{{ post.nama_latin }} ({{ post.jumlah_ayat
                                }})</strong> <br>
                                    <small><i>{{ post.arti }}</i></small>
                                </div>
                                <div class="flex-grow-5 ms-5">
                                    <h2>ا{{ post.nama }}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>


        </div>
    </div>
</template>
