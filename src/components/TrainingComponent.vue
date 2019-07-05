<template>
    <div>
        <div class="col-9 mx-auto" v-if="this.$auth.user.role === 'ADMIN'">
            <h1>Entraînements</h1>

            <b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-create')">
                Ajouter des entraînements
            </b-button>
            <br /> <br />


            <div class="table-wrapper-scroll-y my-custom-scrollbar"  v-if="trainings.length > 0">
                <table class="table table-bordered">
                    <tr>
                        <th>Jour</th>
                        <th>Heure</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    <tr v-for="training in trainings">
                        <td> {{new Date(training.date)|dateFormat('DD/MM/YYYY')}}</td>
                        <td> {{new Date(training.date)|dateFormat('HH:mm')}}</td>
                        <td> {{ training.type }}</td>
                        <td>
                            <b-button variant="success" @click="$bvModal.show('bv-modal-edit'), editTraining(training.id)"><font-awesome-icon icon="edit" /></b-button>
                            |
                            <b-button variant="danger" @click="deleteTraining(training.id)"><font-awesome-icon icon="trash" /></b-button>
                        </td>
                    </tr>
                </table>
            </div>
            <h4 v-else>Aucun entraînement</h4>


            <b-modal id="bv-modal-create" hide-footer>
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

                        <b-button type="submit" @click="$bvModal.hide('bv-modal-create')" variant="primary">Envoyer</b-button>&nbsp;
                        <b-button type="reset" variant="danger">Réinitialiser</b-button>
                    </b-form>
                    <!--  <b-card class="mt-3" header="Form Data Result">
                        <pre class="m-0">{{ form }}</pre>
                      </b-card>-->

                    <!-----FIN FORMULAIRE MODAL ------>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-create')">Fermer</b-button>
            </b-modal>

            <!-- UPDATE -->

            <b-modal id="bv-modal-edit" hide-footer>
                <template slot="modal-title">
                    Modifier entraînement
                </template>
                <div class="d-block text-center">
                    <!-----DEBUT FORMULAIRE MODAL ------>

                    <b-form v-if="show">

                        <b-form-group id="input-group-1" label="Type:" label-for="input-1">
                            <b-form-select v-model="formUpdate.type" :options="form.types"></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Jour:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="formUpdate.date"
                                    type="date"
                                    required
                            ></b-form-input>
                        </b-form-group>


                        <b-form-group id="input-group-4" label="Heure entraînement:" label-for="input-4">
                            <b-form-input
                                    id="input-4"
                                    v-model="formUpdate.time"
                                    type="time"
                                    required
                            ></b-form-input>
                        </b-form-group>


                        <b-button type="submit" @click="$bvModal.hide('bv-modal-edit'), updateTraining(formUpdate.id)" variant="primary">Envoyer</b-button>&nbsp
                    </b-form>

                    <!-----FIN FORMULAIRE MODAL ------>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-edit')">Fermer</b-button>
            </b-modal>



        </div vi>
        <div class="col-9 mx-auto" v-if="this.$auth.user.role === 'TIREUR'">
            <h1>Entraînements du jour</h1>
            <div class="table-wrapper-scroll-y my-custom-scrollbar"  v-if="trainingsOfTheDay.length > 0">
                <table class="table table-bordered">
                    <tr>
                        <th>Jour</th>
                        <th>Heure</th>
                        <th>Type</th>
                        <th>Présent</th>
                    </tr>
                    <tr v-for="training in trainingsOfTheDay">
                        <td> {{new Date(training.date)|dateFormat('DD/MM/YYYY')}}</td>
                        <td> {{new Date(training.date)|dateFormat('HH:mm')}}</td>
                        <td> {{ training.type }}</td>
                        <td>


                            <b-button variant="success" v-if="training.attendances.length === 0" v-on:click="validateAttendance(training.id)" >Valider présence</b-button>
                            <span v-else><font-awesome-icon icon="check" /></span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "TrainingComponent",
        data() {
            return{
                trainings: [],
                trainingsOfTheDay: [],
                userAttendances: [],
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
                formUpdate: {
                    date: null,
                    type: null,
                    time: null,
                    id: null
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
            getTrainingsofTheDay()
            {
                this.$http({
                    url: `training/today/${this.$auth.user.id}`,
                    method: 'GET'
                })
                    .then((res) => {
                      this.trainingsOfTheDay = res.data;
                    }, () => {
                        this.has_error = true
                    })
            },
            validateAttendance($id)
            {
                var init = this;
                this.$http.post(`/attendance/create`,{
                    user: init.$auth.user.id,
                    training: $id

                }) .then(function () {
                        init.getTrainingsofTheDay();
                    });
            },
            editTraining($id){
                var init = this;
                this.$http.get(`training/get/${$id}`) .then((res) => {

                    init.formUpdate.type =  res.data.type;

                    let dateTime = new Date(res.data.date);
                    let date = dateTime.toISOString().slice(0,10);

                    init.formUpdate.date = date;
                    

                    let time = `${dateTime.getHours()}:${(dateTime.getMinutes()<10?'0':'')+dateTime.getMinutes()}`;

                    init.formUpdate.time = time;

                    this.formUpdate.id = $id;


                });
            },
            updateTraining($id){
                var init = this;
                this.formUpdate.id = null;
                //console.log(id);
                this.$http.post(`/training/update/${$id}`,{
                    type: this.formUpdate.type,
                    date: this.formUpdate.date,
                    time: this.formUpdate.time


                }).then(function () {
                    init.getTrainings();
                });
            },
            deleteTraining($id){
                var init = this;
                this.$http({
                    url: `training/delete/${$id}`,
                    method: 'GET'
                })
                    .then(() => {
                        init.getTrainings();
                    }, () => {
                        this.has_error = true
                    })
            },
            onSubmit(evt) {
                var init = this;
                evt.preventDefault()
                this.$http.post('training/create',{
                    startDate: this.form.startDate,
                    endDate: this.form.endDate,
                    days: this.form.selectedDays,
                    type: this.form.type,
                    time: this.form.time
                }).then(function () {
                    init.getTrainings();
                    init.resetFields();
                },function () {

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
            if(this.$auth.user.role === 'ADMIN')
                this.getTrainings();
            if(this.$auth.user.role === 'TIREUR'){
                this.getTrainingsofTheDay();
            }

        },
        mounted() {

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
