<template>
  <main>
    <div
      class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
    >
      <template v-if="user">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0">User : {{ user.id }}</h3>
          <div class="mb-1 text-muted">
            {{ $filters.timeAgo(user.created) }} ago
          </div>
          <p class="card-text mb-auto">Karma: {{ user.karma }}</p>
          <p>
            About: 
            <span
              class="card-text mb-auto"
              v-if="user.about"
              v-html="user.about"
            ></span>
          </p>
          <span>
            <a href="#" class="stretched-link">Submissions</a>|
            <a href="#" class="stretched-link">Comments</a></span
          >
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  name: "user-view",
  components: {},
  props: {},
  computed: {
    user() {
      let result = {};
      if (
        this.$route.params &&
        this.$store.state.users[this.$route.params.id]
      ) {
        result = this.$store.state.users[this.$route.params.id];
      }
      return result;
    },
  },
  beforeCreate: function () {
    let userId = this.$route.params.id;
    this.$store.dispatch("FETCH_USER", { userId });
  },
  methods: {},
};
</script>

