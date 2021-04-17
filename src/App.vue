<template>
  <div class="container py-3">
    <header
      class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center text-dark text-decoration-none"
      >
        <img width="40" height="40" class="me-2" src="./assets/logo.png" />
        <router-link tag="span" class="fs-4 text-decoration-none" to="/">
          Hacker News</router-link
        >
      </a>
      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <router-link class="me-3 py-2 text-dark text-decoration-none" to="/top"
          >Top</router-link
        >
        <router-link class="me-3 py-2 text-dark text-decoration-none" to="/new"
          >New</router-link
        >
        <router-link class="me-3 py-2 text-dark text-decoration-none" to="/show"
          >Show</router-link
        >
        <router-link class="me-3 py-2 text-dark text-decoration-none" to="/ask"
          >Ask</router-link
        >
        <router-link class="py-2 text-dark text-decoration-none" to="/job"
          >Jobs</router-link
        >
      </nav>
    </header>
    <router-view />
  </div>
</template>