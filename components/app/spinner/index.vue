<template>
  <div class="app-loading">
    <div class="ring">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppSpiner',
};
</script>
<style lang="scss" scoped>
.app-loading {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  > .ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    > .item {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid #fff;
      border-radius: 50%;
      animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }

    > .item:nth-child(1) {
      animation-delay: -0.45s;
    }

    > .item:nth-child(2) {
      animation-delay: -0.3s;
    }

    > .item:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
