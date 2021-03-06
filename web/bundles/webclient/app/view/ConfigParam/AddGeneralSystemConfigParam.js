/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.ConfigParam.AddGeneralSystemConfigParam', {
    extend: 'sisprod.view.base.TabPanelItem',    
    alias: 'widget.addGeneralSystemConfigParam',    
    closable: true,
    height: 250,
    layout:{
        type: 'vbox',
        align: 'center'
    },    
    messages: {        
        formTitle : 'General System Config Param',
        saveButtonText: 'Save',        
        closeText: 'Close'      
    },    
    autoScroll: true,
    padding: '20 0 0 0',        
    title: 'General System Config Param',    
    initComponent: function(){
        var me = this;
        
        var controllerName = sisprod.getApplication().getControllerName('ConfigParam');
        var controller = sisprod.getApplication().getController(controllerName);        
           
        me.items = new Array();
        
        var form = Ext.create('Ext.form.Panel', {
            title: me.messages.formTitle,
            id:'configParamGeneralSystemFormPanel',
            frame: true,
            width : 750,
            layout: {
                type: 'anchor',
                align: 'left'
            },
            items: controller.getConfigParamGeneralSystem(),
            buttons:[
                {
                    text: me.messages.saveButtonText,
                    action: 'saveGeneralSystem',
                    iconCls: 'save'                    
                },
                {
                    text: me.messages.closeText,
                    iconCls: 'cancel',
                    action: 'close',
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ]
        });
        me.items.push(form);        
        me.callParent(arguments);    
    }
});