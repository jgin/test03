/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.FluidLevel.FluidLevelFilesWindow', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.fluidLevelFilesWindow',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        uploadButtonText: 'Upload File',
        maxUploadFileSizeMessage: 'Maximum Upload File Size is',
        fieldSetText: 'File Uploading',
        fileLabel: 'File'
    },
    
    title: 'Fluid Level Files',
    modal: true,
    width: 590,    
    layout: 'fit',
    
    data: {},
    controller: null,
    
    initComponent: function(){
        var me = this;
        
//        var workRequestFullNumber = me.data['workRequestFullNumber'];
//        if(Ext.isDefined(workRequestFullNumber) && workRequestFullNumber !== null){
//            me.title = Ext.String.format('{0} ({1})', me.title, workRequestFullNumber);
//        }
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
                    name: 'idFluidLevel',
                    value: me.data['idFluidLevel']
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
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'file',
                                    fieldLabel: me.messages.fileLabel,
                                    labelWidth: 50,
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    flex: 4,
//                                    buttonText: 'Select...',
                                    buttonConfig: {
                                        iconCls: 'browse'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'upload',
                                    flex: 1,
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
                Ext.create('sisprod.view.FluidLevel.FluidLevelFilesGrid', { idFluidLevel: me.data['idFluidLevel'] })
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