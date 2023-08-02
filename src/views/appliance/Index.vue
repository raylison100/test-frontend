<template>
  <div class="mt-10">
    <div v-if="alerts.length > 0 && alert_top">
      <v-alert
          v-for="(alert, index) in alerts"
          :key="index"
          :value="true"
          :type="alert.type"
          dismissible
          @input="removeAlert(index)"
      >
        {{ alert.message }}
      </v-alert>
    </div>

    <v-btn @click="openFormDialog" color="grey darken-2" class="white--text">Novo Item</v-btn>

    <v-data-table light :headers="headers" :items="appliances" item-key="id" class="mt-5">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.voltage }}</td>
          <td>{{ item.brand.name }}</td>
          <td class="d-flex p-5 align-center">
            <v-btn @click="editItem(item)" small color="grey darken-3" class="white--text ma-3">Editar</v-btn>
            <v-btn @click="deleteItem(item.id)" small color="grey lighten-4 ma-3">Excluir</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="formDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <div v-if="alerts.length > 0 && alert_dialog">
            <v-alert
                v-for="(alert, index) in alerts"
                :key="index"
                :value="true"
                :type="alert.type"
                dismissible
                @input="removeAlert(index)"
            >
              {{ alert.message }}
            </v-alert>
          </div>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
            <v-text-field v-model="editedItem.description" label="Descrição"></v-text-field>
            <v-text-field v-model="editedItem.voltage" label="Voltagem"></v-text-field>
            <v-select
                :items="brands"
                item-text="name"
                item-value="id"
                label="Marca"
                v-model="editedItem.brand_id"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeFormDialog" color="grey lighten-4">Cancelar</v-btn>
          <v-btn @click="saveItem" :disabled="!valid" color="grey darken-3" class="white--text">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {BrandService} from "@/services/brandService";
import {ApplianceService} from "@/services/applianceService";

export default {
  name : 'ApplianceIndex',
  data() {
    return {
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'Descrição', value: 'description' },
        { text: 'Voltagem', value: 'voltage' },
        { text: 'Marca', value: 'brand.name' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      appliances: [],
      brands: [],
      formDialog: false,
      formTitle: '',
      editedItem: {
        id: null,
        name: '',
        description: '',
        voltage: null,
        brand_id: null,
      },
      valid: false,
      alerts: [],
      alert_top: false,
      alert_dialog: false
    };
  },

  created() {
    this.getAppliance();
    this.getBrands();
  },

  methods: {
    getAppliance() {
      ApplianceService.actions.fetchAppliances().then(response =>{
        this.appliances = response.data.data
      }).catch(error => {
        console.log(error)
        this.showAlert('Erro ao buscar os eletrodomésticos.', 'error');
      })
    },

    getBrands() {
       BrandService.actions.fetchBrands().then(response =>{
         this.brands = response.data.data
       }).catch(error => {
         console.log(error)
       })
    },

    openFormDialog() {
      this.formTitle = 'Novo Item';
      this.editedItem.id = null;
      this.editedItem.name = '';
      this.editedItem.description = '';
      this.editedItem.voltage = null;
      this.editedItem.brand_id = null;
      this.formDialog = true;
      this.alerts = [];
    },

    editItem(item) {
      this.formTitle = 'Editar Item';
      this.editedItem.id = item.id;
      this.editedItem.name = item.name;
      this.editedItem.description = item.description;
      this.editedItem.voltage = item.voltage;
      this.editedItem.brand_id = item.brand.id;
      this.formDialog = true;
      this.alerts = [];
    },

    saveItem() {
      // You can implement the logic here to save the item to your backend.
      // For simplicity, let's just close the dialog and add/edit the item in the list.
      if (!this.editedItem.id) {
        ApplianceService.actions.storeAppliances(this.editedItem).then(() => {
          this.showAlert('Eletrodoméstico adicionado com sucesso.', 'success');
          this.getAppliance();
          this.formDialog = false;
        }).catch((error) => {
          console.log(error)
          this.showRequestErrors(error.response.data.errors)
        })
      } else {
        const id = this.editedItem.id;

        ApplianceService.actions.updateAppliances(this.editedItem, id).then(() => {
          this.showAlert('Eletrodoméstico atualizado com sucesso.', 'success');
          this.getAppliance();
          this.formDialog = false;
        }).catch(error => {
          console.log(error)
          this.showRequestErrors(error.response.data.errors)
        })
      }
    },

    closeFormDialog() {
      this.formDialog = false;
      this.alert = null;
    },

    deleteItem(itemId) {
      ApplianceService.actions.deleteApplianceId(itemId).then(() => {
        this.showAlert('Eletrodoméstico excluído com sucesso.', 'success');
        this.getAppliance();
      }).catch(error => {
        console.log(error)
        this.showAlert('Erro ao excluir o eletrodoméstico.', 'error');
      })
    },

    showAlert(message, type) {
      this.alert_top = true;
      this.alerts.push({ message, type });
      setTimeout(() => {
        this.removeAlert(this.alerts.length - 1);
        this.alert_top = false;
      }, 2000);
    },

    showAlertDialog(message, type) {
      this.alert_dialog = true;
      this.alerts.push({ message, type });
      setTimeout(() => {
        this.removeAlert(this.alerts.length - 1);
        this.alert_dialog = false;
      }, 5000);
    },

    removeAlert(index) {
      this.alerts.splice(index, 1);
    },

    getErrorMessages(errors) {
      return Object.values(errors).flat();
    },

    showRequestErrors(errors) {
      this.getErrorMessages(errors)
          .forEach( i => this.showAlertDialog(i, 'error'))
    }
  },
};
</script>

<style>
/* Add any custom styles for your component here */
</style>
