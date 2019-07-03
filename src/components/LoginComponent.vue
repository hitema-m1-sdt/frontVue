<template>

   <div v-if="!$auth.check()">
       <img alt="Logo" class="img" src="../assets/logo_MVDS_jpeg.png">

       <div class="col-sm-4 col-md-4 col-lg-4 offset-md-4 offset-lg-4 offset-sm-3">

           <div class="card shadow p-3 mb-5 bg-white rounded">
               <div class="card-body">
                   <h5 class="card-title">Connexion</h5>
                   <form @submit.prevent="login">

                       <!-- Vertical -->
                       <div class="form-group">
                           <input type="email" id="email" v-model="email" class="form-control" placeholder="Email">
                       </div>
                       <div class="form-group">
                           <input type="password" id="password" v-model="password" class="form-control" placeholder="Mot de passe">
                       </div>

                       <button type="submit" class="btn btn-primary">Connexion</button>

                   </form>
               </div>
           </div>



       </div>
   </div>

    <DashboardComponent v-else>
    </DashboardComponent>



</template>

<script>
    import DashboardComponent from "@/components/DashboardComponent";
    export default {
        name: "LoginComponent",
        components: {DashboardComponent},
        data() {
            return {
                email: null,
                password: null,
                has_error: false
            }
        },

        mounted() {

        },

        methods: {
            login() {
                // get the redirect object
                var redirect = this.$auth.redirect();
                var app = this;
                this.$auth.login({
                    params: {
                        email: app.email,
                        password: app.password
                    },
                    success: function(result) {
                        // handle redirection
                        // const redirectTo = redirect ? redirect.from.name : this.$auth.user().role === 2 ? 'admin.dashboard' : 'dashboard'

                        // this.$router.push({name: redirectTo})

                        this.$auth.user = result.data.user;
                        this.$auth.token = result.data.token;



                    },
                    error: function() {
                        app.has_error = true;
                    },
                    fetchUser:false,
                    rememberMe:true
                })
            }
        }
    }
</script>

<style scoped>

</style>
