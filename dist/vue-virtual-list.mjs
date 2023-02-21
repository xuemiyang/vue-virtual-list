import { defineComponent as R, useCssVars as B, unref as p, computed as u, ref as S, openBlock as M, createElementBlock as y, normalizeClass as _, createElementVNode as E, normalizeStyle as D, Fragment as F, renderList as O, renderSlot as j } from "vue";
const q = /* @__PURE__ */ R({
  __name: "VirtualList",
  props: {
    type: null,
    itemWidth: null,
    itemHeight: null,
    rowSpace: null,
    columnSpace: null,
    repeatNumber: null,
    values: null
  },
  setup(w) {
    const e = w;
    B((o) => ({
      ba460dda: p(P),
      dbcd1dce: p(z),
      "107dc1d0": p(N),
      "1e69c225": p(W),
      "3dc79d75": p(L),
      "1c3a3b97": p(H)
    }));
    const r = u(() => e.itemWidth + e.columnSpace), i = u(() => e.itemHeight + e.rowSpace), f = u(() => Math.floor(16777200 / r.value) * r.value), C = u(() => Math.floor(16777200 / i.value) * i.value), d = u(() => Math.floor(167772 / i.value)), g = u(() => Math.floor(167772 / r.value)), x = S(), $ = u(() => {
      var o;
      return ((o = x.value) == null ? void 0 : o.offsetWidth) ?? 0;
    }), b = u(() => {
      var o;
      return ((o = x.value) == null ? void 0 : o.offsetHeight) ?? 0;
    }), N = u(() => `${e.itemWidth}px`), W = u(() => `${e.itemHeight}px`), L = u(() => `${e.columnSpace}px`), H = u(() => `${e.rowSpace}px`), P = u(() => `${-e.columnSpace}px`), z = u(() => `${-e.rowSpace}px`), t = u(() => {
      const o = { rowCount: 1, columnCount: 1 };
      return e.type == "horizontal" ? e.repeatNumber > 0 ? (o.rowCount = Math.ceil(e.values.length / e.repeatNumber), o.columnCount = Math.min(e.values.length, e.repeatNumber)) : e.values.length > 0 && (o.columnCount = e.values.length) : e.type == "vertical" && (e.repeatNumber > 0 ? (o.columnCount = Math.ceil(e.values.length / e.repeatNumber), o.rowCount = Math.min(e.values.length, e.repeatNumber)) : e.values.length > 0 && (o.rowCount = e.values.length)), o;
    }), h = u(() => ({
      rowCount: Math.min(Math.floor((b.value + e.rowSpace) / i.value) + 1, t.value.rowCount),
      columnCount: Math.min(Math.floor(($.value + e.columnSpace) / r.value) + 1, t.value.columnCount)
    })), n = S({ rowCount: 0, columnCount: 0 }), a = S({ row: 0, column: 0 }), c = u(() => {
      const o = { row: 0, column: 0 };
      return o.row = Math.min(a.value.row + h.value.rowCount * 3, t.value.rowCount - 1), o.column = Math.min(a.value.column + h.value.columnCount * 3, t.value.columnCount - 1), e.type == "horizontal" ? (o.row * t.value.columnCount + o.column >= e.values.length && (o.row = t.value.rowCount - 1, o.column = t.value.columnCount - 1), e.repeatNumber <= 0 && (o.row = 0)) : e.type == "vertical" && (o.column * t.value.rowCount + o.row >= e.values.length && (o.column = t.value.columnCount - 1, o.row = t.value.rowCount - 1), e.repeatNumber <= 0 && (o.column = 0)), o;
    }), k = u(() => {
      const o = [];
      if (e.type == "horizontal")
        for (let l = a.value.row; l <= c.value.row; l++) {
          const m = l * t.value.columnCount + a.value.column, s = l * t.value.columnCount + c.value.column;
          o.push(...e.values.slice(m, s + 1));
        }
      else if (e.type == "vertical")
        for (let l = a.value.column; l <= c.value.column; l++) {
          const m = l * t.value.rowCount + a.value.row, s = l * t.value.rowCount + c.value.row;
          o.push(...e.values.slice(m, s + 1));
        }
      return o;
    }), T = u(() => {
      let o = r.value * (a.value.column - n.value.columnCount), l = i.value * (a.value.row - n.value.rowCount), m = r.value * (t.value.columnCount - 1 - (c.value.column - n.value.columnCount)), s = i.value * (t.value.rowCount - 1 - (c.value.row - n.value.rowCount));
      o + m > f.value && (o > f.value && (o = f.value), m = f.value - o), l + s > C.value && (l > C.value && (l = C.value), s = C.value - l);
      const v = r.value * (c.value.column - a.value.column + 1), I = i.value * (c.value.row - a.value.row + 1);
      return {
        padding: `${l}px ${m}px ${s}px ${o}px`,
        width: `${v}px`,
        height: `${I}px`,
        flexDirection: e.type == "horizontal" ? "row" : "column"
      };
    }), V = (o) => {
      const l = o.target, m = Math.floor((l.scrollTop + e.rowSpace) / i.value) + n.value.rowCount, s = Math.floor((l.scrollLeft + e.columnSpace) / r.value) + n.value.columnCount;
      if (a.value.row = m < h.value.rowCount ? 0 : m - h.value.rowCount, a.value.column = s < h.value.columnCount ? 0 : s - h.value.columnCount, e.repeatNumber <= 0 && (e.type == "horizontal" ? a.value.row = 0 : e.type == "vertical" && (a.value.column = 0)), l.scrollTop + l.offsetHeight >= l.scrollHeight && c.value.row < t.value.rowCount - 1) {
        const v = t.value.rowCount - 1 - c.value.row > d.value ? d.value : t.value.rowCount - 1 - c.value.row;
        n.value.rowCount += v, l.scrollTop -= i.value * v;
      } else if (n.value.rowCount > 0 && a.value.row < n.value.rowCount) {
        const v = n.value.rowCount > d.value ? d.value : n.value.rowCount;
        n.value.rowCount -= v, l.scrollTop += i.value * v;
      } else if (l.scrollLeft + l.offsetWidth >= l.scrollWidth && c.value.column < t.value.columnCount - 1) {
        const v = t.value.columnCount - 1 - c.value.column > g.value ? g.value : t.value.columnCount - 1 - c.value.column;
        n.value.columnCount += v, l.scrollLeft -= r.value * v;
      } else if (n.value.columnCount > 0 && a.value.column < n.value.columnCount) {
        const v = n.value.columnCount > g.value ? g.value : n.value.columnCount;
        n.value.columnCount -= v, l.scrollLeft += r.value * v;
      }
    };
    return (o, l) => (M(), y("div", {
      ref_key: "wrapper",
      ref: x,
      class: _(o.$style.wrapper),
      onScrollPassive: V
    }, [
      E("div", {
        class: _(o.$style.content),
        style: D(p(T))
      }, [
        (M(!0), y(F, null, O(p(k), (m, s) => (M(), y("div", {
          key: s,
          class: _(o.$style.item)
        }, [
          j(o.$slots, "default", {
            item: m,
            index: s
          })
        ], 2))), 128))
      ], 6)
    ], 34));
  }
}), A = "_wrapper_14snw_3", G = "_content_14snw_11", J = "_item_14snw_27", K = {
  wrapper: A,
  content: G,
  item: J
}, Q = (w, e) => {
  const r = w.__vccOpts || w;
  for (const [i, f] of e)
    r[i] = f;
  return r;
}, U = {
  $style: K
}, X = /* @__PURE__ */ Q(q, [["__cssModules", U]]), Z = {
  install(w) {
    w.component("VirtualList", X);
  }
};
export {
  X as VirtualList,
  Z as default
};
