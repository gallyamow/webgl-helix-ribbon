// @see https://github.com/vuejs/vue-cli/issues/2948
module.exports = {
  chainWebpack: config => config.resolve.symlinks(false)
}
