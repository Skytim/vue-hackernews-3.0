<template>
  <tr class="news-item">
    <th scope="row" class="text-start">{{ item.score }}</th>
    <th class="text-left">
      <template v-if="item.url">
        <a :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
        <!-- <span class="host"> ({{ item.url }})</span> -->
      </template>
      <template v-else>
        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
      </template>

      <br />
      <span class="meta">
        <span v-if="item.type !== 'job'" class="by">
          by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
        </span>
        <span class="time"> {{$filters.timeAgo(item.time)}} ago </span>
        <span v-if="item.type !== 'job'" class="comments-link">
          |
          <router-link :to="'/item/' + item.id"
            >{{ item.descendants }} comments</router-link
          >
        </span>
      </span>
      <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
    </th>
  </tr>
</template>

<script>
// import { timeAgo } from '../util/filters'
export default {
  name: "news-item",
  props: ["item"],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  // serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
  //   return `${id}::${__lastUpdated}::${timeAgo(time)}`
  // }
};
</script>
