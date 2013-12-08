/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkShop.UpdateWorkShop', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkShop',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Edit Workshop',
    messages: {
        labels: {
            idSector: 'Sector',
            workShopName: 'Name',
            workShopAcronym: 'Acronym'
        }
    },
    modal: true,
    width: 620,
    
    initComponent: function(){
        var me = this;
        var formItems = [
            {
                xtype: 'hiddenfield',
                name: 'idWorkShop'
            },
            {
                xtype: 'combobox',
                name: 'idSector',
                id: 'idSector',
                store: Ext.create('sisprod.store.SectorAll'),
                fieldLabel: me.messages.labels.idSector,
                displayField: 'sectorName',
                valueField: 'idSector',
                forceSelection: true,
                anchor: '100%',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'workShopName',
                fieldLabel: me.messages.labels.workShopName,
                anchor: '100%',
                allowBlank: false,
                maxLength: 150,
                fieldStyle: {textTransform: 'uppercase'}
            },
            {
                xtype: 'textfield',
                name: 'workShopAcronym',
                fieldLabel: me.messages.labels.workShopAcronym,
                anchor: '50%',
                fieldStyle: {textTransform: 'uppercase'}
            }
        ];
        formItems.push(Ext.create('sisprod.view.WorkShop.WorkShopCoordinatorGrid'));
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        
        me.callParent(arguments);
    }
});