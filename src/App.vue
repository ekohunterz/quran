<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand text-white"><i class="fas fa-quran me-2"
            style="color: #ffffff;"></i> Al-Qur'an
          Online</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
            <!-- <a href="#" target="_blank" class="btn btn-success">SANTRIKODING.COM</a> -->
          </ul>
        </div>
      </div>
    </nav>

    <!--- render router view -->
    <router-view></router-view>

  </div>
</template>