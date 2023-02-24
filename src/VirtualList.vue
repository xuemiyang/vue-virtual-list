<script setup lang="ts">
import { computed, ref, StyleValue } from 'vue'

const props = defineProps<{
    type: 'horizontal' | 'vertical'
    itemWidth: number
    itemHeight: number
    rowSpace: number
    columnSpace: number
    repeatNumber: number
    values: any[]
}>()

type Region = { rowCount: number; columnCount: number }
type Position = { row: number; column: number }

const itemWidthWithSpace = computed(() => props.itemWidth + props.columnSpace)
const itemHeightWithSpace = computed(() => props.itemHeight + props.rowSpace)
/**
 * css能设置的最大宽高，这里取一半
 * https://stackoverflow.com/questions/16637530/whats-the-maximum-pixel-value-of-css-width-and-height-properties
 * Firefox: 33554400px
 * Chrome:  33554428px
 * Opera:   33554428px
 * IE 9:    21474836.47px
 */
const CSSMaxWidth = computed(() => Math.floor(16777200 / itemWidthWithSpace.value) * itemWidthWithSpace.value)
const CSSMaxHeight = computed(() => Math.floor(16777200 / itemHeightWithSpace.value) * itemHeightWithSpace.value)
const offsetRow = computed(() => Math.floor(167772 / itemHeightWithSpace.value))
const offseColumn = computed(() => Math.floor(167772 / itemWidthWithSpace.value))

const wrapper = ref<HTMLElement>()
const width = computed(() => wrapper.value?.offsetWidth ?? 0)
const height = computed(() => wrapper.value?.offsetHeight ?? 0)
const itemWidthPx = computed(() => `${props.itemWidth}px`)
const itemHeightPx = computed(() => `${props.itemHeight}px`)
const columnSpacePx = computed(() => `${props.columnSpace}px`)
const rowSpacePx = computed(() => `${props.rowSpace}px`)
const contentMarginLeftPx = computed(() => `${-props.columnSpace}px`)
const contentMarginTopPx = computed(() => `${-props.rowSpace}px`)

const contentRegion = computed<Region>(() => {
    const region = { rowCount: 1, columnCount: 1 }
    if (props.type == 'horizontal') {
        if (props.repeatNumber > 0) {
            region.rowCount = Math.ceil(props.values.length / props.repeatNumber)
            region.columnCount = Math.min(props.values.length, props.repeatNumber)
        } else if (props.values.length > 0) {
            region.columnCount = props.values.length
        }
    } else if (props.type == 'vertical') {
        if (props.repeatNumber > 0) {
            region.columnCount = Math.ceil(props.values.length / props.repeatNumber)
            region.rowCount = Math.min(props.values.length, props.repeatNumber)
        } else if (props.values.length > 0) {
            region.rowCount = props.values.length
        }
    }
    return region
})

// 可见区域能显示多少行，多少列
const showRegion = computed<Region>(() => {
    return {
        rowCount: Math.min(Math.floor((height.value + props.rowSpace) / itemHeightWithSpace.value) + 1, contentRegion.value.rowCount),
        columnCount: Math.min(Math.floor((width.value + props.columnSpace) / itemWidthWithSpace.value) + 1, contentRegion.value.columnCount),
    }
})

// 偏移位置，用于处理到达css最大长度的情况
const offsetRegion = ref<Region>({ rowCount: 0, columnCount: 0 })

// 渲染元素的第一个位置
const startPosition = ref<Position>({ row: 0, column: 0 })
const endPosition = computed<Position>(() => {
    const position = { row: 0, column: 0 }
    // 3倍是需要预留缓冲区域
    position.row = Math.min(startPosition.value.row + showRegion.value.rowCount * 3, contentRegion.value.rowCount - 1)
    position.column = Math.min(startPosition.value.column + showRegion.value.columnCount * 3, contentRegion.value.columnCount - 1)
    if (props.type == 'horizontal') {
        const index = position.row * contentRegion.value.columnCount + position.column
        if (index >= props.values.length) {
            position.row = contentRegion.value.rowCount - 1
            position.column = contentRegion.value.columnCount - 1
        }
        if (props.repeatNumber <= 0) {
            position.row = 0
        }
    } else if (props.type == 'vertical') {
        const index = position.column * contentRegion.value.rowCount + position.row
        if (index >= props.values.length) {
            position.column = contentRegion.value.columnCount - 1
            position.row = contentRegion.value.rowCount - 1
        }
        if (props.repeatNumber <= 0) {
            position.column = 0
        }
    }
    return position
})

const showList = computed(() => {
    const result: { index: number, value: any }[] = []
    if (props.type == 'horizontal') {
        for (let row = startPosition.value.row; row <= endPosition.value.row; row++) {
            const startIndex = row * contentRegion.value.columnCount + startPosition.value.column
            const endIndex = row * contentRegion.value.columnCount + endPosition.value.column
            for (let i = startIndex; i <= endIndex; i++) {
                result.push({ index: i, value: props.values[i]})
            }
        }
    } else if (props.type == 'vertical') {
        for (let column = startPosition.value.column; column <= endPosition.value.column; column++) {
            const startIndex = column * contentRegion.value.rowCount + startPosition.value.row
            const endIndex = column * contentRegion.value.rowCount + endPosition.value.row
            for (let i = startIndex; i <= endIndex; i++) {
                result.push({ index: i, value: props.values[i]})
            }
        }
    }
    return result
})

