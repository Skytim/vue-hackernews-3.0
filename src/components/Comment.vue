<template>
  <div v-if="comment" class="comment">
    <div class="col p-4 d-flex flex-column position-static">
      <h5 class="mb-0">
        <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
        |
        <span> {{ $filters.timeAgo(comment.time) }} ago</span>
      </h5>
      <div class="card-body" v-html="comment.text"></div>

      <hr v-if="comment.kids && comment.kids.length" />
      <a v-if="comment.kids && comment.kids.length" @click="open = !open">{{
        open ? "[-]" : "[+] " + pluralize(comment.kids.length) + " collapsed"
      }}</a>
      <div class="comment-children" v-show="open">
        <comment v-for="id in comment.kids" :key="id" :id="id"></comment>
      </div>
    </div>
  </div>
</template>

<script>
// import { timeAgo } from '../util/filters'
export default {
  name: "comment",
  props: ["id"],
  data() {
    return {
      open: true,
    };
  },
  computed: {
    comment() {
      return this.$store.state.items[this.id];
    },
  },
  methods: {
    pluralize: (n) => n + (n === 1 ? " reply" : " replies"),
  },
};
</script>

