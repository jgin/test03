/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.application({
    name: 'login',

    extend: 'login.Application',
    
    requires: [
      'Ext.data.Store',
      'Ext.form.Panel',
      'Ext.layout.container.Table',
      'Ext.form.Label',
      'Ext.form.FieldSet',
      'Ext.layout.component.FieldSet',
      'Ext.form.field.ComboBox'
    ],

    autoCreateViewport: true,

    init: function(){
        var me = this;
        
        if(Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
            Ext.Msg.alert(me.messages.messageText, me.messages.browserCompatibilityText);
        }
        Ext.getBody().mask('Loading application', 'splashscreen');
    },

    launch: function(){
        Ext.getBody().unmask();
//        Ext.create('login.view.Login');
    }
});
