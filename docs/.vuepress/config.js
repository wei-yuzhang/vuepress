module.exports = {
    base: '/vuepress/',
    // base: 'http://172.16.0.218:8092/repository/npm-group/', // 网站将在其部署的基本 URL
    title: '快享医疗',
    description: '快享开发团队技能分享记录',
    head: [
        ['link', {rel: 'icon', href: `/favicon.ico`}],
    ],
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Share', link: '/knowledge/xuxiaomei/aboutVue'},
            {text: 'Components', link: '/baseComponents/updateLog.html'},
            {text: 'Webpack', link: '/aboutWebpack/'},
            {text: 'Test', link: '/test/'},
            {text: 'Frame', link: '/frame/'},
        ],
        sidebar: {
            '/knowledge/': [
                {
                    title: '知识库',
                    collapsable: false,
                    children: [
                        {
                            title: '徐晓梅',
                            collapsable: true,
                            children: [
                                '/knowledge/xuxiaomei/aboutVue',
                                '/knowledge/xuxiaomei/aboutRoute',
                                '/knowledge/xuxiaomei/aboutReact',
                                '/knowledge/xuxiaomei/aboutNodeDb'
                            ]
                        },
                        {
                            title: '宋静雨',
                            collapsable: true,
                            children: [
                                '/knowledge/songjingyu/ES6',
                                '/knowledge/songjingyu/git',
                                '/knowledge/songjingyu/vueRouter'
                            ]
                        },
                        {
                            title: '吴 李',
                            collapsable: true,
                            children: [
                                '/knowledge/wuli/node_mysql',
                                '/knowledge/wuli/websocket'
                            ]
                        },
                        {
                            title: '韦玉樟',
                            collapsable: true,
                            children: [
                                '/knowledge/weiyuzhang/test'
                            ]
                        },
                        {
                            title: '徐 凯',
                            collapsable: true,
                            children: [
                                '/knowledge/xukai/webCache/test',
                                '/knowledge/xukai/scope/page',
                                '/knowledge/xukai/protoType/page'
                            ]
                        }
                    ]
                }
            ],
            '/baseComponents/': [
                {
                    title: 'npm组件库',
                    collapsable: false,
                    children: [
                        '/baseComponents/updateLog',      // 更新日志
                        '/baseComponents/developerGuide', // 开发指南
                        {
                            title: '组件',
                            collapsable: true,
                            children: [
                                '/baseComponents/component/portLog',
                                '/baseComponents/component/theTableCommon'
                            ]
                        }
                    ]
                }
            ],
            '/aboutWebpack/': [
                {
                    title: 'webpack',
                    collapsable: true,
                    children: [
                        '/aboutWebpack/updateLog',       // 更新日志
                        '/aboutWebpack/baseConfig', // 基础配置
                        '/aboutWebpack/modularPack', // 模块化打包
                        {
                            title: 'webpack3',
                            collapsable: true,
                            children: [
                                '/aboutWebpack/webpack3/betterConfig'
                            ]
                        }
                    ]
                }
            ]
        },
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
}
