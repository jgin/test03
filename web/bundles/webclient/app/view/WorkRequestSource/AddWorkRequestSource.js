/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestSource.AddWorkRequestSource', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addWorkRequestSource',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Agregar Origenes de Pedido',
    
    messages: {
        labels: {
            workRequestSourceName: 'Nombre de Origen',
            workRequestSourceAcronym: 'Acrónimo'
        }
    },
    
    modal: true,
    width: 400,
    singleAddition: false,
//    height: 150,
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            items: [
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