/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.ConfigParam.AddConfigParam', {
    extend: 'sisprod.view.base.TabPanelItem',    
    alias: 'widget.addConfigParam',    
    closable: true,
    height: 250,
    layout:{
        type: 'vbox',
        align: 'center'
    },    
    messages: {        
        formTitle : 'P & P Config Param',
        saveButtonText: 'Save',        
        closeText: 'Close'      
    },    
    autoScroll: true,
    padding: '20 0 0 0',        
    title: 'P & P Config Param',    
    /*afterrender : function(){
        for(var i = 0; i < combosArray.length; i++){
            var cbo = Ext.getCmp(combosArray[i].id);
            cbo.rawValue = combosArray[i].rawValue;
            cbo.value = combosArray[i].value;
            cbo.lastValue = combosArray[i].value;
        }
    },*/
    initComponent: function(){
        var me = this;
        
        var controllerName = sisprod.getApplication().getControllerName('ConfigParam');
        var controller = sisprod.getApplication().getController(controllerName);        
           
        me.items = new Array();
        
        var form = Ext.create('Ext.form.Panel', {
            title: me.messages.formTitle,
            id:'paramConfigParamFormPanel',
            frame: true,
            width : 750,
            layout: {
                type: 'anchor',
                align: 'left'
            },
            items: controller.getConfigParam(),
            buttons:[
                {
                    text: me.messages.saveButtonText,
                    action: 'savePP',
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
        //me.on("afterrender", me.afterrender, me);
        me.callParent(arguments);    
    }
});