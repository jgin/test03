/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellService.ReasonsGrid', {
    extend: 'Ext.grid.Panel',
    messages: {
        sdpReasonNameLabel: 'Name',
        sdpReasonAcronymLabel: 'Acronym'
    },
    title: '',
    name: 'gridSdpReasonSelector',
    id: 'gridSdpReasonSelector',
    selType: 'checkboxmodel',
    selModel: {
        mode: 'MULTI', // or SINGLE, SIMPLE ... review API for Ext.selection.CheckboxModel
        checkOnly: true// or false to allow checkbox selection on click anywhere in row
    },
//    store: Ext.create('sisprod.store.SdpReasonAll'),
    height: 200,
    initComponent: function() {
        var me = this;
//        me.getStore().removeAll();
        me.columns = [
            {
                text: 'idSdpReason',
                dataIndex: 'idSdpReason',
                flex: 1,
                hidden: true
            },
            {
                text: me.messages.sdpReasonNameLabel,
                dataIndex: 'sdpReasonName',
                flex: 2
            },
            {
                text: me.messages.sdpReasonAcronymLabel,
                dataIndex: 'sdpReasonAcronym',
                flex: 2
            }
        ];

        me.callParent(arguments);
    }
});