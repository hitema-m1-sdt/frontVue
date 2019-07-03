<template>
    <div class="col-9 mx-auto">
        <h1>Entraînements</h1>
        <table class="table table-bordered">
            <tr>
                <th>Jour</th>
                <th>Heure de début</th>
                <th>Heure de fin</th>
            </tr>
            <tr v-for="training in trainings">
                <td> {{new Date(training.startDate)|dateFormat('DD/MM/YYYY')}}</td>
                <td> {{new Date(training.startDate)|dateFormat('HH:mm')}}</td>
                <td> {{new Date(training.endDate)|dateFormat('HH:mm')}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "TrainingComponent",
        data() {
            return{
            trainings: []
        }
        },
        methods:{
            getUsers() {
                this.$http({
                    url: `training/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.trainings = res.data;
                    }, () => {
                        this.has_error = true
                    })
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>

</style>
