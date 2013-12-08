/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.application({
    name: 'sisprod',

    extend: 'sisprod.Application',
    
    controllers: [
        'sisprod.controller.Menu',
        'sisprod.controller.Base'      
    ],
    
    requires: [
      'Ext.data.Store',
      'Ext.form.Panel',
      'Ext.layout.container.Table',
      'Ext.form.Label',
      'Ext.form.FieldSet',
      'Ext.layout.component.FieldSet',
      'Ext.form.field.ComboBox',
      'Ext.form.Basic',
      'Ext.form.action.Submit',
      'Ext.form.action.StandardSubmit',
      'Ext.util.TaskRunner',
      'sisprod.store.Menu',
      'Ext.ux.statusbar.StatusBar',
      'Ext.ux.PagingToolbarResizer',
      'sisprod.view.base.HomePanel',
      'sisprod.view.base.BaseAjax',
      'Ext.grid.column.Column',
      'Ext.grid.column.Date',
      'Ext.grid.column.Number',
      'Ext.grid.column.Template',
      'Ext.grid.column.Boolean',
      'Ext.grid.plugin.RowEditing',
      'Ext.ux.grid.FiltersFeature',
      'sisprod.view.base.SensitiveComboBox',
      'sisprod.view.base.ComboFieldContainer',
      'sisprod.view.base.SensitiveComboBoxContainer',
      'sisprod.view.base.ColorPickerCombo',
      'Ext.form.field.VTypes',
      'sisprod.view.base.BasePageToolBar',
      'sisprod.view.base.MonthYearField',
      'sisprod.view.base.picker.Date',
      'sisprod.view.base.BasePrintWindow'
    ],

    //autoCreateViewport: true,
    
    launch: function(){
        var me = this;
        me.menuStore = Ext.create('sisprod.store.Menu');
    	Ext.create('sisprod.view.Viewport');
    }
});

function verifySessionInResponse(response) {
    var data=Ext.JSON.decode(response.responseText);
    if (data.sessionExpired)
        window.location.reload();
}

Ext.Ajax.on("beforerequest", function(conn, options, eOpts) {
    Ext.Ajax.timeout = 1000000;
});

Ext.Ajax.on("requestcomplete", function(conn, response, options, eOpts) {
    verifySessionInResponse(response);
});

Ext.Ajax.on("requestexception", function(conn, response, options, eOpts) {
    verifySessionInResponse(response);
});
