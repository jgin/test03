/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpFile.AddSdpFile', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addSdpFile',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    idWellService:null,
    storeRef:null,
    messages: {
        fileLabel:'File'
    },
    
    title: 'Add Sdp File',
    modal: true,
    width: 450,
    entityName: '',
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 150
        },
        items: [
            {
               xtype:'hiddenfield',
               name:'idWellService',
               value:me.idWellService
            },
            {
                xtype: 'filefield',
                id: 'file',
                name: 'file',
                fieldLabel:me.messages.fileLabel,
                allowBlank: false,
                anchor: '99.5%',
                maxLength: 250
            }
        ]
    },
    me.callParent(arguments);    
    }
});
