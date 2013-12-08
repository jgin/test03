/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkShop.AddWorkShop', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addWorkShop',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add WorkShop',
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
                xtype: 'combobox',
                name: 'idSector',
                store: Ext.create('sisprod.store.SectorAll'),
                fieldLabel: me.messages.labels.idSector,
                displayField: 'sectorName',
                valueField: 'idSector',
                forceSelection: true,
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'workShopName',
                fieldLabel: me.messages.labels.workShopName,
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
            defaults: { anchor: '100%' },
            items: formItems
        };
        me.callParent(arguments);
    }
});