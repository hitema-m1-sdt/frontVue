<template>

    <div>

        <button v-if="!displayMenu" v-on:click="showMenu()" type="button" class="btn btn-primary btn-lg"><font-awesome-icon icon="arrow-left" /> Retour</button>

        <div class="col-9 mx-auto" v-if="displayMenu">
            <h1>Menu</h1>
            <div>
                <ul class="list-group shadow p-3 mb-5 bg-white rounded">

                    <li class="list-group-item">

                        <font-awesome-icon icon="bullseye" />
                        <a href="#" v-on:click="showObjectives()">Objectifs</a>

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="walking" />
                        <a href="#" v-on:click="showTraining()">Entraînements</a>

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="scroll" />
                        <a href="#" v-on:click="showLesson()">Leçons</a>
                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="trophy" />
                        <a href="#" v-on:click="showTournament()">Compétitions</a>

                    </li>
                </ul>
            </div>
        </div>

        <div class="col-9 mx-auto">
            <TrainingComponent v-if="displayTraining"></TrainingComponent>
            <ObjectivesComponent v-if="displayObjectives"></ObjectivesComponent>
            <LessonComponent v-if="displayLesson"></LessonComponent>
            <TournamentComponent v-if="displayTournament"></TournamentComponent>
        </div>
    </div>


</template>

<script>
    import TrainingComponent from "./TrainingComponent";
    import ObjectivesComponent from "./ObjectivesComponent";
    import LessonComponent from "./LessonComponent";
    import TournamentComponent from "./TournamentComponent";
    export default {
        name: "DashboardComponent",
        components: {
          TrainingComponent,
          ObjectivesComponent,
          LessonComponent,
          TournamentComponent,
        },
        data() {
            return {
              displayMenu:true,
              displayTraining: false,
              displayObjectives: false,
              displayLesson: false,
              displayTournament: false,
            }
        },
        methods: {
            showComponent(option){
            //this.showTraining = !this.showTraining;
            },
            showTraining(){
                this.displayMenu = false;
                this.displayTraining = !this.displayTraining;
            },
            showObjectives(){
                this.displayMenu = false;
                this.displayObjectives = !this.displayObjectives;
            },
            showLesson(){
                this.displayMenu = false;
                this.displayLesson = !this.displayLesson;
            },
            showTournament(){
                this.displayMenu = false;
                this.displayTournament = !this.displayTournament;
            },
            showMenu()
            {
                this.displayMenu = true;
                this.displayTraining = false;
                this.displayObjectives = false;
                this.displayLesson = false;
                this.displayTournament = false;

            },

        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
