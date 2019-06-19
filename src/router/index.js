import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import GuestType from '@/components/guestType/list'
import Floor from '@/components/floor/list'
import Leaguer from '@/components/leaguer/list'
import User from '@/components/user/list'
import Goods from '@/components/goods/list'
import GoodsType from '@/components/goodsType/list'
import Rooms from '@/components/rooms/list'
import Orderlist from '@/components/orderlist/list'
import OrderManage from '@/components/orderManage/list'
import ChangeRoom from '@/components/ChangeRoom/list'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {
          path:'/guestType',
          name:'guestType',
          component:GuestType
        },
        {
          path:'/floor',
          name:'floor',
          component:Floor
        },
        {
          path:'/leaguer',
          name:'leaguer',
          component:Leaguer
        },
        {
          path:'/user',
          name:'user',
          component:User
        },
        {
          path:'/goodsType',
          name:'goodsType',
          component:GoodsType
        },
        {
          path:'/goods',
          name:'goods',
          component:Goods
        },
        {
          path:'/rooms',
          name:'rooms',
          component:Rooms
        },
        {
          path:'/orderManage',
          name:'orderManage',
          component:OrderManage
        },
        {
          path:'/orderlist',
          name:'orderlist',
          component:Orderlist
        },
        {
          path:'/ChangeRoom',
          name:'ChangeRoom',
          component:ChangeRoom
        }
      ]
    }
  ]
})
