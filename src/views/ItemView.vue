<template>
  <div class="item-view" v-if="item">
    <div
      class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
    >
      <template v-if="item">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0">{{ item.title }}</h3>
          <p class="meta">
            {{ item.score }} points | by
            <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
          </p>
        </div>
      </template>
    </div>

    <template v-if="!loading && item">
      <div
        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <p class="p-3">
          {{ item.kids ? item.descendants + " comments" : "No comments yet." }}
        </p>
        <comment v-for="id in item.kids" :key="id" :id="id"></comment>
      </div>
    </template>
    <spinner :show="loading"></spinner>
  </div>
</template>

<script>
import Spinner from "../components/Spinner.vue";
import Comment from "../components/Comment.vue";
export default {
  name: "item-view",
  components: {
    Comment,
    Spinner,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id];
    },
  },
  beforeCreate: function () {
    let itemId = this.$route.params.id;
    this.$store.dispatch("FETCH_ITEMS", { ids: [itemId] });
  },
  beforeMount() {
    this.fetchComments();
  },
  watch: {
    item: "fetchComments",
  },
  methods: {
    fetchComments() {
      if (!this.item || !this.item.kids) {
        return;
      }
      this.loading = true;
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false;
      });
    },
  },
  title () {
    return this.item.title
  },
};

// recursively fetch all descendent comments
function fetchComments(store, item) {
  if (item && item.kids) {
    return store
      .dispatch("FETCH_ITEMS", {
        ids: item.kids,
      })
      .then(() =>
        Promise.all(
          item.kids.map((id) => {
            return fetchComments(store, store.state.items[id]);
          })
        )
      );
  }
}
</script>

