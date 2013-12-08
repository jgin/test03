
Ext.define('sisprod.view.base.BaseGridContextMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'baseGridContextMenu',
    
    messages: {
        addText: 'Add',
        updateText: 'Update',
        deleteText: 'Delete'
    },
    
    permissions: {
        allowAdd: true,
        allowUpdate: true,
        allowDelete: true
    },
    
    controller: null,
    
    functions: {
        onAdd: function(){},
        onUpdate: function(){},
        onDelete: function(){}
    },
    
    initComponent: function(){
        var me = this;
        me.items = new Array();
        if(me.permissions.allowAdd){
            me.items.push({
                text: me.messages.addText,
                iconCls: 'add',
                id: 'context-add',
                handler: me.functions.onAdd
            });
        }
        if(me.permissions.allowUpdate){
            me.items.push({
                text: me.messages.updateText,
                iconCls: 'option',
                id: 'context-update',
                handler: me.functions.onUpdate
            });
        }
        if(me.permissions.allowDelete){
            me.items.push({
                text: me.messages.deleteText,
                iconCls: 'remove',
                id: 'context-delete',
                handler: me.functions.onDelete
            });
        } 

        me.callParent(arguments);
    }

});