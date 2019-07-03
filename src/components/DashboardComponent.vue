<template>
    <div class="col-9 mx-auto">
        <h1>Menu</h1>
        <div>
            <ul class="list-group shadow p-3 mb-5 bg-white rounded">
                <li class="list-group-item">
                    <font-awesome-icon icon="bullseye" />
                    Objectifs
                </li>
                <li class="list-group-item">
                    <font-awesome-icon icon="walking" />
                    <router-link to="/entrainements" >
                        Entraînements
                    </router-link>
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

</template>

<script>
    export default {
        name: "DashboardComponent"
    }
</script>

<style scoped>

</style>
