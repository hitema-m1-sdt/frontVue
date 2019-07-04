<template>
    <div class="col-9 mx-auto">
        <h1>Leçons</h1><b-button id="show-btn" variant="success" @click="$bvModal.show('bv-modal-example')">+</b-button>
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

        <b-modal id="bv-modal-example" hide-footer>
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
          disabled
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
        name: "LessonComponent",
        data() {
            return{
            lessons: [],
            form: {
          name: '',
          instructor: null,
          comment: '',
        },
        instructors: [{ text: 'Sélectionner le maître d\'armes', value: null }, { text: 'Jean Yves', value: 1 }, { text: 'Fabrice Wild', value: 2 }, { text: 'Pierre Coper', value: 3 }],
        show: true
        }
        },
        methods:{
            getLessons() {
                this.$http({
                    url: `lesson/getall`,
                    method: 'GET'
                })
                    .then((res) => {
                       this.lessons = res.data;
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
