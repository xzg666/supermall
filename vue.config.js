module.exports = {
    configureWebpack:{
        resolve:{
            extensions:[],//路径的后缀名可以不写
            alias:{
                'assets':'@/assets',
                'common':'@/components/common',
                'content':'@/components/content',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            },//别名   默认配置了'@':'src',
        }
    }
}