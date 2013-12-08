/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.BaseAjax', {
    extend: 'Ext.data.Connection',
    
    require: [
        'Ext.data.Connection'
    ],
    
    loadingText: 'Loading...',
    
    singleton: true,
    method: 'POST',
    
    constructor: function(config){
        var me = this;
        me.method = "POST";
        
        me.callParent([config]);
        
        me.on("beforerequest", me.beforerequest);
        
        me.on("requestcomplete", me.requestcomplete);
        
        me.on("requestexception", me.requestexception);
    },
            
    beforerequest: function(conn, options, eOpts){
        var me = this;
        Ext.getBody().mask(me.loadingText);
    },
    
    requestcomplete: function(conn, response, options, eOpts){
        Ext.getBody().unmask();
    },
            
    requestexception: function(conn, response, options, eOpts){
        Ext.getBody().unmask();
    }
});
