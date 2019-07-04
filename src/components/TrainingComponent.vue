<template>
    <div class="col-9 mx-auto">
        <h1>Entraînements</h1>

        <div class="table-wrapper-scroll-y my-custom-scrollbar"  v-if="trainings.length > 0">
        <table class="table table-bordered">
            <tr>
                <th>Jour</th>
                <th>Heure</th>
                <th>Type</th>
            </tr>
            <tr v-for="training in trainings">
                <td> {{new Date(training.date)|dateFormat('DD/MM/YYYY')}}</td>
                <td> {{new Date(training.date)|dateFormat('HH:mm')}}</td>
                <td> {{ training.type }}</td>
            </tr>
        </table>
        </div>
        <h4 v-else>Aucun entraînement</h4>

        <b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-example')">
            Ajouter des entraînements
        </b-button>


        <b-modal id="bv-modal-example" hide-footer>
            <template slot="modal-title">
                Ajouter entraînements sur une période
            </template>
            <div class="d-block text-center">
                <!-----DEBUT FORMULAIRE MODAL ------>

                <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                    <b-form-group id="input-group-1" label="Type:" label-for="input-1">
                    <b-form-select v-model="form.type" :options="form.types"></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Début période:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                v-model="form.startDate"
                                type="date"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Fin période:" label-for="input-3">
                        <b-form-input
                                id="input-3"
                                v-model="form.endDate"
                                type="date"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="Heure entraînements:" label-for="input-4">
                        <b-form-input
                                id="input-4"
                                v-model="form.time"
                                type="time"
                                required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="Jours d'entraînement:" label-for="checkbox-group-1">
                        <b-form-checkbox-group
                                id="checkbox-group-1"
                                v-model="form.selectedDays"
                                :options="form.days"
                                name="flavour-1"
                        ></b-form-checkbox-group>
                    </b-form-group>

                    <b-button type="submit" @click="$bvModal.hide('bv-modal-example')" variant="primary">Envoyer</b-button>&nbsp
                    <b-button type="reset" variant="danger">Réinitialiser</b-button>
                </b-form>
                <!--  <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                  </b-card>-->

                <!-----FIN FORMULAIRE MODAL ------>
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Fermer</b-button>
        </b-modal>


    </div>
</template>

<script>
    export default {
        name: "TrainingComponent",
        data() {
            return{
                trainings: [],
                form: {
                    startDate: null,
                    endDate: null,
                    time: null,
                    days: [
                        {text: 'Lundi', value: 'Mon'},
                        {text: 'Mardi', value: 'Tue'},
                        {text: 'Mercredi', value: 'Wed'},
                        {text: 'Jeudi', value: 'Thu'},
                        {text: 'Vendredi', value: 'Fri'},
                        {text: 'Samedi', value: 'Sat'},
                        {text: 'Dimanche', value: 'Sun'},
                       ],
                    selectedDays: [],
                        types: ['Elite', 'Loisir'],
                        type: null,
                },
                show: true
        }
        },
        methods:{
            getTrainings() {
                this.$http({
                    url: `training/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.trainings = res.data;
                    }, () => {
                        this.has_error = true
                    })
            },
            onSubmit(evt) {
                console.log("ok");
                var init = this;
                evt.preventDefault()
                this.$http.post('training/create',{
                    startDate: this.form.startDate,
                    endDate: this.form.endDate,
                    days: this.form.selectedDays,
                    type: this.form.type,
                    time: this.form.time
                }).then(function (response) {
                    init.getTrainings();
                    init.resetFields();
                    console.log(response.data);
                },function (response) {
                    console.log("ERREUR ESSAYE ENCORE")
                    //console.log(response)
                });
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.resetFields();
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            },
            resetFields()
            {
                this.form.startDate = null;
                this.form.endDate = null;
                this.form.selectedDays = [];
                this.form.time = null;
                this.form.type = null;
            }
        },
        beforeMount() {
            this.getTrainings();
        }
    }
</script>

<style scoped>
    .my-custom-scrollbar {
        position: relative;
        height: 400px;
        overflow: auto;
    }
    .table-wrapper-scroll-y {
        display: block;
    }
</style>
