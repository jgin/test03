Ext.define('sisprod.view.base.TabPanelItem', {
   extend: 'Ext.panel.Panel',

   xtype: 'tabPanelItem',
   closable: true,
   
   listeners: {
       beforerender: function(){
           sisprod.getApplication().showMask();
       },
       afterrender: function(){
           sisprod.getApplication().hideMask();
       }
   },
   
   initComponent: function(){
       var me = this;
       
//       me.on("close", function(panel, options){
//       });
       
       me.callParent(arguments);
   }
   
});