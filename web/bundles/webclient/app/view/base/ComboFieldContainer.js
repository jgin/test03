/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.base.ComboFieldContainer', {
    extend: 'Ext.form.FieldContainer',
    alias: ['widget.combofieldcontainer', 'widget.comboboxfieldcontainer'],
    requires: [
        'Ext.form.FieldContainer'
    ],
    
    messages: {
        addText: 'Open a window to add a new record',
        updateText: 'Update combobox list',
        clearText: 'Clear current combobox value'
        /*loadingText: 'Searching...',
        emptyText: 'No matching found'*/
    },
    
    layout: 'hbox',
    showButtons: {
        addButton: true,
        updateButton: true,
        clearButton: false
    },
    
    comboBoxOptions: {
        fieldLabel: 'ComboBox'
    },
    
    constructor: function(config) {
        var me = this;
        Ext.apply(me, config);
        this.callParent(arguments);
    },

    initComponent : function() {
	var me = this;
        var id = me.comboBoxOptions.id;
        var name = me.comboBoxOptions.name;
        if((!Ext.isDefined(id) && id===null) || (!Ext.isDefined(name) && name===null))
            Ext.Error.raise('No id or name property defined in ' + me.$className + '!');
        me.items = new Array();
        var items = [];
        //
        Ext.applyIf(me.comboBoxOptions, { fieldLabel: 'ComboBox'});
        var combo = Ext.create('Ext.form.field.ComboBox', me.comboBoxOptions);
        var store = me.comboBoxOptions.store;
        items.push(combo);
        //
        var buttonId = (Ext.isDefined(id) && id!==null)?id:name;
        var showAddButton = false, showUpdateButton = false,  showClearButton = false;
        if(Ext.isObject(me.showButtons)){
            showAddButton = me.showButtons.addButton;
            showUpdateButton = me.showButtons.updateButton;
            showClearButton = me.showButtons.clearButton;
        }
        else showAddButton = showUpdateButton = me.showButtons;
        if(showUpdateButton){
            var button = {
                xtype: 'button',
                id: buttonId+'UpdateButton',
                iconCls: 'update',
                width: 22,
                tooltip: me.messages.updateText,
                handler: function(){
                    if(Ext.isDefined(store) && store!==null) store.reload();
                }
            };
            items.push(button);
        }
        if(showAddButton){
            var button = {
                xtype: 'button',
                id: buttonId+'AddButton',
                iconCls: 'add',
                tooltip: me.messages.addText,
                width: 22
            };
            items.push(button);
        }
        if(showClearButton){
            var button = {
                xtype: 'button',
                id: buttonId+'ClearButton',
                iconCls: 'clean',
                tooltip: me.messages.clearText,
                width: 22,
                handler: function(){
                    if(Ext.isDefined(combo) && combo!==null) combo.clearValue();
                }
            };
            items.push(button);
        }
        me.items = items;
        me.callParent(arguments);
    }
});
