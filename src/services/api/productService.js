import { getApperClient } from "@/services/apperClient";

const productService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "Name", "sorttype": "ASC"}]
      });

      if (!response.success) {
        console.error('Failed to fetch products:', response.message);
        return [];
      }

      // Transform database fields to UI format
      const transformedData = (response.data || []).map(product => ({
        Id: product.Id,
        title: product.title_c || product.Name || '',
        brand: product.brand_c || '',
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        originalPrice: product.original_price_c || 0,
        rating: product.rating_c || 0,
        reviewCount: product.review_count_c || 0,
        inStock: product.in_stock_c || false,
        images: product.images_c ? product.images_c.split(',').map(img => img.trim()) : [],
        specifications: product.specifications_c ? JSON.parse(product.specifications_c || '{}') : {},
        tags: product.Tags || ''
      }));

      return transformedData;
    } catch (error) {
      console.error('Error fetching products:', error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        throw new Error('Service not available');
      }

      const response = await apperClient.getRecordById('product_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "Tags"}}
        ]
      });

      if (!response.success || !response.data) {
        throw new Error('Product not found');
      }

      // Transform database fields to UI format
      const product = response.data;
      return {
        Id: product.Id,
        title: product.title_c || product.Name || '',
        brand: product.brand_c || '',
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        originalPrice: product.original_price_c || 0,
        rating: product.rating_c || 0,
        reviewCount: product.review_count_c || 0,
        inStock: product.in_stock_c || false,
        images: product.images_c ? product.images_c.split(',').map(img => img.trim()) : [],
        specifications: product.specifications_c ? JSON.parse(product.specifications_c || '{}') : {},
        tags: product.Tags || ''
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      throw new Error('Product not found');
    }
  },

  async getByCategory(category) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category],
          "Include": true
        }],
        orderBy: [{"fieldName": "title_c", "sorttype": "ASC"}]
      });

      if (!response.success) {
        console.error('Failed to fetch products by category:', response.message);
        return [];
      }

      // Transform database fields to UI format
      const transformedData = (response.data || []).map(product => ({
        Id: product.Id,
        title: product.title_c || product.Name || '',
        brand: product.brand_c || '',
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        originalPrice: product.original_price_c || 0,
        rating: product.rating_c || 0,
        reviewCount: product.review_count_c || 0,
        inStock: product.in_stock_c || false,
        images: product.images_c ? product.images_c.split(',').map(img => img.trim()) : [],
        specifications: product.specifications_c ? JSON.parse(product.specifications_c || '{}') : {},
        tags: product.Tags || ''
      }));

      return transformedData;
    } catch (error) {
      console.error('Error fetching products by category:', error?.response?.data?.message || error);
      return [];
    }
  },

  async searchProducts(query) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "Tags"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "title_c",
                  "operator": "Contains", 
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "description_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "category_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            }
          ]
        }],
        orderBy: [{"fieldName": "title_c", "sorttype": "ASC"}]
      });

      if (!response.success) {
        console.error('Failed to search products:', response.message);
        return [];
      }

      // Transform database fields to UI format
      const transformedData = (response.data || []).map(product => ({
        Id: product.Id,
        title: product.title_c || product.Name || '',
        brand: product.brand_c || '',
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        originalPrice: product.original_price_c || 0,
        rating: product.rating_c || 0,
        reviewCount: product.review_count_c || 0,
        inStock: product.in_stock_c || false,
        images: product.images_c ? product.images_c.split(',').map(img => img.trim()) : [],
        specifications: product.specifications_c ? JSON.parse(product.specifications_c || '{}') : {},
        tags: product.Tags || ''
      }));

      return transformedData;
    } catch (error) {
      console.error('Error searching products:', error?.response?.data?.message || error);
      return [];
    }
  },

  async filterProducts(filters) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }

      // Build where conditions based on filters
      const whereConditions = [];

      if (filters.category && filters.category !== "All") {
        whereConditions.push({
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [filters.category],
          "Include": true
        });
      }

      if (filters.subcategory) {
        whereConditions.push({
          "FieldName": "subcategory_c", 
          "Operator": "EqualTo",
          "Values": [filters.subcategory],
          "Include": true
        });
      }

      if (filters.minPrice !== undefined) {
        whereConditions.push({
          "FieldName": "price_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.minPrice.toString()],
          "Include": true
        });
      }

      if (filters.maxPrice !== undefined) {
        whereConditions.push({
          "FieldName": "price_c",
          "Operator": "LessThanOrEqualTo", 
          "Values": [filters.maxPrice.toString()],
          "Include": true
        });
      }

      if (filters.minRating !== undefined) {
        whereConditions.push({
          "FieldName": "rating_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [filters.minRating.toString()],
          "Include": true
        });
      }

      if (filters.inStockOnly) {
        whereConditions.push({
          "FieldName": "in_stock_c",
          "Operator": "EqualTo",
          "Values": [true],
          "Include": true
        });
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "specifications_c"}},
          {"field": {"Name": "Tags"}}
        ],
        where: whereConditions,
        orderBy: [{"fieldName": "title_c", "sorttype": "ASC"}]
      });

      if (!response.success) {
        console.error('Failed to filter products:', response.message);
        return [];
      }

      // Transform database fields to UI format
      const transformedData = (response.data || []).map(product => ({
        Id: product.Id,
        title: product.title_c || product.Name || '',
        brand: product.brand_c || '',
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        description: product.description_c || '',
        price: product.price_c || 0,
        originalPrice: product.original_price_c || 0,
        rating: product.rating_c || 0,
        reviewCount: product.review_count_c || 0,
        inStock: product.in_stock_c || false,
        images: product.images_c ? product.images_c.split(',').map(img => img.trim()) : [],
        specifications: product.specifications_c ? JSON.parse(product.specifications_c || '{}') : {},
        tags: product.Tags || ''
      }));

      return transformedData;
    } catch (error) {
      console.error('Error filtering products:', error?.response?.data?.message || error);
      return [];
    }
  }
};

export default productService;