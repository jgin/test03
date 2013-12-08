Ext.define('sisprod.controller.Menu', {
    extend: 'Ext.app.Controller',
    require: [
        'Ext.app.Controller'
    ],
    init: function() {
        this.control({
            'app-menu': {
                itemclick: this.menuItemClick
            }
        });
    },
    menuItemClick: function(view, record, item, index, event) {
        this.openTab(view, record, item, index, event);
    },
            
    loadController: function(){
        
    },
    
    openTab: function(view, record, item, index, event){
       var data = record.raw;
       if(data.leaf !== null && data.leaf){
           //
           var entityName = data.entityName;
           var viewName = data.view;
            //
            if(entityName === null) return;
            viewName = (Ext.isDefined(viewName) && viewName!==null)?viewName:"";
            var tabId = Ext.String.format('tab{0}{1}', entityName, viewName);
            var tabPanel = Ext.getCmp('content-panel');
            if(tabPanel === null) return;
            var tab = tabPanel.queryById(tabId);
            if(tab === null){
                if(entityName==='home'){
                    tab = tabPanel.add({
                        xtype: 'tabPanelItem',
                        title: 'Inicio',
                        id: tabId,
                        iconCls: 'home',
                        layout: {
                            type: 'border'
                        },
                        items: [{
                            xtype:'homepanel',
                            region: 'center'
                        }]
                    });
                    tabPanel.setActiveTab(tab);
                }
                else{
                    var controller = null;
                    var tabPanel = Ext.getCmp('content-panel');
                    var createView = true;
                    var defaultPermissions = {};
                    //
                    if(Ext.isDefined(data.useController) && data.useController === true){
                        var controllerName = sisprod.getApplication().getControllerName(entityName);
                        controller = this.application.getController(controllerName);
                        //
                        if(Ext.isDefined(controller) && controller!==null)
                            createView = controller.beforeShowInitialView(data, tabPanel, tabId);
                    }
                    //
                    if(!createView) return;
                    var tabOptions = {
                        id: tabId,
                        title: data.text,
                        entityName: entityName,
                        closable: true,
                        controller: controller,
                        iconCls: data.iconCls
                    };
                    var initialViewName = Ext.String.format('sisprod.view.{0}.{1}{2}', entityName, viewName, entityName); 
                    if(Ext.isDefined(data.useController) && data.useController === true) {
                        if(Ext.isDefined(controller) && controller!==null)
                            controller.showCheckingOutPermissions(data, tabPanel, tabId, tabOptions, initialViewName);
                        else {
                            var tab = Ext.create(initialViewName, tabOptions);
                            tabPanel.add(tab);
                            tabPanel.setActiveTab(tab);
                        }
                    }
                    else {
                        var tab = Ext.create(initialViewName, tabOptions);
                        tabPanel.add(tab);
                        tabPanel.setActiveTab(tab);
                    }
                }
            }
            else{
                tabPanel.setActiveTab(tab);
            }
       }
    }
});
