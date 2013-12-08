/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Tool.ListTool', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listTool',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idToolHeader: 'Tool ID',
        toolNameHeader: 'Tool Name',
        toolCodeHeader: 'Code',
        stockHeader: 'Stock',
        toolTypeIdHeader: 'ID Tool Type',
        toolTypeNameHeader: 'Tool Type',
        measureUnitIdHeader: 'ID Measure Unit',
        measureUnitNameHeader: 'Measure Unit'
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Tool List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idTool: {header:me.messages.idToolHeader},
                    toolName: {header:me.messages.toolNameHeader},
                toolCode: {header:me.messages.toolCodeHeader},
                    stock: {header:me.messages.stockHeader},
                    'toolType.idToolType':{header: me.messages.toolTypeIdHeader,hideable: false},
                    'toolType.toolTypeName':{header: me.messages.toolTypeNameHeader},
                    'measureUnit.idMeasureUnit':{header: me.messages.measureUnitIdHeader,hideable: false},
                    'measureUnit.measureUnitName':{header: me.messages.measureUnitNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});