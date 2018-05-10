<template>
  <div>
    <div class="drag-title">拖拽可调整顺序</div>
    <ul class="drag-list">
      <li class="drag-item" v-for="(item,index) in dragList" :key="item.id" @touchstart="touchStart" @touchmove="touchMove(index,item,$event)"
        @touchend="touchEnd">
        <div class="leave-block" v-show="item.isShowUp"></div>
        <div>{{item.text}}</div>
        <div class="leave-block" v-show="item.isShowDown"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dragList: [],
        dragItem: {
          elTop: 0,
          initTop: 0,
          oldIndex: 0,
          newIndex: 0,
          currItem: null
        }
      }
    },
    created() {
      this.dragList = [{
          id: 1,
          isDrag: false,
          text: '列表一',
          isShowUp: false,
          isShowDown: false
        },
        {
          id: 2,
          isDrag: false,
          text: '列表二',
          isShowUp: false,
          isShowDown: false
        },
        {
          id: 3,
          isDrag: false,
          text: '列表三',
          isShowUp: false,
          isShowDown: false
        },
        {
          id: 4,
          isDrag: false,
          text: '列表四',
          isShowUp: false,
          isShowDown: false
        }
      ]
    },
    methods: {
      touchStart(e) {
        console.log('touchStart');
        // 元素顶部相对于整个视图的垂直方向位置
        const initTop = e.currentTarget.offsetTop;
        // 接触点相对于整个视图的垂直方向位置
        const initClientY = e.touches[0].clientY;
        // 计算接触点距离元素顶部距离
        const elTop = initClientY - initTop;
        this.dragItem = {
          ...this.dragItem,
          elTop,
          initTop
        };
      },

      touchMove(index, item, e) {
        const {
          elTop,
          initTop
        } = this.dragItem

        const target = e.target;
        const elClsObj = target.classList;
        elClsObj.remove('static');
        elClsObj.add('ab');

        // 实时获取元素距离视图上侧距离
        let currTop = e.touches[0].clientY - elTop;
        // 元素在拖拽过程中距离视口顶部距离赋给元素，实现移动
        target.style.top = currTop + 'px';
        // 项高度
        const elHeight = target.clientHeight;

        let newIndex;
        // 向上拖拽
        if (currTop >= initTop) {
          // 当元素拖至另一个元素块等于或超过1/2的位置时
          if ((currTop - initTop) % elHeight > elHeight / 2) {
            // 最新位置 
            newIndex = Math.round((currTop - initTop) / elHeight) + index;
            if (newIndex < this.dragList.length && newIndex >= 0) {
              this.dragList.forEach(item => {
                item.isShowDown = false
              })
              this.dragList[newIndex].isShowDown = true;
            }
          }
        } else {
          // 大于一半实现插入
          if ((initTop - currTop) % elHeight > elHeight / 2) {
            newIndex = index - Math.round((initTop - currTop) / elHeight);
            if (newIndex < this.dragList.length && newIndex >= 0) {
              this.dragList.forEach(item => {
                item.isShowUp = false
              })
              this.dragList[newIndex].isShowUp = true;
            }
          }
        }
        console.log(index, newIndex, item)
        this.dragItem = {
          ...this.dragItem,
          newIndex,
          currItem: item,
          oldIndex: index,
        }
      },

      touchEnd(e) {
        console.log('touchEnd');
        const {
          oldIndex,
          newIndex,
          currItem
        } = this.dragItem;
        if (typeof newIndex === 'number') {
          this.dragList.splice(oldIndex, 1)
          this.dragList.splice(newIndex, 0, currItem);
        }
        this.dragList.forEach(item => {
          item.isShowUp = false;
          item.isShowDown = false;
        })
        const elClsObj = e.target.classList;
        elClsObj.add('static');
        elClsObj.remove('ab');
      }

    }
  }

</script>

<style scoped>
  .drag-title {
    background: #999;
  }

  .drag-list {
    padding: 0;
    position: relative
  }

  .drag-item {
    background: #aaa;
    margin: 5px;
    line-height: 41px;
    list-style-type: none
  }

  .static {
    position: static;
  }

  .ab {
    position: absolute;
    width: 100%
  }

  .leave-block {
    height: 41px;
    background: #eee;
  }

</style>
