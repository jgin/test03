/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Equipment.ListEquipment', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listEquipment',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idEquipmentHeader:'Equipment ID',
       equipmentNameHeader:'Equipment',
       equipmentModelHeader:'Model',
       equipmentCodeHeader: 'Equipment Code',
       serialNumberHeader: 'Serial Number',
       idEquipmentTypeHeader:'Equipment Type ID',
       equipmentTypeNameHeader:'Equipment Type',
       idMarkHeader:'Mark ID',
       markNameHeader:'Mark',
       idLocationHeader:'Location ID',
       locationNameHeader:'Location',
       idEquipmentConditionHeader:'Equipment Condition ID',
       equipmentConditionNameHeader:'Condition',
       idEquipmentParentHeader:'Assigned To',
       equipmentParentNameHeader:'Assigned To',
       idSupplierHeader:'Supplier ID',
       supplierNameHeader:'Supplier',
       lotHeader:'Lot'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Equipment List',
   
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
                    action: 'importEquipment',
                    id: 'btnImport' + me.entityName
                },            
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importDataState,
                    action: 'importEquipmentState',
                    id: 'btnImportState' + me.entityName,
                    disabled : true
                }
           ],
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idEquipment:   {header:me.messages.idEquipmentHeader},
                    equipmentName: {header:me.messages.equipmentNameHeader},
                    equipmentModel:{header:me.messages.equipmentModelHeader},
                    equipmentCode: {header:me.messages.equipmentCodeHeader},
                    serialNumber:  {header:me.messages.serialNumberHeader},
                    'equipmentType.idEquipmentType':{header:me.messages.idEquipmentTypeHeader,hideable:false},
                    'equipmentType.equipmentTypeName':{header:me.messages.equipmentTypeNameHeader},
                    'mark.idMark':{header:me.messages.idMarkHeader,hideable:false},
                    'mark.markName':{header:me.messages.markNameHeader},
                    'location.idLocation':{header:me.messages.idLocationHeader,hideable:false},
                    'location.locationName':{header:me.messages.locationNameHeader},
                    'equipmentCondition.idEquipmentCondition':{header:me.messages.idEquipmentConditionHeader,hideable:false},
                    'equipmentCondition.equipmentConditionName':{header:me.messages.equipmentConditionNameHeader},
                    'equipmentParent.idEquipment':{header:me.messages.idEquipmentParentHeader,hideable:false},
                    'equipmentParent.equipmentName':{header:me.messages.equipmentParentNameHeader},
                    'supplier.idSupplier':{header:me.messages.idSupplierHeader},
                    'supplier.entity.entityName':{header:me.messages.supplierNameHeader},
                    'lot.idLot':{hideable:false},
                    'lot.lotName':{header:me.messages.lotHeader},
                    supplierName:{hidden:true,hideable:false}
                    }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});