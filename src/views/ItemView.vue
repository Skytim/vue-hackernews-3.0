<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <router-link
            class="page-link"
            v-if="page > 1"
            :to="'/' + type + '/' + (page - 1)"
            > Previous</router-link
          >
          <a v-else class="page-link disabled">Previous</a>
        </li>
        <li class="page-item">
          <router-link  class="page-link" v-if="hasMore" :to="'/' + type + '/' + (page + 1)"
            >Next</router-link
          >
          <a v-else class="page-link disabled">Next</a>
        </li>
        <li class="page-item">
          <span class="page-link">{{ page }}/{{ maxPage }}</span>
        </li>
      </ul>
    </nav>
    <main>
      <div class="table-responsive">
        <table class="table">
          <tbody>
            <item v-for="item in displayedItems" :key="item.id" :item="item">
            </item>
          </tbody>
        </table>
      </div>
    </main>
</template>

<script>
import Item from "../components/Item.vue";
export default {
  name: "item-list",
  components: {
    Item,
  },
  props: {
    type: String,
  },
  data() {
    return {
      transition: "slide-right",
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems,
    };
  },
  computed: {
    page() {
      return Number(this.$route.params.page) || 1;
    },
    maxPage() {
      const { itemsPerPage, lists } = this.$store.state;
      return Math.ceil(lists[this.type].length / itemsPerPage);
    },
    hasMore() {
      return this.page < this.maxPage;
    },
  },
  mounted() {
    this.loadItems(this.page);
    // // watch the current list for realtime updates
    // this.unwatchList = watchList(this.type, (ids) => {
    //   this.$store.commit("SET_LIST", { type: this.type, ids });
    //   this.$store.dispatch("ENSURE_ACTIVE_ITEMS").then(() => {
    //     this.displayedItems = this.$store.getters.activeItems;
    //   });
    // });
  },
  methods: {
    loadItems(to = this.page, from = -1) {
      // this.$bar.start();
      this.$store
        .dispatch("FETCH_LIST_DATA", {
          type: this.type,
        })
        .then(() => {
          if (this.page < 0 || this.page > this.maxPage) {
            this.$router.replace(`/${this.type}/1`);
            return;
          }
          this.transition =
            from === -1 ? null : to > from ? "slide-left" : "slide-right";
          this.displayedPage = to;
          this.displayedItems = this.$store.getters.activeItems;
          // this.$bar.finish();
          console.log(this.displayedItems);
        });
    },
  },
};
</script>

