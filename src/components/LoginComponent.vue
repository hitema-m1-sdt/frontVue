<template>

   <div>
       <img alt="Logo" class="img" src="../assets/logo_MVDS_jpeg.png">

       <div class="col-sm-4 col-md-4 col-lg-4 offset-md-4 offset-lg-4 offset-sm-3">

           <div class="card">
               <div class="card-body">
                   <h5 class="card-title">Connexion</h5>
                   <form>

                       <!-- Vertical -->
                       <div class="form-group">
                           <input type="email" id="email" class="form-control" placeholder="Email">
                       </div>
                       <div class="form-group">
                           <input type="password" id="password" class="form-control" placeholder="Mot de passe">
                       </div>

                       <button type="submit" class="btn btn-primary">Envoyer</button>

                   </form>
               </div>
           </div>

       </div>
   </div>



</template>

<script>
    export default {
        name: "LoginComponent"
    }
</script>

<style scoped>

</style>
