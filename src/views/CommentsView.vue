<template>
    <div class="home">
       <v-row>
            <v-col>
                <v-container fluid>
                    <v-card>
                       <v-card-title class="d-flex justify-space-between">
                            <span>Comments</span>
                           

                            <v-dialog width="500">
                              <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" text="Add Comment" color="blue"> </v-btn>
                              </template>

                              <template v-slot:default="{ isActive }">
                                <v-card>
                                  <v-card-title>
                                    <span>Enter comment name</span>
                                  </v-card-title>
                                  <v-container fluid>
                                    <v-row>
                                      <v-col>
                                        <v-text-field label="comment name" v-model="comment.name" required>

                                        </v-text-field>
                                      </v-col>

                                  
                                    </v-row>
                                  </v-container>
                                  

                                  <v-card-actions>
                                    <v-spacer></v-spacer>


                                    <v-btn
                                      color="green"
                                      text="Save"
                                      @click="saveComment(), isActive.value = false"
                                    ></v-btn>
                                  </v-card-actions>
                                </v-card>
                              </template>
                            </v-dialog>
                       </v-card-title> 
                       <v-card-text>
                            <v-data-table hover v-bind:headers="headers" v-bind:items="comments">
                              <template v-slot:[`item.actions`]="{ item }">

                                <v-dialog width="500">
                                      <template v-slot:activator="{ props }">
                                        
                                        <v-icon color="blue" icon="mdi-pencil"  v-bind="props" @click="editComment(item.id)"></v-icon>
                                      </template>

                                      <template v-slot:default="{ isActive }">
                                        <v-card >
                                          <v-card-title>
                                            <span>Edit comment</span>
                                          </v-card-title>
                                          <v-container fluid>
                                            <v-form>
                                             
                                              <v-text-field label="Name" v-model="editComments.name" required></v-text-field>
                                              
                                              
                                            </v-form>
                                          </v-container>

                                          <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn
                                              text="Close Dialog"
                                              @click="updateComment(item.id), isActive.value = false"
                                            ></v-btn>
                                          </v-card-actions>
                                        </v-card>
                                      </template>
                                  </v-dialog>

                                
                                <v-icon color="red" icon="mdi-delete" @click="deletecomment(item.id)"></v-icon>

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
      data () {
        return {
            comments_loading: false,
            comment: {
              name: null
            },
            comments:[],
            editComments:[],
          headers: [
            {
              title: 'Article Name',
              align: 'start',
              sortable: false,
              key: 'name',
            },
            
            { title: 'Created At', key: 'created_at' },
            { title: 'Updated At', key: 'updated_at' },
            { title: 'Actions', key: 'actions' },
            
          ],
   
        }
      },
      methods: {
        loadComments(){
            this.comments_loading= true
            let comments_end_point = "http://127.0.0.1:3000/api/v1/articles/10/coments";
            axios.get(comments_end_point)
            .then((responce) => {
                this.comments_loading= false
                this.comments = responce.data.data
            })

            .catch(error=>{
                this.comments_loading= false
                console.log(error)
            })
        },

        saveComment(){
          
            if (this.comment.name == null) {
              alert("Please enter in all required fields");
            } else {
              let payload = {
                name: this.comment.name,
              
              }
            

            let edit_comment_end_point = "http://127.0.0.1:3000/api/v1/articles/10/coments";
            axios.post(edit_comment_end_point, payload)
            .then((responce) =>{
              if(responce.status === 200){
                alert("comment added successfully");
                //form resert
                this.comment.name = null;
                this.loadComments();
              }
            })
          }
       },

       editComment(id){

          let edit_comment_end_point  = `http://127.0.0.1:3000/api/v1/articles/10/coments/${id}`;
          axios.get(edit_comment_end_point)
          .then((responce)=>{
            if(responce.status ===200){
              this.editComments = responce.data.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
        },
        
        updateComment(id){
            let update_comment_endpoint =  `http://127.0.0.1:3000/api/v1/articles/10/coments/${id}`;
            axios.put(update_comment_endpoint, this.editComments)
            .then((responce)=>{
              if(responce.status === 200){
                alert('Comment updated successfully')
                this.loadComments()
              }else{
                alert('failed to update comment')
              }
            })
            .catch(error => {
              console.log(error)
            }) 
        },

        deletecomment(id){
          let delete_comment_endpoint =  `http://127.0.0.1:3000/api/v1/articles/10/coments/${id}`;
          axios.delete(delete_comment_endpoint)
          .then((responce)=>{
            if(responce.status ===200){
              alert('comment deleted successfully')
              this.loadComments()
            }
           
          })
          .catch(error =>{
              console.log(error)
            })
        }

       },//closing tag for methods

     
      mounted(){
        this.loadComments();
      }
    }
  </script>