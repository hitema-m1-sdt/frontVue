<template>

    <div>
        <div class="col-9 mx-auto"  v-if="this.$auth.user.role === 'ADMIN'">
            <h1>Compétitions</h1><b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-createtournament')">Ajouter un compétition</b-button><br /><br />
            <table class="table table-bordered">
                <tr>
                    <th>Catégorie</th>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Date et horaire</th>
                    <th>Arme</th>
                    <th>Genre</th>
                    <th>Niveau</th>
                    <th>Action</th>
                </tr>
                <tr v-for="tournament in tournaments">
                    <td> {{tournament.categories}}</td>
                    <td> {{tournament.name}}</td>
                    <td> {{tournament.localisation}}</td>
                    <td> {{tournament.date}} {{tournament.hour}}</td>
                    <td> {{tournament.arm}}</td>
                    <td> {{tournament.gender}}</td>
                    <td> {{tournament.level}}</td>
                    <td> <b-button variant="success" @click="$bvModal.show('bv-modal-updatetournament'), editTournament(tournament.id)"><font-awesome-icon icon="edit" /></b-button> | <b-button variant="danger" @click="deleteTournament(tournament.id)"><font-awesome-icon icon="trash" /></b-button></td>
                </tr>
            </table>

            <b-modal id="bv-modal-createtournament" hide-footer v-if="form.categories != []">
                <template slot="modal-title">
                    Ajouter une compétition
                </template>
                <div class="d-block text-center">
                    <!----------------------DEBUT FORM MODAL-------------->
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group id="input-group-1" label="Nom de la compétition" label-for="input-1">
                            <b-form-input
                                    id="input-1"
                                    v-model="form.name"
                                    required
                                    placeholder="Entrer nom"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Localisation:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.address"
                                    required
                                    placeholder="Enter name"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Catégories:" label-for="checkbox-group-1">
                            <b-form-checkbox-group
                                    id="checkbox-group-1"
                                    v-model="form.selectedCategories"
                                    :options="form.categories"
                                    name="flavour-1"
                            ></b-form-checkbox-group>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Date:" label-for="input-3">
                            <b-form-input
                                    id="input-3"
                                    v-model="form.date"
                                    type="date"
                                    required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Heure:" label-for="input-4">
                            <b-form-input
                                    id="input-4"
                                    v-model="form.time"
                                    type="time"
                                    required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5" label="Arme:" label-for="input-5">
                            <b-form-select
                                    id="input-5"
                                    v-model="form.arm"
                                    :options="arms"
                                    required
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-6" label="Genre:" label-for="input-6">
                            <b-form-select
                                    id="input-6"
                                    v-model="form.gender"
                                    :options="genders"
                                    required
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-7" label="Niveau:" label-for="input-7">
                            <b-form-select
                                    id="input-7"
                                    v-model="form.level"
                                    :options="levels"
                                    required
                            ></b-form-select>
                        </b-form-group>

                        <b-button type="submit" variant="primary" @click="$bvModal.hide('bv-modal-createtournament')">Envoyer</b-button>
                        <b-button type="reset" variant="danger">Réinitialiser</b-button>
                    </b-form>
                    <!----------------------FIN FORM MODAL-------------->
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-createtournament')">Fermer</b-button>
            </b-modal>

            <b-modal id="bv-modal-updatetournament" hide-footer v-if="form.categories != []">
                <template slot="modal-title">
                    Modifier une compétition
                </template>
                <div class="d-block text-center">
                    <!----------------------DEBUT FORM MODAL-------------->
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group id="input-group-1" label="Nom de la compétition" label-for="input-1">
                            <b-form-input
                                    id="input-1"
                                    v-model="form.name"
                                    required
                                    placeholder="Entrer nom"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Localisation:" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.address"
                                    required
                                    placeholder="Enter name"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Catégories:" label-for="checkbox-group-1">
                            <b-form-checkbox-group
                                    id="checkbox-group-1"
                                    v-model="form.selectedCategories"
                                    :options="form.categories"
                                    name="flavour-1"
                            ></b-form-checkbox-group>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Date:" label-for="input-3">
                            <b-form-input
                                    id="input-3"
                                    v-model="form.date"
                                    type="date"
                                    required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Heure:" label-for="input-4">
                            <b-form-input
                                    id="input-4"
                                    v-model="form.time"
                                    type="time"
                                    required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-5" label="Arme:" label-for="input-5">
                            <b-form-select
                                    id="input-5"
                                    v-model="form.arm"
                                    :options="arms"
                                    required
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-6" label="Genre:" label-for="input-6">
                            <b-form-select
                                    id="input-6"
                                    v-model="form.gender"
                                    :options="genders"
                                    required
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-7" label="Niveau:" label-for="input-7">
                            <b-form-select
                                    id="input-7"
                                    v-model="form.level"
                                    :options="levels"
                                    required
                            ></b-form-select>
                        </b-form-group>
                        <b-button type="submit" variant="primary" @click="$bvModal.hide('bv-modal-updatetournament')">Envoyer</b-button>
                    </b-form>
                    <!----------------------FIN FORM MODAL-------------->
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-updatetournament')">Fermer</b-button>
            </b-modal>

        </div>
        <div class="col9 mx-auto" v-if="this.$auth.user.role === 'TIREUR' || this.$auth.user.role === 'MAITRE'">
            <h1>Compétitions</h1>
            <table class="table table-bordered">
                <tr>
                    <th>Catégorie</th>
                    <th>Nom</th>
                    <th>Adresse</th>
                    <th>Date et horaire</th>
                    <th>Inscrit</th>
                </tr>
                <tr v-for="tournament in tournamentsWithParticipants">
                    <td> {{tournament.categories}}</td>
                    <td> {{tournament.name}}</td>
                    <td> {{tournament.localisation}}</td>
                    <td> {{tournament.date}} {{tournament.hour}}</td>
                    <td>
                        <b-button variant="success" v-if="tournament.participants.length === 0" @click="validateParticipation(tournament.id)"><font-awesome-icon icon="sign-in-alt" />S'inscrire</b-button>
                        <span v-else><font-awesome-icon icon="check" /></span>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
    export default {
        name: "TournamentsComponent",
        data() {
            return{
            tournaments: [],
                tournamentsWithParticipants: [],
            form: {
          name: '',
          address: '',
          categories: [{text: "M7", value: "M7"},
                       {text: "M9", value: "M9"},
                       {text: "M11", value: "M11"},
                       {text: "M13", value: "M13"},
                       {text: "M15", value: "M15"},
                       {text: "M17", value: "M17"},
                       {text: "M20", value: "M20"},
                       {text: "Sénior", value: "Sénior"}],
          gender: '',
          arm: '',
          level: '',
          selectedCategories: [],
          date: '',
          time: '',
        },
        genders:[{text: "Homme", value: "Homme"},
                {text: "Dame", value: "Dame"},
              {text: "Mixe", value: "Mixe"},],
        arms:[  {text: "Epée", value: "Epée"},
                {text: "Sabre", value: "Sabre"},
                {text: "Fleuret", value: "Fleuret"}],
        levels:[{text: "Challenge / Open", value: "Challenge / Open"},
                {text: "Départementale", value: "Départementale"},
                {text: "Événement", value: "Événement"},
                {text: "Nationale", value: "Nationale"}],
        show: false,
        }
        },
        methods:{
            getTournaments() {
                this.$http({
                    url: `tournament/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.tournaments = res.data;
                    }, () => {
                        this.has_error = true
                    })
            },
            getTournamentsWithParticipant($id){
                this.$http({
                    url: `tournament/get/participant/${$id}`,
                    method: 'GET'
                })
                    .then((res) => {
                        this.tournamentsWithParticipants = res.data;
                    }, () => {
                        this.has_error = true
                    })
            },
            validateParticipation($id)
            {

                console.log($id);
                var init = this;
                this.$http.post(`/tournament/signup`,{
                    user: init.$auth.user.id,
                    tournament: $id

                }) .then(function () {
                    init.getTournamentsWithParticipant(init.$auth.user.id);
                });
            },
            getCategories(){
              var init = this;
              this.$http({
                  url: `category/getall`,
                  method: 'GET'
              })
                  .then((res) => {
                      init.categories = [];
                     for(var i = 0; i < res.data.length; i++){
                        init.categories.push({text: res.data[i].name, value: res.data[i].id});
                     }
                     init.show = true;
                  }, () => {
                      this.has_error = true
                  })
            },
            deleteTournament(id){
              var init = this;
              this.$http({
                  url: `tournament/delete/${id}`,
                  method: 'GET'
              })
                  .then((res) => {
                    console.log(res);
                    init.getTournaments();
                  }, () => {
                      this.has_error = true
                  })
            },
            onSubmit(evt) {
            evt.preventDefault()
            //alert(JSON.stringify(this.form));
            var init = this;
              evt.preventDefault()
              //alert(JSON.stringify(this.form));
              this.$http.post('tournament/create',{
                            categories: this.form.selectedCategories.toString(),
                            name: this.form.name,
                            localisation: this.form.address,
                            date: this.form.date,
                            hour: this.form.time,
                            arm: this.form.arm,
                            gender: this.form.gender,
                            level: this.form.level,
              }).then(function (response) {
                init.getTournaments();
                  console.log(response.data);
                },function (response) {
                  alert("ERREUR ESSAYE ENCORE")
                  //console.log(response)
                });
          },
          onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
              this.show = true
            })
          },
        },
        mounted() {
            this.getTournaments();
            this.getTournamentsWithParticipant(this.$auth.user.id);
            this.getCategories();
        },
    }
</script>

<style scoped>

</style>
