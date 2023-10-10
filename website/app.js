// Import necessary functions from Vue
const { ref, reactive, computed, createApp } = Vue;

const app = {
    setup() {
      const selectedBlog = ref(null); // Reactive reference
      const currentPage = ref(1); // Reactive reference
  
      // Reactive object to store blogs and pagination data
      const state = reactive({
        blogs: [], // Array to store the blogs from the JSON file
        blogsPerPage: 5 // Number of blogs to display per page
      });
  
      // Load blogs from JSON file
      const loadBlogs = async () => {
        try {
          const response = await fetch('blogs.json'); // Replace 'blogs.json' with your JSON file path
          const data = await response.json();
          // Reverse the array and assign IDs automatically in ascending order starting from 1
          state.blogs = data.reverse().map((blog, index) => ({
            id: index + 1, // Assign IDs in ascending order
            ...blog
          }));
        } catch (error) {
          console.error('Error loading blogs:', error);
        }
      };
  
      // Display a blog
      const viewBlog = (blog) => {
        selectedBlog.value = blog;
      };
  
      // Go back to the list view
      const backToList = () => {
        selectedBlog.value = null;
      };
  
      // Go to the previous page
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
  
      // Go to the next page
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
  
      // Calculate total number of pages
      const totalPages = computed(() => {
        return Math.ceil(state.blogs.length / state.blogsPerPage);
      });
  
      // Calculate the blogs to display on the current page
      const paginatedBlogs = computed(() => {
        const startIndex = (currentPage.value - 1) * state.blogsPerPage;
        const endIndex = startIndex + state.blogsPerPage;
        return state.blogs.slice(startIndex, endIndex);
      });
  
      // Load blogs when the setup is run
      loadBlogs();
  
      return {
        selectedBlog,
        currentPage,
        viewBlog,
        backToList,
        prevPage,
        nextPage,
        totalPages,
        paginatedBlogs
      };
    }
  };
  
  // Create the Vue app
  createApp(app).mount('#app');