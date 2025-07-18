<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  page {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #f2f5ff;
  }

  .flex-cc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-col-c {
    display: flex;
    align-items: center;
  }
</style>