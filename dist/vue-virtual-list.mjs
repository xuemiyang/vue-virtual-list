import { defineComponent as R, useCssVars as B, unref as p, computed as n, ref as S, openBlock as M, createElementBlock as y, normalizeClass as _, createElementVNode as E, normalizeStyle as D, Fragment as F, renderList as O, renderSlot as j } from "vue";
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
  setup(f) {
    const e = f;
    B((o) => ({
      "834be25c": p(P),
      "2459b10c": p(z),
      "58b363d7": p(N),
      "487fd574": p(W),
      "2b3bae74": p(L),
      "279ce2f8": p(H)
    }));
    const s = n(() => e.itemWidth + e.columnSpace), i = n(() => e.itemHeight + e.rowSpace), w = n(() => Math.floor(16777200 / s.value) * s.value), C = n(() => Math.floor(16777200 / i.value) * i.value), d = n(() => Math.floor(167772 / i.value)), g = n(() => Math.floor(167772 / s.value)), x = S(), $ = n(() => {
      var o;
      return ((o = x.value) == null ? void 0 : o.offsetWidth) ?? 0;
    }), b = n(() => {
      var o;
      return ((o = x.value) == null ? void 0 : o.offsetHeight) ?? 0;
    }), N = n(() => `${e.itemWidth}px`), W = n(() => `${e.itemHeight}px`), L = n(() => `${e.columnSpace}px`), H = n(() => `${e.rowSpace}px`), P = n(() => `${-e.columnSpace}px`), z = n(() => `${-e.rowSpace}px`), u = n(() => {
      const o = { rowCount: 1, columnCount: 1 };
      return e.type == "horizontal" ? e.repeatNumber > 0 ? (o.rowCount = Math.ceil(e.values.length / e.repeatNumber), o.columnCount = Math.min(e.values.length, e.repeatNumber)) : e.values.length > 0 && (o.columnCount = e.values.length) : e.type == "vertical" && (e.repeatNumber > 0 ? (o.columnCount = Math.ceil(e.values.length / e.repeatNumber), o.rowCount = Math.min(e.values.length, e.repeatNumber)) : e.values.length > 0 && (o.rowCount = e.values.length)), o;
    }), h = n(() => ({
      rowCount: Math.min(Math.floor((b.value + e.rowSpace) / i.value) + 1, u.value.rowCount),
      columnCount: Math.min(Math.floor(($.value + e.columnSpace) / s.value) + 1, u.value.columnCount)
    })), a = S({ rowCount: 0, columnCount: 0 }), r = S({ row: 0, column: 0 }), c = n(() => {
      const o = { row: 0, column: 0 };
      return o.row = Math.min(r.value.row + h.value.rowCount * 3, u.value.rowCount - 1), o.column = Math.min(r.value.column + h.value.columnCount * 3, u.value.columnCount - 1), e.type == "horizontal" ? (o.row * u.value.columnCount + o.column >= e.values.length && (o.row = u.value.rowCount - 1, o.column = u.value.columnCount - 1), e.repeatNumber <= 0 && (o.row = 0)) : e.type == "vertical" && (o.column * u.value.rowCount + o.row >= e.values.length && (o.column = u.value.columnCount - 1, o.row = u.value.rowCount - 1), e.repeatNumber <= 0 && (o.column = 0)), o;
    }), k = n(() => {
      const o = [];
      if (e.type == "horizontal")
        for (let l = r.value.row; l <= c.value.row; l++) {
          const v = l * u.value.columnCount + r.value.column, m = l * u.value.columnCount + c.value.column;
          for (let t = v; t <= m && t < e.values.length; t++)
            o.push({ index: t, value: e.values[t] });
        }
      else if (e.type == "vertical")
        for (let l = r.value.column; l <= c.value.column; l++) {
          const v = l * u.value.rowCount + r.value.row, m = l * u.value.rowCount + c.value.row;
          for (let t = v; t <= m && t < e.values.length; t++)
            o.push({ index: t, value: e.values[t] });
        }
      return o;
    }), T = n(() => {
      let o = s.value * (r.value.column - a.value.columnCount), l = i.value * (r.value.row - a.value.rowCount), v = s.value * (u.value.columnCount - 1 - (c.value.column - a.value.columnCount)), m = i.value * (u.value.rowCount - 1 - (c.value.row - a.value.rowCount));
      o + v > w.value && (o > w.value && (o = w.value), v = w.value - o), l + m > C.value && (l > C.value && (l = C.value), m = C.value - l);
      const t = s.value * (c.value.column - r.value.column + 1), I = i.value * (c.value.row - r.value.row + 1);
      return {
        padding: `${l}px ${v}px ${m}px ${o}px`,
        width: `${t}px`,
        height: `${I}px`,
        flexDirection: e.type == "horizontal" ? "row" : "column"
      };
    }), V = (o) => {
      const l = o.target, v = Math.floor((l.scrollTop + e.rowSpace) / i.value) + a.value.rowCount, m = Math.floor((l.scrollLeft + e.columnSpace) / s.value) + a.value.columnCount;
      if (r.value.row = v < h.value.rowCount ? 0 : v - h.value.rowCount, r.value.column = m < h.value.columnCount ? 0 : m - h.value.columnCount, e.repeatNumber <= 0 && (e.type == "horizontal" ? r.value.row = 0 : e.type == "vertical" && (r.value.column = 0)), l.scrollTop + l.offsetHeight >= l.scrollHeight && c.value.row < u.value.rowCount - 1) {
        const t = u.value.rowCount - 1 - c.value.row > d.value ? d.value : u.value.rowCount - 1 - c.value.row;
        a.value.rowCount += t, l.scrollTop -= i.value * t;
      } else if (a.value.rowCount > 0 && r.value.row < a.value.rowCount) {
        const t = a.value.rowCount > d.value ? d.value : a.value.rowCount;
        a.value.rowCount -= t, l.scrollTop += i.value * t;
      } else if (l.scrollLeft + l.offsetWidth >= l.scrollWidth && c.value.column < u.value.columnCount - 1) {
        const t = u.value.columnCount - 1 - c.value.column > g.value ? g.value : u.value.columnCount - 1 - c.value.column;
        a.value.columnCount += t, l.scrollLeft -= s.value * t;
      } else if (a.value.columnCount > 0 && r.value.column < a.value.columnCount) {
        const t = a.value.columnCount > g.value ? g.value : a.value.columnCount;
        a.value.columnCount -= t, l.scrollLeft += s.value * t;
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
        (M(!0), y(F, null, O(p(k), (v, m) => (M(), y("div", {
          key: m,
          class: _(o.$style.item)
        }, [
          j(o.$slots, "default", {
            item: v.value,
            index: v.index
          })
        ], 2))), 128))
      ], 6)
    ], 34));
  }
}), A = "_wrapper_19wfm_2", G = "_content_19wfm_6", J = "_item_19wfm_14", K = {
  wrapper: A,
  content: G,
  item: J
}, Q = (f, e) => {
  const s = f.__vccOpts || f;
  for (const [i, w] of e)
    s[i] = w;
  return s;
}, U = {
  $style: K
}, X = /* @__PURE__ */ Q(q, [["__cssModules", U]]), Z = {
  install(f) {
    f.component("VirtualList", X);
  }
};
export {
  X as VirtualList,
  Z as default
};
