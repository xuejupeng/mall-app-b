<template>
  <div class="index-wrap">
    <Card/>
    <Charts class='charts'/>
  </div>
</template>

<script>
import Card from '../components/Card.vue';
import Charts from '../components/Charts.vue';

export default {
  components: {
    Card,
    Charts,
  },
};
</script>

<style lang="less" scoped>
.charts{
  margin-top: 30px;
  overflow: hidden;
}
</style>
