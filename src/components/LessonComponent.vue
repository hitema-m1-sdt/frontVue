<template>
    <div class="col-9 mx-auto">
        <h1>Leçons</h1><b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-addlesson')">Ajouter une leçon</b-button> <br /> <br />
      <table class="table table-bordered">
            <tr>
                <th>Maitre armes</th>
                <th>Tireurs</th>
                <th>Commentaires</th>
                <th>Actions</th>
            </tr>

            <tr v-for="lesson in lessons">
                <td> {{lesson.maitre.name}}</td>
                <td> {{lesson.tireur.name}}</td>
                <td> {{lesson.comment}}</td>
                <td> <b-button variant="success" @click="$bvModal.show('bv-modal-updatelesson'), editLesson(lesson.id)"><font-awesome-icon icon="edit" /></b-button> | <b-button variant="danger" @click="deleteLesson(lesson.id)"><font-awesome-icon icon="trash" /></b-button></td>
            </tr>
        </table>
        <b-modal id="bv-modal-updatelesson" hide-footer>
          <template slot="modal-title">
            Modifier la leçon
          </template>
          <div class="d-block text-center">
            <!-----DEBUBT FORMULAIRE MODAL ------>

        <b-form v-if="show">

        <b-form-group id="input-group-1" label="Votre nom:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="formupdate.name"
          required
          disabled
          placeholder="Entrez votre nom"
        ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Maître d'armes:" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="formupdate.instructor"
          :options="instructors"
          required
        ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-3" label="Commentaire:" label-for="input-3">
        <b-form-input
          type="text"
          id="input-3"
          v-model="formupdate.comment"
          placeholder="Entrez un commentaire"
        ></b-form-input>
        </b-form-group>

        <b-button type="submit" @click="$bvModal.hide('bv-modal-updatelesson'), updatelesson(lessonupdateid)" variant="primary">Mettre à jour</b-button>&nbsp
        </b-form>
            <!-----FIN FORMULAIRE MODAL ------>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-updatelesson')">Fermer</b-button>
        </b-modal>

        <b-modal id="bv-modal-addlesson" hide-footer>
          <template slot="modal-title">
            Ajouter une leçon
          </template>
          <div class="d-block text-center">
            <!-----DEBUBT FORMULAIRE MODAL ------>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Votre nom:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Entrez votre nom"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Maître d'armes:" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="form.instructor"
          :options="instructors"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Commentaire:" label-for="input-3">
        <b-form-input
          type="text"
          id="input-3"
          v-model="form.comment"
          placeholder="Entrez un commentaire"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" @click="$bvModal.hide('bv-modal-addlesson')" variant="primary">Envoyer</b-button>&nbsp
      <b-button type="reset" variant="danger">Réinitialiser</b-button>
    </b-form>
  <!--  <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>-->

            <!-----FIN FORMULAIRE MODAL ------>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-addlesson')">Fermer</b-button>
        </b-modal>

    </div>
</template>

<script>
    export default {
        name: "LessonComponent",
        data() {
            return{
            lessons: [],
            form: {
          name: '',
          instructor: null,
          comment: '',
        },
        instructors: [{ text: 'Sélectionner le maître d\'armes', value: null }, ],
        show: true,
        lessonupdate:[],
        formupdate: {
          name: '',
          instructor: null,
          comment: '',
        },
        lessonupdateid: null,
        }
        },
        methods:{
            getLessons() {
              var init = this;
                this.$http({
                    url: `lesson/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.lessons = res.data;
                    }, () => {
                        this.has_error = true
                    })
                    init.getInstructor();
            },
            editLesson(id){
              this.$http({
                  url: `lesson/get/${id}`,
                  method: 'GET'
              })
                  .then((res) => {
                     this.lessonupdate = res.data;
                     console.log(this.lessonupdate);
                     this.formupdate.name = this.$auth.user.name;
                     this.formupdate.instructor = this.lessonupdate.idCombatInstructor;
                     this.formupdate.comment = this.lessonupdate.comment;
                     this.lessonupdateid = id;
                  }, () => {
                      this.has_error = true
                  })
            },
            updatelesson(id){
              var init = this;
              //console.log(id);
              this.lessonupdateid = null;
              this.$http.put(`/lesson/update/${id}`,{
                                idShooter: this.$auth.user.id,
                                idCombatInstructor: this.formupdate.instructor,
                                comment: this.formupdate.comment,
                  }).then(function (response) {
                    init.getLessons();
                      console.log(response.data);
                    },function (response) {
                      alert("ERREUR ESSAYE ENCORE")
                      //console.log(response)
                    });
            },
            getInstructor(){
              this.$http({
                  url: `user/get/maitre`,
                  method: 'GET'
              })
                  .then((res) => {
                     this.instructors =  [{ text: 'Sélectionner le maître d\'armes', value: null }, ];
                     for(var i=0;i<res.data.length;i++){
                       this.instructors.push({ text: res.data[i].name, value: res.data[i].id });
                     }
                  }, () => {
                      this.has_error = true
                  })

            },
            deleteLesson(id){
              var init = this;
              this.$http({
                  url: `lesson/delete/${id}`,
                  method: 'GET'
              })
                  .then((res) => {
                    console.log(res);
                    init.getLessons();
                  }, () => {
                      this.has_error = true
                  })
            },
            onSubmit(evt) {
            var init = this;
              evt.preventDefault()
              //alert(JSON.stringify(this.form));
              this.$http.post('lesson/create',{
                            idShooter: this.$auth.user.id,
                            idCombatInstructor: this.form.instructor,
                            comment: this.form.comment,
              }).then(function (response) {
                init.getLessons();
                  console.log(response.data);
                },function (response) {
                  alert("ERREUR ESSAYE ENCORE")
                  //console.log(response)
                });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.instructor = null
        this.form.instructor = []
        this.form.comment = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
        },
        mounted() {
            this.getLessons();
            this.form.name = this.$auth.user.name;
        }
    }
</script>

<style scoped>

</style>
