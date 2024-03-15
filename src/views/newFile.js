import axios from 'axios';

export default (await import('vue')).defineComponent({
data() {
return {
articles_loading: false,
articles: [],
headers: [
{
title: 'Title',
align: 'start',
sortable: false,
key: 'title',
},
{ title: 'Body', key: 'body' },
{ title: 'Created At', key: 'created_at' },
{ title: 'Updated At', key: 'updated_at' },
{ title: 'Actions', key: 'actions' },
],

data: {
name: '',
description: '',
},
snackbar: false,
snackbarText: '',
};
},
methods: {
loadArticles() {
this.articles_loading = true;
let articles_end_point = "http://127.0.0.1:3000/api/v1/articles";
axios.get(articles_end_point)
.then((response) => {
this.articles_loading = false;
this.articles = response.data.data;
})
.catch(error => {
this.articles_loading = false;
console.log(error);
});
},

sendData() {
try {
const response = await axios.post('/api/data', this.data);
this.snackbarText = 'Data sent successfully!';
this.snackbar = true;
// Clear the form or handle success as needed
} catch (error) {
console.error('Error sending data:', error);
this.snackbarText = 'Error sending data. Please try again.';
this.snackbar = true;
// Handle errors gracefully, e.g., show an error message to the user
}
},
},
mounted() {
this.loadArticles();
}
});
