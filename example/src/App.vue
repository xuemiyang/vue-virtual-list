<script setup lang="ts">
import { ref } from "vue";
import { VirtualList } from "vue-virtual-list";
import "vue-virtual-list/dist/style.css";

const allList = ref<any[]>([]);

for (let i = 0; i < 10000000; i++) {
  allList.value.push({ title: `title ${i}`, id: i });
}
</script>

<template>
  <div>
    <VirtualList
      class="list"
      type="horizontal"
      :item-width="200"
      :item-height="100"
      :row-space="10"
      :column-space="10"
      :repeat-number="0"
      :values="allList"
    >
      <template #default="{ item }">
        <h2 class="item">{{ item.title }}</h2>
      </template>
    </VirtualList>
  </div>
</template>

<style scoped>
.list {
  width: 500px;
  height: 300px;
}
.list .item {
  background-color: bisque;
}
</style>
