import axios from '@/plugins/axios'

export const BrandService = {
  actions: {
    fetchBrands() {
      return axios.get('/brands')
    },
  }
}
