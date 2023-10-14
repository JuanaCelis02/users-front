export default {

    name: 'homeadmin',
    component: () => import(/* webpackChunkName: "homeadmin" */ '@/modules/Home/layouts/HomeAdmin.vue'),
    children: [

    ]
}