<template>
    <div class="col-9 mx-auto">
        <h1>Entraînements</h1>
        <table class="table table-bordered">
            <tr>
                <th>Jour</th>
                <th>Heure de début</th>
                <th>Heure de fin</th>
            </tr>
            <tr>

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
        mounted()
        {
            console.info(this.$auth.token)
        }
    }
</script>

<style scoped>

</style>
