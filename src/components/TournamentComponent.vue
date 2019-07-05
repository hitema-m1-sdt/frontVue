<template>
    <div class="col-9 mx-auto">
        <h1>Compétitions</h1><b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-createtournament')">Ajouter un compétition</b-button><br /><br />
        <table class="table table-bordered">
            <tr>
                <th>Catégorie</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Date et horaire</th>
                <th>Action</th>
            </tr>
            <tr v-for="tournament in tournaments">
                <td> {{tournament.categories}}</td>
                <td> {{tournament.name}}</td>
                <td> {{tournament.localisation}}</td>
                <td> {{tournament.date}} {{tournament.hour}}</td>
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

<b-button type="submit" variant="primary" @click="$bvModal.hide('bv-modal-updatetournament')">Envoyer</b-button>
</b-form>
<!----------------------FIN FORM MODAL-------------->
</div>
<b-button class="mt-3" block @click="$bvModal.hide('bv-modal-updatetournament')">Fermer</b-button>
</b-modal>

    </div>
</template>

<script>
    export default {
        name: "TournamentsComponent",
        data() {
            return{
            tournaments: [],
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
                       {text: "Sénior", value: "Sénior"},],
          selectedCategories: [],
          date: '',
          time: '',
        },
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
            this.getCategories();
        },
    }
</script>

<style scoped>

</style>
