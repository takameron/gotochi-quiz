<template>
  <v-app>
    <v-container>
      <v-row dense class="justify-center">
        <v-col cols="12" class="text-center">
          <div class="text-h4 text-sm-h3 text-md-h2 white--text">ご当地クイズ</div>
        </v-col>
        <v-col cols="12" class="l-main-card">
          <v-row>
            <v-col>
              <v-card>
                <slot></slot>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.theme--light.v-application {
  background-color: #80deea;
  background-image: radial-gradient(#4dd0e1 10%, transparent 20%),
    radial-gradient(#4dd0e1 10%, transparent 20%);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}

.l-main-card {
  max-width:550px;
}
</style>
