/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.base.BasePageToolBar', {
    extend: 'Ext.ux.PagingToolbarResizer',
    
    alias: 'plugin.basePageToolBar',
    
    inactiveText: 'Show Inactive',
    
    constructor: function(config) {
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    init : function(pagingToolbar) {  
      this.callParent(arguments);  
      if(pagingToolbar.showCheckInactive === true){
          var ptStore = pagingToolbar.store;    
          var check = {
              xtype: 'checkboxfield',
              id: 'chk' + pagingToolbar.entityName,
              value: false,
              handler: function(checkbox){
                    var active = checkbox.getValue();
                    ptStore.proxy.extraParams.active = !active;
                    ptStore.reload();

                    var btnRemove = Ext.getCmp('btnRemove' + pagingToolbar.entityName);
                    var btnAdd = Ext.getCmp('btnAdd' + pagingToolbar.entityName);
                    var btnEdit = Ext.getCmp('btnEdit' + pagingToolbar.entityName);
                    var btnActive = Ext.getCmp('btnActive' + pagingToolbar.entityName)

                    if(Ext.isDefined(btnActive) && btnActive !== null) btnActive.setVisible(active);
                    if(Ext.isDefined(btnAdd) && btnAdd !== null) btnAdd.setVisible(!active);
                    if(Ext.isDefined(btnEdit) && btnEdit !== null) btnEdit.setVisible(!active);
                    if(Ext.isDefined(btnRemove) && btnRemove !== null) btnRemove.setVisible(!active);
              }
          };

          var index = pagingToolbar.items.indexOf(pagingToolbar.refresh);
          pagingToolbar.insert(++index, check);
          pagingToolbar.insert(++index, this.inactiveText);
          pagingToolbar.insert(++index,'-');
      }
    }
});

