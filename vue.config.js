module.exports = {
  devServer: {
    disableHostCheck:true,
    overlay:{
      warnings:false,
      errors:false
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network'
      }
    }
  }
}
