const routes = [
    {
        path: '/appliance',
        name: 'appliance',
        component: () =>
            import(/* webpackChunkName: "appliance" */ "@/views/appliance/Index.vue"),
        meta: {
            allowAnonymous: true,
        },
    }
];

export default routes;
