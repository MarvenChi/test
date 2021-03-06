// @see https://boijs.github.io/docs/#/_config-basic
boi.spec('basic', {
    // 项目名称
    appname: 'es6',
    // 源码目录
    source: './src/',
    // 编译输出目录
    output: './dest/',
    // 第三方库文件目录
    libs: './libs/',
    // 是否部署第三方库文件
    deployLibs: false,
    limit: {
        maxEntrypointSize: 150000,
        maxAssetSize: 200000
    }
});

// @see https://boijs.github.io/docs/#/_config-js
boi.spec('js', {
    // JavaScript文件后缀类型
    ext: 'js',
    // JavaScript文件目录，相对于basic.source
    source: 'js',
    // JavaScript文件输出目录，相对于basic.output
    output: 'js',
    // js入口文件的前缀，入口文件的命名规则为[mainFilePrefix].*.[ext]
    mainFilePrefix: 'main',
    // 是否启用文件hash指纹
    useHash: true,
    // 异步模块是否使用hash指纹
    asyncModuleHash: true,
    // 是否分离公共模块
    splitCommonModule: true,
    // 是否压缩混淆
    uglify: true,
    // 定义编译过程替换的变量
    define: {
        'API_TEST': '/login'
    },
    // 是否开启代码规范测试
    lint: false,

    dev: {
        // 定义开发环境下编译过程替换的变量
        define: {
            'API_TEST': '/api/test'
        }
    },
    testing: {
        // 定义测试环境下编译过程替换的变量
        define: {
            'API_TEST': '//192.168.0.1/api/test'
        }
    },
    prod: {
        // 定义生产环境下编译过程替换的变量
        define: {
            'API_TEST': '//192.168.1.1/api/test'
        }
    }
});

// @see https://boijs.github.io/docs/#/_config-style
boi.spec('style', {
    ext: 'scss',
    source: 'style',
    output: 'style',
    useHash: true,
    // 是否自动补全hack前缀
    autoprefix: false,
    // 是否导出css文件
    extract: true,
    // 是否启用CSS Sprites自动生成功能

    sprites: {
        // 散列图片目录
        source: 'icons',
        // 是否根据子目录分别编译输出
        split: true,
        // 是否识别retina命名标识
        retina: true
    }

});

// @see https://boijs.github.io/docs/#/_config-html
boi.spec('html', {
    ext: 'html',
    // 模板引擎，默认为html
    engine: 'html',
    source: './',
    output: './',
    mainFilePrefix: 'index',
    // 编译输出的html文件是否去除mainFilePrefix前缀
    removePrefixAfterBuilt: true,
    // 资源定位策略
    staticLocateMode: 'loose'
});

// @see https://boijs.github.io/docs/#/_config-image
boi.spec('image', {
    ext: ['png', 'jpg', 'gif', 'jpeg'],
    output: 'assets',
    useHash: true,
    // 是否对小尺寸图片进行base64编码
    base64: true,
    // 应用base64编码图片的体积临界值，小于此值得图片会被base64编码
    base64Limit: 10000
});

// @see https://boijs.github.io/docs/#/_devserver
boi.serve({
    port: 8888
});

// @see https://boijs.github.io/docs/#/_mock
require('./boi-mock.js');

// @see https://boijs.github.io/docs/#/_deploy
boi.deploy({
    testing: {
        // cdn字段会影响编译输出的静态资源url
        cdn: {
            domain: 'test.boi.com',
            path: '/es6'
        },
        connect: {
            type: 'sftp',
            config: {
                host: '1.1.1.1',
                path: '/es6',
                auth: {
                    username: 'admin',
                    password: '123456'
                }
            }
        },
    },
    prod: {
        cdn: {
            domain: 'static.boi.com',
            path: '/es6'
        },
        connect: {
            type: 'sftp',
            config: {
                host: '1.1.1.1',
                path: '/es6',
                auth: {
                    username: 'admin',
                    password: '123456'
                }
            }
        }
    }
});