/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.base.SensitiveComboBoxContainer', {
    extend: 'Ext.form.FieldContainer',
    alias: ['widget.sensitivecombocontainer', 'widget.sensitivecomboboxcontainer'],
    requires: [
        'Ext.form.FieldContainer'
    ],
    
    messages: {
        addText: 'Open a window to add a new record'
        /*loadingText: 'Searching...',
        emptyText: 'No matching found'*/
    },
    
    layout: 'hbox',
    showAddButton: true,
    
    sensitiveComboBoxOptions: {
        fieldLabel: 'ComboBox',
        emptyText: 'Select'
    },
    
    constructor: function(config) {
        var me = this;
        Ext.apply(me, config);
        this.callParent(arguments);
    },

    initComponent : function() {
	var me = this;
        var id = me.sensitiveComboBoxOptions.id;
        var name = me.sensitiveComboBoxOptions.name;
        if((!Ext.isDefined(id) && id===null) || (!Ext.isDefined(name) && name===null))
            Ext.Error.raise('No id or name property defined in ' + me.$className + '!');
        me.items = new Array();
        var items = [];
        //
        Ext.applyIf(me.sensitiveComboBoxOptions, { fieldLabel: 'ComboBox', emptyText: 'Select', flex: 11});
        var combo = Ext.create('sisprod.view.base.SensitiveComboBox', me.sensitiveComboBoxOptions);
        var store = me.sensitiveComboBoxOptions.store;
        items.push(combo);
        //
        var buttonId = (Ext.isDefined(id) && id!==null)?id:name;
        if(me.showAddButton){
            items.push({
                xtype: 'button',
                id: buttonId+'AddButton',
                iconCls: 'add',
                pack: 'end',
                tooltip: me.messages.addText,
                width: 22
            });
        }
        me.items = items;
        
        me.callParent(arguments);
    }
});
