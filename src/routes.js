import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "@/components/LoginComponent";
import ObjectivesComponent from "@/components/ObjectivesComponent";
import TrainingComponent from "@/components/TrainingComponent";
import LessonComponent from "@/components/LessonComponent";
import TournamentComponent from "@/components/TournamentComponent";
Vue.use(VueRouter);
// routes
const routes = [
    { name:"login", path: '/', component: LoginComponent, meta: {
            auth: false
        } },
    { name: "objectifs", path: '/objectifs', component: ObjectivesComponent },
    { name: "entrainements", path: '/entrainements',   component: TrainingComponent },
    { name: "leçons", path: '/leçons',   component: LessonComponent },
    { name: "competition", path: '/competition',   component: TournamentComponent },
];


const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router
