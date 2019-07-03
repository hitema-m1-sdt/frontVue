<template>
    <div class="col-9 mx-auto">
        <h1>Compétitions</h1>
        <table class="table table-bordered">
            <tr>
                <th>Catégorie</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Date et horaire</th>
            </tr>
            <tr v-for="tournament in tournaments">
                <td> {{tournament.idCategory}}</td>
                <td> {{tournament.name}}</td>
                <td> {{tournament.localisation}}</td>
                <td> {{tournament.DateHour}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "TournamentsComponent",
        data() {
            return{
            tournaments: []
        }
        },
        methods:{
            getUsers() {
                this.$http({
                    url: `tournament/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.tournaments = res.data;
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
