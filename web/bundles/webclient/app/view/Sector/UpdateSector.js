/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Sector.UpdateSector', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateSector',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Edit Sector',
    messages: {
        sectorNameLabel: 'Sector Name',
        sectorAcronymLabel: 'Sector Acronym'
    },
    modal: true,
    width: 620,
    
    initComponent: function(){
        var me = this;
        var formItems = [
            {
                xtype: 'hiddenfield',
                name: 'idSector'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'sectorName',
                fieldLabel: me.messages.sectorNameLabel,
                anchor: '100%',
                allowBlank: false,
                maxLength: 150,
                fieldStyle: {textTransform: 'uppercase'}
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'sectorAcronym',
                fieldLabel: me.messages.sectorAcronymLabel,
                anchor: '100%',
                allowBlank: false,
                maxLength: 150,
                fieldStyle: {textTransform: 'uppercase'}
            }
        ];
        formItems.push(Ext.create('sisprod.view.Sector.TaskSchedulerGrid'));
        
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        me.callParent(arguments);
    }    
});