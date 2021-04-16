<template>
  <div class="news-view">
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)"
        >&lt; prev</router-link
      >
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)"
        >more &gt;</router-link
      >
      <a v-else class="disabled">more &gt;</a>
    </div>
    <transition :name="transition">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
    <div  v-for="item in displayedItems" :key="item.id" :item="item">
      {{item.id}}
    </div>
  </div>
</template>

<script>
import Item from '../components/Item.vue';
export default {
  name: "item-list",
  components: {
    Item
  },
  props: {
    type: String,
  },
  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },
  created() {
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

