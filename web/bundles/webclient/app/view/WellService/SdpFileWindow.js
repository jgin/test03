/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellService.SdpFileWindow', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.sdpFileWindow',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        uploadButtonText: 'Upload File',
        maxUploadFileSizeMessage: 'Maximum Upload File Size is',
        fieldSetText: 'File Uploading',
        fileLabel: 'File',
        dateActivityLabel: 'Date Activity'
    },
    
    title: 'Add SDP File',
    modal: true,
    width: 500,    
    layout: 'fit',
    
    data: {},
    controller: null,
    
    initComponent: function(){
        var me = this;
        
        var wellName = me.data['well.wellName'];
        if(Ext.isDefined(wellName) && wellName !== null){
            me.title = Ext.String.format('{0} ({1})', me.title, wellName);
        }
        //
        var maxUploadFileSize = '';
        Ext.BaseAjax.request({
            url:'listMessageMaxUploadFileSize.htm',
            method: 'GET',
            async: false,
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                if(data.success){ maxUploadFileSize = data.message; }
            }
        });
        //
        me.formOptions = {
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idSdp',
                    value: me.data['idSdp']
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.fieldSetText,
                    layout: 'anchor',
//                    padding: '5 0 0 5',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
//                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'file',
                                    fieldLabel: me.messages.fileLabel,
                                    width: '100%',
//                                    labelWidth: 50,
                                    msgTarget: 'side',
                                    allowBlank: false,
//                                    flex: 6,
                                    buttonConfig: {
                                        iconCls: 'browse'
                                    }
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'dateActivity',
                                            id: 'dateActivity',
                                            value : new Date(),
                                            flex: 5,
                                            fieldLabel: me.messages.dateActivityLabel
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'upload',
                                            flex:3,
                                            text: me.messages.uploadButtonText,
                                            action: 'uploadFile',
                                            margin: '4 0 0 30'
                                        }
                                    ]
                                },
//                                {
//                                    xtype: 'datefield',
//                                    name: 'dateActivity',
//                                    id: 'dateActivity',
//                                    value : new Date(),
//                                    fieldLabel: me.messages.dateActivityLabel
//                                },
//                                {
//                                    xtype: 'button',
//                                    iconCls: 'upload',
//                                    flex:1,
//                                    text: me.messages.uploadButtonText,
//                                    action: 'uploadFile',
////                                    margin: '0 8 0 15'
//                                }
                            ]
                            },
                        {
                            xtype: 'label',
                            html: Ext.String.format('<p class="alert">(*) {0} {1}</p>', me.messages.maxUploadFileSizeMessage,
                                    maxUploadFileSize),
                            anchor: '100%'
                        }
                    ]
                },
                Ext.create('sisprod.view.WellService.SdpFileGrid', { idSdp: me.data['idSdp'] })
            ],
            buttons: [
                {
                    text: me.windowMessages.closeText,
                    iconCls: 'cancel',
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ]
        };
        
        me.callParent(arguments);
    }
});