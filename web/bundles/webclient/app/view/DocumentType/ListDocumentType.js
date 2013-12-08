/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DocumentType.ListDocumentType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],   
   alias: 'widget.listDocumentType',
   
   messages: {
        idDocumentTypeHeader: 'Document Type ID ',
        externalIdHeader: 'External ID',
        documentTypeNameHeader: 'Document Type',
        documentTypeAcronymHeader: 'Acronym'
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Document Types List',
   
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
           topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importDocumentType',
                    id: 'btnImport' + me.entityName
                }            
           ],
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idDocumentType: {header:me.messages.idDocumentTypeHeader},
                    externalId: {hideable: false},
                    documentTypeName: {header:me.messages.documentTypeNameHeader},
                    documentTypeAcronym: {header:me.messages.documentTypeAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});