/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestSource.UpdateWorkRequestSource', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkRequestSource',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Work Request Source',
    messages: {
        labels: {
            workRequestSourceName: 'Nombre de Origen',
            workRequestSourceAcronym: 'Acrónimo'
        }
    },
    
    modal: true,
    width: 400,
//    height: 150,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkRequestSource'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'workRequestSourceName',
                    fieldLabel: me.messages.labels.workRequestSourceName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'workRequestSourceAcronym',
                    fieldLabel: me.messages.labels.workRequestSourceAcronym,
                    anchor: '40%',
                    maxLength: 6,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            ]
        };
        
        me.callParent(arguments);
    }
});