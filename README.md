# 一个基于vue的移动端新闻站点演示DEMO

### 演示地址： http://news.huyadd.com

## 特性
- 实验了一种新的小格布局方式，这是从设计阶段就开始的介入，你可以看到 less 文件中使用了诸如@1、@6这样的以变量单位（@1为一个格子，同理@6就是6格），后面会被编译为 vw 单位
- 符合空间逻辑的全局动画效果，这一点也是一开始设计时就定下的，绝大部分动画使用 vue 的 transition 组件实现


## 技术栈
- vue全家桶
    - vue2
    - vue-router
    - vuex
- 数据
    - Axios
    - mockjs (dev)
- 预处理器
    - less
- 其他
    - lodash
    - momentjs
    - vuex-persist

## 数据源
- 新闻数据采集自 ifanr 爱范儿，共30条，仅用于学习目的，为演示效果对图片和新闻长度会有少量调整

## 一些小特性
- 登录界面中输入手机号格式实现了实时动态验证
- 验证码的倒计时具备抗刷新能力，刷新页面、关闭浏览器倒计时不受影响

## 登录
- demo使用任意符合格式的手机号和验证码登录

## 存在的问题
- 整体效果是自己设计自己写的，很多想法没有现成的案例可以参照，困难程度超过了之前的预期不少。在页面的切换过渡当中，单纯增加一点过渡效果很容易，但为了“符合空间逻辑”就需要牵扯到大量的判断，为了动画中的一些的细节处理尽可能完美，还会引入更多的判断，比最初预想的要复杂许多，目前这些用于动画的逻辑分散的写在内容组件、store、路由公共的导航守卫中，对可维护性来说是非常不利的，后面会把动画组件单独抽象出来，与其他部分解耦


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```