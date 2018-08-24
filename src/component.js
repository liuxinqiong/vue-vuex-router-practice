import toggle from './components/toggle/toggle'

export default (Vue) => {
  Vue.component('toggle', toggle)
  //   Vue.component('anchored-heading', {
  //     render(createElement) {
  //       // createElement 返回虚拟节点（VNode）
  //       return createElement('h' + this.level, this.$slots.default)
  //     },
  //     props: {
  //       level: {
  //         type: Number,
  //         required: true
  //       }
  //     }
  //   })
  Vue.component('anchored-heading', {
    render: function (createElement) {
      // 创建 kebabCase 风格的ID
      var headingId = getChildrenTextContent(this.$slots.default)
        .toLowerCase()
        .replace(/\W+/g, '-')
        .replace(/(^\-|\-$)/g, '')

      return createElement(
        'h' + this.level, [
          createElement('a', {
            attrs: {
              name: headingId,
              href: '#' + headingId
            }
          }, this.$slots.default)
        ]
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })
  //   Vue.component('anchored-heading', {
  //     render(h) {
  //       return (
  //           <h3>{this.$slots.default}{this.level}</h3>
  //       )
  //     },
  //     props: {
  //       level: {
  //         type: Number,
  //         required: true
  //       }
  //     }
  //   })
}

// createElement(tag, data, subNode)


var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children ?
      getChildrenTextContent(node.children) :
      node.text
  }).join('')
}

// VNodes 必须唯一

// 此时实现循环、判断等，可以直接原生JS实现

// 插槽

// JSX 直接使用createElement书写函数是在太痛苦了，此时我们使用JSX语法
