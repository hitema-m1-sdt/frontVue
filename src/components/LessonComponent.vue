<template>
    <div class="col-9 mx-auto">
        <h1>Leçons</h1>
        <table class="table table-bordered">
            <tr>
                <th>Maitre armes</th>
                <th>Tireur</th>
                <th>Comment</th>
            </tr>

            <tr v-for="lesson in lessons">
                <td> {{lesson.idCombatInstructor}}</td>
                <td> {{lesson.idShooter}}</td>
                <td> {{lesson.comment}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "LessonComponent",
        data() {
            return{
            lessons: []
        }
        },
        methods:{
            getTrainings() {
                this.$http({
                    url: `lesson/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.lessons = res.data;
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
