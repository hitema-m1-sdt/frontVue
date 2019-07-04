<template>

    <div>
        <div class="col-9 mx-auto" v-if="!showTraining">
            <h1>Menu</h1>
            <div>
                <ul class="list-group shadow p-3 mb-5 bg-white rounded">

                    <li class="list-group-item">

                        <font-awesome-icon icon="bullseye" />
                        <a href="#" v-on:click="showobj()">Objectifs</a>

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="walking" />
                        <a href="#" v-on:click="showtrng()">Entraînements</a>

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="scroll" />
                        <a href="#" v-on:click="showlsn()">Leçons</a>
                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="trophy" />
                        <a href="#" v-on:click="showtrn()">Compétitions</a>

                    </li>
                </ul>
            </div>
        </div>

        <div class="col-9 mx-auto">
            <TrainingComponent v-if="showTraining"></TrainingComponent>
            <ObjectivesComponent v-if="showObjectives"></ObjectivesComponent>
            <LessonComponent v-if="showLesson"></LessonComponent>
            <TournamentComponent v-if="showTournament"></TournamentComponent>
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
              showTraining: false,
              showObjectives: false,
              showLesson: false,
              showTournament: false,
            }
        },
        methods: {
            showComponent(option){
            //this.showTraining = !this.showTraining;
            },
            showtrng(){
              this.showTraining = !this.showTraining;
            },
            showobj(){
              this.showObjectives = !this.showObjectives;
            },
            showlsn(){
              this.showLesson = !this.showLesson;
            },
            showtrn(){
              this.showTournament = !this.showTournament;
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
