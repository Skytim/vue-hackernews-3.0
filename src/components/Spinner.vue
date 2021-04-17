<template>
  <div class="d-flex justify-content-center" v-if="show">
    <div class="spinner-border" role="status"></div>
  </div>
</template>

<script>
// import { timeAgo } from '../util/filters'
export default {
  name: "spinner",
  props: ["show"],
};
</script>
