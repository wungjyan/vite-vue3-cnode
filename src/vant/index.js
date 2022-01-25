import { Tabbar, TabbarItem, Tab, Tabs, Image as VanImage, Lazyload, List, Icon, PullRefresh } from 'vant'

export function registerVant (app) {
  app.use(Tabbar)
  app.use(TabbarItem)
  app.use(Tab)
  app.use(Tabs)
  app.use(VanImage)
  app.use(Lazyload)
  app.use(List)
  app.use(Icon)
  app.use(PullRefresh)
}
