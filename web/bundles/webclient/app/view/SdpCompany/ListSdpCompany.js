/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpCompany.ListSdpCompany', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listSdpCompany',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idSdpCompany:'ID',
       sdpCompanyNameHeader:'Name',
       sdpCompanyRUCHeader:'RUC'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Sdp Company List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idSdpCompany: {header:me.messages.idSdpCompany},
                    'companyName': {header:me.messages.sdpCompanyNameHeader},
                    'company.defEntity.entityRuc': {header:me.messages.sdpCompanyRUCHeader},
                    'company.externalId': {hideable:false},
                    'company.entityId': {hideable:false},
                    'company.defEntity.address': {hideable:false},
                    'company.defEntity.email': {hideable:false},
                    'company.isAuthorized': {hideable:false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});