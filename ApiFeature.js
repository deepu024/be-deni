class ApiFeature {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    // Handle pagination (skip and limit)
    paginate() {
      const page = parseInt(this.queryString.page, 10) || 1; // Default to page 1
      const limit = parseInt(this.queryString.limit, 10) || 10; // Default to limit 10
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this; // Return `this` to allow method chaining
    }
  
    // Handle sorting
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' '); // Allow multiple fields separated by commas
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt'); // Default sorting by `createdAt` in descending order
      }
  
      return this; // Return `this` to allow method chaining
    }
  
    // Handle field selection (select specific fields)
    selectFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' '); // Convert comma-separated fields into a space-separated list
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v'); // Exclude internal fields like `__v` in Mongoose by default
      }
  
      return this; // Return `this` to allow method chaining
    }
  
    // Handle searching/filtering
    search() {
      if (this.queryString.search) {
        const search = this.queryString.search; // The search query from the request
        const regex = new RegExp(search, 'i'); // Case-insensitive search
        this.query = this.query.find({ $text: { $search: search } }); // You can customize this for your use case
      }
  
      return this; // Return `this` to allow method chaining
    }
  
    // Handle custom filters based on query parameters (e.g., filtering by status or category)
    filter() {
      const queryCopy = { ...this.queryString };
  
      // Remove fields that should not be in the filtering query
      const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
      excludedFields.forEach((el) => delete queryCopy[el]);
  
      // Apply custom filtering
      this.query = this.query.find(queryCopy);
  
      return this; // Return `this` to allow method chaining
    }
  
    // Get the final result with pagination metadata
    async getResults() {
      const results = await this.query;
  
      // Get the total count of documents based on the original query
      const totalCount = await this.query.model.countDocuments(this.query.getQuery());
  
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / (this.queryString.limit || 10));
  
      return {
        results,
        pagination: {
          totalCount,
          totalPages,
          currentPage: parseInt(this.queryString.page, 10) || 1,
          limit: parseInt(this.queryString.limit, 10) || 10,
        },
      };
    }
  }
  
  module.exports = ApiFeature;  