new Vue({
    el: '#app',
    data: {
        blogs: [],  // Array to store the blogs from the JSON file
        currentPage: 1,  // Current page for pagination
        blogsPerPage: 5,  // Number of blogs to display per page
        selectedBlog: null  // Store the selected blog to display
    },
    methods: {
        // Function to load blogs from JSON file
        loadBlogs() {
            fetch('blogs.json') // Replace 'blogs.json' with your JSON file path
            .then(response => response.json())
            .then(data => {
                // Reverse the array and assign IDs automatically in ascending order starting from 1
                this.blogs = data.reverse().map((blog, index) => ({
                    id: index + 1, // Assign IDs in ascending order
                    ...blog
                }));
            })
            .catch(error => {
                console.error('Error loading blogs:', error);
            });
        },
        // Function to display a blog
        viewBlog(blog) {
            this.selectedBlog = blog;
        },
        // Function to go back to the list view
        backToList() {
            this.selectedBlog = null;
        },
        // Function to go to the previous page
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        // Function to go to the next page
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    },
    computed: {
        // Calculate total number of pages
        totalPages() {
            return Math.ceil(this.blogs.length / this.blogsPerPage);
        },
        // Calculate the blogs to display on the current page
        paginatedBlogs() {
            const startIndex = (this.currentPage - 1) * this.blogsPerPage;
            const endIndex = startIndex + this.blogsPerPage;
            return this.blogs.slice(startIndex, endIndex);
        }
    },
    created() {
        // Load blogs when the Vue app is created
        this.loadBlogs();
    }
});
