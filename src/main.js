const $siteList = $('.siteList')
let $lastLi = $('.siteList li:last')
// 将缓存放入x
const c = localStorage.getItem('c')
// 将字符串转换成对象
const cObject = JSON.parse(c)
// 若缓存为空则将之前创建好的放入hashmap
const hashMap = cObject || [
    { logo: 'Z', url: 'https://www.zhihu.com/' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
// 简化url，将显示的http，https，www去掉
let simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
    // 正则表达式，不会可以搜索”正则表达式三十分钟入门“
}

$('.addButton').on('click', () => {
    let url = window.prompt('请输入想要添加的网址')

    if (url.indexOf('http') !== 0) {
        url = "https://" + url
    }
    // console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})

let render = () => {
    // $siteList.find('li:not(.last)').remove()
    // 找到最后一个元素之前li全部移除
    $siteList.find('li:last').prevAll().remove()
    // 将之前缓存的先移除再渲染,上面两条语句都行
    hashMap.forEach((node, index) => {
        let $li = $(`<li>
     <div class="site">
        <div class="logo">
             ${node.logo}
        </div>
        <div class="link">
             ${simplifyUrl(node.url)}
        </div>
        <div class="close">   
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
            </svg>
         </div> 
     </div>
</li>`).insertBefore($lastLi)
        // 创建一个新节点并将其放入lastLi之前
        $li.on('click', () => {
            window.open(node.url)
        })
        // 点击打开网页
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
            // 重新渲染
        })
        // 点击删除缓存好的站点 
    })
}
render()
// 渲染初始页面
window.addEventListener('beforeunload', () => {
    // 当窗口即将被卸载（关闭）时,会触发该事件.
    const string = JSON.stringify(hashMap)
    // 将hashMap对象转换成字符串
    localStorage.setItem('c', string)
    // 将字符串存到本地x中，本地存储只能存字符串
})
// 键盘打开网站,不要了，和搜索冲突
// $(document).on('keypress', (e) => {
//     const { key } = e
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toUpperCase() === key) {
//             window.open(hashMap[i].url)
//         }
//     }
// })