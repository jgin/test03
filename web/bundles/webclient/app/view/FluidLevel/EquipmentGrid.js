/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevel.EquipmentGrid',{
    extend: 'Ext.grid.Panel',
    
    title: 'Equipments',
    messages: {
        headers: {
            equipmentName: 'Name',
            equipmentModel: 'Model',
            equipmentCode: 'Code',
            equipmentSerialNumber: 'Serial Number',
            equipmentTypeName: 'Type',
            equipmentLot: 'Lot',
            equipmentLocation: 'Location'
        }
    },
    
    id: 'fluidLevelEquipmentGrid',
    store: Ext.create('sisprod.store.AllocatedEquipmentStore'),
    height: 200,
    
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
    
    initComponent: function(){
        var me = this;
        me.getStore().removeAll();
        //
        me.columns = [
            {
                text: me.messages.headers.equipmentName,
                dataIndex: 'equipmentName',
                flex: 3
            },
            {
                text: me.messages.headers.equipmentModel,
                dataIndex: 'equipmentModel',
                flex: 1
            },
            {
                text: me.messages.headers.equipmentCode,
                dataIndex: 'equipmentCode',
                flex: 1
            },
            {
                text: me.messages.headers.equipmentSerialNumber,
                dataIndex: 'serialNumber',
                flex: 1
            },
            {
                text: me.messages.headers.equipmentTypeName,
                dataIndex: 'equipmentTypeName',
                flex: 1
            },
            {
                text: me.messages.headers.equipmentLot,
                dataIndex: 'lotName',
                flex: 2
            },
            {
                text: me.messages.headers.equipmentLocation,
                dataIndex: 'locationName',
                flex: 2
            }
        ];
        
        me.callParent(arguments);
    }
});