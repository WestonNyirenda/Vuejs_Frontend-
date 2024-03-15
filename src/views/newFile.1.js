import axios from 'axios';

export default (await import('vue')).defineComponent({
data() {
return {
articles_loading: false,
article: {
name: null,
body: null
},
articles: [],
headers: [
{
title: 'Title',
align: 'start',
sortable: false,
key: 'title',
},
{ title: 'ID', key: 'id' },
{ title: 'Body', key: 'body' },
{ title: 'Created At', key: 'created_at' },
{ title: 'Updated At', key: 'updated_at' },
{ title: 'Actions', key: 'actions' },
],
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
saveArticle() {
if (this.article.name == null || this.article.body == null) {
alert("Please enter in all required fields");
} else {
let payload = {
title: this.article.name,
body: this.article.body
};
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
});
}
},

deleteArticle(id) {
const delete_article_endpoint = `http://127.0.0.1:3000/api/v1/articles/${id}`; // Replace with your correct API endpoint

axios.delete(delete_article_endpoint)
.then((response) => {
if (response.status === 200) {
this.loadArticles(); // Or implement a more robust refresh approach
this.$toast.success("Article deleted successfully!"); // Assuming you have a toast notification system
} else {
console.error('Error deleting article:', response.data);
this.$toast.error("Failed to delete article. Please try again.");
}
})
.catch(error => {
console.error('Error:', error);
this.$toast.error("An error occurred while deleting the article.");
});
}
},
mounted() {
this.loadArticles();
}
});
