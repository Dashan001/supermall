module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 默认配置中@已配置为src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
