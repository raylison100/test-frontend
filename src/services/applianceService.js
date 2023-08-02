import axios from '@/plugins/axios'

export const ApplianceService = {
  actions: {
    storeAppliances(body) {
      return axios.post('/appliances', body)
    },
    fetchAppliances(params) {
      return axios.get('/appliances', {
        params: params,
      })
    },
    fetchApplianceId(id) {
      return axios.get(`/appliances/${id}`)
    },
    updateAppliances(body, id) {
      return axios.put(`/appliances/${id}`, body)
    },
    deleteApplianceId(id) {
      return axios.delete(`/appliances/${id}`)
    },
  }
}
