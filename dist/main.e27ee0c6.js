// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $('.siteList li:last'); // 将缓存放入x

var c = localStorage.getItem('c'); // 将字符串转换成对象

var cObject = JSON.parse(c); // 若缓存为空则将之前创建好的放入hashmap

var hashMap = cObject || [{
  logo: 'Z',
  url: 'https://www.zhihu.com/'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}]; // 简化url，将显示的http，https，www去掉

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 正则表达式，不会可以搜索”正则表达式三十分钟入门“
};

$('.addButton').on('click', function () {
  var url = window.prompt('请输入想要添加的网址');

  if (url.indexOf('http') !== 0) {
    url = "https://" + url;
  } // console.log(url)


  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

var render = function render() {
  // $siteList.find('li:not(.last)').remove()
  // 找到最后一个元素之前li全部移除
  $siteList.find('li:last').prevAll().remove(); // 将之前缓存的先移除再渲染,上面两条语句都行

  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n     <div class=\"site\">\n        <div class=\"logo\">\n             ".concat(node.logo, "\n        </div>\n        <div class=\"link\">\n             ").concat(simplifyUrl(node.url), "\n        </div>\n        <div class=\"close\">   \n            <svg class=\"icon\" aria-hidden=\"true\">\n                <use xlink:href=\"#icon-close\"></use>\n            </svg>\n         </div> \n     </div>\n</li>")).insertBefore($lastLi); // 创建一个新节点并将其放入lastLi之前

    $li.on('click', function () {
      window.open(node.url);
    }); // 点击打开网页

    $li.on('click', '.close', function (e) {
      e.stopPropagation(); // 阻止冒泡

      hashMap.splice(index, 1);
      render(); // 重新渲染
    }); // 点击删除缓存好的站点 
  });
};

render(); // 渲染初始页面

window.addEventListener('beforeunload', function () {
  // 当窗口即将被卸载（关闭）时,会触发该事件.
  var string = JSON.stringify(hashMap); // 将hashMap对象转换成字符串

  localStorage.setItem('c', string); // 将字符串存到本地x中，本地存储只能存字符串
}); // 键盘打开网站,不要了，和搜索冲突
// $(document).on('keypress', (e) => {
//     const { key } = e
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toUpperCase() === key) {
//             window.open(hashMap[i].url)
//         }
//     }
// })
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e27ee0c6.js.map