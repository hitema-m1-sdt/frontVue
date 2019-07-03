<template>

    <div>
        <div class="col-9 mx-auto" v-if="!showTraining">
            <h1>Menu</h1>
            <div>
                <ul class="list-group shadow p-3 mb-5 bg-white rounded">

                    <li class="list-group-item">

                        <font-awesome-icon icon="bullseye" />
                        Objectifs

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="walking" />
                        <a href="#" v-on:click="showComponent()">Entraînements</a>

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="scroll" />
                        Leçons

                    </li>

                    <li class="list-group-item">

                        <font-awesome-icon icon="trophy" />
                        Compétitions

                    </li>
                </ul>
            </div>
        </div>

        <div class="col-9 mx-auto">
            <TrainingComponent v-if="showTraining"></TrainingComponent>
        </div>
    </div>


</template>

<script>
    import TrainingComponent from "./TrainingComponent";
    export default {
        name: "DashboardComponent",
        components: {TrainingComponent},
        data() {
            return {
                showTraining: false
            }
        },
        methods: {
            showComponent(){
                this.showTraining = !this.showTraining
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
