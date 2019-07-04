<template>
    <div class="col-9 mx-auto">
        <h1>Objectifs</h1>
        <table class="table table-bordered">
            <tr>
                <th>Tireur</th>
                <th>Nom objectif</th>
                <th>Compétence</th>
                <th>Commentaire</th>
            </tr>
            <tr v-for="objective in objectives">
                <td> {{objective.idShooter}}</td>
                <td> {{objective.objectiveName}}</td>
                <td> {{objective.knowledge}}</td>
                <td> {{objective.comment}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "ObjectivesComponent",
        data() {
            return{
            objectives: []
        }
        },
        methods:{
            getTrainings() {
                this.$http({
                    url: `objective/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.objectives = res.data;
                    }, () => {
                        this.has_error = true
                    })
            }
        },
        mounted() {
            this.getTrainings();
        }
    }
</script>

<style scoped>

</style>
