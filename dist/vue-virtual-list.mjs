import { defineComponent as B, useCssVars as E, unref as p, computed as a, ref as M, openBlock as y, createElementBlock as _, normalizeClass as $, createElementVNode as D, normalizeStyle as F, Fragment as O, renderList as j, renderSlot as q } from "vue";
const A = /* @__PURE__ */ B({
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
  setup(C, { expose: S }) {
    const o = C;
    E((e) => ({
      f1e555ea: p(T),
      ee1c93be: p(z),
      "2928f310": p(W),
      "19fc6d2d": p(L),
      "96eb5926": p(H),
      "050c089f": p(P)
    }));
    const c = a(() => o.itemWidth + o.columnSpace), v = a(() => o.itemHeight + o.rowSpace), w = a(() => Math.floor(16777200 / c.value) * c.value), h = a(() => Math.floor(16777200 / v.value) * v.value), d = a(() => Math.floor(167772 / v.value)), g = a(() => Math.floor(167772 / c.value)), x = M(), b = a(() => {
      var e;
      return ((e = x.value) == null ? void 0 : e.offsetWidth) ?? 0;
    }), N = a(() => {
      var e;
      return ((e = x.value) == null ? void 0 : e.offsetHeight) ?? 0;
    }), W = a(() => `${o.itemWidth}px`), L = a(() => `${o.itemHeight}px`), H = a(() => `${o.columnSpace}px`), P = a(() => `${o.rowSpace}px`), T = a(() => `${-o.columnSpace}px`), z = a(() => `${-o.rowSpace}px`), u = a(() => {
      const e = { rowCount: 1, columnCount: 1 };
      return o.type == "horizontal" ? o.repeatNumber > 0 ? (e.rowCount = Math.ceil(o.values.length / o.repeatNumber), e.columnCount = Math.min(o.values.length, o.repeatNumber)) : o.values.length > 0 && (e.columnCount = o.values.length) : o.type == "vertical" && (o.repeatNumber > 0 ? (e.columnCount = Math.ceil(o.values.length / o.repeatNumber), e.rowCount = Math.min(o.values.length, o.repeatNumber)) : o.values.length > 0 && (e.rowCount = o.values.length)), e;
    }), f = a(() => ({
      rowCount: Math.min(Math.floor((N.value + o.rowSpace) / v.value) + 1, u.value.rowCount),
      columnCount: Math.min(Math.floor((b.value + o.columnSpace) / c.value) + 1, u.value.columnCount)
    })), t = M({ rowCount: 0, columnCount: 0 }), r = M({ row: 0, column: 0 }), i = a(() => {
      const e = { row: 0, column: 0 };
      return e.row = Math.min(r.value.row + f.value.rowCount * 3, u.value.rowCount - 1), e.column = Math.min(r.value.column + f.value.columnCount * 3, u.value.columnCount - 1), o.type == "horizontal" ? (e.row * u.value.columnCount + e.column >= o.values.length && (e.row = u.value.rowCount - 1, e.column = u.value.columnCount - 1), o.repeatNumber <= 0 && (e.row = 0)) : o.type == "vertical" && (e.column * u.value.rowCount + e.row >= o.values.length && (e.column = u.value.columnCount - 1, e.row = u.value.rowCount - 1), o.repeatNumber <= 0 && (e.column = 0)), e;
    }), k = a(() => {
      const e = [];
      if (o.type == "horizontal")
        for (let l = r.value.row; l <= i.value.row; l++) {
          const s = l * u.value.columnCount + r.value.column, m = l * u.value.columnCount + i.value.column;
          for (let n = s; n <= m && n < o.values.length; n++)
            e.push({ index: n, value: o.values[n] });
        }
      else if (o.type == "vertical")
        for (let l = r.value.column; l <= i.value.column; l++) {
          const s = l * u.value.rowCount + r.value.row, m = l * u.value.rowCount + i.value.row;
          for (let n = s; n <= m && n < o.values.length; n++)
            e.push({ index: n, value: o.values[n] });
        }
      return e;
    }), V = a(() => {
      let e = c.value * (r.value.column - t.value.columnCount), l = v.value * (r.value.row - t.value.rowCount), s = c.value * (u.value.columnCount - 1 - (i.value.column - t.value.columnCount)), m = v.value * (u.value.rowCount - 1 - (i.value.row - t.value.rowCount));
      e + s > w.value && (e > w.value && (e = w.value), s = w.value - e), l + m > h.value && (l > h.value && (l = h.value), m = h.value - l);
      const n = c.value * (i.value.column - r.value.column + 1), R = v.value * (i.value.row - r.value.row + 1);
      return {
        padding: `${l}px ${s}px ${m}px ${e}px`,
        width: `${n}px`,
        height: `${R}px`,
        flexDirection: o.type == "horizontal" ? "row" : "column"
      };
    }), I = (e) => {
      const l = e.target, s = Math.floor((l.scrollTop + o.rowSpace) / v.value) + t.value.rowCount, m = Math.floor((l.scrollLeft + o.columnSpace) / c.value) + t.value.columnCount;
      if (r.value.row = s < f.value.rowCount ? 0 : s - f.value.rowCount, r.value.column = m < f.value.columnCount ? 0 : m - f.value.columnCount, o.repeatNumber <= 0 && (o.type == "horizontal" ? r.value.row = 0 : o.type == "vertical" && (r.value.column = 0)), l.scrollTop + l.offsetHeight >= l.scrollHeight && i.value.row < u.value.rowCount - 1) {
        const n = u.value.rowCount - 1 - i.value.row > d.value ? d.value : u.value.rowCount - 1 - i.value.row;
        t.value.rowCount += n, l.scrollTop -= v.value * n;
      } else if (t.value.rowCount > 0 && r.value.row < t.value.rowCount) {
        const n = t.value.rowCount > d.value ? d.value : t.value.rowCount;
        t.value.rowCount -= n, l.scrollTop += v.value * n;
      } else if (l.scrollLeft + l.offsetWidth >= l.scrollWidth && i.value.column < u.value.columnCount - 1) {
        const n = u.value.columnCount - 1 - i.value.column > g.value ? g.value : u.value.columnCount - 1 - i.value.column;
        t.value.columnCount += n, l.scrollLeft -= c.value * n;
      } else if (t.value.columnCount > 0 && r.value.column < t.value.columnCount) {
        const n = t.value.columnCount > g.value ? g.value : t.value.columnCount;
        t.value.columnCount -= n, l.scrollLeft += c.value * n;
      }
    };
    return S({
      scrollTo: (e, l) => {
        if (!x.value)
          return;
        e < 0 ? e = 0 : e > u.value.rowCount - f.value.rowCount && (e = u.value.rowCount - f.value.rowCount), l < 0 ? l = 0 : l > u.value.columnCount - f.value.columnCount && (l = u.value.columnCount - f.value.columnCount), l > w.value / c.value - g.value ? t.value.columnCount = l - (w.value / c.value - g.value) : l < t.value.columnCount && (t.value.columnCount = l), e > h.value / v.value - d.value ? t.value.rowCount = e - (h.value / v.value - d.value) : e < t.value.rowCount && (t.value.rowCount = e);
        const s = (l - t.value.columnCount) * c.value, m = (e - t.value.rowCount) * v.value;
        x.value.scrollTo(s, m);
      }
    }), (e, l) => (y(), _("div", {
      ref_key: "wrapper",
      ref: x,
      class: $(e.$style.wrapper),
      onScrollPassive: I
    }, [
      D("div", {
        class: $(e.$style.content),
        style: F(p(V))
      }, [
        (y(!0), _(O, null, j(p(k), (s, m) => (y(), _("div", {
          key: m,
          class: $(e.$style.item)
        }, [
          q(e.$slots, "default", {
            item: s.value,
            index: s.index
          })
        ], 2))), 128))
      ], 6)
    ], 34));
  }
}), G = "_wrapper_19wfm_2", J = "_content_19wfm_6", K = "_item_19wfm_14", Q = {
  wrapper: G,
  content: J,
  item: K
}, U = (C, S) => {
  const o = C.__vccOpts || C;
  for (const [c, v] of S)
    o[c] = v;
  return o;
}, X = {
  $style: Q
}, Y = /* @__PURE__ */ U(A, [["__cssModules", X]]), oe = {
  install(C) {
    C.component("VirtualList", Y);
  }
};
export {
  Y as VirtualList,
  oe as default
};
