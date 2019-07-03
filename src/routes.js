import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "@/components/LoginComponent";
import ObjectivesComponent from "@/components/ObjectivesComponent";
import TrainingComponent from "@/components/TrainingComponent"
Vue.use(VueRouter);
// routes
const routes = [
    { name:"login", path: '/', component: LoginComponent, meta: {
            auth: false
        } },
    { name: "objectifs", path: '/objectifs', redirect: "/", component: ObjectivesComponent },
    { name: "entrainements", path: '/entrainements',   component: TrainingComponent }
];


const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router
