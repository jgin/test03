/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.base.BaseDataWindow', {
   extend: 'Ext.window.Window',
   
   require: [
       'Ext.window.Window'
   ],
   
   title: 'Data',
   showWarningBeforeCancel: true,
           
   autoMappingOptions:{
       autoMapping: false,
       record: [],
       autoMappingFunction: {}
   },
   
   windowMessages: {
       saveText: 'Save',
       closeText: 'Close',
       msgWarningOnClose: 'Sure you want to close this window?',
       titleConfirmation: 'Confirmation'
   },
   
   formOptions: {
       autoHeight: true,
       url: '',
       items: [],
       buttons: []
   },
   
   modal: true,
   hasButtons: true,
   controller: null,
   
//   onEsc: function(){
//       this.myCloseHandler();
//   },
           
   initComponent: function(){
        var me = this;
//        me.listeners = {
//            'beforeclose': function(panel, opts){
//                if(me.showWarningBeforeCancel){
//                    Ext.Msg.show({
//                         title: me.windowMessages.titleConfirmation,
//                         msg: me.windowMessages.msgWarningOnClose,
//                         buttons: Ext.Msg.YESNO,
//                         icon: Ext.Msg.QUESTION,
//                         fn: function(res){
//                             if(res === 'no'){
//                                 return false;
//                             }
//                             else{
//                                 return true;
//                             }
//                         }
//                     });
//                }
//                
//            }
//        };
        var defaultFormOptions = {
            autoHeight: true,
            url: '',
            items: [],
//            id: 'formpanel',
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 70,
                width: 260
            }
        };
        
        if(me.hasButtons){
            var buttonSave = {
                text: me.windowMessages.saveText,
                action: 'save',
                iconCls: 'save'
            };
            
            var buttonCancel = {
                text: me.windowMessages.closeText,
                iconCls: 'cancel',
                action: 'close',
                handler: function() {
                    me.close();
                    //me.myCloseHandler();
                }
            }
            
            if(Ext.isDefined(me.controller) && me.controller !== null){
                if(Ext.isDefined(me.controller.entityName) && me.controller.entityName !== null){
                    var idSave = 'save' + me.controller.entityName;
                    var idCancel = 'cancel' + me.controller.entityName;
                    
                    if(!Ext.isDefined(Ext.getCmp(idSave)))
                        buttonSave.id = idSave;
                    
                    if(!Ext.isDefined(Ext.getCmp(idCancel)))
                        buttonCancel.id = idCancel;
                }
            }
            defaultFormOptions.buttons = [buttonSave, buttonCancel];
        }
        
        
        var options = Ext.Object.merge(defaultFormOptions, me.formOptions);
        
        var form = Ext.create('Ext.form.Panel', options);
        me.items = new Array();
        me.items.push(form);
        
        if(Ext.isDefined(me.autoMappingOptions.autoMapping) && me.autoMappingOptions.autoMapping === true){
            if(Ext.isDefined(me.autoMappingOptions.record)){
                if(Ext.isDefined(me.autoMappingOptions.autoMappingFunction)
                        && typeof(me.autoMappingOptions.autoMappingFunction)==='function')
                    me.autoMappingOptions.autoMappingFunction(form);
                else{
                    form.loadRecord(me.autoMappingOptions.record);
                }
            }
        }
        
//        me.on('minimize', me.minimizeWindow, me);
        
        me.callParent(arguments);
   },
   
   getController: function(){
       return this.controller;
   }
           
           
//    myCloseHandler: function(callback, scope) { 
//        var me = this;
//        if (me.showWarningBeforeCancel === true) {
//            Ext.MessageBox.show({
//                title: me.windowMessages.titleConfirmation,
//                msg: me.windowMessages.msgWarningOnClose,
//                buttons: Ext.Msg.YESNO,
//                icon: Ext.Msg.QUESTION,
//                fn: function(btn) {
//                   if (btn === 'yes')
//                       me.close();
//                }
//            });
//        }
//        else{
//            me.close();
//        }
//    }
   /*,
           
    minimizeWindow: function(){
        this.collapse(false);
        this.alignTo(document.body, 'bl-bl');
    }*/
});
