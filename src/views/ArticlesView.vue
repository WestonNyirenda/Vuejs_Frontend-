<template>
  <div class="home">
    <v-row>
      <v-col>
        <v-container fluid>
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              <span>Articles</span>

              <v-dialog width="500">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" text="Add New Article" color="blue"> </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-card-title>
                      <span>Enter Article details</span>
                    </v-card-title>
                    <v-container fluid>
                      <v-form>
                        <v-text-field label="Name" v-model="article.name" required></v-text-field>
                        <v-text-field label="Article Body" v-model="article.body" required></v-text-field>
                      </v-form>
                    </v-container>


                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="orange" text="Close" @click="isActive.value = false"></v-btn>

                      <v-btn color="green" text="Save" @click="saveArticle"></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>

            </v-card-title>
            <v-card-text>
              <v-data-table hover items-per-page="5" v-bind:headers="headers" v-bind:items="articles"
                v-bind:loading="articles_loading">
                <template v-slot:[`item.actions`]="{ item }">

                  <v-dialog  ref="updateDialog" width="500">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" color="blue" icon="mdi-pencil" @click="editArticle(item.id)"></v-icon>
                </template>

                <template v-slot:default="{ }">
                  <v-card>
                    <v-card-title>
                      <span>Edit Article details</span>
                    </v-card-title>
                    <v-container fluid>
                      <v-form>
                        <v-text-field label="Name" v-model="editArticles.title" required></v-text-field>
                        <v-text-field label="Article Body" v-model="editArticles.body" required></v-text-field>
                      </v-form>
                    </v-container>


                    <v-card-actions>
                      <v-spacer></v-spacer>


                      <v-btn color="green" text="Save" @click="updateArticle(item.id), closeDialog()"></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
                  


                  <v-icon color="red" icon="mdi-delete" @click="deleteArticle(item.id)"></v-icon>
                </template> 
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data() {
    return {
      articles_loading: false,
      article: {
        name: null,
        body: null
      },
      articles: [],
      editArticles:[],
      headers: [
        {
          title: 'Title',
          align: 'start',
          sortable: false,
          key: 'title',
        },
        { title: 'ID', key: 'id'},
        { title: 'Body', key: 'body' },
        { title: 'Created At', key: 'created_at' },
        { title: 'Updated At', key: 'updated_at' },
        { title: 'Actions', key: 'actions' },
      ],



    }
  },
  methods: {
    loadArticles() {
      this.articles_loading = true
      let articles_end_point = "http://127.0.0.1:3000/api/v1/articles";
      axios.get(articles_end_point)
        .then((response) => {
          this.articles_loading = false
          this.articles = response.data.data
        })
        .catch(error => {
          this.articles_loading = false
          console.log(error)
        })
    },
    saveArticle() {
      if (this.article.name == null || this.article.body == null) {
        alert("Please enter in all required fields");
      } else {
        let payload = {
          title: this.article.name,
          body: this.article.body
        }
        let add_article_endpoint = "http://127.0.0.1:3000/api/v1/articles";
        axios.post(add_article_endpoint, payload)
          .then((response) => {
            if (response.status === 201) {
              alert("Article successfully saved");
              //method for form reset
              this.article.name = null;
              this.article.body = null;
              this.loadArticles();
            }
          })
      }
    },

    deleteArticle(id){
      let delete_article_endpoint = `http://127.0.0.1:3000/api/v1/articles/${id}`;
      axios.delete(delete_article_endpoint)
      .then((response)=>{
        if(response.status === 200){
          alert("Article Deleted Successfully");
          this.loadArticles();
        }else{
          alert("Article failed to be Deleted");
        }
      })
      //refresh table
    },

    editArticle(id){
     
      let edit_articles_end_point = `http://127.0.0.1:3000/api/v1/articles/${id}`;
      axios.get(edit_articles_end_point)
        .then((response) => {
          if(response.status === 200){
            this.editArticles = response.data.data
          }
         
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateArticle(id){
      let update_article_endpoint = `http://127.0.0.1:3000/api/v1/articles/${id}`;
      axios.put(update_article_endpoint, this.editArticles)
      .then((response) => {
        if(response.status === 200){
          alert('Article updated successfully');
          this.loadArticles();

        }
      })
      .catch(error => {
        console.log(error)
      })
    },

    closeDialog(){
      this.$refs.updateDialog.value = false;
    }
  },
  mounted() {
    this.loadArticles();
  }
}
</script>