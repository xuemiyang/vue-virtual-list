# @xuemiyang/vue-virtual-list

Support VUE3 virtual list of tens of millions of data

## Install

```sh
npm install @xuemiyang/vue-virtual-list
```

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { VirtualList } from "@xuemiyang/vue-virtual-list";
import "@xuemiyang/vue-virtual-list/dist/style.css";

const allList = ref<any[]>([]);

for (let i = 0; i < 10000000; i++) {
  allList.value.push({ title: `title ${i}` });
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
      <template #default="{ item, index }">
        <div class="item">
          <h2 >{{ item.title }}</h2>
          <h3>{{ index }}</h3>
        </div>
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
```

## Component properties

Name         |  Type                        |  Description 
-------------|------------------------------|------------
type         |  'horizontal' \| 'vertical'  |  The layout direction of the item
itemWidth    |  number                      |  item Width
itemHeight   |  number                      |  item Height 
rowSpace     |  number                      |  row Space
columnSpace  |  number                      |  column Space
repeatNumber |  number                      |  item Number of duplicates. For example, 4 rows and 3 columns, the direction is horizontal, and the number of repetitions is 4
values       |  any[]                       |  an array of values

## Exposes

Name         |  Type                                    |  Description
-------------|------------------------------------------|-------------------------
scrollTo     |  (row: number, column: number) => void   |  Scroll to the specified item through rows and columns