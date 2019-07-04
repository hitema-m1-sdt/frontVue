<template>
    <div class="col-9 mx-auto">
        <h1>Objectifs</h1><b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-example')">+</b-button>
      <table class="table table-bordered">
            <tr>
                <th>Tireurs</th>
                <th>Objectifs</th>
                <th>Acquis</th>
                <th>Commentaires</th>
                <th>Actions</th>
            </tr>

            <tr v-for="objective in objectives">
                <td> {{objective.idShooter}}</td>
                <td> {{objective.objectiveName}}</td>
                <td v-if="objective.knowledge == 1"> Acquis</td>
                <td v-else> Non Acquis</td>
                <td> {{objective.comment}}</td>
                  <td> <b-button variant="success" @click="$bvModal.show('bv-modal-updateobjective'), editObjectives(objective.id)"><font-awesome-icon icon="edit" /></b-button> | <b-button variant="danger" @click="deleteObjectives(objective.id)"><font-awesome-icon icon="trash" /></b-button></td>
            </tr>
        </table>

        <b-modal id="bv-modal-updateobjective" hide-footer>
          <template slot="modal-title">
            Modifier l'objectif
          </template>
          <div class="d-block text-center">
            <!-----DEBUBT FORMULAIRE MODAL ------>
            <b-form @reset="onReset" v-if="show">

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
              value="1"
              unchecked-value="0"
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

              <b-button type="submit" variant="primary" @click="$bvModal.hide('bv-modal-updateobjective'), updateObjectives(objectiveupdateid)">Mettre à jour</b-button>&nbsp
            </b-form>

            <!-----FIN FORMULAIRE MODAL ------>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-updateobjective')">Fermer</b-button>
        </b-modal>

        <b-modal id="bv-modal-example" hide-footer>
          <template slot="modal-title">
            Ajouter un objectif
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
      value="1"
      unchecked-value="0"
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

      <b-button type="submit" variant="primary" @click="$bvModal.hide('bv-modal-example')">Envoyer</b-button>&nbsp
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
        objectiveupdateid: null,
        //Attendre que nico finisse l'automatisation
        shooters: [{ text: 'Sélection du tireur', value: null }, { text: 'Jean Yves', value: 1 }, { text: 'Fabrice Wild', value: 2 }, { text: 'Pierre Coper', value: 3 }],
        show: true
        }
        },
        methods:{
            getObjectives() {
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
            editObjectives(id){
              this.$http({
                  url: `objective/get/${id}`,
                  method: 'GET'
              })
                  .then((res) => {
                     this.form.shooter=this.$auth.user.id,
                     this.form.objective=res.data.objectiveName,
                     this.form.knowledge=res.data.knowledge,
                     this.form.comment=res.data.comment,
                     this.objectiveupdateid = id;
                  }, () => {
                      this.has_error = true
                  })
            },
            updateObjectives(id){
              var init = this;
              //console.log(id);
              this.objectiveupdateid = null;
              this.$http.put(`/objective/update/${id}`,{
                    idShooter: this.form.shooter,
                    objectiveName: this.form.objective,
                    knowledge: this.form.knowledge,
                    comment: this.form.comment,
                  }).then(function (response) {
                    init.getObjectives();
                      console.log(response.data);
                    },function (response) {
                      alert("ERREUR ESSAYE ENCORE")
                      //console.log(response)
                    });
            },
            deleteObjectives(id){
              var init = this;
              this.$http({
                  url: `objective/delete/${id}`,
                  method: 'GET'
              })
                  .then((res) => {
                    console.log(res);
                    init.getObjectives();
                  }, () => {
                      this.has_error = true
                  })
            },
            onSubmit(evt) {
            var init = this;
              evt.preventDefault()
              //alert(JSON.stringify(this.form));
              this.$http.post('objective/create',{
                            idShooter: this.$auth.user.id,
                            objectiveName: this.form.objective,
                            knowledge: this.form.knowledge,
                            comment: this.form.comment,
              }).then(function (response) {
                init.getObjectives();
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
            this.getObjectives();
        }
    }
</script>

<style scoped>

</style>
