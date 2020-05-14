<template>
  <div class="tab-bar-item" @click="handleClik">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            path: String,
            activeColor: {
                type: String,
                default: "red"
            }
        },
        name: 'TabBarItem',
        data() {
            return {
                // isActive: false,
            }
        },
        computed: {
            isActive: function() {
                return this.$route.path.indexOf(this.path) !== -1
                    // return this.$route.path === this.path
            },
            activeStyle: function() {
                return this.isActive ? {
                    color: this.activeColor
                } : {}
            }
        },
        methods: {
            handleClik: function() {
                // console.log(this.$route)
                // console.log(this.path)
                // this.$router.push(this.path).catch((e) => {})
                this.$router.replace(this.path).catch((e) => {})
            }
        },
    }
</script>

<style>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        /* tabbar一般高度为49 */
        height: 49px;
        background-color: #f6f6f6;
        font-size: 14px;
    }

    .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
</style>
