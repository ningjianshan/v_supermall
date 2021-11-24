module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/superMall/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': '@content',
        'common': '@common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}