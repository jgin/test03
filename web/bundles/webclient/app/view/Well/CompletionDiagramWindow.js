/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Well.CompletionDiagramWindow', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.completionDiagramWindow',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        uploadButtonText: 'Upload File',
        maxUploadFileSizeMessage: 'Maximum Upload File Size is',
        fieldSetText: 'File Uploading',
        fileLabel: 'File',
        effectiveDateLabel: 'Date'
    },
    
    title: 'Completion Diagrams',
    modal: true,
    width: 590,    
    layout: 'fit',
    
    data: {},
    controller: null,
    
    initComponent: function(){
        var me = this;
        
        var wellCode = me.data['wellCode'];
        if(Ext.isDefined(wellCode) && wellCode !== null){
            me.title = Ext.String.format('{0} ({1})', me.title, wellCode);
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
//            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWell',
                    value: me.data['idWell']
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.fieldSetText,
                    layout: 'anchor',
                    padding: '5 0 0 5',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            anchor: '90%',
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'file',
                                    fieldLabel: me.messages.fileLabel,
                                    labelWidth: 50,
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    flex: 1,
//                                    buttonText: 'Select...',
                                    buttonConfig: {
                                        iconCls: 'browse'
                                    }
                                }]
                            },
                            {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            anchor: '60%',
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'effectiveDate',
                                    fieldLabel: me.messages.effectiveDateLabel,
                                    labelWidth: 50,
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    flex:1,
//                                    buttonText: 'Select...',
                                    buttonConfig: {
                                        iconCls: 'browse'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'upload',
                                    flex:0.5,
                                    text: me.messages.uploadButtonText,
                                    action: 'uploadFile',
                                    margin: '0 8 0 8'
                                }
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
                Ext.create('sisprod.view.Well.CompletionDiagramGrid', { idWell: me.data['idWell'] })
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