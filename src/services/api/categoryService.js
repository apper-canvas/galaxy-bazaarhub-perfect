import { getApperClient } from "@/services/apperClient";

const categoryService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error('ApperClient not initialized');
        return [];
      }

      const response = await apperClient.fetchRecords('category_c', {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "product_count_c"}},
          {"field": {"Name": "Tags"}}
        ],
        orderBy: [{"fieldName": "Name", "sorttype": "ASC"}]
      });

      if (!response.success) {
        console.error('Failed to fetch categories:', response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error?.response?.data?.message || error);
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

      const response = await apperClient.getRecordById('category_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}}, 
          {"field": {"Name": "product_count_c"}},
          {"field": {"Name": "Tags"}}
        ]
      });

      if (!response.success || !response.data) {
        throw new Error('Category not found');
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error?.response?.data?.message || error);
      throw new Error('Category not found');
    }
  }
};

export default categoryService;