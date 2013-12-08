/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EvidenceDocumentType.ListEvidenceDocumentType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listEvidenceDocumentType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idEvidenceDocumentTypeHeader:'Evidence Document Type ID',
       isRequiredHeader: 'Is Required',
       evidenceDocumentTypeNameHeader:'Name',
       evidenceDocumentTypeCodeHeader:'Code',
       directoryNameHeader:'Directory'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Evidence Document Type List',
   
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
                    idEvidenceDocumentType: {header:me.messages.idEvidenceDocumentTypeHeader, hideable:false},
                    evidenceDocumentTypeName: {header:me.messages.evidenceDocumentTypeNameHeader},
                    evidenceDocumentTypeCode: {header:me.messages.evidenceDocumentTypeCodeHeader},
                    isRequiredHeader: {header:me.messages.isRequiredHeader, hideable:false},
                    directoryName: {header:me.messages.directoryNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});