<template>
  <nav aria-label="Page navigation example" v-if="!isLoading">
    <ul class="pagination">
      <li class="page-item">
        <router-link
          class="page-link"
          v-if="page > 1"
          :to="'/' + type + '/' + (page - 1)"
        >
          Previous</router-link
        >
        <a v-else class="page-link disabled">Previous</a>
      </li>
      <li class="page-item">
        <router-link
          class="page-link"
          v-if="hasMore"
          :to="'/' + type + '/' + (page + 1)"
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
    <transition :name="transition">
      <div class="table-responsive">
        <table class="table">
          <tbody>
            <transition-group name="item">
              <item v-for="item in displayedItems" :key="item.id" :item="item">
              </item>
            </transition-group>
          </tbody>
           <spinner :show="isLoading"></spinner>
        </table>
      </div>
    </transition>
  </main>
</template>

<script>
import Item from "../components/Item.vue";
import Spinner from "../components/Spinner.vue";
export default {
  name: "item-list",
  components: {
    Item,
    Spinner,
  },
  props: {
    type: String,
  },
  data() {
    return {
      transition: "slide-right",
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems,
      timer: "",
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
    isLoading() {
      return this.displayedItems.length === 0;
    },
  },
  unmounted() {
    this.cancelAutoUpdate();
  },
  created() {
    this.loadItems(this.page);
    this.timer = setInterval(() => {
      this.loadItems(this.page);
    }, 10000);
  },
  watch: {
    page(to, from) {
      this.loadItems(to, from);
    },
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
        });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style scoped>
.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
.item-move,
.item-enter-active,
.item-leave-active {
  transition: all 0.5s;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
</style>