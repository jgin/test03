/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.base.SensitiveComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.sensitivecombobox', 'widget.sensitivecombo'],
    requires: [
        'Ext.form.field.ComboBox'
    ],
    
    messages: {
        loadingText: 'Searching...',
        emptyText: 'No matching found'
    },
    
    typeAhead: false,
    hideTrigger:true,
    minChars: 1,

    constructor: function(config) {
        var me = this;
        if(Ext.isDefined(config.store) && config.store!==null){
            if(Ext.isDefined(config.store.pageSize) && config.store.pageSize!==null)
                Ext.apply(me, { pageSize: config.store.pageSize });
        }
        Ext.apply(me, config);
        Ext.applyIf(me.listConfig, {
            loadingText: me.messages.loadingText,
            emptyText: me.messages.emptyText
        });
        this.callParent(arguments);
    },

    initComponent : function() {
	var me = this;
        me.callParent(arguments);
    }
});
