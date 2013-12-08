/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Quadrille.AddQuadrille', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addQuadrille',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Quadrille',
    messages: {
        labels: {
            idWorkShop: 'WorkShop',
            quadrilleName: 'Name',
            quadrilleAcronym: 'Acronym',
            numberOfMembers: 'Nbr. Of Members'
        }
    },
    modal: true,
    width: 400,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'combobox',
                    name: 'idWorkShop',
                    store: Ext.create('sisprod.store.WorkShopAll'),
                    fieldLabel: me.messages.labels.idWorkShop,
                    displayField: 'workShopName',
                    valueField: 'idWorkShop',
                    forceSelection: true,
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    name: 'quadrilleName',
                    fieldLabel: me.messages.labels.quadrilleName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 150,
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'textfield',
                    name: 'quadrilleAcronym',
                    fieldLabel: me.messages.labels.quadrilleAcronym,
                    anchor: '50%',
                    fieldStyle: {textTransform: 'uppercase'}
                },
                {
                    xtype: 'numberfield',
                    name: 'numberOfMembers',
                    fieldLabel: me.messages.labels.numberOfMembers,
                    anchor: '50%',
                    allowBlank: false,
                    minValue: 1
                }
            ]
        };
        me.callParent(arguments);
    }
});