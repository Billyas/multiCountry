function main(config) {
    const proxyCount = config?.proxies?.length ?? 0
    const proxyProviderCount =
        typeof config?.['proxy-providers'] === 'object'
            ? Object.keys(config['proxy-providers']).length
            : 0
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error('配置文件中未找到任何代理')
    }

    config['proxies'].push({
        "name": "🇨🇳 CN",
        "type": "vless",
        "server": "1.2.3.4",
        "port": 443,
        "uuid": "640672bf-3245-4f9e-beeb-ff865299f51d",
        "alterId": 0,
        "network": "ws",
        "ws-opts": {
          "path": "/loveCN",
          "headers": { Host: "a.cn" }
        },
        "tls": true,
        "skip-cert-verify": false,
        "sni": "a.cn",
        "client-fingerprint": "chrome"
    })


    config['proxy-groups'].push({
        name: '🇨🇳 国内服务',
        type: 'select',
        proxies: ['DIRECT', '🇨🇳 CN'],
    })


    const douyin = config['proxy-groups'].find((item) => item.name === '📱 抖音服务')
    if (douyin) {
        douyin.proxies.push('🇨🇳 CN')
    }

    return config
}
