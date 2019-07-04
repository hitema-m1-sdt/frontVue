<template>
    <div class="col-9 mx-auto">
        <h1>Objectifs</h1><b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-example')">+</b-button>
      <table class="table table-bordered">
            <tr>
                <th>Tireurs</th>
                <th>Objectifs</th>
                <th>Acquis</th>
                <th>Commentaires</th>
            </tr>

            <tr v-for="objective in objectives">
                <td> {{objective.idShooter}}</td>
                <td> {{objective.objectiveName}}</td>
                <td> {{objective.knowledge}}</td>
                <td> {{objective.comment}}</td>
            </tr>
        </table>

        <b-modal id="bv-modal-example" hide-footer>
          <template slot="modal-title">
            Ajouter une objectif
          </template>
          <div class="d-block text-center">
            <!-----DEBUBT FORMULAIRE MODAL ------>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Nom du tireur:" label-for="input-1">
        <b-form-select
          id="input-2"
          v-model="form.shooter"
          :options="shooters"
          required
        ></b-form-select>
        </b-form-group>

      <b-form-group id="input-group-2" label="Objectif" label-for="input-2">
        <b-form-input
          type="text"
          id="input-3"
          v-model="form.objective"
          placeholder="Entrez un objectif"
        ></b-form-input>
      </b-form-group>

  <b-form-group id="input-group-3" label="Acquis" label-for="input-3">
            <b-form-checkbox
      id="checkbox-1"
      v-model="form.knowledge"
      name="checkbox-1"
      value="Acquired"
      unchecked-value="not_acquired"
    ></b-form-checkbox>
      </b-form-group>

    <b-form-group id="input-group-4" label="Commentaire:" label-for="input-4">  
       <b-form-textarea
      id="textarea"
      v-model="form.comment"
      placeholder="Entrez un commentaire"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Envoyer</b-button>&nbsp
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
        name: "ObjectivesComponent",
        data() {
            return{
            objectives: [],
            form: {
          shooter: null,
          objective:'',
          knowledge :'',
          comment: '',
        },
        //Attendre que nico finisse l'automatisation
        shooters: [{ text: 'Sélection du tireur', value: null }, { text: 'Jean Yves', value: 1 }, { text: 'Fabrice Wild', value: 2 }, { text: 'Pierre Coper', value: 3 }],
        show: true
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
            },
            onSubmit(evt) {
            var test = this;
              evt.preventDefault()
              //alert(JSON.stringify(this.form));
              this.$http.post('objective/create',{
                            idShooter: this.$auth.user.id,
                            objectiveName: this.form.objective,
                            knowledge: this.form.knowledge,
                            comment: this.form.comment,
              }).then(function (response) {
                test.getUsers();
                  //alert(JSON.stringify(this.form));
                  //console.log(response.data);
                },function (response) {
                  alert("ERREUR ESSAYE ENCORE")
                  //console.log(response)
                });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.shooter = null
        this.form.shooter = []
        this.form.objective = ''
        this.form.knowledge = ''
        this.form.comment = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
        },
        mounted() {
            this.getTrainings();

            this.form.shooter = this.$auth.user.shooter;

        }
    }
</script>

<style scoped>

</style>
