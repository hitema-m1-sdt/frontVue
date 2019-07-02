import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "@/components/LoginComponent";
import ObjectifsComponent from "@/components/ObjectifsComponent";
Vue.use(VueRouter);
// routes
const routes = [
    { name:"login", path: '/', component: LoginComponent, meta: {
            auth: false
        } },
    { name: "objectifs", path: '/objectifs', component: ObjectifsComponent }
];


const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router
