export default {
  props: {
    on: {
      type: Boolean,
      default: true
    }
  },
  render(h) {
    // return []
    // return this.$slots.default
    // return h('div', this.$slots.default)

        return this.$scopedSlots.default({
          on: this.currentState,
          setOn: this.setOn,
          setOff: this.setOff,
          toggle: this.toggle,
        })
    // return h('div', [this.$scopedSlots.default({
    //     on: this.currentState,
    //     setOn: this.setOn,
    //     setOff: this.setOff,
    //     toggle: this.toggle,
    // })])
  },
  data() {
    return {
      currentState: this.on
    }
  },
  methods: {
    setOn() {
      this.currentState = true
    },
    setOff() {
      this.currentState = false
    },
    toggle() {
      this.currentState = !this.currentState
    }
  }
}