const contentStyle = computed(() => {
    let left = itemWidthWithSpace.value * (startPosition.value.column - offsetRegion.value.columnCount)
    let top = itemHeightWithSpace.value * (startPosition.value.row - offsetRegion.value.rowCount)
    let right = itemWidthWithSpace.value * (contentRegion.value.columnCount - 1 - (endPosition.value.column - offsetRegion.value.columnCount))
    let bottom = itemHeightWithSpace.value * (contentRegion.value.rowCount - 1 - (endPosition.value.row - offsetRegion.value.rowCount))
    if (left + right > CSSMaxWidth.value) {
        if (left > CSSMaxWidth.value) {
            left = CSSMaxWidth.value
        }
        right = CSSMaxWidth.value - left
    }
    if (top + bottom > CSSMaxHeight.value) {
        if (top > CSSMaxHeight.value) {
            top = CSSMaxHeight.value
        }
        bottom = CSSMaxHeight.value - top
    }
    const width = itemWidthWithSpace.value * (endPosition.value.column - startPosition.value.column + 1)
    const height = itemHeightWithSpace.value * (endPosition.value.row - startPosition.value.row + 1)
    return {
        padding: `${top}px ${right}px ${bottom}px ${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        flexDirection: props.type == 'horizontal' ? 'row' : 'column',
    } as StyleValue
})

const handleScroll = (e: UIEvent) => {
    const target: HTMLElement = e.target as HTMLElement
    // 可见区域第一个元素的index
    const row = Math.floor((target.scrollTop + props.rowSpace) / itemHeightWithSpace.value) + offsetRegion.value.rowCount
    const column = Math.floor((target.scrollLeft + props.columnSpace) / itemWidthWithSpace.value) + offsetRegion.value.columnCount
    startPosition.value.row = row < showRegion.value.rowCount ? 0 : row - showRegion.value.rowCount
    startPosition.value.column = column < showRegion.value.columnCount ? 0 : column - showRegion.value.columnCount
    if (props.repeatNumber <= 0) {
        if (props.type == 'horizontal') {
            startPosition.value.row = 0
        } else if (props.type == 'vertical') {
            startPosition.value.column = 0
        }
    }
    //TODO: 分页加载时，由于滚动过快，target.scrollTop并不会立即生效，导致数据加载会出现偏移
    // 到达最低部或者最右部，分页加载数据
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight && endPosition.value.row < contentRegion.value.rowCount - 1) {
        const offset = contentRegion.value.rowCount - 1 - endPosition.value.row > offsetRow.value ? offsetRow.value : contentRegion.value.rowCount - 1 - endPosition.value.row
        offsetRegion.value.rowCount += offset
        target.scrollTop -= itemHeightWithSpace.value * offset
    } else if (offsetRegion.value.rowCount > 0 && startPosition.value.row < offsetRegion.value.rowCount) {
        const offset = offsetRegion.value.rowCount > offsetRow.value ? offsetRow.value : offsetRegion.value.rowCount
        offsetRegion.value.rowCount -= offset
        target.scrollTop += itemHeightWithSpace.value * offset
    } else if (target.scrollLeft + target.offsetWidth >= target.scrollWidth && endPosition.value.column < contentRegion.value.columnCount - 1) {
        const offset = contentRegion.value.columnCount - 1 - endPosition.value.column > offseColumn.value ? offseColumn.value : contentRegion.value.columnCount - 1 - endPosition.value.column
        offsetRegion.value.columnCount += offset
        target.scrollLeft -= itemWidthWithSpace.value * offset
    } else if (offsetRegion.value.columnCount > 0 && startPosition.value.column < offsetRegion.value.columnCount) {
        const offset = offsetRegion.value.columnCount > offseColumn.value ? offseColumn.value : offsetRegion.value.columnCount
        offsetRegion.value.columnCount -= offset
        target.scrollLeft += itemWidthWithSpace.value * offset
    }
}
</script>
 
<template>
    <div ref="wrapper" :class="$style.wrapper" @scroll.passive="handleScroll">
        <div :class="$style.content" :style="contentStyle">
            <div v-for="(item, index) in showList" :key="index" :class="$style.item">
                <slot :item="item.value" :index="item.index"></slot>
            </div>
        </div>
    </div>
</template>
 
<style module>
.wrapper {
    overflow: auto;
}

.wrapper .content {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-left: v-bind(contentMarginLeftPx);
    margin-top: v-bind(contentMarginTopPx);
}

.wrapper .content .item {
    width: v-bind(itemWidthPx);
    height: v-bind(itemHeightPx);
    margin-left: v-bind(columnSpacePx);
    margin-top: v-bind(rowSpacePx);
    position: relative;
}
</style>