Ext.define('locale.es.sisprod.Base', {
    override: 'Ext.form.field.Base',
    initComponent: function() {
        if (this.allowBlank !== undefined && !this.allowBlank) {
            if (!this.labelSeparator) {
                this.labelSeparator = "";
            }
            this.labelSeparator += '<span class="required">*</span>';
        }
        this.callParent(arguments);
    }
});

Ext.define("Ext.locale.es.sisprod.view.base.picker.Date", {
    override: "sisprod.view.base.picker.Date",
    todayText: "Hoy",
    minText: "Esta fecha es anterior a la fecha mínima",
    maxText: "Esta fecha es posterior a la fecha máxima",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Mes Siguiente (Control+Right)',
    prevText: 'Mes Anterior (Control+Left)',
    monthYearText: 'Seleccione un mes (Control+Up/Down para desplazar el año)',
    todayTip: "{0} (Barra espaciadora)",
    format: "d-m-Y",
    startDay: 1
});

Ext.define('locale.es.sisprod.view.base.BasePageToolBar', {
    override: 'sisprod.view.base.BasePageToolBar',
    inactiveText: 'Mostrar Inactivos'
});

Ext.define("locale.es.sisprod.view.base.BaseGridPanel", {
    override: 'sisprod.view.base.BaseGridPanel',
    title: 'Listado',
    gridMessages: {
        buttonText: {
            addText: 'Agregar',
            updateText: 'Editar',
            deleteText: 'Eliminar',
            printText: 'Exportar datos',
            activeText: 'Activar',
            importDataText: 'Importar Datos',
            importDataStateText: 'Estado de Importación de Datos'
        },
        pageText: {
            displayMsg: 'Mostrando registros {0} - {1} de {2}',
            emptyMsg: 'No hay registros para mostrar'
        }
    },
    conversionFormats: {
        dateFormat: 'd-m-Y',
        integerFormat: '0',
        floatFormat: '0.00'
    }
});

Ext.define("locale.es.sisprod.view.base.TabPanelGridItem", {
    override: 'sisprod.view.base.TabPanelGridItem',
    gridMessages: {
        buttonText: {
            importData: 'Importar Datos',
            importDataState: 'Estado de Importación de Datos'
        }
    }
});

Ext.define("locale.es.sisprod.view.base.NotAuthorizedPanel", {
    override: 'sisprod.view.base.NotAuthorizedPanel',
    panelMessages: {
        infoText: 'Ud. no está autorizado para visualizar esta opción.'
    }
});

Ext.define("locale.es.sisprod.view.base.BaseDataWindow", {
    override: 'sisprod.view.base.BaseDataWindow',
    title: 'Datos',
    windowMessages: {
        saveText: 'Guardar',
        closeText: 'Cerrar',
        msgWarningOnClose: '¿Está seguro que desea salir esta ventana?',
        titleConfirmation: 'Confirmación'
    }
});

Ext.define("locale.es.sisprod.view.base.BasePrintWindow", {
    override: 'sisprod.view.base.BasePrintWindow',
    title: 'Exportar',
    windowMessages: {
        okText: 'Aceptar',
        closeText: 'Cerrar',
        reportTitleLabel: 'Título',
        formatLabel: 'Formato',
        formatEmptyText: 'Seleccione...',
        pagesLabel: 'Páginas',
        toLabel: 'A',
        pageFromValidator: 'Página de inicio debe ser menor a la de fin',
        formatsStoreText: {
            html: "Página Web (html)",
            pdf: "Formato de Doc. Portátil (PDF)",
            xls: "Hoja de Calc. Excel (XLS)",
            xlsx: "Hoja de Calc. Excel (XLSX)"
        }
    }
});

Ext.define("locale.es.sisprod.view.base.ExportDataWindow", {
    override: 'sisprod.view.base.ExportDataWindow',
    title: 'Exportar datos a excel',
    windowMessages: {
        okText: 'Aceptar',
        closeText: 'Cerrar',
        formatLabel: 'Formato',
        formatEmptyText: 'Seleccione...',
        pagesLabel: 'Páginas',
        toLabel: 'A',
        pageFromValidator: 'Página de inicio debe ser menor a la de fin',
        formatsStoreText: {
            xls: "Hoja de Calc. Excel (XLS)"
        }
    }
});

Ext.define("locale.es.sisprod.view.Reports.WorkOrderBacklogReports", {
    override: 'sisprod.view.Reports.WorkOrderBacklogReports',
    title: 'Reporte de Backlog de OT',
    messages: {
        reportTitle: 'Reporte de Backlog de OT',
        labels: {
            workRequestSource: 'Origen de Pedido',
            workRequestGenerationDate: 'Fecha Generación Pedido',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define("locale.es.sisprod.view.Reports.PerformedActivitiesReports", {
    override: 'sisprod.view.Reports.PerformedActivitiesReports',
    title: 'Reporte de Actividades Ejecutadas',
    messages: {
        reportTitle: 'Actividades Ejecutadas',
        messageText: 'Mensaje',
        labels: {
            lot: 'Lote',
            workCategory: 'Categoría Trabajo',
            workCategoryDetail: 'Tipo de Trabajo',
            fromDate: 'Fecha Inicio',
            toDate: 'Fecha Fin',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        validations: {
            selectWorkCategory: 'Primero seleccione el tipo de trabajo...'
        },
        workCategoryDetailEmptyText: 'Escriba el tipo de trabajo...'
    }
});

Ext.define("locale.es.sisprod.view.Reports.ManagementIndicatorReports", {
    override: 'sisprod.view.Reports.ManagementIndicatorReports',
    title: 'indicador de Gestión',
    messages: {
        reportTitle: 'Indicador de Gestión',
        messageText: 'Mensaje',
        labels: {
            year: 'Año',
            lot: 'Lote',
            workRequestSource: 'Origen de Pedido',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define("locale.es.sisprod.view.Reports.WorkRequestEffectivenessPlanningReports", {
    override: 'sisprod.view.Reports.WorkRequestEffectivenessPlanningReports',
    title: 'Reporte de Eficacia de Planificación',
    messages: {
        reportTitle: 'Eficacia de Planificación (% de Pedidos Atendidos)',
        messageText: 'Mensaje',
        labels: {
            lot: 'Lote',
            date: 'Fecha',
            fromDate: 'Inicio',
            toDate: 'Fin',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        lotEmptyText: 'Todos...'
    }
});

Ext.define("locale.es.sisprod.view.Reports.WorkOrderEfficiencyReports", {
    override: 'sisprod.view.Reports.WorkOrderEfficiencyReports',
    title: 'Reporte de Eficacia de OT',
    messages: {
        reportTitle: 'Reporte de Eficacia de OT',
        labels: {
            sector: 'Sector',
            reportGenerationDate: 'Fecha Generación Resporte',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('locale.es.Ext.ux.PagingToolbarResizer', {
    override: 'Ext.ux.PagingToolbarResizer',
    displayText: 'Registros por página'
});

Ext.define('locale.es.sisprod.view.WorkCategory.ListWorkCategory', {
    override: 'sisprod.view.WorkCategory.ListWorkCategory',
    title: 'Listado de Categorías de Trabajo'
});

Ext.define('locale.es.Ext.BaseAjax', {
    override: 'Ext.BaseAjax',
    loadingText: 'Cargando...'
});

Ext.define('locale.es.sisprod.Application', {
    override: 'sisprod.Application',
    applicationTitle: 'SISTEMA DE EXPLORACIÓN Y PRODUCCIÓN',
    companyName: 'COMPAÑIA GMP',
    loadingText: 'Cargando...'
});

Ext.define('locale.es.sisprod.view.base.Header', {
    override: 'sisprod.view.base.Header',
    messages: {
        closeSessionText: 'Cerrar Sesión',
        closeSessionConfirmMessage: 'Esta apunto de salir de la aplicación. ¿Está seguro de que desea continuar?',
        productionPeriod: 'Fecha de Reporte'
    }
});

Ext.define('locale.es.sisprod.controller.Base', {
    override: 'sisprod.controller.Base',
    controllerMessages: {
        updateText: 'Editar',
        deleteText: 'Eliminar',
        activateText: 'Activar',
        selectRecordMessage: 'Por favor, seleccione un registro primero...',
        deleteRecorConfirmationMessage: '¿Está seguro que desea eliminar {0}?',
        alertMessage: 'Mensaje',
        confirmText: 'Confirmar Operación',
        activateRecordConfirmationMessage: '¿Está seguro que desea activar {0}?'
    }
});

//Ext.define('locale.es.sisprod.view.base.BaseGridContextMenu',{
//    override: 'sisprod.view.base.BaseGridContextMenu',
//    messages: {
//        addText: 'Agregar',
//        updateText: 'Editar',
//        deleteText: 'Eliminar'
//    }
//});

Ext.define("locale.es.form.field.Date", {
    override: "Ext.form.field.Date",
    format: "d-m-Y"
});

Ext.define('locale.es.Ext.ux.grid.FiltersFeature', {
    override: 'Ext.ux.grid.FiltersFeature',
    menuFilterText: 'Filtros'
});

Ext.define('locale.es.Ext.ux.grid.filter.DateFilter', {
    override: 'Ext.ux.grid.filter.DateFilter',
    afterText: 'Después de',
    beforeText: 'Antes de',
    dateFormat: 'd-m-Y',
    onText: 'El día'
});

Ext.define('locale.es.Ext.ux.grid.menu.RangeMenu', {
    override: 'Ext.ux.grid.menu.RangeMenu',
    fieldLabels: {
        gt: 'Mayor que',
        lt: 'Menor que',
        eq: 'Igual a'
    },
    menuItemCfgs: {
        emptyText: 'Ingrese número...'
    }
});

Ext.define('locale.es.Ext.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',
    saveBtnText: 'Actualizar',
    cancelBtnText: 'Cancelar',
    errorsText: 'Errores',
    dirtyText: 'Debe guardar sus cambios o cancelar.'
});

Ext.define('locale.es.sisprod.view.CloseDateBacklog.ManageCloseDateBacklog', {
    override: 'sisprod.view.CloseDateBacklog.ManageCloseDateBacklog',
    listTitle: 'Fechas de Cierre',
    messages: {
        alertMessage: 'Mensaje',
        saveButtonText: 'Guardar',
        closingDatesSavedSuccessfuly: 'Las fechas de cierre para el presente año se guardaron correctamente!',
        closingDates: 'Fechas de Cierre'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestStatus.ListWorkRequestStatus', {
    override: 'sisprod.view.WorkRequestStatus.ListWorkRequestStatus',
    listTitle: 'Listado de Estados de Pedido',
    messages: {
        headers: {
            idWorkRequestStatus: 'Identificador',
            workRequestStatusName: 'Nombre de Estado',
            hasCause: 'Tiene Motivos',
            workRequestStatusColor: 'Color'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestStatus.AddWorkRequestStatus', {
    override: 'sisprod.view.WorkRequestStatus.AddWorkRequestStatus',
    title: 'Agregar Estado de Pedido',
    messages: {
        labels: {
            workRequestStatusName: 'Nombre',
            hasCause: 'Tiene Motivos'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestStatus.UpdateWorkRequestStatus', {
    override: 'sisprod.view.WorkRequestStatus.UpdateWorkRequestStatus',
    title: 'Editar Estado de Pedido',
    messages: {
        labels: {
            workRequestStatusName: 'Nombre',
            hasCause: 'Tiene Motivos'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestStatus.RequestStatusReasonGrid', {
    override: 'sisprod.view.WorkRequestStatus.RequestStatusReasonGrid',
    messages: {
        title: 'Motivos',
        columnHeaders: {
            workRequestStatusReasonName: 'Nombre',
            workRequestStatusReasonDescription: 'Descripción'
        },
        validation: {
            repeteadItem: 'Los siguientes campos tienen valores que ya han sido ingresados: {0}. Por favor cambielos!'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.controller.WorkRequestStatusController', {
    override: 'sisprod.controller.WorkRequestStatusController',
    messages: {
        addReasonDetails: 'Ingrese al menos un motivo para el estado del pedido!'
    }
});

Ext.define('locale.es.sisprod.view.DirectWorkOrder.ListDirectWorkOrder', {
    override: 'sisprod.view.DirectWorkOrder.ListDirectWorkOrder',
    listTitle: 'Listado de Ordenes Directas',
    messages: {
        headers: {
            idWorkOrder: 'Identificador',
            sectorName: 'Sector',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetailName: 'Tipo Trabajo',
            locationName: 'Ubicación',
            workOrderStatusName: 'Estado',
            workOrderDate: 'Fecha Registro',
            workOrderFullNumber: 'N° Orden',
            executionStartDate: 'Inicio Ejecución',
            executionEndDate: 'Fin Ejecución',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            workShopName: 'Taller',
            quadrilleName: 'Cuadrilla',
            worshopCoordinatorName: 'Coordinador',
            equipmentName: 'Equipo',
            entityName: 'Contratista',
            isDirect: 'Directa'
        }
    }
});

Ext.define('locale.es.sisprod.view.DirectWorkOrder.AddDirectWorkOrder', {
    override: 'sisprod.view.DirectWorkOrder.AddDirectWorkOrder',
    title: 'Agregar Orden de Trabajo Directa',
    messages: {
        labels: {
            equipmentType: 'Tipo Equipo',
            equipment: 'Equipo',
            lot: 'Lote',
            workRequestNumber: 'Work Request Number',
            workRequestFullNumber: 'Request Nbr.',
            workOrderDate: 'Fecha Oren',
            workOrderNumber: 'N° Orden',
            workRequestSource: 'Work Request Source',
            workOrderReason: 'Motivo de Orden',
            generalData: 'Datos Generales',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            locationName: 'Ubicación',
            workRequestSourceName: 'Request Source',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Scheduler',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Attent. Max. Date',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            executionDate: 'Fecha Ejecución',
            executionStartDate: 'Inicio',
            executionEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            execution: 'Ejecución',
            workOrderService: 'Orden Servicio',
            plannedHours: 'Planned Hours',
            peformedHours: 'Performed Hours',
            activityTab: 'Actividades',
            productTab: 'Materiales',
            partialSave: 'Partial Save',
            closeOrder: 'Generar Orden',
            executeData: 'Ejecución',
            percentageUseResources: 'Percentage usage resources',
            percentageAdvance: 'Percenge Advance',
            executionData: 'Datos de Ejecución',
            comment: 'Comentario',
            responsibleOfInstallation: 'Responsable de la Instalación'
            
        },
        validations: {
            alertTitle: 'Mensaje',
            firstSelectEquipmentAlertText: 'Primero seleccione un tipo de equipo!',
            selectSector: 'Primero seleccione sector...',
            selectWorkCategory: 'Primero seleccione categoría de trabajo...',
            selectWorkShop: 'Primero seleccione taller...'
        },
        equipmentEmptyText: 'Escriba el nombre de equipo...',
        workCategoryDetailEmptyText: 'Escriba el tipo de trabajo...',
        loadTemplateText: 'Load Template',
        workRequestData: 'Work Request Data',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        quadrilleData: 'Cuadrilla',
        evidenceData: 'Archivos de Evidencia',
        generate: 'Generar'
    }
});

Ext.define('locale.es.sisprod.view.DirectWorkOrder.UpdateDirectWorkOrder', {
    override: 'sisprod.view.DirectWorkOrder.UpdateDirectWorkOrder',
    title: 'Editar Orden de Trabajo Directa',
    messages: {
        labels: {
            equipmentType: 'Tipo Equipo',
            equipment: 'Equipo',
            lot: 'Lote',
            workRequestNumber: 'Work Request Number',
            workRequestFullNumber: 'Request Nbr.',
            workOrderDate: 'Fecha Oren',
            workOrderNumber: 'N° Orden',
            workRequestSource: 'Work Request Source',
            workOrderReason: 'Motivo de Orden',
            generalData: 'Datos Generales',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            locationName: 'Ubicación',
            workRequestSourceName: 'Request Source',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Scheduler',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Attent. Max. Date',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            executionDate: 'Fecha Ejecución',
            executionStartDate: 'Inicio',
            executionEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            execution: 'Ejecución',
            workOrderService: 'Orden Servicio',
            plannedHours: 'Planned Hours',
            peformedHours: 'Performed Hours',
            activityTab: 'Actividades',
            productTab: 'Materiales',
            partialSave: 'Partial Save',
            closeOrder: 'Generar Orden',
            executeData: 'Ejecución',
            save: 'Guardar',
            percentageUseResources: 'Percentage usage resources',
            percentageAdvance: 'Percenge Advance',
            executionData: 'Datos de Ejecución',
            comment: 'Comentario',
            responsibleOfInstallation: 'Responsable de la Instalación'
        },
        validations: {
            alertTitle: 'Mensaje',
            firstSelectEquipmentAlertText: 'Primero seleccione un tipo de equipo!',
            selectSector: 'Primero seleccione sector...',
            selectWorkCategory: 'Primero seleccione categoría de trabajo...',
            selectWorkShop: 'Primero seleccione taller...'
        },
        loadTemplateText: 'Load Template',
        workRequestData: 'Work Request Data',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        quadrilleData: 'Cuadrilla',
        evidenceData: 'Archivos de Evidencia',
        save: 'Guardar'
    }
});

Ext.define('Ext.locale.es.sisprod.controller.DirectWorkOrderController', {
    override: 'sisprod.controller.DirectWorkOrderController',
    messages: {
        templateLoadingConfirmation: 'All Resources data will be clean. Are you sure you want to apply the selected template?',
        multiOrderQuestion: 'This Work Request will generate more orders?',
        validations: {
            selectWorkCategoryDetail: 'Primero seleccione el tipo de trabajo...!',
            emptyResourcesText: 'Ingrese al menos un(a) {0}!',
            requiredFieldsText: 'Complete los campos requeridos para generar orden: {0}!',
            activities: 'Actividad',
            equipments: 'Equipo',
            products: 'Material',
            idWorkShop: 'Taller',
            idWorkShopCoordinator: 'Coordinador',
            idQuadrille: 'Cuadrilla',
            scheduledStartDate: 'Inicio de Planificación',
            scheduledEndDate: 'Fin de Planificación',
            quadrille: 'Cuadrilla'
        },
        noActivityRegister: 'Debe Registrar al menos una actividad',
        alertActivity: 'Al menos debe registrar la ejecución de una actividad (planificada o nueva)',
        alertProduct: 'Al menos debe registrar el uso de un material (planificado o nuevo)',
        alertNoFounAllEvidenceTypeRequired: 'Debe registrar por lo menos un documento de evidencia de los siguientes tipos:',
        quadrille: 'Cuadrilla',
        alertActivitiesInvalid: '¡Hay actividades con ejecuciones fuera del rango del ejecución de la orden, proceda a corregir!',
        alertDetailInValid: '¡Hay ejecuciones de actividad con fecha fuera del rango de ejecución de la orden, proceda a corregir!',
        alertErrorNow: '¡Hay actividades con ejecuciones mayores a la fecha actual del servidor, proceda a corregir!',
        alertDirectWorkOrderNotEditable: '¡No puede editar una orden directa que ya fue validada!',
        alertExecutionEndDate: '¡La fecha de fin de ejecución no debe ser mayor a la fecha actual del servidor!',
        emptyActivities: 'Hay actividades ejecutadas con horas hombre y máquina 0. Por favor, verifíquelas!'
    }
});

Ext.define('locale.es.sisprod.view.DirectWorkOrder.ActivityOtGrid', {
    override: 'sisprod.view.DirectWorkOrder.ActivityOtGrid',
    messages: {
        activityOtTitle: "Lista de Actividades",
        manHoursLabel: 'Horas Hombre',
        machineHoursLabel: 'Horas Máquina',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta actividad ya sido agregada',
        noActivityOtToAddError: 'Seleccione una actividad',
        noActivityOtSelectToRemoveError: 'Seleccione la actividad a eliminar',
        activityOtEmptyText: 'Escriba una Actividad',
        confirmText: '¿Desea agregar {0} como nueva actividad?',
        inputStartDateForDetail: '¡Ingrese Fecha de Inicio para poder ingresar detalle de atividades!'
    }
});

Ext.define('locale.es.sisprod.view.DirectWorkOrder.ProductGrid', {
    override: 'sisprod.view.DirectWorkOrder.ProductGrid',
    messages: {
        productTitle: "Lista de Materiales",
        quantityLabel: 'Cantidad',
        productLabel: 'Material',
        measureUnitLabel: 'Unidad de Medidad',
        idMeasureUnitLabel: 'Identificador',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'Este material ya ha sido agregado',
        noProductToAddError: 'Seleccione un material',
        noProductSelectToRemoveError: 'Seleccione un material a eliminar',
        productEmptyText: 'Escriba un material',
        productCode: 'Código',
        priceLabel: 'Precio',
        stockLabel: 'Stock',
        storeLabel: 'Almacen'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderStatus.ListWorkOrderStatus', {
    override: 'sisprod.view.WorkOrderStatus.ListWorkOrderStatus',
    listTitle: 'Listado de Estados de Orden',
    messages: {
        headers: {
            idWorkOrderStatus: 'Identificador',
            workOrderStatusName: 'Nombre de Estado',
            hasCause: 'Tiene Motivos',
            workOrderStatusColor: 'Color'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderStatus.AddWorkOrderStatus', {
    override: 'sisprod.view.WorkOrderStatus.AddWorkOrderStatus',
    title: 'Agregar Estado de Orden',
    messages: {
        labels: {
            workOrderStatusName: 'Nombre',
            hasCause: 'Tiene Motivos'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderStatus.UpdateWorkOrderStatus', {
    override: 'sisprod.view.WorkOrderStatus.UpdateWorkOrderStatus',
    title: 'Editar Estado de Orden',
    messages: {
        labels: {
            workOrderStatusName: 'Nombre',
            hasCause: 'Tiene Motivos'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderStatus.OrderStatusReasonGrid', {
    override: 'sisprod.view.WorkOrderStatus.OrderStatusReasonGrid',
    messages: {
        title: 'Motivos',
        columnHeaders: {
            workOrderStatusReasonName: 'Nombre',
            workOrderStatusReasonDescription: 'Descripción'
        },
        validation: {
            repeteadItem: 'Los siguientes campos tienen valores que ya han sido ingresados: {0}. Por favor cambielos!'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.controller.WorkOrderStatusController', {
    override: 'sisprod.controller.WorkOrderStatusController',
    messages: {
        addReasonDetails: 'Ingrese al menos un motivo para el estado de la orden!'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequest.ReferenceFilesGrid', {
    override: 'sisprod.view.WorkRequest.ReferenceFilesGrid',
    messages: {
        headers: {
            referenceFileName: 'Nombe de Archivo'
        },
        referenceFilesTitle: 'Archivos de Referencia',
        uploadButtonText: 'Subir Archivo',
        downloadButtonText: 'Descargar',
        removeButtonText: 'Eliminar',
        confirmText: '¿Esta seguro que desea elminar {0}?',
        alertMessage: 'Mensaje'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequest.WorkRequestReferenceFilesWindow', {
    override: 'sisprod.view.WorkRequest.WorkRequestReferenceFilesWindow',
    title: 'Archivos de Referencia',
    messages: {
        uploadButtonText: 'Subir Archivo',
        maxUploadFileSizeMessage: 'El tamaño máximo de carga es',
        fieldSetText: 'Selección de Archivo',
        fileLabel: 'Archivo'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequest.ListWorkRequest', {
    override: 'sisprod.view.WorkRequest.ListWorkRequest',
    listTitle: 'Listado de Pedidos de Trabajo',
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            lotName: 'Lote',
            workRequestSourceName: 'Origen',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            dependencyName: 'Dependencia',
            applicantFullName: 'Interesado',
            recipientFullName: 'Receptor de Planificación',
            senderFullName: 'Emisor',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado',
            description: 'Descripción',
            reportLink: 'Imprimir'
        },
        nullifyButtonText: 'Anular',
        attachFilesButtonText: 'Adjuntar Archivos'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequest.AddWorkRequest', {
    override: 'sisprod.view.WorkRequest.AddWorkRequest',
    title: 'Nuevo Pedido de Trabajo',
    messages: {
        validation: {
            alertTitle: 'Mensaje',
            firstSelectWorkCategoryText: 'Por favor, primero seleccione categoría de trabajo...',
            firstSelectLotAlertText: 'Por favor, primero seleccione lote...'
        },
        formTitle: 'Datos de Pedido',
        lotLabel: 'Lote',
        requestDateLabel: 'Fecha',
        workCategoryLabel: 'Categoría de Trabajo',
        workCategoryDetailLabel: 'Tipo de Trabajo',
        workCategoryDetailEmptyText: 'Escriba el nombre del tipo de trabajo',
        workCategoryEmptyText: 'Escriba la categoría de trabajo',
        workRequestSourceLabel: 'Origen de Pedido',
        equipmentTypeLabel: 'Tipo de Equipo',
        equipmentLabel: 'Equipo',
        equipmentEmptyText: 'Escriba el nombre del equipo...',
        locationLabel: 'Ubicación',
        locationEmptyText: 'Escriba el nombre de una ubicación..',
        applicantLabel: 'Interesado',
        applicantEmptyText: 'Escriba el nombre de un trabajador...',
        recipientLabel: 'Receptor de Planificación',
        recipientEmptyText: 'Escriba el nombre de un trabajador...',
        workDetailsLabel: 'Indique el trabajo a realizar',
        firstSelectAlertText: 'Seleccione el tipo de equipo antes de realizar la búsqueda!',
        firstSelectWorkCategoryAlertText: 'Seleccione categoría de trabajo antes de realizar la búsqueda!',
        isSubstandardConditionLabel: 'Es Sub Estandar',
        detectionDateLabel: 'Fecha de Detección',
        subStandardLabel: 'Tipo Sub Estandar',
        subStandardConditionActionLabel: 'Condicion Sub Estandar',
        hsseSupervisorLabel: 'Supervisor',
        hsseSupervisorEmptyText: 'Hsse Supervisor',
        subStandardTitle: 'Datos Sub Estandar'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequest.UpdateWorkRequest', {
    override: 'sisprod.view.WorkRequest.UpdateWorkRequest',
    title: 'Editar Pedido de Trabajo',
    messages: {
        validation: {
            alertTitle: 'Mensaje',
            firstSelectWorkCategoryText: 'Por favor, primero seleccione categoría de trabajo...',
            firstSelectLotAlertText: 'Por favor, primero seleccione lote...'
        },
        formTitle: 'Datos de Pedido',
        lotLabel: 'Lote',
        requestDateLabel: 'Fecha',
        workCategoryLabel: 'Categoría de Trabajo',
        workCategoryDetailLabel: 'Tipo de Trabajo',
        workCategoryDetailEmptyText: 'Escriba el nombre del tipo de trabajo',
        workCategoryEmptyText: 'Escriba la categoría de trabajo',
        workRequestSourceLabel: 'Origen de Pedido',
        workRequestFullNumberLabel: 'N° de Pedido',
        equipmentTypeLabel: 'Tipo de Equipo',
        equipmentLabel: 'Equipo',
        equipmentEmptyText: 'Escriba el nombre del equipo...',
        locationLabel: 'Ubicación',
        locationEmptyText: 'Escriba el nombre de una ubicación..',
        applicantLabel: 'Interesado',
        applicantEmptyText: 'Escriba el nombre de un trabajador...',
        recipientLabel: 'Receptor de Planificación',
        recipientEmptyText: 'Escriba el nombre de un trabajador...',
        workDetailsLabel: 'Indique el trabajo a realizar',
        firstSelectAlertText: 'Seleccione el tipo de equipo antes de realizar la búsqueda!',
        firstSelectWorkCategoryAlertText: 'Seleccione categoría de trabajo antes de realizar la búsqueda!',
        isSubstandardConditionLabel: 'Es Sub Estandar',
        detectionDateLabel: 'Fecha de Detección',
        subStandardLabel: 'Tipo Sub Estandar',
        subStandardConditionActionLabel: 'Factor Sub Estandar',
        hsseSupervisorLabel: 'Supervisor',
        hsseSupervisorEmptyText: 'Hsse Supervisor',
        subStandardTitle: 'Datos Sub Estandar'
    }
});

Ext.define('locale.es.sisprod.view.SchedulingWorkRequest.ViewWorkRequest', {
    override: 'sisprod.view.SchedulingWorkRequest.ViewWorkRequest',
    title: 'Detalle de Pedido de Trabajo',
    messages: {
        formTitle: 'Datos de Pedido',
        lotLabel: 'Lote',
        requestDateLabel: 'Fecha',
        workCategoryLabel: 'Categoría de Trabajo',
        workCategoryDetailLabel: 'Tipo de Trabajo',
        workRequestSourceLabel: 'Origen de Pedido',
        workRequestFullNumberLabel: 'N° de Pedido',
        equipmentTypeLabel: 'Tipo de Equipo',
        equipmentLabel: 'Equipo',
        locationLabel: 'Ubicación',
        applicantLabel: 'Interesado',
        workDetailsLabel: 'Trabajo a realizar',
        isSubstandardConditionLabel: 'Es Cond. Sub estándar',
        detectionDateLabel: 'Fecha Detección',
        subStandardLabel: 'Tipo Sub estándar',
        hsseSupervisorLabel: 'Supervisor',
        subStandardTitle: 'Sub estándar',
        multiOrder: '¿Generará más órdenes?'
    }
});

Ext.define('locale.es.sisprod.view.WorkRequest.NullifyWorkRequest', {
    override: 'sisprod.view.WorkRequest.NullifyWorkRequest',
    title: 'Anular Pedido de Trabajo',
    windowMessages: {
        saveText: 'Anular',
        closeText: 'Cerrar'
    },
    messages: {
        labels: {
            workRequestFullNumber: 'N° de Pedido',
            nullificationDate: 'Fecha',
            nullificationReason: 'Motivo',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.AnnullableWorkRequest.NullifyWorkRequest', {
    override: 'sisprod.view.AnnullableWorkRequest.NullifyWorkRequest',
    title: 'Anular Pedido de Trabajo',
    windowMessages: {
        saveText: 'Anular',
        closeText: 'Cerrar'
    },
    messages: {
        labels: {
            workRequestFullNumber: 'N° de Pedido',
            nullificationDate: 'Fecha',
            nullificationReason: 'Motivo',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.DuplicatedWorkRequest.NullifyWorkRequest', {
    override: 'sisprod.view.DuplicatedWorkRequest.NullifyWorkRequest',
    title: 'Anular Pedido de Trabajo',
    windowMessages: {
        saveText: 'Anular',
        closeText: 'Cerrar'
    },
    messages: {
        labels: {
            workRequestFullNumber: 'N° de Pedido',
            nullificationDate: 'Fecha',
            nullificationReason: 'Motivo',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.NullifyWorkOrder', {
    override: 'sisprod.view.WorkOrder.NullifyWorkOrder',
    title: 'Anular Orden de Trabajo',
    windowMessages: {
        saveText: 'Anular',
        closeText: 'Cerrar'
    },
    messages: {
        labels: {
            workOrderFullNumber: 'N° de Orden',
            nullificationDate: 'Fecha',
            nullificationReason: 'Motivo',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.DuplicatedWorkRequest.WorkRequestTaskDescription', {
    override: 'sisprod.view.DuplicatedWorkRequest.WorkRequestTaskDescription',
    title: 'Trabajo a Realizar - Pedido de Trabajo',
    messages: {
        labels: {
            taskDescription: 'Detalle del Trabajo a Realizar'
        }
    }
});

Ext.define('locale.es.sisprod.view.AnnullableWorkOrder.WorkOrderTaskDescription', {
    override: 'sisprod.view.AnnullableWorkOrder.WorkOrderTaskDescription',
    title: 'Trabajo a Realizar - Orden de Trabajo',
    messages: {
        labels: {
            taskDescription: 'Detalle del Trabajo a Realizar'
        }
    }
});

Ext.define('locale.es.sisprod.view.DuplicatedWorkRequest.ListDuplicatedWorkRequest', {
    override: 'sisprod.view.DuplicatedWorkRequest.ListDuplicatedWorkRequest',
    listTitle: 'Lista de Pedidos Duplicados',
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            workRequestSourceName: 'Origen del Pedido',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'N° de Pedido',
            workCategoryDetailName: 'Tipo de Trabajo',
            requestDate: 'Fecha de Pedido'
        },
        labels: {
            nullify: 'Anular',
            taskDescriptionDetail: 'Detalle de Trabajo'
        }
    }
});

Ext.define('locale.es.sisprod.view.AnnullableWorkRequest.ListAnnullableWorkRequest', {
    override: 'sisprod.view.AnnullableWorkRequest.ListAnnullableWorkRequest',
    listTitle: 'Listado de Pedidos de Trabajo',
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            lotName: 'Lote',
            workRequestSourceName: 'Origen',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetailName: 'Tipo Trabajo',
            applicantFullName: 'Interesado',
            recipientFullName: 'Receptor de Planificación',
            senderFullName: 'Emisor',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado'
        }
    }
});

Ext.define('locale.es.sisprod.view.AnnullableWorkOrder.ListAnnullableWorkOrder', {
    override: 'sisprod.view.AnnullableWorkOrder.ListAnnullableWorkOrder',
    listTitle: 'Listado de Orden de Trabajo',
    messages: {
        headers: {
            idWorkOrder: 'ID',
            taskSchedulerEmployeeName: 'Planificador',
            sectorName: 'Nombre Sector',
            workOrderFullNumber: 'OT Nro. Completo',
            workRequestFullNumber: 'PT Nro. Completo',
            workCategoryName: 'Categoria',
            workCategoryDetailName: 'Detalle de Categoria',
            workShopName: 'Nombre de Taller',
            locationName: 'Localizacion',
            workDescription: 'Descripcion',
            equipmentName: 'Nombre de Equipo',
            workOrderStatusName: 'Estado',
            direct: 'Directa'
        }
    }
});

Ext.define('locale.es.sisprod.view.PreSchedulingWorkRequest.ListPreSchedulingWorkRequest', {
    override: 'sisprod.view.PreSchedulingWorkRequest.ListPreSchedulingWorkRequest',
    listTitle: 'Listado de Pedidos de Trabajo',
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            lotName: 'Lote',
            workRequestSourceName: 'Origen',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetailName: 'Tipo Trabajo',
            applicantFullName: 'Interesado',
            recipientFullName: 'Receptor de Planificación',
            senderFullName: 'Emisor',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado'
        },
        preSchedule: 'Pre-Planificar',
        taskDescriptionDetail: 'Detalle de Trabajo'
    }
});

Ext.define('locale.es.sisprod.view.PreSchedulingWorkRequest.PreSchedulingWorkRequest', {
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            lotName: 'Lote',
            workRequestSourceName: 'Origen',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetailName: 'Tipo Trabajo',
            applicantFullName: 'Solicitante',
            recipientFullName: 'Receptor de Planificación',
            senderFullName: 'Emisor',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado'
        }
    }
});

Ext.define('locale.es.sisprod.view.PreSchedulingWorkRequest.PreSchedulingWorkRequest', {
    override: 'sisprod.view.PreSchedulingWorkRequest.PreSchedulingWorkRequest',
    title: 'Pre-Planificación de Pedido de Trabajo',
    messages: {
        validation: {
            alertTitle: 'Mensaje',
            firstSelectSectorText: 'Primero seleccione un sector...',
            firstSelectWorkCategoryText: 'Por favor, primero seleccione categoría de trabajo...'
        },
        labels: {
            workRequestFullNumber: 'N° de Pedido',
            workCategory: 'Categoria de Trabajo',
            workCategoryDetail: 'Tipo de Trabajo',
            attentionMaximumTime: 'Fecha Max.Atenc.',
            sector: 'Sector',
            taskScheduler: 'Planificador'
        },
        taskSchedulerEmptyText: 'Escriba el nombre de un trabajador...'
    }
});

Ext.define('locale.es.sisprod.view.SchedulingWorkRequest.ListSchedulingWorkRequest', {
    override: 'sisprod.view.SchedulingWorkRequest.ListSchedulingWorkRequest',
    title: 'Lista de Pedidos Para Planificación de Orden de Trabajo',
    messages: {
        headers: {
            idWorkRequest: 'ID',
            lotName: 'Lote',
            workRequestSourceName: 'Origen de Pedido',
            workCategoryName: 'Categoría Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            dependencyName: 'Dependencia',
            applicantFullName: 'Interesado',
            recipientFullName: 'Receptor de Planificación',
            senderFullName: 'Emisor',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado',
            changeMultiOrder: '¿Genera Más OT?',
            schedule: 'Planificar',
            viewOrders: 'Ver Órdenes'
        },
        attachFilesButtonText: 'Adjuntar Archivos'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.SelectTemplateWindow', {
    override: 'sisprod.view.WorkOrder.SelectTemplateWindow',
    windowMessages: {
        okText: 'Aceptar',
        closeText: 'Cerrar'
    },
    messages: {
        labels: {
            useTemplate: '¿Usar plantilla?',
            workTemplate: 'Plantilla'
        },
        workTemplateEmptyText: 'Escriba el nombre de una plantilla...'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.AddWorkOrder', {
    override: 'sisprod.view.WorkOrder.AddWorkOrder',
    title: 'Planificar Orden de Trabajo',
    messages: {
        labels: {
            generalData: 'Datos Generales',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            workRequestFullNumber: 'N° Pedido',
            locationName: 'Ubicación',
            workRequestSourceName: 'Origen Pedido',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Planificador',
            workCategoryName: 'Categoria Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            scheduledDate: 'Fecha Estimada',
            scheduledStartDate: 'Inicio',
            scheduledEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            scheduling: 'Planificación',
            workOrderService: 'Orden de Servicio',
            supplier: 'Proveedor'
        },
        validations: {
            selectSector: 'Primero seleccione un sector...',
            selectWorkCategory: 'Primero seleccione una categoría de trabajo...',
            selectWorkShop: 'Primero seleccione un taller...'
        },
        taskSchedulerEmptyText: 'Escriba el nombre de un planificador...',
        workCategoryDetailEmptyText: 'Escriba el tipo de trabajo...',
        loadTemplateText: 'Cargar Plantilla',
        saveTemplateText: 'Guardar en Plantilla',
        workRequestData: 'Datos de Pedido',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        generateOrderButtonText: 'Generar Orden',
        partialSaveButtonText: 'Guardar Parcialmente'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.EditWorkOrder', {
    override: 'sisprod.view.WorkOrder.EditWorkOrder',
    title: 'Planificar Orden de Trabajo',
    messages: {
        labels: {
            generalData: 'Datos Generales',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            workRequestFullNumber: 'N° Pedido',
            locationName: 'Ubicación',
            workRequestSourceName: 'Origen Pedido',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Planificador',
            workCategoryName: 'Categoria Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            scheduledDate: 'Fecha Estimada',
            scheduledStartDate: 'Inicio',
            scheduledEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            scheduling: 'Planificación',
            workOrderService: 'Orden de Servicio',
            supplier: 'Proveedor'
        },
        validations: {
            selectSector: 'Primero seleccione un sector...',
            selectWorkCategory: 'Primero seleccione una categoría de trabajo...',
            selectWorkShop: 'Primero seleccione un taller...'
        },
        taskSchedulerEmptyText: 'Escriba el nombre de un planificador...',
        workCategoryDetailEmptyText: 'Escriba el tipo de trabajo...',
        loadTemplateText: 'Cargar Plantilla',
        saveTemplateText: 'Guardar en Plantilla',
        workRequestData: 'Datos de Pedido',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        generateOrderButtonText: 'Generar Orden',
        partialSaveButtonText: 'Guardar Parcialmente'
    }
});

Ext.define('locale.es.sisprod.controller.SchedulingWorkRequestController', {
    override: 'sisprod.controller.SchedulingWorkRequestController',
    messages: {
        templateLoadingConfirmation: 'Todas las actividades, equipos y materiales ingresados serán borrados.\n¿Desea aplicar la plantilla\n\
            seleccionada?',
        multiOrderQuestion: '¿Este pedido de trabajo generá más órdenes posteriormente?',
        validations: {
            selectWorkCategoryDetail: 'Primero seleccione el tipo de trabajo...!',
            emptyResourcesText: 'Ingrese al menos un(a) {0}!',
            requiredFieldsText: 'Complete los campos requeridos para generar orden: {0}!',
            activities: 'Actividad',
            equipments: 'Equipo',
            products: 'Material',
            idWorkShop: 'Taller',
            idWorkShopCoordinator: 'Coordinador',
            idQuadrille: 'Cuadrilla',
            scheduledStartDate: 'Fecha Inicio Estimada',
            scheduledEndDate: 'Fecha Fin Estimada',
            emptyActivities: 'Hay actividades con horas hombre y máquina 0. Por favor, verifíquelas!'
        },
        noActivityRegister: 'Debe Registrar al menos una actividad',
        workTemplateSave: 'Plantilla Registrada Correctamente',
        fileUploadingWaitMessage: 'Subiendo archivo, por favor espere...'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.ActivityOtGrid', {
    override: 'sisprod.view.WorkOrder.ActivityOtGrid',
    messages: {
        activityOtTitle: "Lista de Actividades",
        manHoursLabel: 'Horas Hombre',
        machineHoursLabel: 'Horas Máquina',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta actividad ya ha sido agregada!',
        noActivityOtToAddError: 'Seleccione una actividad',
        activityOtEmptyText: 'Escriba una actividad',
        confirmText: '¿Desea agregar {0} como una nueva actividad?'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.ProductGrid', {
    override: 'sisprod.view.WorkOrder.ProductGrid',
    messages: {
        headers: {
            quantity: 'Cantidad',
            product: 'Producto',
            productCode: 'Código',
            measureUnit: 'Unid.Med.',
            idMeasureUnit: 'Identificador U.M',
            requestNumber: 'Número Pedido',
            productStore: 'Almacén',
            productPrice: 'Precio',
            productStock: 'Stock'
        },
        productTitle: 'Lista de Materiales',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'El material ya ha sido agregado!',
        noProductToAddError: 'Seleccione un material!',
        productEmptyText: 'Escriba el nombre del material',
        oracleLinkText: 'Ir a Oracle ERP',
        oracleWarningText: 'Si está fuera de las oficinas de GMP no va a ingresar al ERP Oracle'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.EquipmentGrid', {
    override: 'sisprod.view.WorkOrder.EquipmentGrid',
    messages: {
        equipmentTitle: "Lista de Equipos",
        quantityLabel: 'Cantidad',
        equipmentLabel: 'Equipo',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateEquipmentError: 'El equipo ya ha sido agregado!',
        noEquipmentToAddError: 'Seleccione un equipo'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrder.PPEquipmentGrid', {
    override: 'sisprod.view.WorkOrder.PPEquipmentGrid',
    messages: {
        title: 'Lista de Equipos y Herramientas',
        ppEquipmentLabel: 'Equipo',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicatePPEquipmentError: 'Este equipo/herramienta ya ha sido agregado!',
        noPPEquipmentToAddError: 'Seleccione un equipo/herramienta...!',
        ppEquipmentEmptyText: 'Escriba el nombre de un equipo/herramienta',
        headers: {
            ppEquipment: 'Equipo/Herramienta',
            quantity: 'Cantidad',
            isTool: 'Es Herramienta'
        }
    }
});

Ext.define('locale.es.sisprod.controller.PreSchedulingWorkRequestController', {
    override: 'sisprod.controller.PreSchedulingWorkRequestController',
    messages: {
        confirmText: '¿Está seguro que desea pre-planificar el pedido {0}?'
    }
});

Ext.define('locale.es.sisprod.view.TaskGeneralScheduler.ListTaskGeneralScheduler', {
    override: 'sisprod.view.TaskGeneralScheduler.ListTaskGeneralScheduler',
    listTitle: 'Listado de Planificadores P&P',
    messages: {
        headers: {
            idTaskGeneralScheduler: 'Identificador',
            idEmployee: 'Id. Trabajador',
            personFullName: 'Nombre Completo',
            documentTypeAcronym: 'Tipo Doc.',
            documentNumber: 'Número de Documento',
            dependencyName: 'Dependencia'
        }
    }
});

Ext.define('locale.es.sisprod.view.TaskGeneralScheduler.AddTaskGeneralScheduler', {
    override: 'sisprod.view.TaskGeneralScheduler.AddTaskGeneralScheduler',
    title: 'Agregar Planificador P&P',
    messages: {
        labels: {
            employee: 'Trabajador'
        },
        employeeEmptyText: 'Escriba el nombre de un trabajador...'
    }
});

Ext.define('locale.es.sisprod.view.TaskGeneralScheduler.UpdateTaskGeneralScheduler', {
    override: 'sisprod.view.TaskGeneralScheduler.UpdateTaskGeneralScheduler',
    title: 'Editar Planificador P&P',
    messages: {
        labels: {
            employee: 'Trabajador'
        },
        employeeEmptyText: 'Escriba el nombre de un trabajador...'
    }
});

Ext.define('locale.es.sisprod.controller.WorkCategoryController', {
    override: 'sisprod.controller.WorkCategoryController',
    messages: {
        addDetailAlert: 'Ingrese al menos un tipo de trabajo!'
    }
});

Ext.define('locale.es.sisprod.controller.WorkRequestController', {
    override: 'sisprod.controller.WorkRequestController',
    messages: {
        confirmText: '¿Está seguro que desea anular {0}?',
        fileUploadingWaitMessage: 'Subiendo archivo, por favor espere...'
    }
});
Ext.define('locale.es.sisprod.controller.AnnullableWorkOrderController', {
    override: 'sisprod.controller.AnnullableWorkOrderController',
    messages: {
        confirmText: '¿Está seguro que desea anular {0}?'
    }
});

Ext.define('locale.es.sisprod.controller.DuplicatedWorkRequestController', {
    override: 'sisprod.controller.DuplicatedWorkRequestController',
    messages: {
        confirmText: '¿Está seguro que desea anular {0}?'
    }
});

Ext.define('locale.es.sisprod.controller.AnnullableWorkRequestController', {
    override: 'sisprod.controller.AnnullableWorkRequestController',
    messages: {
        confirmText: '¿Está seguro que desea anular {0}?'
    }
});

Ext.define('locale.es.sisprod.view.base.SensitiveComboBox', {
    override: 'sisprod.view.base.SensitiveComboBox',
    messages: {
        loadingText: 'Buscando...',
        emptyText: 'No se encontraron resultados'
    }
});

Ext.define('locale.es.sisprod.view.base.SensitiveComboBoxContainer', {
    override: 'sisprod.view.base.SensitiveComboBoxContainer',
    messages: {
        addText: 'Abre una ventana para agregar un registro'
    },
    sensitiveComboBoxOptions: {
        fieldLabel: 'ComboBox',
        emptyText: 'Seleccione...'
    }
});

Ext.define('locale.es.sisprod.view.base.ComboFieldContainer', {
    override: 'sisprod.view.base.ComboFieldContainer',
    messages: {
        addText: 'Abre una ventana para agregar un registro',
        updateText: 'Actualiza la lista desplegable',
        clearText: 'Limpia el valor actual seleccionado'
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderReason.ListWorkOrderReason', {
    override: 'sisprod.view.WorkOrderReason.ListWorkOrderReason',
    listTitle: 'Listado de Motivos de OT',
    messages: {
        headers: {
            idWorkOrderReason: 'Identificador',
            workOrderReasonName: 'Motivo de Orden'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderReason.AddWorkOrderReason', {
    override: 'sisprod.view.WorkOrderReason.AddWorkOrderReason',
    title: 'Agregar Motivo de Orden',
    messages: {
        labels: {
            workOrderReasonName: 'Nombre'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkOrderReason.UpdateWorkOrderReason', {
    override: 'sisprod.view.WorkOrderReason.UpdateWorkOrderReason',
    title: 'Editar Motivo de Orden',
    messages: {
        labels: {
            workOrderReasonName: 'Nombre'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestSource.ListWorkRequestSource', {
    override: 'sisprod.view.WorkRequestSource.ListWorkRequestSource',
    listTitle: 'Listado de Origenes de Pedido',
    messages: {
        headers: {
            idWorkRequestSource: 'Identificador',
            workRequestSourceName: 'Nombre de Origen',
            workRequestSourceAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestSource.AddWorkRequestSource', {
    override: 'sisprod.view.WorkRequestSource.AddWorkRequestSource',
    title: 'Agregar Origen de Pedido',
    messages: {
        labels: {
            workRequestSourceName: 'Nombre de Origen',
            workRequestSourceAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkRequestSource.UpdateWorkRequestSource', {
    override: 'sisprod.view.WorkRequestSource.UpdateWorkRequestSource',
    title: 'Editar Origen de Pedido',
    messages: {
        labels: {
            workRequestSourceName: 'Nombre de Origen',
            workRequestSourceAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkCategory.ListWorkCategory', {
    override: 'sisprod.view.WorkCategory.ListWorkCategory',
    listTitle: 'Listado de Categorías de Trabajo',
    messages: {
        headers: {
            idWorkCategory: 'Identificador',
            workCategoryName: 'Nombre de Categoría'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkCategory.AddWorkCategory', {
    override: 'sisprod.view.WorkCategory.AddWorkCategory',
    title: 'Agregar Categoría de Trabajo',
    messages: {
        workCategoryNameLabel: 'Nombre'
    }
});

Ext.define('locale.es.sisprod.view.WorkCategory.UpdateWorkCategory', {
    override: 'sisprod.view.WorkCategory.UpdateWorkCategory',
    title: 'Editar Categoría de Trabajo',
    messages: {
        workCategoryNameLabel: 'Nombre'
    }
});

Ext.define('locale.es.sisprod.view.WorkCategory.WorkCategoryDetailsGrid', {
    override: 'sisprod.view.WorkCategory.WorkCategoryDetailsGrid',
    messages: {
        title: 'Tipos de Trabajo',
        columnHeaders: {
            workCategoryDetailName: 'Descripción'
        },
        validation: {
            repeteadItem: 'Tipo de trabajo ya ha sido ingresado!'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.view.RimeCriteria.ListRimeCriteria', {
    override: 'sisprod.view.RimeCriteria.ListRimeCriteria',
    listTitle: 'Listado de Criterios RIME',
    messages: {
        headers: {
            idRimeCriteria: 'Identificador',
            rimeCriteriaName: 'Nombre',
            rimeCriteriaLevel: 'Nivel'
        }
    }
});

Ext.define('locale.es.sisprod.view.RimeCriteria.AddRimeCriteria', {
    override: 'sisprod.view.RimeCriteria.AddRimeCriteria',
    title: 'Agregar Criterio RIME',
    messages: {
        rimeCriteriaNameLabel: 'Nombre',
        rimeCriteriaLevelLabel: 'Nivel'
    }
});

Ext.define('locale.es.sisprod.view.RimeCriteria.UpdateRimeCriteria', {
    override: 'sisprod.view.RimeCriteria.UpdateRimeCriteria',
    title: 'Editar Criterio RIME',
    messages: {
        rimeCriteriaNameLabel: 'Nombre',
        rimeCriteriaLevelLabel: 'Nivel'
    }
});

Ext.define('locale.es.sisprod.view.RimeCriteriaValue.ListRimeCriteriaValue', {
    override: 'sisprod.view.RimeCriteriaValue.ListRimeCriteriaValue',
    listTitle: 'Listado de Valores de Criterio RIME',
    messages: {
        headers: {
            idRimeCriteria: 'Identificador',
            rimeCriteriaName: 'Criterio RIME',
            idRimeCriteriaValue: 'Id. de Valor',
            effectiveStartDate: 'Inicio Vigencia',
            minimumScore: 'Rango Mínimo',
            maximumScore: 'Rango Máximo',
            maximumTimeAttention: 'Tiempo Max.Atención'
        }
    }
});

Ext.define('locale.es.sisprod.view.RimeCriteriaValue.AddRimeCriteriaValue', {
    override: 'sisprod.view.RimeCriteriaValue.AddRimeCriteriaValue',
    title: 'Agregar Valor de Criterio RIME',
    messages: {
        idRimeCriteriaLabel: 'Criterio RIME',
        effectiveStartDateLabel: 'Inicio Vigencia',
        minimumScoreLabel: 'Rango Mínimo',
        maximumScoreLabel: 'Rango Máximo',
        maximumTimeAttentionLabel: 'Tiempo Max.Atención'
    }
});

Ext.define('locale.es.sisprod.view.RimeCriteriaValue.UpdateRimeCriteriaValue', {
    override: 'sisprod.view.RimeCriteriaValue.UpdateRimeCriteriaValue',
    title: 'Editar Valor de Criterio RIME',
    messages: {
        idRimeCriteriaLabel: 'Criterio RIME',
        effectiveStartDateLabel: 'Inicio Vigencia',
        minimumScoreLabel: 'Rango Mínimo',
        maximumScoreLabel: 'Rango Máximo',
        maximumTimeAttentionLabel: 'Tiempo Max.Atención'
    }
});

Ext.define('locale.es.sisprod.view.RimeMatrix.ListRimeMatrix', {
    override: 'sisprod.view.RimeMatrix.ListRimeMatrix',
    listTitle: 'Listado de Matrices RIME',
    messages: {
        headers: {
            idRimeMatrix: 'ID',
            rimeCriteriaName: 'Criterio RIME',
            rimeCriteriaLevel: 'Nivel de Criterio',
            rimeIndex: 'Índice',
            effectiveStartDate: 'Inicio de Vigencia',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            maximumTimeAttention: 'Tiempo Máximo Atención'
        }
    }
});

Ext.define('locale.es.sisprod.view.RimeMatrix.AddRimeMatrix', {
    override: 'sisprod.view.RimeMatrix.AddRimeMatrix',
    title: 'Agregar Matriz RIME',
    messages: {
        labels: {
            workCategory: 'Categoria de Trabajo',
            workCategoryDetail: 'Tipo de Trabajo',
            criticalityLevel: 'Nivel de Criticidad',
            riskLevel: 'Nivel de Riesgo',
            consequenceCriteriaGroup: 'Consecuencia',
            ocurrenceProbability: 'Probabilidad de Ocurrencia',
            results: 'Resultados',
            risk: 'Riesgo',
            criticality: 'Criticidad',
            rime: 'RIME',
            rimeCriteria: 'Criterio',
            rimeIndex: 'Índice',
            attentionMaxDays: 'Días Max.Atenc.',
            description: 'Descripción',
            value: 'Valor'
        },
        headers: {
            criteriaFactorName: 'Factor',
            criteriaLevelName: 'Nivel',
            description: 'Descripción'
        },
        validations: {
            criticalityBlankText: 'Complete todos los datos en el Nivel de Criticidad...',
            riskBlankText: 'Complete todos los datos en el Nivel de Riesgo...',
            rimeIndexBlankText: 'Ajuste el nivel de criticidad y/o riesgo para encontrar un índice...'
        },
        valueNotApplied: 'NO APLICA',
        workCategoryDetailEmptyText: 'Escriba el nombre del tipo de trabajo...',
        workCategoryFieldSet: 'Categoría de Trabajo',
        alertMessage: 'Mensaje',
        selectWorkCategory: 'Seleccione una Categoria de Trabajo'
    }
});

Ext.define('locale.es.sisprod.view.RimeMatrix.UpdateRimeMatrix', {
    override: 'sisprod.view.RimeMatrix.UpdateRimeMatrix',
    title: 'Editar Matriz RIME',
    messages: {
        labels: {
            workCategory: 'Categoria de Trabajo',
            workCategoryDetail: 'Tipo de Trabajo',
            criticalityLevel: 'Nivel de Criticidad',
            riskLevel: 'Nivel de Riesgo',
            consequenceCriteriaGroup: 'Consecuencia',
            ocurrenceProbability: 'Probabilidad de Ocurrencia',
            results: 'Resultados',
            risk: 'Riesgo',
            criticality: 'Criticidad',
            rime: 'RIME',
            rimeCriteria: 'Criterio',
            rimeIndex: 'Índice',
            attentionMaxDays: 'Días Max.Atenc.',
            description: 'Descripción',
            value: 'Valor'
        },
        headers: {
            criteriaFactorName: 'Factor',
            criteriaLevelName: 'Nivel',
            description: 'Descripción'
        },
        validations: {
            criticalityBlankText: 'Complete todos los datos en el Nivel de Criticidad...',
            riskBlankText: 'Complete todos los datos en el Nivel de Riesgo...',
            rimeIndexBlankText: 'Ajuste el nivel de criticidad y/o riesgo para encontrar un índice...'
        },
        valueNotApplied: 'NO APLICA',
        workCategoryDetailEmptyText: 'Escriba el nombre del tipo de trabajo...',
        workCategoryFieldSet: 'Categoría de Trabajo',
        alertMessage: 'Mensaje',
        selectWorkCategory: 'Seleccione una Categoria de Trabajo'
    }
});

Ext.define('locale.es.sisprod.view.Sector.ListSector', {
    override: 'sisprod.view.Sector.ListSector',
    listTitle: 'Listado de Sectores',
    messages: {
        headers: {
            idSector: 'Identificador',
            sectorName: 'Nombre de Sector'
        }
    }
});

Ext.define('locale.es.sisprod.view.Sector.AddSector', {
    override: 'sisprod.view.Sector.AddSector',
    title: 'Agregar Sector',
    messages: {
        sectorNameLabel: 'Nombre',
        sectorAcronymLabel: 'Acronimo'
    }
});

Ext.define('locale.es.sisprod.view.Sector.UpdateSector', {
    override: 'sisprod.view.Sector.UpdateSector',
    title: 'Editar Sector',
    messages: {
        sectorNameLabel: 'Nombre',
        sectorAcronymLabel: 'Acronimo'
    }
});

Ext.define('locale.es.sisprod.view.Sector.TaskSchedulerGrid', {
    override: 'sisprod.view.Sector.TaskSchedulerGrid',
    title: 'Planificadores',
    messages: {
        columnHeaders: {
            fullDocumentNumber: 'Documento Identidad',
            employeeName: 'Apellidos y Nombres'
        },
        validation: {
            alertTitle: 'Mensaje',
            repeatedItem: 'El trabajador seleccionado ya ha sido agregado!',
            selectEmployee: 'Primero seleccione un trabajador!'
        },
        labels: {
            employee: 'Trabajador'
        },
        employeeEmptyText: 'Escriba el nombre de un trabajador',
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkShop.ListWorkShop', {
    override: 'sisprod.view.WorkShop.ListWorkShop',
    listTitle: 'Listado de Talleres',
    messages: {
        headers: {
            idWorkShop: 'Identificador',
            'sector.sectorName': 'Sector',
            workShopName: 'Taller',
            workShopAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkShop.AddWorkShop', {
    override: 'sisprod.view.WorkShop.AddWorkShop',
    title: 'Agregar Taller',
    messages: {
        labels: {
            idSector: 'Sector',
            workShopName: 'Nombre',
            workShopAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkShop.UpdateWorkShop', {
    override: 'sisprod.view.WorkShop.UpdateWorkShop',
    title: 'Editar Taller',
    messages: {
        labels: {
            idSector: 'Sector',
            workShopName: 'Nombre',
            workShopAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.WorkShop.WorkShopCoordinatorGrid', {
    override: 'sisprod.view.WorkShop.WorkShopCoordinatorGrid',
    title: 'Coordinadores',
    messages: {
        columnHeaders: {
            fullDocumentNumber: 'Doc. Identidad',
            employeeName: 'Apellidos y Nombres'
        },
        validation: {
            alertTitle: 'Mensaje',
            repeteadItem: 'El trabajador seleccionado ya ha sido agregado!',
            selectEmployee: 'Primero seleccione un trabajador!'
        },
        labels: {
            employee: 'Trabajador'
        },
        employeeEmptyText: 'Escriba el nombre de un trabajador',
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.controller.WorkShopController', {
    override: 'sisprod.controller.WorkShopController',
    messages: {
        addDetailAlert: 'Seleccione al menos un trabajador!'
    }
});

Ext.define('locale.es.sisprod.view.Quadrille.ListQuadrille', {
    override: 'sisprod.view.Quadrille.ListQuadrille',
    listTitle: 'Listado de Cuadrillas',
    messages: {
        headers: {
            idQuadrille: 'Identificador',
            'workShop.workShopName': 'Taller',
            quadrilleName: 'Nombre Cuadrilla',
            quadrilleAcronym: 'Acrónimo',
            numberOfMembers: 'N° Miembros'
        }
    }
});

Ext.define('locale.es.sisprod.view.Quadrille.AddQuadrille', {
    override: 'sisprod.view.Quadrille.AddQuadrille',
    title: 'Agregar Cuadrilla',
    messages: {
        labels: {
            idWorkShop: 'Taller',
            quadrilleName: 'Nombre',
            quadrilleAcronym: 'Acrónimo',
            numberOfMembers: 'N° Miembros'
        }
    }
});

Ext.define('locale.es.sisprod.view.Quadrille.UpdateQuadrille', {
    override: 'sisprod.view.Quadrille.UpdateQuadrille',
    title: 'Editar Cuadrilla',
    messages: {
        labels: {
            idWorkShop: 'Taller',
            quadrilleName: 'Nombre',
            quadrilleAcronym: 'Acrónimo',
            numberOfMembers: 'N° Miembros'
        }
    }
});

Ext.define('locale.es.sisprod.view.RiskLevel.ListRiskLevel', {
    override: 'sisprod.view.RiskLevel.ListRiskLevel',
    listTitle: 'Listado de Niveles de Riesgo',
    messages: {
        headers: {
            idRiskLevel: 'ID',
            riskLevelName: 'Nombre',
            riskLevelAcronym: 'Acrónimo',
            minimumValue: 'Valor Mínimo',
            maximumValue: 'Valor Máximo'
        }
    }
});

Ext.define('locale.es.sisprod.view.RiskLevel.AddRiskLevel', {
    override: 'sisprod.view.RiskLevel.AddRiskLevel',
    title: 'Agregar Nivel de Riesgo',
    messages: {
        labels: {
            riskLevelName: 'Nombre',
            riskLevelAcronym: 'Acrónimo',
            minimumValue: 'Valor Mínimo',
            maximumValue: 'Valor Máximo'
        }
    }
});

Ext.define('locale.es.sisprod.view.RiskLevel.UpdateRiskLevel', {
    override: 'sisprod.view.RiskLevel.UpdateRiskLevel',
    title: 'Editar Nivel de Riesgo',
    messages: {
        labels: {
            riskLevelName: 'Nombre',
            riskLevelAcronym: 'Acrónimo',
            minimumValue: 'Valor Mínimo',
            maximumValue: 'Valor Máximo'
        }
    }
});

Ext.define('locale.es.sisprod.view.OcurrenceProbability.ListOcurrenceProbability', {
    override: 'sisprod.view.OcurrenceProbability.ListOcurrenceProbability',
    listTitle: 'Listado de Probabilidades de Ocurrencia',
    messages: {
        headers: {
            idOcurrenceProbability: 'Identificador',
            ocurrenceProbabilityName: 'Nombre',
            ocurrenceProbabilityValue: 'Valor',
            description: 'Descripción'
        }
    }
});

Ext.define('locale.es.sisprod.view.OcurrenceProbability.AddOcurrenceProbability', {
    override: 'sisprod.view.OcurrenceProbability.AddOcurrenceProbability',
    title: 'Agregar Probabilidad de Ocurrencia',
    messages: {
        labels: {
            ocurrenceProbabilityName: 'Nombre',
            ocurrenceProbabilityValue: 'Valor',
            description: 'Descripción'
        }
    }
});

Ext.define('locale.es.sisprod.view.OcurrenceProbability.UpdateOcurrenceProbability', {
    override: 'sisprod.view.OcurrenceProbability.UpdateOcurrenceProbability',
    title: 'Editar Probabilidad de Ocurrencia',
    messages: {
        labels: {
            ocurrenceProbabilityName: 'Nombre',
            ocurrenceProbabilityValue: 'Valor',
            description: 'Descripción'
        }
    }
});

Ext.define('locale.es.sisprod.view.CriteriaGroup.ListCriteriaGroup', {
    override: 'sisprod.view.CriteriaGroup.ListCriteriaGroup',
    listTitle: 'Listado de Grupo de Criterios',
    messages: {
        headers: {
            idCriteriaGroup: 'Grupo',
            criteriaGroupName: 'Nombre',
            criteriaGroupOrder: 'Orden'
        },
        buttons: {
            descriptionsButton: 'Descripción Factores'
        }
    }
});

Ext.define('locale.es.sisprod.view.CriteriaGroup.AddCriteriaGroup', {
    override: 'sisprod.view.CriteriaGroup.AddCriteriaGroup',
    title: 'Agregar Grupo de Criterio',
    messages: {
        labels: {
            criteriaGroupName: 'Nombre',
            criteriaGroupOrder: 'Orden'
        }
    }
});

Ext.define('locale.es.sisprod.view.CriteriaGroup.UpdateCriteriaGroup', {
    override: 'sisprod.view.CriteriaGroup.UpdateCriteriaGroup',
    title: 'Editar Grupo de Criterio',
    messages: {
        labels: {
            criteriaGroupName: 'Nombre',
            criteriaGroupOrder: 'Orden'
        }
    }
});

Ext.define('locale.es.sisprod.view.CriteriaGroup.CriteriaFactorsGrid', {
    override: 'sisprod.view.CriteriaGroup.CriteriaFactorsGrid',
    title: 'Factores',
    messages: {
        columnHeaders: {
            criteriaFactorName: 'Nombre',
            criteriaFactorAcronym: 'Acrónimo'
        },
        validation: {
            repeteadItem: 'Se han ingresado valores repetidos: {0}'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.view.CriteriaGroup.CriteriaLevelsGrid', {
    override: 'sisprod.view.CriteriaGroup.CriteriaLevelsGrid',
    title: 'Niveles',
    messages: {
        columnHeaders: {
            criteriaLevelName: 'Nombre',
            criteriaLevelValue: 'Valor',
            criteriaLevelOrder: 'Orden'
        },
        validation: {
            repeteadItem: 'Se han ingresado valores repetidos: {0}'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    }
});

Ext.define('locale.es.sisprod.controller.CriteriaGroupController', {
    override: 'sisprod.controller.CriteriaGroupController',
    messages: {
        alertCaption: 'Validación',
        emptyFactors: 'Ingrese al menos un factor!',
        emptyLevels: 'Ingrese el menos un nivel!',
        savedSuccessfuly: 'Datos guardados correctamente!',
        savedFailed: 'Ocurrió un error al guardar los datos. {0}'
    }
});

Ext.define('locale.es.sisprod.view.CriteriaFactorLevel.DescriptionGrid', {
    override: 'sisprod.view.CriteriaFactorLevel.DescriptionGrid',
    title: 'Descripciones',
    messages: {
        columnHeaders: {
            levelName: 'Nivel',
            criteriaFactorLevelDescription: 'Descripción'
        },
        validation: {
            repeteadItem: 'Hay valores repetidos: {0}'
        }
    }
});

Ext.define('locale.es.sisprod.view.CriteriaFactorLevel.CriteriaFactorLevel', {
    override: 'sisprod.view.CriteriaFactorLevel.CriteriaFactorLevel',
    title: 'Descripción de Factores',
    messages: {
        labels: {
            criteriaFactor: 'Factor'
        }
    }
});

Ext.define('locale.es.sisprod.controller.LotController', {
    override: 'sisprod.controller.LotController',
    messages: {
        measureUnitTypeAreaError: 'No se ha configurado el tipo de Unidad de Medida de Área, contacte con el administrador del sistema'
    }
});
Ext.define('locale.es.sisprod.view.Lot.AddLot', {
    override: 'sisprod.view.Lot.AddLot',
    title: 'Agregar Lote',
    messages: {
        lotLabel: 'Lote',
        lorAcronymLabel: 'Acronimo',
        surfaceLabel: 'Superficie',
        measureUnitLabel: 'Unidad de Medida',
        suscriptionDateLabel: 'Fecha de Suscripcion',
        externalIdLabel: 'Id Sisman'
    }
});
Ext.define('locale.es.sisprod.view.Lot.UpdateLot', {
    override: 'sisprod.view.Lot.UpdateLot',
    title: 'Editar Lote',
    messages: {
        lotLabel: 'Lote',
        lorAcronymLabel: 'Acronimo',
        surfaceLabel: 'Superficie',
        measureUnitLabel: 'Unidad de Medida',
        suscriptionDateLabel: 'Fecha de Suscripcion',
        externalIdLabel: 'Id Sisman'
    }
});
Ext.define('locale.es.sisprod.view.Lot.ListLot', {
    override: 'sisprod.view.Lot.ListLot',
    listTitle: 'Listado de Lotes',
    messages: {
        idLotHeader: 'Lot ID',
        lotNameHeader: 'Lote',
        lotAcronymHeader: 'Acronimo',
        measureUnitIdHeader: 'Identificador de Unidad de Medida',
        measureUnitNameHeader: 'Unidad de Medidad',
        surfaceHeader: 'Superficie',
        suscriptionDateHeader: 'Fecha de Suscripcion',
        externalIdHeader: 'Id Sisman'
    }
});
Ext.define('locale.es.sisprod.view.Zone.AddZone', {
    override: 'sisprod.view.Zone.AddZone',
    title: 'Agregar Zona',
    messages: {
        zoneLabel: 'Zona',
        lotLabel: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.Zone.UpdateZone', {
    override: 'sisprod.view.Zone.UpdateZone',
    title: 'Editar Zona',
    messages: {
        zoneLabel: 'Zona',
        lotLabel: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.Zone.ListZone', {
    override: 'sisprod.view.Zone.ListZone',
    listTitle: 'Listado de Zonas',
    messages: {
        idZoneHeader: 'ID de Zona',
        zoneNameHeader: 'Zona',
        idLotHeader: 'Identificador de Lote',
        lotNameHeader: 'Lote'
    }
});
Ext.define('locale.es.sisprod.Controller.FetureController', {
    override: 'sisprod.controller.FeatureController',
    messages: {
        duplicateValueError: 'Este valor ya a sido agregado a la lista',
        noValueToAddError: 'Escriba un valor',
        noValueSelectToRemoveError: 'Seleccione el valor a eliminar',
        noValueOnListError: 'Ingrese al menos un valor a la lista'
    }
});

Ext.define('locale.es.sisprod.view.Feature.AddFeature', {
    override: 'sisprod.view.Feature.AddFeature',
    title: 'Agregar Caracteristica',
    messages: {
        featureLabel: 'Caracteristica',
        featureTypeLabel: 'Tipo de Caracteristica',
        measureUnitLabel: 'Unidad de Medida',
        dropdownValuesTitle: 'Valores de Lista',
        dropdownValuesLabel: 'Valor',
        addItemButtonText: 'Agregar',
        removeItemButtonText: 'Quitar'
    }
});
Ext.define('locale.es.sisprod.view.Feature.UpdateFeature', {
    override: 'sisprod.view.Feature.UpdateFeature',
    title: 'Editar Caracteristica',
    messages: {
        featureLabel: 'Caracteristica',
        featureTypeLabel: 'Tipo de Caracteristica',
        measureUnitLabel: 'Unidad de Medida',
        dropdownValuesTitle: 'Valores de Lista',
        dropdownValuesLabel: 'Valor',
        addItemButtonText: 'Agregar',
        removeItemButtonText: 'Quitar'
    }
});
Ext.define('locale.es.sisprod.view.Feature.ListFeature', {
    override: 'sisprod.view.Feature.ListFeature',
    listTitle: 'Listado de CAracteristicas',
    messages: {
        idFeatureHeader: 'ID Caracteristica',
        featureNameHeader: 'Caracteristica',
        idFeatureTypeHeader: 'ID Tipo de Caracteristica',
        featureTypeNameHeader: 'Tipo de Caracteristica',
        idMeasureUnitHeader: 'ID Unidad de Medida',
        measureUnitNameHeader: 'Unidad de Medida',
        usedInWorkOrderHeader: 'Usado en Orden de Trabajo'
    }
});
Ext.define('locale.es.sisprod.Controller.EquipmentTypeController', {
    override: 'sisprod.controller.EquipmentTypeController',
    messages: {
        duplicateFeatureError: 'Esta Caracteritica Ya ha sido Seleccionada',
        noFeatureToAddError: 'Seleccione una Caracteristica',
        noFeatureSelectToRemoveError: 'Seleccione la Caracteristica a Eliminar',
        noFeatureOnListError: 'Agregue al menos una Caracteristica'
    }
});
Ext.define('locale.es.sisprod.view.EquipmentType.AddEquipmentType', {
    override: 'sisprod.view.EquipmentType.AddEquipmentType',
    title: 'Agregar Caracteristica',
    messages: {
        equipmentTypeNameLabel: 'Tipo de Equipo',
        featureTitle: 'Listado de Caracteristicas',
        featureNameLabel: 'Caracteristica',
        addFeatureButtonText: 'Agregar',
        removeFeatureButtonText: 'Quitar',
        usedInWorkOrderLabel: 'Usado en Orden de Trabajo'
    }
});
Ext.define('locale.es.sisprod.view.EquipmentType.UpdateEquipmentType', {
    override: 'sisprod.view.EquipmentType.UpdateEquipmentType',
    title: 'Editar Caracteristica',
    messages: {
        equipmentTypeNameLabel: 'Tipo de Equipo',
        featureTitle: 'Listado de Caracteristicas',
        featureNameLabel: 'Caracteristica',
        addFeatureButtonText: 'Agregar',
        removeFeatureButtonText: 'Quitar',
        usedInWorkOrderLabel: 'Usado en Orden de Trabajo'
    }
});
Ext.define('locale.es.sisprod.view.EquipmentType.ListEquipmentType', {
    override: 'sisprod.view.EquipmentType.ListEquipmentType',
    listTitle: 'Listado de Caracteristicas',
    messages: {
        idEquipmentTypeHeader: 'ID',
        equipmentTypeNameHeader: 'Tipo de Equipo'
    }
});
Ext.define('locale.es.sisprod.view.Mark.AddMark', {
    override: 'sisprod.view.Mark.AddMark',
    title: 'Agregar Marca',
    messages: {
        markNameLabel: 'Marca'
    }
});
Ext.define('locale.es.sisprod.view.Mark.UpdateMark', {
    override: 'sisprod.view.Mark.UpdateMark',
    title: 'Editar Marca',
    messages: {
        markNameLabel: 'Marca'
    }
});
Ext.define('locale.es.sisprod.view.Mark.ListMark', {
    override: 'sisprod.view.Mark.ListMark',
    listTitle: 'Listado de Marcas',
    messages: {
        idMarkHeader: 'ID Marca',
        markNameHeader: 'Marca'
    }
});
Ext.define('locale.es.sisprod.view.EquipmentCondition.AddEquipmentCondition', {
    override: 'sisprod.view.EquipmentCondition.AddEquipmentCondition',
    title: 'Agregar Condicion de Equipo',
    messages: {
        equipmentConditionNameLabel: 'Condicion de Equipo',
        equipmentConditionAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.EquipmentCondition.UpdateEquipmentCondition', {
    override: 'sisprod.view.EquipmentCondition.UpdateEquipmentCondition',
    title: 'Editar Condicion de Equipo',
    messages: {
        equipmentConditionNameLabel: 'Condicion de Equipo',
        equipmentConditionAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.EquipmentCondition.ListEquipmentCondition', {
    override: 'sisprod.view.EquipmentCondition.ListEquipmentCondition',
    listTitle: 'Listado de Condiciones de Equipo',
    messages: {
        idEquipmentConditionHeader: 'ID de Condicion de Equipo',
        equipmentConditionNameHeader: 'Condicion de Equipo',
        equipmentConditionAcronymHeader: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.Controller.EquipmentController', {
    override: 'sisprod.controller.EquipmentController',
    messages: {
        equipmentAssignedOnSelfError: 'El componente no puedo ser asignado a si mismo',
        duplicateComponentnSelectError: 'El componente ya a sido seleccionado',
        noComponentSelectToAddError: 'Seleccione el componente a asignar',
        noComponentSelectToRemoveError: 'Seleccione el componente a eliminar',
        locationNoRelatedError: 'El equipo no puede ser asignado a esta ubicacion',
        equipmentTypeNoAvailableError: 'Este Tipo de Equipo no puede ser registrado desde este modulo',
        importTitle: "Importación de equipos",
        importQuestion: "Importación de equipos puede tardar unos minutos ¿Desea Continuar?"
    }
});

Ext.define('locale.es.sisprod.view.Equipment.AddEquipment', {
    override: 'sisprod.view.Equipment.AddEquipment',
    title: 'Agregar Equipo',
    messages: {
        basicDataTitle: 'Datos Basicos',
        componentsTitle: 'Asignacion de Componentes',
        featuresTitle: 'Caracteristicas Adicionales',
        equipmentNameLabel: 'Nombre de Equipo',
        equipmentModelLabel: 'Modelo',
        equipmentCodeLabel: 'Codigo',
        serialNumberLabel: 'Número de Serie',
        equipmentTypeLabel: 'Tipo de Equipo',
        markLabel: 'Marca',
        equipmentConditionLabel: 'Condicion',
        locationLabel: 'Ubicacion',
        locationEmptyText: 'Escrba una locacion...',
        equipmentEmptyText: 'Escriba un equipo...',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        supplierLabel: 'Propietario',
        firstSelectALot: 'Seleccione Lote',
        lot: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.Equipment.UpdateEquipment', {
    override: 'sisprod.view.Equipment.UpdateEquipment',
    title: 'Editar Equipo',
    messages: {
        basicDataTitle: 'Datos Basicos',
        componentsTitle: 'Asignacion de Componentes',
        featuresTitle: 'Caracteristicas Adicionales',
        equipmentNameLabel: 'Nombre de Equipo',
        equipmentModelLabel: 'Modelo',
        equipmentCodeLabel: 'Codigo',
        serialNumberLabel: 'Número de Serie',
        equipmentTypeLabel: 'Tipo de Equipo',
        markLabel: 'Marca',
        equipmentConditionLabel: 'Condicion',
        locationLabel: 'Ubicacion',
        locationEmptyText: 'Escrba una locacion...',
        equipmentEmptyText: 'Escriba un equipo...',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        supplierLabel: 'Propietario',
        firstSelectALot: 'Seleccione Lote',
        lot: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.Equipment.ListEquipment', {
    override: 'sisprod.view.Equipment.ListEquipment',
    listTitle: 'Listado de Equipos',
    messages: {
        idEquipmentHeader: 'ID de Equipo',
        equipmentNameHeader: 'Equipo',
        equipmentModelHeader: 'Modelo',
        equipmentCodeHeader: 'Codigo',
        serialNumberHeader: 'Número de Serie',
        idEquipmentTypeHeader: 'ID Tipo de Equipo',
        equipmentTypeNameHeader: 'Tipo de Equipo',
        idMarkHeader: 'ID marca',
        markNameHeader: 'Marca',
        idLocationHeader: 'ID Ubicacion',
        locationNameHeader: 'Ubicacion',
        idEquipmentConditionHeader: 'ID Condicion de Equipo',
        equipmentConditionNameHeader: 'Condicion',
        idEquipmentParentHeader: 'Asignado a',
        equipmentParentNameHeader: 'Asignado a ',
        idSupplierHeader: 'ID Proveedor',
        supplierNameHeader: 'Proveedor',
        lotHeader: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.GasTargetType.AddGasTargetType', {
    override: 'sisprod.view.GasTargetType.AddGasTargetType',
    title: 'Agregar Tipo de Destino de Gas',
    messages: {
        gasTargetTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.GasTargetType.UpdateGasTargetType', {
    override: 'sisprod.view.GasTargetType.UpdateGasTargetType',
    title: 'Editar Tipo de Destino de Gas',
    messages: {
        gasTargetTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.GasTargetType.ListGasTargetType', {
    override: 'sisprod.view.GasTargetType.ListGasTargetType',
    listTitle: 'Listado de Tipo de Destino de Gas',
    messages: {
        idGasTargetTypeHeader: 'ID Tipo de Destino de Gas',
        gasTargetTypeNameHeader: 'Tipo de Destino de Gas'
    }
});
Ext.define('locale.es.sisprod.view.TankType.AddTankType', {
    override: 'sisprod.view.TankType.AddTankType',
    title: 'Agregar Tipo de Tanque',
    messages: {
        tankTypeNameLabel: "Nombre",
        tankTypeAcronymLabel: "Acronimo"
    }
});
Ext.define('locale.es.sisprod.view.TankType.UpdateTankType', {
    override: 'sisprod.view.TankType.UpdateTankType',
    title: 'Editar Tipo de Tanque',
    messages: {
        tankTypeNameLabel: "Nombre",
        tankTypeAcronymLabel: "Acronimo"
    }
});
Ext.define('locale.es.sisprod.view.TankType.ListTankType', {
    override: 'sisprod.view.TankType.ListTankType',
    listTitle: 'Listado de Tipo de Tanques',
    messages: {
        idTankTypeHeader: "ID de Tipo de Tanque",
        tankTypeNameHeader: "Tipo de Tanque",
        tankTypeAcronymHeader: "Acronimo"
    }
});
Ext.define('locale.es.sisprod.view.AlternativeTankType.AddAlternativeTankType', {
    override: 'sisprod.view.AlternativeTankType.AddAlternativeTankType',
    title: 'Agregar Tipo de Tanque Alternativo',
    messages: {
        alternativeTankTypeNameLabel: "Nombre",
        alternativeTankTypeAcronymLabel: "Acronimo"
    }
});
Ext.define('locale.es.sisprod.view.AlternativeTankType.UpdateAlternativeTankType', {
    override: 'sisprod.view.AlternativeTankType.UpdateAlternativeTankType',
    title: 'Editar Tipo de Tanque Alternativo',
    messages: {
        alternativeTankTypeNameLabel: "Nombre",
        alternativeTankTypeAcronymLabel: "Acronimo"
    }
});
Ext.define('locale.es.sisprod.view.AlternativeTankType.ListAlternativeTankType', {
    override: 'sisprod.view.AlternativeTankType.ListAlternativeTankType',
    listTitle: 'Listado de Tipo de Tanques Alternativos',
    messages: {
        idAlternativeTankTypeHeader: "ID de Tipo de Tanque Alternativo",
        alternativeTankTypeNameHeader: "Tipo de Tanque Alternativo",
        alternativeTankTypeAcronymHeader: "Acronimo"
    }
});
Ext.define('locale.es.sisprod.view.Tank.AddTank', {
    override: 'sisprod.view.Tank.AddTank',
    title: 'Agregar Tanque',
    messages: {
        tankNameLabel: 'Nombre',
        tankAcronymLabel: 'Acronimo',
        tankTypeLabel: 'Tipo de Tanque',
        alternativeTankTypeLabel: 'Tipo Alt. de Tanque',
        locationLabel: 'Ubicacion',
        locationEmptyText: 'Escribe la Ubicacion',
        startupDateLabel: 'Inicio de Operacion',
        adjustmentFactorLabel: 'Factor de Ajuste',
        featuresTitle: 'Caracteristicas de Tanque',
        maximumCapacityLabel: 'Capacidad Maxima',
        minimunCapacityLabel: 'Capacidad Minima',
        heightInFeetLabel: 'Altura (Pies)',
        diameterInFeetLabel: 'Diametro (Pies)',
        lotLabel: 'Lote',
        firstSelectALot: 'Seleccione el Lote'
    }
});
Ext.define('locale.es.sisprod.view.Tank.UpdateTank', {
    override: 'sisprod.view.Tank.UpdateTank',
    title: 'Editar Tanque',
    messages: {
        tankNameLabel: 'Nombre',
        tankAcronymLabel: 'Acronimo',
        tankTypeLabel: 'Tipo de Tanque',
        alternativeTankTypeLabel: 'Tipo Alt. de Tanque',
        locationLabel: 'Ubicacion',
        locationEmptyText: 'Escribe la Ubicacion',
        startupDateLabel: 'Inicio de Operacion',
        adjustmentFactorLabel: 'Factor de Ajuste',
        featuresTitle: 'Caracteristicas de Tanque',
        maximumCapacityLabel: 'Capacidad Maxima',
        minimunCapacityLabel: 'Capacidad Minima',
        heightInFeetLabel: 'Altura (Pies)',
        diameterInFeetLabel: 'Diametro (Pies)',
        lotLabel: 'Lote',
        firstSelectALot: 'Seleccione el Lote'
    }
});
Ext.define('locale.es.sisprod.view.Tank.ListTank', {
    override: 'sisprod.view.Tank.ListTank',
    listTitle: 'Listado de Tanques',
    messages: {
        idTankHeader: 'ID de Tanque',
        tankNameHeader: 'Tanque',
        tankAcronymHeader: 'Acronimo',
        maximumCapacityHeader: 'Capacidad Maxima',
        minimumCapacityHeader: 'Capacidad Minima',
        heightInFeetHeader: 'Altura',
        diameterInFeetHeader: 'Diametro',
        adjustmentFactorHeader: 'Factor de Ajuste',
        startupDateHeader: 'Inicio de Operacion',
        idTankTypeHeader: 'ID Tipo de Tanque',
        tankTypeNameHeader: 'Tipo de Tanque',
        idAlternativeTankTypeHeader: 'ID tipo Alternativo de Tanque',
        alternativeTankTypeNameHeader: 'Tipo Alt. de Tanque',
        idLocationHeader: 'ID Ubicacion',
        locationNameHeader: 'Ubicacion',
        lotHeader: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.LocationType.AddLocationType', {
    override: 'sisprod.view.LocationType.AddLocationType',
    title: 'Agregar Tipo de Ubicacion',
    messages: {
        locationTypeNameLabel: 'Nombre',
        locationTypeAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.LocationType.UpdateLocationType', {
    override: 'sisprod.view.LocationType.UpdateLocationType',
    title: 'Editar Tipo de Ubicacion',
    messages: {
        locationTypeNameLabel: 'Nombre',
        locationTypeAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.LocationType.ListLocationType', {
    override: 'sisprod.view.LocationType.ListLocationType',
    listTitle: 'Listado de Tipos de Ubicacion',
    messages: {
        idLocationTypeHeader: 'ID Tipo de Ubicacion',
        locationTypeNameHeader: 'Tipo de Ubicacion',
        locationTypeAcronymHeader: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.Controller.LocationController', {
    override: 'sisprod.controller.LocationController',
    messages: {
        locationTypeNoavailableError: "Este Tipo de Locacion No puede ser registrado desde este modulo"
    }
});

Ext.define('locale.es.sisprod.view.Location.AddLocation', {
    override: 'sisprod.view.Location.AddLocation',
    title: 'Agregar Ubicacion',
    messages: {
        locationNameLabel: 'Nombre',
        locationAcronymLabel: 'Acronimo',
        locationTypeLabel: 'Tipo de Ubicacion',
        locationParentLabel: 'Ubicacion',
        locationEmptyText: 'Escribe una ubicacion ...',
        firstSelectALocatonType: 'Primero seleccion el Tipo de Ubicacion',
        lot: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.Location.UpdateLocation', {
    override: 'sisprod.view.Location.UpdateLocation',
    title: 'Editar Ubicacion',
    messages: {
        locationNameLabel: 'Nombre',
        locationAcronymLabel: 'Acronimo',
        locationTypeLabel: 'Tipo de Ubicacion',
        locationParentLabel: 'Ubicacion',
        locationEmptyText: 'Escribe una ubicacion ...',
        firstSelectALocatonType: 'Primero seleccion el Tipo de Ubicacion',
        lot: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.Location.ListLocation', {
    override: 'sisprod.view.Location.ListLocation',
    listTitle: 'Listado de Ubicaciones',
    messages: {
        idLocationHeader: 'ID de Ubicacion',
        locationNameHeader: 'Nombre',
        locationAcronymHeader: 'Acronimo',
        idLocationParentHeader: 'ID Ubicacion Padre',
        locationParentNameHeader: 'Ubicacion',
        idLocationTypeHeader: 'ID Tipo de Ubicacion',
        locationTypeHeader: 'Tipo de Ubicacion',
        lotHeader: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.BatteryType.AddBatteryType', {
    override: 'sisprod.view.BatteryType.AddBatteryType',
    title: 'Agregar Tipo de Bateria',
    messages: {
        batteryTypeNameLabel: 'Nombre',
        batteryTypeAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.BatteryType.UpdateBatteryType', {
    override: 'sisprod.view.BatteryType.UpdateBatteryType',
    title: 'Editar Tipo de Bateria',
    messages: {
        batteryTypeNameLabel: 'Nombre',
        batteryTypeAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.BatteryType.ListBatteryType', {
    override: 'sisprod.view.BatteryType.ListBatteryType',
    listTitle: 'Listado de Tipos de Bateria',
    messages: {
        idBatteryTypeNameHeader: 'ID Tipo de Bateria',
        batteryTypeNameHeader: 'Tipo de Bateria',
        batteryTypeAcronymHeader: 'Acronimo'
    }
});

Ext.define('locale.es.sisprod.view.Battery.AddBattery', {
    override: 'sisprod.view.Battery.AddBattery',
    title: 'Agregar Bateria',
    messages: {
        batteryNameLabel: 'Nombre',
        batteryAcronymLabel: 'Acronimo',
        batteryCodeLabel: 'Codigo',
        batteryTypeLabel: 'Tipo de Bateria',
        zoneLabel: 'Zona',
        adjustmentFactorLabel: 'Factor de Ajuste'
    }
});
Ext.define('locale.es.sisprod.view.Battery.UpdateBattery', {
    override: 'sisprod.view.Battery.UpdateBattery',
    title: 'Editar Bateria',
    messages: {
        batteryNameLabel: 'Nombre',
        batteryAcronymLabel: 'Acronimo',
        batteryCodeLabel: 'Codigo',
        batteryTypeLabel: 'Tipo de Bateria',
        zoneLabel: 'Zona',
        adjustmentFactorLabel: 'Factor de Ajuste'
    }
});
Ext.define('locale.es.sisprod.view.Battery.ListBattery', {
    override: 'sisprod.view.Battery.ListBattery',
    listTitle: 'Listado de Bateria',
    messages: {
        idBatteryHeader: 'ID de Bateria',
        batteryNameHeader: 'Bateria',
        batteryAcronymHeader: 'Acronimo',
        batteryCodeHeader: 'Codigo',
        idBatteryTypeHeader: 'ID Tipo Bateria',
        batteryTypeHeader: 'Tipo de Bateria',
        idZoneHeader: 'ID de Zona',
        zoneHeader: 'Zona',
        idLotHeader: 'ID de Lote',
        lotHeader: 'Lote'
    }
});

Ext.define('locale.es.sisprod.view.GeoFormation.AddGeoFormation', {
    override: 'sisprod.view.GeoFormation.AddGeoFormation',
    title: 'Agregar Formacion',
    messages: {
        geoFormationNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.GeoFormation.UpdateGeoFormation', {
    override: 'sisprod.view.GeoFormation.UpdateGeoFormation',
    title: 'Editar Formacion',
    messages: {
        geoFormationNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.GeoFormation.ListGeoFormation', {
    override: 'sisprod.view.GeoFormation.ListGeoFormation',
    listTitle: 'Listado de Formaciones',
    messages: {
        idGeologicFormationHeader: 'ID de Formacion',
        geoFormationNameHeader: 'Formacion'
    }
});

Ext.define('locale.es.sisprod.view.Field.AddField', {
    override: 'sisprod.view.Field.AddField',
    title: 'Agregar Yacimiento',
    messages: {
        fieldNameLabel: 'Nombre',
        lotLabel: 'Lote',
        formationsLabel: 'Formaciones'
    }
});
Ext.define('locale.es.sisprod.view.Field.UpdateField', {
    override: 'sisprod.view.Field.UpdateField',
    title: 'Editar Formacion',
    messages: {
        fieldNameLabel: 'Nombre',
        lotLabel: 'Lote',
        formationsLabel: 'Formaciones'
    }
});
Ext.define('locale.es.sisprod.view.Field.ListField', {
    override: 'sisprod.view.Field.ListField',
    listTitle: 'Listado de Formaciones',
    messages: {
        idFieldHeader: 'ID de Yacimiento',
        fieldNameHeader: 'Yacimiento',
        idLotHeader: 'ID Lote',
        lotHeader: 'Lote'
    }
});
Ext.define('locale.es.sisprod.view.ActivityType.AddActivityType', {
    override: 'sisprod.view.ActivityType.AddActivityType',
    title: 'Agregar Tipo de Actividad',
    messages: {
        activityTypeNameLabel: 'Tipo de Actividad'
    }
});
Ext.define('locale.es.sisprod.view.ActivityType.UpdateActivityType', {
    override: 'sisprod.view.ActivityType.UpdateActivityType',
    title: 'Editar Tipo de Actividad',
    messages: {
        activityTypeNameLabel: 'Tipo de Actividad'
    }
});
Ext.define('locale.es.sisprod.view.ActivityType.ListActivityType', {
    override: 'sisprod.view.ActivityType.ListActivityType',
    listTitle: 'Listado de Tipos de Actividades',
    messages: {
        idActivityTypeHeader: 'ID de Tipo de Actividad',
        activityTypeNameHeader: 'Tipo de Actividad'
    }
});

Ext.define('locale.es.sisprod.view.BloodGroup.AddBloodGroup', {
    override: 'sisprod.view.BloodGroup.AddBloodGroup',
    title: 'Agregar Grupo Sanguineo',
    messages: {
        bloodGroupNameLabel: 'Grupo Sanguineo'
    }
});
Ext.define('locale.es.sisprod.view.BloodGroup.UpdateBloodGroup', {
    override: 'sisprod.view.BloodGroup.UpdateBloodGroup',
    title: 'Editar Grupo Sanguineo',
    messages: {
        bloodGroupNameLabel: 'Grupo Sanguineo'
    }
});
Ext.define('locale.es.sisprod.view.BloodGroup.ListBloodGroup', {
    override: 'sisprod.view.BloodGroup.ListBloodGroup',
    listTitle: 'Listado de Grupos Sanguineos',
    messages: {
        idBloodGroupHeader: 'ID de Grupo Sanguineo',
        bloodGroupNameHeader: 'Grupo Sanguineo'
    }
});
Ext.define('locale.es.sisprod.view.DocumentType.AddDocumentType', {
    override: 'sisprod.view.DocumentType.AddDocumentType',
    title: 'Agregar Tipo de Documento',
    messages: {
        documentTypeNameLabel: 'Tipo de Documento',
        documentTypeAcronymLabel: 'Acrónimo'
    }
});
Ext.define('locale.es.sisprod.view.DocumentType.UpdateDocumentType', {
    override: 'sisprod.view.DocumentType.UpdateDocumentType',
    title: 'Editar Grupo Sanguineo',
    messages: {
        documentTypeNameLabel: 'Tipo de Documento',
        documentTypeAcronymLabel: 'Acrónimo'
    }
});
Ext.define('locale.es.sisprod.view.DocumentType.ListDocumentType', {
    override: 'sisprod.view.DocumentType.ListDocumentType',
    listTitle: 'Listado de Tipos de Documentos',
    messages: {
        idDocumentTypeHeader: 'ID de Tipo de Documento',
        externalIdHeader: 'ID Externo',
        documentTypeNameHeader: 'Tipo de Documento',
        documentTypeAcronymHeader: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.ExchangeRate.AddExchangeRate', {
    override: 'sisprod.view.ExchangeRate.AddExchangeRate',
    title: 'Agregar Tipo de Cambio',
    messages: {
        moneyNameLabel: 'Moneda',
        dateOfValidityLabel: 'Fecha de Valides',
        exchangeRateLabel: 'Tipo de Cambio'
    }
});
Ext.define('locale.es.sisprod.view.ExchangeRate.UpdateExchangeRate', {
    override: 'sisprod.view.ExchangeRate.UpdateExchangeRate',
    title: 'Editar Tipo de Cambio',
    messages: {
        moneyNameLabel: 'Moneda',
        dateOfValidityLabel: 'Fecha de Valides',
        exchangeRateLabel: 'Tipo de Cambio'
    }
});
Ext.define('locale.es.sisprod.view.ExchangeRate.ListExchangeRate', {
    override: 'sisprod.view.ExchangeRate.ListExchangeRate',
    listTitle: 'Listado de Tipos de Cambios',
    messages: {
        idExchangeRateHeader: 'ID de Tipo de Cambio',
        idMoneyHeader: 'ID de Moneda',
        moneyNameHeader: 'Moneda',
        dateOfValidityHeader: 'Fecha de Valides',
        exchangeRateHeader: 'Tipo de Cambio'
    }
});


Ext.define('locale.es.sisprod.view.MeasureUnit.AddMeasureUnit', {
    override: 'sisprod.view.MeasureUnit.AddMeasureUnit',
    title: 'Agregar Unidad de Medida',
    messages: {
        measureUnitTypeNameLabel: 'Tipo de Unidad de Medida',
        isBaseUnitLabel: 'Es Unidad Base',
        measureUnitNameLabel: 'Unidad de Medida',
        measureUnitAcronymLabel: 'Acrónimo',
        baseConversionLabel: 'Conversión Base'
    }
});
Ext.define('locale.es.sisprod.view.MeasureUnit.UpdateMeasureUnit', {
    override: 'sisprod.view.MeasureUnit.UpdateMeasureUnit',
    title: 'Editar Unidad de Medida',
    messages: {
        measureUnitTypeNameLabel: 'Tipo de Unidad de Medida',
        isBaseUnitLabel: 'Es Unidad Base',
        measureUnitNameLabel: 'Unidad de Medida',
        measureUnitAcronymLabel: 'Acrónimo',
        baseConversionLabel: 'Conversión Base'
    }
});
Ext.define('locale.es.sisprod.view.MeasureUnit.ListMeasureUnit', {
    override: 'sisprod.view.MeasureUnit.ListMeasureUnit',
    listTitle: 'Listado de Unidades de Medida',
    messages: {
        idMeasureUnitHeader: 'ID de Unidad de Medida',
        idMeasureUnitTypeHeader: 'ID de Tipo de Unidad de Medida',
        measureUnitTypeNameHeader: 'Tipo de Unidad de Medida',
        isBaseUnitHeader: 'Es Unidad Base',
        measureUnitNameHeader: 'Unidad de Medida',
        measureUnitAcronymHeader: 'Acrónimo',
        baseConversionHeader: 'Conversión Base'
    }
});

Ext.define('locale.es.sisprod.view.MeasureUnitType.AddMeasureUnitType', {
    override: 'sisprod.view.MeasureUnitType.AddMeasureUnitType',
    title: 'Agregar Tipo de Unidad de Medida',
    messages: {
        measureUnitTypeNameLabel: 'Tipo de Unidad de Medida'
    }
});
Ext.define('locale.es.sisprod.view.MeasureUnitType.UpdateMeasureUnitType', {
    override: 'sisprod.view.MeasureUnitType.UpdateMeasureUnitType',
    title: 'Editar Tipo de Unidad de Medida',
    messages: {
        measureUnitTypeNameLabel: 'Tipo de Unidad de Medida'
    }
});
Ext.define('locale.es.sisprod.view.MeasureUnitType.ListMeasureUnitType', {
    override: 'sisprod.view.MeasureUnitType.ListMeasureUnitType',
    listTitle: 'Listado de Tipos de Unidades de Medida',
    messages: {
        idMeasureUnitTypeHeader: 'ID de Tipo de Unidad de Medida',
        measureUnitTypeNameHeader: 'Tipo de Unidad de Medida'
    }
});


Ext.define('locale.es.sisprod.view.Money.AddMoney', {
    override: 'sisprod.view.Money.AddMoney',
    title: 'Agregar Moneda',
    messages: {
        isLocalMoneyLabel: 'Es Moneda Local',
        moneyNameLabel: 'Moneda',
        moneyAcronymLabel: 'Acrónimo'
    }
});
Ext.define('locale.es.sisprod.view.Money.UpdateMoney', {
    override: 'sisprod.view.Money.UpdateMoney',
    title: 'Editar Moneda',
    messages: {
        isLocalMoneyLabel: 'Es Moneda Local',
        moneyNameLabel: 'Moneda',
        moneyAcronymLabel: 'Acrónimo'
    }
});
Ext.define('locale.es.sisprod.view.Money.ListMoney', {
    override: 'sisprod.view.Money.ListMoney',
    listTitle: 'Listado de Monedas',
    messages: {
        idMoneyHeader: 'ID de Moneda',
        isLocalMoneyHeader: 'Es Moneda Local',
        moneyNameHeader: 'Moneda',
        moneyAcronymHeader: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.Turn.AddTurn', {
    override: 'sisprod.view.Turn.AddTurn',
    title: 'Agregar Turno',
    messages: {
        startTimeLabel: 'Hora de Inicio',
        endTimeLabel: 'Hora de Fin',
        turnOrderLabel: 'Orden de Turno',
        turnNameLabel: 'Turno',
        acronymTurnLabel: 'Acrónimo'
    }
});
Ext.define('locale.es.sisprod.view.Turn.UpdateTurn', {
    override: 'sisprod.view.Turn.UpdateTurn',
    title: 'Editar Turno',
    messages: {
        startTimeLabel: 'Hora de Inicio',
        endTimeLabel: 'Hora de Fin',
        turnOrderLabel: 'Orden de Turno',
        turnNameLabel: 'Turno',
        acronymTurnLabel: 'Acrónimo'
    }
});
Ext.define('locale.es.sisprod.view.Turn.ListTurn', {
    override: 'sisprod.view.Turn.ListTurn',
    listTitle: 'Listado de Turnos',
    messages: {
        idTurnHeader: 'ID de Turno',
        startTimeHeader: 'Hora de Inicio',
        endTimeHeader: 'Hora de Fin',
        turnOrderHeader: 'Orden de Turno',
        turnNameHeader: 'Turno',
        acronymTurnHeader: 'Acrónimo'
    }
});

/**
 * TestProgram messages
 */

Ext.define('locale.es.sisprod.controller.TestProgramController', {
    override: 'sisprod.controller.TestProgramController',
    messages: {
        msgDelete: 'este programa',
        msgAlertDuplicity: '¡Ya existe un programa para la fecha y lote especificados!',
        msgAlertSelectBattery: '¡Seleccione bateria!',
        msgHasenBattery: '¡No hay baterias pendientes de programar!',
        msgWellConstraint: 'Para los siguientes pozos se esta programando menos de 24 horas de prueba al mes',
        msgDaysConstraint: 'Para los siguientes pozos se esta programando menos de 3 pruebas al mes',
        msgBatteryConstraint: 'La bateria ha excedido su capacidad de prueba ({0}) en los siguientes días',
        msgTitleSaveConfirmation: 'Confirmación',
        msgQuestionSave: '¿Desea guardar de todas formas?',
        msgTank: 'Tankes',
        msgHours: 'Horas',
        msgConfirmUndoBattery: '¿Esta seguro que desea deshacer la programación de {0}?',
        msgSuccessUndo: 'se deshizo la programación de {0}'
    }
});

Ext.define('locale.es.sisprod.view.TestProgram.AddTestProgram', {
    override: 'sisprod.view.TestProgram.AddTestProgram',
    title: 'Programa de Pruebas',
    messages: {
        msgId: 'id',
        msgEmployeeElaboration: 'Elaborado por',
        msgElaborationDate: 'Fecha de Elaboración',
        msgLot: 'Lote',
        msgMonth: 'Mes',
        msgComment: 'Comentario',
        msgFieldSetProgramData: 'Datos de Programa',
        msgEmployeeElaborationEmpty: 'Ingrese Trabajador',
        msgButtonStart: 'Elaborar Programa de Pruebas'
    }
});

Ext.define('locale.es.sisprod.view.TestProgram.UpdateTestProgram', {
    override: 'sisprod.view.TestProgram.UpdateTestProgram',
    title: 'Editar Programa de Pruebas',
    messages: {
        msgId: 'id',
        msgEmployeeElaboration: 'Elaborado por',
        msgElaborationDate: 'Fecha de Elaboración',
        msgLot: 'Lote',
        msgMonth: 'Mes',
        msgComment: 'Comentario',
        msgFieldSetProgramData: 'Datos de Programa',
        msgEmployeeElaborationEmpty: 'Ingrese Trabajador',
        msgButtonStart: 'Elaborar Programa de Pruebas',
        msgButtonSaveChanges: 'Guardar Cambios'
    }
});

Ext.define('locale.es.sisprod.view.TestProgram.ProgramBattery', {
    override: 'sisprod.view.TestProgram.ProgramBattery',
    title: 'Elaboración de Programa',
    messages: {
        msgBattery: 'Bateria',
        msgBatteryCode: 'Código',
        msgZone: 'Zona',
        msgListBattery: 'Baterias',
        msgEmployeeElaboration: 'Elaborado por',
        msgElaborationDate: 'Fecha de Elaboración',
        msgLot: 'Lote',
        msgMonth: 'Mes',
        msgComment: 'Comentario',
        msgFieldSetProgramData: 'Datos de Programa',
        msgListTitle: 'Baterias Programadas',
        msgTipAdd: 'Agregar Bateria para programar',
        msgTipEidt: 'Editar programación de bateria',
        msgTipRemove: 'Deshacer programación de Bateria'
    }
});

Ext.define('locale.es.sisprod.view.TestProgram.TestProgramDetail', {
    override: 'sisprod.view.TestProgram.TestProgramDetail',
    title: 'Detalle de Programa de Pruebas',
    messages: {
        msgTitleGrid: 'Días a Programar',
        msgWell: 'Pozo',
        msgWellGroup: 'Grupo',
        msgWellType: 'Tipo',
        msgIn: 'en'
    }
});

Ext.define('locale.es.sisprod.view.TestProgram.BatteryContextMenu', {
    override: 'sisprod.view.TestProgram.BatteryContextMenu',
    messages: {
        msgBattery: 'Bateria',
        msgBatteryCode: 'Código',
        msgTitleList: 'Baterias no programadas',
        msgTipProgram: 'Programar Bateria'
    }
});

//WellState messages:
Ext.define('locale.es.sisprod.view.WellState.AddWellState', {
    override: 'sisprod.view.WellState.AddWellState',
    title: 'Agregar Estado de Pozo',
    messages: {
        msgWellStateName: 'Estado de pozo',
        msgAcronym: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.WellState.UpdateWellState', {
    override: 'sisprod.view.WellState.UpdateWellState',
    title: 'Editar Estado de Pozo',
    messages: {
        msgWellStateName: 'Estado de pozo',
        msgAcronym: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.WellState.ListWellState', {
    override: 'sisprod.view.WellState.ListWellState',
    listTitle: 'Listado de Estados de Pozo',
    messages: {
        msgId: 'Id',
        msgWellState: 'Estado de pozo',
        msgAcronym: 'Acrónimo'
    }
});


//WellTypeByState messages
Ext.define('locale.es.sisprod.controller.WellTypeByStateController', {
    override: 'sisprod.controller.WellTypeByStateController',
    messages: {
        msgAlertInputName: '¡Ingrese descripción!',
        msgAlertInputAcronym: '¡Ingrese Acrónimo!',
        msgNoInputExtractionDetail: '¡Ingrese por lo menos un tipo de extracción!'
    }
});

Ext.define('locale.es.sisprod.view.WellTypeByState.AddWellTypeByState', {
    override: 'sisprod.view.WellTypeByState.AddWellTypeByState',
    title: 'Agregar Tipo de Pozo por Estado',
    messages: {
        msgWellState: 'Estado de Pozo',
        msgWellTypeByStateName: 'Tipo de Pozo por Estado',
        msgAcronym: 'Acrónimo',
        msgAddExtractionTypes: 'Agregar Tipos de Extracción'
    }
});

Ext.define('locale.es.sisprod.view.WellTypeByState.UpdateWellTypeByState', {
    override: 'sisprod.view.WellTypeByState.UpdateWellTypeByState',
    title: 'Editar Tipo de Pozo por Estado',
    messages: {
        msgWellState: 'Estado de Pozo',
        msgWellTypeByStateName: 'Tipo de Pozo por Estado',
        msgAcronym: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.WellTypeByState.ListWellTypeByState', {
    override: 'sisprod.view.WellTypeByState.ListWellTypeByState',
    listTitle: 'Listado Tipos de Pozo por Estado',
    messages: {
        msgId: 'Id',
        msgIdWellState: 'Id Estado de Pozo',
        msgWellTypeByStateName: 'Tipo de Pozo por Estado',
        msgAcronym: 'Acrónimo',
        msgWellState: 'Estado de Pozo'
    }
});

//ExtractionType Messages:
Ext.define('locale.es.sisprod.view.ExtractionType.AddExtractionType', {
    override: 'sisprod.view.ExtractionType.AddExtractionType',
    title: 'Agregar Tipo de Extracción',
    messages: {
        msgWellTypeByState: 'Tipo de Pozo por Estado',
        msgExtractionTypeName: 'Tipo de Extracción',
        msgAcronym: 'Acrónimo',
        msgId: 'id'
    }
});

Ext.define('locale.es.sisprod.view.ExtractionType.UpdateExtractionType', {
    override: 'sisprod.view.ExtractionType.UpdateExtractionType',
    title: 'Editar Tipo de Extracción',
    messages: {
        msgWellTypeByState: 'Tipo de Pozo por Estado',
        msgExtractionTypeName: 'Tipo de Extracción',
        msgAcronym: 'Acrónimo',
        msgId: 'id'
    }
});

Ext.define('locale.es.sisprod.view.ExtractionType.ListExtractionType', {
    override: 'sisprod.view.ExtractionType.ListExtractionType',
    listTitle: 'Listado de Tipos de Extracción',
    messages: {
        msgId: 'Id',
        msgIdWellTypeByState: 'Id de Tipo de Pozo por Estado',
        msgExtractionTypeName: 'Tipo de Extracción',
        msgAcronym: 'Acrónimo',
        msgWellTypeByState: 'Tipo de Pozo por Estado'
    }
});

Ext.define('locale.es.sisprod.view.ExtractionType.ExtractionTypeDetail', {
    override: 'sisprod.view.ExtractionType.ExtractionTypeDetail',
    messages: {
        title: 'Tipos de Extracción',
        columnHeaders: {
            extractionTypeName: 'Tipo de Extracción',
            acronym: 'Acrónimo'
        },
        validation: {
            repeteadName: '¡Ya existe un tipo de extracción con esta descripción!',
            repeteadAcronym: '¡Ya existe un tipo de extracción con este acrónimo!'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        },
        tips: {
            msgConfigurationFeatures: 'Configurar Características'
        }
    }
});


//WellGroup Messages:
Ext.define('locale.es.sisprod.view.WellGroup.AddWellGroup', {
    override: 'sisprod.view.WellGroup.AddWellGroup',
    title: 'Agregar Grupo de Pozo',
    messages: {
        msgWellGroupName: 'Grupo de Pozo',
        msgId: 'Id'
    }
});

Ext.define('locale.es.sisprod.view.WellGroup.UpdateWellGroup', {
    override: 'sisprod.view.WellGroup.UpdateWellGroup',
    title: 'Editar Grupo de Pozo',
    messages: {
        msgWellGroupName: 'Grupo de Pozo',
        msgId: 'Id'
    }
});

Ext.define('locale.es.sisprod.view.WellGroup.ListWellGroup', {
    override: 'sisprod.view.WellGroup.ListWellGroup',
    listTitle: 'Listado de Grupos de Pozo',
    messages: {
        msgId: 'Id',
        msgWellGroup: 'Grupo de Pozo'
    }
});

//WellTypeByProduction Messages:
Ext.define('locale.es.sisprod.view.WellTypeByProduction.AddWellTypeByProduction', {
    override: 'sisprod.view.WellTypeByProduction.AddWellTypeByProduction',
    title: 'Agregar Tipo de Pozo por Producción',
    messages: {
        msgId: 'Id',
        msgWellTypeByProductionName: 'Tipo de Pozo por Producción',
        msgAcronym: 'Acrónimo',
        msgMinPercentage: 'Porcentaje Mínimo',
        msgMaxPercentage: 'Porcentaje Máximo'
    }
});

Ext.define('locale.es.sisprod.view.WellTypeByProduction.UpdateWellTypeByProduction', {
    override: 'sisprod.view.WellTypeByProduction.UpdateWellTypeByProduction',
    title: 'Editar Tipo de Pozo por Producción',
    messages: {
        msgId: 'Id',
        msgWellTypeByProductionName: 'Tipo de Pozo por Producción',
        msgAcronym: 'Acrónimo',
        msgMinPercentage: 'Porcentaje Mínimo',
        msgMaxPercentage: 'Porcentaje Máximo'
    }
});

Ext.define('locale.es.sisprod.view.WellTypeByProduction.ListWellTypeByProduction', {
    override: 'sisprod.view.WellTypeByProduction.ListWellTypeByProduction',
    listTitle: 'Listado de Tipos de Pozo por Producción',
    messages: {
        msgId: 'Id',
        msgWellTypeByProduction: 'Tipo de Pozo por Producción',
        msgAcronym: 'Acrónimo',
        msgMinPercentage: 'Porcentaje Mínimo',
        msgMaxPercentage: 'Porcentaje Máximo'
    }
});

//WellFeature Messages:
Ext.define('locale.es.sisprod.controller.WellFeatureController', {
    override: 'sisprod.view.controller.WellFeatureController',
    messages: {
        msgAlertValueDuplicate: 'Este valor ya fue agregado a la lista desplegable',
        msgAlertNoInputValues: 'Ingrese por lo menos un valor para la lista desplegable',
        msgEmpty: 'Ingrese un valor',
        msgSelectForDelete: 'Seleccione valor a eliminar'
    }
});

Ext.define('locale.es.sisprod.view.WellFeature.AddWellFeature', {
    override: 'sisprod.view.WellFeature.AddWellFeature',
    title: 'Agregar Característica de Pozo',
    messages: {
        msgFeatureName: 'Característica de Pozo',
        msgFeatureType: 'Tipo de Característica',
        msgMeasureUnit: 'Unidad de Medida',
        msgTitleList: 'Valores de Lista Desplegable',
        msgValue: 'Valor',
        msgAdd: 'Agregar',
        msgRemove: 'Eliminar',
        msgUpdateInWellTest: 'Modificable en pruebas de pozos',
        msgUpdateInWellService: 'Modificable en servicio de pozos'
    }
});

Ext.define('locale.es.sisprod.view.WellFeature.UpdateWellFeature', {
    override: 'sisprod.view.WellFeature.UpdateWellFeature',
    title: 'Editar Característica de Pozo',
    messages: {
        msgFeatureName: 'Característica de Pozo',
        msgFeatureType: 'Tipo de Característica',
        msgMeasureUnit: 'Unidad de Medida',
        msgTitleList: 'Valores de Lista Desplegable',
        msgValue: 'Valor',
        msgAdd: 'Agregar',
        msgRemove: 'Eliminar',
        msgUpdateInWellTest: 'Modificable en pruebas de pozos',
        msgUpdateInWellService: 'Modificable en servicio de pozos'
    }
});

Ext.define('locale.es.sisprod.view.WellFeature.ListWellFeature', {
    override: 'sisprod.view.WellFeature.ListWellFeature',
    listTitle: 'Listado de Características de Pozo',
    messages: {
        msgId: 'Id',
        msgIdFeatureType: 'Id Tipo de Caracteística',
        msgIdMeasureUnit: 'Id Unidad de Medida',
        msgWellFeature: 'Característica de Pozo',
        msgFeatureType: 'Tipo de Característica',
        msgMeasureUnit: 'Unidad de Medida',
        msgUpdateInWellTest: 'Modificable en pruebas de pozo',
        msgUpdateInWellService: 'Modificable en servicio de pozo'
    }
});

Ext.define('locale.es.sisprod.view.WellFeature.WellFeatureSelector', {
    override: 'sisprod.view.WellFeature.WellFeatureSelector',
    title: 'Seleccione carácteristicas de pozo',
    messages: {
        msgFeatureName: 'Descripción',
        msgFeatureType: 'Tipo de Carácteristica',
        msgMeasureUnit: 'Unidad de Medida',
        msgTitle: 'Carácteristicas'
    }
});

//Well Messages:
Ext.define('locale.es.sisprod.controller.WellController', {
    override: 'sisprod.controller.WellController',
    messages: {
        msgNoConfigMeasureUnit: 'No se ha configurado las unidades de medida de producción, contacte con el administrador del sistema',
        msgOil: 'Oil',
        msgWater: 'Agua',
        msgGas: 'Gas',
        msgCarrera: 'Carrera',
        msgAlertNoValidCicle: '{0} x {1} no es un ciclo valido',
        fileUploadingWaitMessage: 'Subiendo archivo, por favor espere...'
    }
});

Ext.define('locale.es.sisprod.view.Well.AddWellTab', {
    override: 'sisprod.view.Well.AddWellTab',
    messages: {
        msgWellData: 'Datos de Pozo',
        msgFeatures: 'Características'
    }
});

Ext.define('locale.es.sisprod.view.Well.UpdateWellTab', {
    override: 'sisprod.view.Well.UpdateWellTab',
    messages: {
        msgWellData: 'Datos de Pozo',
        msgFeatures: 'Características'
    }
});

Ext.define('locale.es.sisprod.view.Well.ListWell', {
    override: 'sisprod.view.Well.ListWell',
    listTitle: 'Listado de Características de Pozo',
    messages: {
        msgId: 'Id',
        msgWell: 'Pozo',
        msgCode: 'Código',
        msgIdLocation: 'Id Ubicación',
        msgLocation: 'Ubicación',
        msgIdWellState: 'Id Estado de Pozo',
        msgWellState: 'Estado de Pozo',
        msgIdWellGroup: 'Id Grupo de Pozo',
        msgWellGroup: 'Grupo de Pozo',
        msgIdField: 'Id Yacimiento',
        msgField: 'Yacimiento',
        msgIdBattery: 'Id Bateria',
        msgBattery: 'Bateria',
        msgIdWellTypeByState: 'Id Tipo de Pozo por Estado',
        msgWellTypeByState: 'Tipo de Pozo por Estado',
        msgIdWellTypeByProduction: 'Id Tipo de Pozo por Producción',
        msgWellTypeByProduction: 'Tipo de Pozo por Producción',
        msgIdExtractionType: 'Id Tipo de Extracción',
        msgExtractionType: 'Tipo de Extracción',
        msgIdOilMeasureUnit: 'Id Unidad de Medida Oil',
        msgOilMeasureUnit: 'Unidad Medida Oil',
        msgIdWaterMeasureUnit: 'Id Unidad de Medida Agua',
        msgWaterMeasureUnit: 'Unidad de Medida Agua',
        msgIdGasMeasureUnit: 'Id Unidad de Medida Gas',
        msgGasMeasureUnit: 'Unidad de Medida Gas',
        msgWorkingTime: 'Tiempo de Trabajo',
        msgBreakTime: 'Tiempo de Descanso',
        msgOilMeasure: 'Medida Oil',
        msgWaterMeasure: 'Medida Agua',
        msgGasMeasure: 'Medida Gas',
        msgStartHour: 'Hora Inicio',
        msgEndHour: 'Hora Fin',
        msgIdCarreraMeasureUnit: 'Unidad de Medida Carrera',
        msgCarreraMeasureUnit: 'Medida Carrera',
        msgCarrera: 'Carrera',
        msgSpm: 'SPM',
        msgOnHour: 'Horas On',
        msgOffHour: 'Horas Off',
        attachFilesButtonText: 'Adjuntar Archivos',
        assignEquipmentsButtonText: 'Asignar Equipos',
        msgLot: 'Lote',
        msgIdLot: 'Id de Lote',
        uploadFile: 'Adjuntar Diagrama de Completación'
    }
});

Ext.define('locale.es.sisprod.view.Well.AddWell', {
    override: 'sisprod.view.Well.AddWell',
    title: 'Agregar Pozo'
});

Ext.define('locale.es.sisprod.view.Well.UpdateWell', {
    override: 'sisprod.view.Well.UpdateWell',
    title: 'Editar Pozo'
});

Ext.define('locale.es.sisprod.view.Well.GeneralData', {
    override: 'sisprod.view.Well.GeneralData',
    messages: {
        msgId: 'Id',
        msgCode: 'Código',
        msgWell: 'Pozo',
        msgWellState: 'Estado de Pozo',
        msgWellTypeByState: 'Tipo de Pozo por Estado',
        msgWellTypeByProduction: 'Tipo de Pozo por Producción',
        msgExtractionType: 'Tipo de Extracción',
        msgWellGroup: 'Grupo de Pozo',
        msgField: 'Yacimiento',
        msgBattery: 'Bateria',
        msgCarrera: 'Carrera',
        msgSpm: 'SPM',
        msgWorkingTime: 'Tiempo de Trabajo',
        msgBreakTime: 'Tiempo de Descanso',
        msgStartHour: 'Hora de Inicio',
        msgEndHour: 'Hora de Fin',
        msgOil: 'Oil',
        msgWater: 'Agua',
        msgGas: 'Gas',
        msgFieldSetHours: 'Horario de Producción',
        msgFielProductionMeasures: 'Medidas Promedio de Producción',
        msgOnHour: 'Horas On',
        msgOffHour: 'Horas Off',
        msgLot: 'Lote'
    }
});

Ext.define('locale.es.sisprod.view.Well.UpdateWellParamsAndFeatures', {
    override: 'sisprod.view.Well.UpdateWellParamsAndFeatures',
    title: 'Parámetros y características de pozos',
    messages: {
        formFields: {
            productionPeriodDate: "Fecha de reporte",
            well: "Pozo",
            wellParametersFieldSet: "Parámetros de pozo",
            wellCycle: "Ciclo",
            onHours: "Horas ON",
            offHours: "Horas OFF"
        }
    }
});
Ext.define('locale.es.sisprod.view.Well.UpdateWellParamsAndFeaturesSDP', {
    override: 'sisprod.view.Well.UpdateWellParamsAndFeaturesSDP',
    title: 'Parámetros y características de pozos en SDP',
    messages: {
        formFields: {
            productionPeriodDate: "Fecha de reporte",
            well: "Pozo",
            wellParametersFieldSet: "Parámetros de pozo",
            assingEquipmentsFieldSet: "Asignacion de Equipos",
            wellCycle: "Ciclo",
            onHours: "Horas ON",
            offHours: "Horas OFF"
        },
        labels: {
            engineEquipment: 'Motor',
            pumpingUnitEquipment: 'Unidad de Bombeo',
            gearboxRating: 'Torque Máximo',
            gearboxPeakBalanced: 'Carga Max.Balanceada'
        }
    }
});


//ProductionForecast Messages:
Ext.define('locale.es.sisprod.controller.ProductionForecastController', {
    override: 'sisprod.controller.ProductionForecastController',
    messages: {
        msgAlertNoGenerateForecast: 'No se ha corrido la generación del pronóstico'
    }
});

Ext.define('locale.es.sisprod.view.ProductionForecast.AddProductionForecast', {
    override: 'sisprod.view.ProductionForecast.AddProductionForecast',
    title: 'Generar Pronóstico',
    messages: {
        msgForecastData: 'Datos de Pronóstico',
        msgId: 'Id',
        msgLot: 'Lote',
        msgTitle: 'Titulo',
        msgEffectiveStartDate: 'Fecha de Inicio',
        msgEffectiveEndDate: 'Fecha de Fin',
        msgButtonStart: 'Generar Pronóstico',
        msgIdBattery: 'Id Bateria',
        msgBattery: 'Bateria',
        msgCode: 'Código',
        msgZone: 'Zona',
        msgMonth: 'Mes',
        msgForecastDetail: 'Forecast Detail'
    }
});

Ext.define('locale.es.sisprod.view.ProductionForecast.UpdateProductionForecast', {
    override: 'sisprod.view.ProductionForecast.UpdateProductionForecast',
    title: 'Editar Pronóstico',
    messages: {
        msgForecastData: 'Datos de Pronóstico',
        msgId: 'Id',
        msgLot: 'Lote',
        msgTitle: 'Titulo',
        msgEffectiveStartDate: 'Fecha de Inicio',
        msgEffectiveEndDate: 'Fecha de Fin',
        msgButtonStart: 'Generar Pronóstico',
        msgIdBattery: 'Id Bateria',
        msgBattery: 'Bateria',
        msgCode: 'Código',
        msgZone: 'Zona',
        msgMonth: 'Mes',
        msgForecastDetail: 'Detalle de Pronóstico'
    }
});

Ext.define('locale.es.sisprod.view.ProductionForecast.ListProductionForecast', {
    override: 'sisprod.view.ProductionForecast.ListProductionForecast',
    listTitle: 'Listado de Pronósticos de Producción',
    messages: {
        msgId: 'Id',
        msgForectas: 'Pronóstico',
        msgIdLot: 'Id Lote',
        msgEffectiveStartDate: 'Fecha de Inicio',
        msgEffectiveEndDate: 'Fecha de Fin'
    }
});

Ext.define('locale.es.sisprod.view.ProductionForecast.ProductionForecastDetail', {
    override: 'sisprod.view.ProductionForecast.ProductionForecastDetail',
    title: 'Detalle de Pronóstico',
    messages: {
        msgForecastWell: 'Pronóstico por Pozo',
        msgIdProductionForecast: 'Id',
        msgWellCode: 'Código',
        msgOil: 'Oil',
        msgWater: 'Agua',
        msgGas: 'Gas',
        msgWorkingTime: 'Tiempo de Trabajo',
        msgBreakTime: 'Tiempo de Reposo',
        msgTies: 'TIES',
        msgOnHours: 'Horas On',
        msgOffHours: 'Horas Off'
    }
});
Ext.define('locale.es.sisprod.view.ProductType.AddProductType', {
    override: 'sisprod.view.ProductType.AddProductType',
    title: 'Agregar Tipo de Material',
    messages: {
        productTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.ProductType.UpdateProductType', {
    override: 'sisprod.view.ProductType.UpdateProductType',
    title: 'Editar Tipo de Material',
    messages: {
        productTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.ProductType.ListProductType', {
    override: 'sisprod.view.ProductType.ListProductType',
    listTitle: 'Listado de Tipos de Materiales',
    messages: {
        idProductTypeHeader: 'ID Tipo de Material',
        productTypeNameHeader: 'Tipo de Material'
    }
});
Ext.define('locale.es.sisprod.view.ToolType.AddToolType', {
    override: 'sisprod.view.ToolType.AddToolType',
    title: 'Agregar Tipo de Herramienta',
    messages: {
        toolTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.ToolType.UpdateToolType', {
    override: 'sisprod.view.ToolType.UpdateToolType',
    title: 'Editar Tipo de Herramienta',
    messages: {
        toolTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.ToolType.ListToolType', {
    override: 'sisprod.view.ToolType.ListToolType',
    listTitle: 'Listado de Tipos de Herramientas',
    messages: {
        idToolTypeHeader: 'ID Tipo de Herramienta',
        toolTypeNameHeader: 'Tipo de Herramienta'
    }
});

/**
 * Production Period
 */
Ext.define("Ext.locale.es.sisprod.view.ProductionPeriod.ListProductionPeriod", {
    override: "sisprod.view.ProductionPeriod.ListProductionPeriod",
    messages: {
        columnHeaders: {
            idProductionPeriod: "Identificador de período de producción",
            productionPeriodDate: "Fecha",
            productionPeriodStatus: "Estado",
            productionPeriodComment: "Comentario"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.ProductionPeriod.AddProductionPeriod", {
    override: "sisprod.view.ProductionPeriod.AddProductionPeriod",
    title: 'Agregar fecha de producción',
    messages: {
        formFields: {
            productionPeriodDate: "Fecha",
            productionPeriodComment: "Comentario"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.ProductionPeriod.UpdateProductionPeriod", {
    override: "sisprod.view.ProductionPeriod.UpdateProductionPeriod",
    title: 'Editar fecha de producción',
    messages: {
        formFields: {
            productionPeriodDate: "Fecha",
            productionPeriodComment: "Comentario"
        }
    }
});

/**
 * Well Test Type Messages
 */
Ext.define("Ext.locale.es.sisprod.view.WellTestType.ListWellTestType", {
    override: "sisprod.view.WellTestType.ListWellTestType",
    messages: {
        columnHeaders: {
            idWellTestType: "Identificador de tipo de prueba de pozo",
            wellTestTypeName: "Tipo de prueba de pozo",
            wellTestTypeCode: "Código"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellTestType.AddWellTestType", {
    override: "sisprod.view.WellTestType.AddWellTestType",
    title: 'Agregar tipo de prueba de pozo',
    messages: {
        formFields: {
            wellTestTypeCode: "Código",
            wellTestTypeName: "Tipo de prueba de pozo"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellTestType.UpdateWellTestType", {
    override: "sisprod.view.WellTestType.UpdateWellTestType",
    title: 'Editar tipo de prueba de pozo',
    messages: {
        formFields: {
            wellTestTypeCode: "Código",
            wellTestTypeName: "Tipo de prueba de pozo"
        }
    }
});

/**
 * Well Test Messages
 */
Ext.define("Ext.locale.es.sisprod.view.WellTest.ListWellTest", {
    override: "sisprod.view.WellTest.ListWellTest",
    messages: {
        formFields: {
            productionPeriodDate: "Período"
        },
        columnHeaders: {
            idWellTest: "Identificador de prueba de pozo",
            idWell: "Identificador de pozo",
            productionPeriodDate: "Fecha",
            wellCode: "Pozo",
            idBattery: "Identificador de batería",
            batteryCode: "Batería",
            onHour: "Hora ON",
            offHour: "Hora OFF",
            testHours: "H. prueba",
            totalsHours: "H. totales",
            stopppedHours: "H. parada",
            idWellTestType: "Identificador de Tipo de prueba",
            wellTestTypeName: "Tipo de prueba",
            oilQuantity: "Crudo",
            waterQuantity: "Agua",
            gasQuantity: "Gas",
            gor: "GOR",
            comments: "Observaciones",
            forProductionForecast: "Para pronóstico",
            updateWellParamsAndFeaturesButton: "Parámetros de pozo"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellTest.AddWellTest", {
    override: "sisprod.view.WellTest.AddWellTest",
    title: 'Agregar prueba de pozo',
    messages: {
        formFields: {
            productionPeriodDate: "Fecha de reporte",
            wellParametersFieldSet: "Parámetros de pozo",
            wellTestBattery: "Batería",
            wellTestWell: "Pozo",
            wellTestType: "Tipo de prueba",
            wellCycle: "Ciclo",
            onHours: "Horas ON",
            offHours: "Horas OFF",
            GOR: "GOR",
            testHours: "H. prueba",
            stoppedHours: "H. parada",
            oilQuantity: "Crudo",
            gasQuantity: "Gas",
            waterQuantity: "Agua",
            comments: "Observaciones",
            forProductionForecast: "Para pronóstico"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellTest.UpdateWellTest", {
    override: "sisprod.view.WellTest.UpdateWellTest",
    title: 'Editar prueba de pozo',
    messages: {
        formFields: {
            productionPeriodDate: "Fecha de reporte",
            wellParametersFieldSet: "Parámetros de pozo",
            wellTestBattery: "Batería",
            wellTestWell: "Pozo",
            wellTestType: "Tipo de prueba",
            wellCycle: "Ciclo",
            onHours: "Horas ON",
            offHours: "Horas OFF",
            GOR: "GOR",
            testHours: "H. prueba",
            stoppedHours: "H. parada",
            oilQuantity: "Crudo",
            gasQuantity: "Gas",
            waterQuantity: "Agua",
            comments: "Observaciones",
            forProductionForecast: "Para pronóstico"
        }
    }
});


Ext.define('locale.es.sisprod.view.Tool.AddTool', {
    override: 'sisprod.view.Tool.AddTool',
    title: 'Agregar Herramienta',
    messages: {
        toolNameLabel: 'Nombre',
        toolCodeLabel: 'Codigo',
        stockLabel: 'Stock',
        toolTypeLabel: 'Tipo de Herramienta',
        measureUnitLabel: 'Und. de Medida'
    }
});
Ext.define('locale.es.sisprod.view.Tool.UpdateTool', {
    override: 'sisprod.view.Tool.UpdateTool',
    title: 'Editar Herramienta',
    messages: {
        toolNameLabel: 'Nombre',
        toolCodeLabel: 'Codigo',
        stockLabel: 'Stock',
        toolTypeLabel: 'Tipo de Herramienta',
        measureUnitLabel: 'Und. de Medida'
    }
});
Ext.define('locale.es.sisprod.view.Tool.ListTool', {
    override: 'sisprod.view.Tool.ListTool',
    listTitle: 'Listado de Herramientas',
    messages: {
        idToolHeader: 'ID Herramienta',
        toolNameHeader: 'Herramienta',
        toolCodeHeader: 'Codigo',
        stockHeader: 'Stock',
        toolTypeIdHeader: 'ID Tipo',
        toolTypeNameHeader: 'Tipo',
        measureUnitIdHeader: 'ID Und. de Medida',
        measureUnitNameHeader: 'Und. de Medida'
    }
});
Ext.define('locale.es.sisprod.Controller.ProductController', {
    override: 'sisprod.controller.ProductController',
    messages: {
        importTitle: "Importación de Materiales",
        importQuestion: "Importación de Materiales puede tardar unos minutos ¿Desea Continuar?"
    }
});
Ext.define('locale.es.sisprod.view.Product.AddProduct', {
    override: 'sisprod.view.Product.AddProduct',
    title: 'Agregar Producto',
    messages: {
        productNameLabel: 'Nombre',
        productCodeLabel: 'Codigo',
        partNumberLabel: 'Número de Parte',
        stockLabel: 'Stock',
        priceLabel: 'Precio',
        storeLabel: 'Almacen',
        moneyLabel: 'Unidad Monetaria',
        productTypeLabel: 'Tipo de Producto',
        measureUnitLabel: 'Unid. de Medida'
    }
});
Ext.define('locale.es.sisprod.view.Product.UpdateProduct', {
    override: 'sisprod.view.Product.UpdateProduct',
    title: 'Editar Producto',
    messages: {
        productNameLabel: 'Nombre',
        productCodeLabel: 'Codigo',
        partNumberLabel: 'Número de Parte',
        stockLabel: 'Stock',
        priceLabel: 'Precio',
        storeLabel: 'Almacen',
        moneyLabel: 'Unidad Monetaria',
        productTypeLabel: 'Tipo de Producto',
        measureUnitLabel: 'Unid. de Medida'
    }
});
Ext.define('locale.es.sisprod.view.Product.ListProduct', {
    override: 'sisprod.view.Product.ListProduct',
    listTitle: 'Listado de Materiales',
    messages: {
        idProductHeader: 'ID Producto',
        productNameHeader: 'Producto',
        productCodeHeader: 'Codigo',
        partNumberHeader: 'Número de Parte',
        stockHeader: 'Stock',
        productTypeIdHeader: 'ID Tipo',
        productTypeNameHeader: 'Tipo',
        priceHeader: 'Precio',
        storeHeader: 'Almacen',
        measureUnitIdHeader: 'ID Unid. de Medida',
        measureUnitNameHeader: 'Unid. de Medida'
    }
});
Ext.define('locale.es.sisprod.view.Customer.ListCustomer', {
    override: 'sisprod.view.Customer.ListCustomer',
    listTitle: 'Listado de Clientes',
    messages: {
        idCustomerHeader: 'ID de Cliente',
        entityIdHeader: 'ID de Entidad',
        idActivityTypeHeader: 'ID de Actividad',
        idActivityTypeNameHeader: 'Actividad',
        entityRucHeader: 'RUC',
        isCompanyHeader: 'Es Empresa',
        entityNameHeader: 'Cliente',
        adressHeader: 'Direccion',
        phoneHeader: 'Telefono',
        emailHeader: 'Email',
        imageHeader: 'Foto'
    }
});
Ext.define('locale.es.sisprod.view.Customer.AddCustomer', {
    messages: {
        idCustomerHeader: 'ID de Cliente',
        entityIdHeader: 'ID de Entidad',
        idActivityTypeHeader: 'ID de Actividad',
        idActivityTypeNameHeader: 'Actividad',
        entityRucHeader: 'RUC',
        isCompanyHeader: 'Es Empresa',
        entityNameHeader: 'Cliente',
        adressHeader: 'Direccion',
        phoneHeader: 'Telefono',
        emailHeader: 'Email',
        imageHeader: 'Foto'
    }
});
Ext.define('locale.es.sisprod.view.Customer.AddCustomer', {
    override: 'sisprod.view.Customer.AddCustomer',
    title: 'Agregar Cliente',
    messages: {
        isCompanyLabel: 'Es Empresa',
        companyNameLabel: 'Empresa',
        bloodGroupLabel: 'Grupo Sanguineo',
        documentTypeLabel: 'Tipo de Documento',
        documentNumberLabel: 'Número de Documento',
        maternalSurnameLabel: 'Apellido Materno',
        paternalSurnameLabel: 'Apellido Paterno',
        personNameLabel: 'Nombres',
        activityTypeLabel: 'Tipo de Actividad',
        addressLabel: 'Direccion',
        emailLabel: 'E-mail',
        imageLabel: 'Foto',
        phoneLabel: 'Telefono',
        digitalSignatureLabel: 'Imagen de Firma'
    }
});
Ext.define('locale.es.sisprod.view.Customer.UpdateCustomer', {
    override: 'sisprod.view.Customer.UpdateCustomer',
    title: 'Editar Cliente',
    messages: {
        isCompanyLabel: 'Es Empresa',
        companyNameLabel: 'Empresa',
        bloodGroupLabel: 'Grupo Sanguineo',
        documentTypeLabel: 'Tipo de Documento',
        documentNumberLabel: 'Número de Documento',
        maternalSurnameLabel: 'Apellido Materno',
        paternalSurnameLabel: 'Apellido Paterno',
        personNameLabel: 'Nombres',
        activityTypeLabel: 'Tipo de Actividad',
        addressLabel: 'Direccion',
        emailLabel: 'E-mail',
        imageLabel: 'Foto',
        phoneLabel: 'Telefono',
        digitalSignatureLabel: 'Imagen de Firma'
    }
});
Ext.define('locale.es.sisprod.controller.CustomerController', {
    override: 'sisprod.controller.CustomerController',
    messages: {
        customerAlreadyRegisterError: 'Ya existe un cliente registrado con el Número de RUC',
        customerAlreadyRegisterAndInactiveError: 'Ya existe un cliente registrado con el Número de RUC, Cliente Inactivo',
        noValidRuc: 'Formato de RUC incorrecto',
        rucAlreadyRegister: 'El numero de RUC ya esta registrado',
        wrongFormatError: 'Verifique el archivo.Solo se aceptan imagenes con las sgtes extensiones: {0}'
    }
});

Ext.define('locale.es.sisprod.view.Position.ListPosition', {
    override: 'sisprod.view.Position.ListPosition',
    listTitle: 'Listado de Cargos',
    messages: {
        headers: {
            idPosition: 'ID',
            externalId: 'ID Externo',
            positionName: 'Nombre'
        }
    }
});

Ext.define('locale.es.sisprod.view.Position.AddPosition', {
    override: 'sisprod.view.Position.AddPosition',
    title: 'Agregar Cargo',
    messages: {
        labels: {
            externalId: 'ID Externo',
            positionName: 'Nombre'
        }
    }
});

Ext.define('locale.es.sisprod.view.Position.UpdatePosition', {
    override: 'sisprod.view.Position.UpdatePosition',
    title: 'Editar Cargo',
    messages: {
        labels: {
            externalId: 'ID Externo',
            positionName: 'Nombre'
        }
    }
});

Ext.define('locale.es.sisprod.view.DependencyLevel.ListDependencyLevel', {
    override: 'sisprod.view.DependencyLevel.ListDependencyLevel',
    listTitle: 'Listado de Tipos de Áreas',
    messages: {
        headers: {
            idDependencyLevel: 'ID',
            externalId: 'ID Externo',
            dependencyLevelName: 'Tipo de área'
        }
    }
});

Ext.define('locale.es.sisprod.view.DependencyLevel.AddDependencyLevel', {
    override: 'sisprod.view.DependencyLevel.AddDependencyLevel',
    title: 'Agregar Tipo de Área',
    messages: {
        labels: {
            externalId: 'ID Externo',
            dependencyLevelName: 'Tipo de área'
        }
    }
});

Ext.define('locale.es.sisprod.view.DependencyLevel.UpdateDependencyLevel', {
    override: 'sisprod.view.DependencyLevel.UpdateDependencyLevel',
    title: 'Editar Tipo de Área',
    messages: {
        labels: {
            externalId: 'ID Externo',
            dependencyLevelName: 'Tipo de área'
        }
    }
});


Ext.define('locale.es.sisprod.view.Dependency.ListDependency', {
    override: 'sisprod.view.Dependency.ListDependency',
    listTitle: 'Listado de Areas',
    messages: {
        headers: {
            idDependency: 'ID',
            externalId: 'ID Externo',
            dependencyName: 'Nombre',
            dependencyAcronym: 'Acrónimo',
            idDependencyParent: 'Id Área',
            dependencyParentName: 'Área',
            idDependencyLevel: 'ID Tipo de Área',
            dependencyLevel: 'Tipo de Área'
        }
    }
});

Ext.define('locale.es.sisprod.view.Dependency.AddDependency', {
    override: 'sisprod.view.Dependency.AddDependency',
    title: 'Agregar Área',
    messages: {
        labels: {
            externalId: 'ID Externo',
            dependencyName: 'Nombre',
            dependencyAcronym: 'Acrónimo',
            dependencyLevel: 'Tipo de área',
            dependencyParent: 'Área'
        },
        alerts: {
            firstSelectADependencyLevel: 'Seleccione primero un tipo de área'
        },
        emptyText: {
            dependencyLevelEmptyText: 'Tipo de área...',
            dependencyEmptyText: 'Ingrese un área ...'
        }
    }
});

Ext.define('locale.es.sisprod.view.Dependency.UpdateDependency', {
    override: 'sisprod.view.Dependency.UpdateDependency',
    title: 'Editar Área',
    messages: {
        labels: {
            externalId: 'ID Externo',
            dependencyName: 'Nombre',
            dependencyAcronym: 'Acrónimo',
            dependencyLevel: 'Tipo de área',
            dependencyParent: 'Área'
        },
        alerts: {
            firstSelectADependencyLevel: 'Seleccione primero un tipo de área'
        },
        emptyText: {
            dependencyLevelEmptyText: 'Tipo de área...',
            dependencyEmptyText: 'Ingrese un área ...'
        }
    }
});

Ext.define('locale.es.sisprod.view.Company.ListCompany', {
    override: 'sisprod.view.Company.ListCompany',
    listTitle: 'Listado de Areas',
    messages: {
        headers: {
            idCompany: 'ID',
            externalId: 'ID Externo',
            companyName: 'Empresa',
            entityRuc: 'RUC',
            address: 'Dirección',
            email: 'email',
            isAuthorized: 'Autorizado'
        }
    }
});
Ext.define('locale.es.sisprod.view.Employee.ListEmployee', {
    override: 'sisprod.view.Employee.ListEmployee',
    listTitle: 'Listado de Empleados',
    messages: {
        headers: {
            idEmployee: 'ID',
            idPerson: 'ID Persona',
            entityName: 'Empresa',
            paternalSurname: 'Apellido Paterno',
            maternalSurname: 'Apellido Materno',
            personName: 'Nombre',
            documentTypeAcronym: 'Tipo Doc.',
            documentNumber: 'Número de Doc.',
            bloodGroupName: 'Grupo Sanguineo',
            dependencyName: 'Área',
            positionName: 'Cargo',
            email: 'email',
            digitalSignature: 'Imagen Firma'
        }
    }
});

Ext.define('locale.es.sisprod.view.ConfigParam.AddConfigParam', {
    override: 'sisprod.view.ConfigParam.AddConfigParam',
    title: 'Configuracion Módulo P & P',
    messages: {
        formTitle: 'Configuracion Módulo P & P',
        saveButtonText: 'Guardar',
        closeText: 'Cerrar'
    }
});

Ext.define('locale.es.sisprod.view.ConfigParam.AddGeneralSystemConfigParam', {
    override: 'sisprod.view.ConfigParam.AddGeneralSystemConfigParam',
    title: 'Configuración Módulo de Producción',
    messages: {
        formTitle: 'Configuración Módulo de Producción',
        saveButtonText: 'Guardar',
        closeText: 'Cerrar'
    }
});
Ext.define('locale.es.sisprod.view.ConfigParam.AddProductionSystemConfigParam', {
    override: 'sisprod.view.ConfigParam.AddProductionSystemConfigParam',
    title: 'Configuración General del Sistema',
    messages: {
        formTitle: 'Configuración General del Sistema',
        saveButtonText: 'Guardar',
        closeText: 'Cerrar'
    }
});

Ext.define('locale.es.sisprod.controller.WorkTemplateController', {
    override: 'sisprod.controller.WorkTemplateController',
    messages: {
        alertCaption: 'Mensaje',
        noActivityRegister: 'Agregue al menos una Actividad',
        emptyActivities: 'Hay actividades con horas hombre y máquina 0. Por favor, verifíquelas!'
    }
});
Ext.define('locale.es.sisprod.view.WorkTemplate.ActivityOtGrid', {
    override: 'sisprod.view.WorkTemplate.ActivityOtGrid',
    messages: {
        activityOtTitle: "Lista de Actividades",
        manHoursLabel: 'Horas Hombre',
        machineHoursLabel: 'Horas Maquina',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta Actividad ya a sido agregada',
        noActivityOtToAddError: 'Seleccione una actividad',
        noActivityOtSelectToRemoveError: 'Seleccione la actividad a Quitar',
        activityOtEmptyText: 'Escriba la actividad',
        confirmText: '¿Desea agregar {0} como una nueva actividad?'
    }
});
Ext.define('locale.es.sisprod.view.WorkTemplate.EquipmentGrid', {
    override: 'sisprod.view.WorkTemplate.EquipmentGrid',
    messages: {
        equipmentTitle: "Lista de Equipos",
        quantityLabel: 'Cantidad',
        equipmentLabel: 'Equipo',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        alertCaption: 'Mensaje',
        duplicateEquipmentError: 'Este Equipo ya a sido registrado',
        noEquipmentToAddError: 'Seleccione un equipo',
        noEquipmentSelectToRemoveError: 'Seleccione el equipo a eliminar'
    }
});
Ext.define('locale.es.sisprod.view.WorkTemplate.ProductGrid', {
    override: 'sisprod.view.WorkTemplate.ProductGrid',
    messages: {
        productTitle: "Lista de Materiales",
        quantityLabel: 'Cantidad',
        productLabel: 'Material',
        productCodeLabel: 'Codigo',
        measureUnitLabel: 'Und. de Medida',
        priceLabel: 'Precio',
        stockLabel: 'Stock',
        storeLabel: 'Almacen',
        idMeasureUnitLabel: 'ID Unidad de Medida',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'Este Material ya a sido registrado',
        noProductToAddError: 'Seleccione un material',
        noProductSelectToRemoveError: 'Seleccione el material a eliminar',
        productEmptyText: 'Escribe un Material'
    }
});
Ext.define('locale.es.sisprod.view.WorkTemplate.AddWorkTemplate', {
    override: 'sisprod.view.WorkTemplate.AddWorkTemplate',
    title: 'Agregar Plantilla',
    messages: {
        workTemplateNameLabel: "Nombre",
        workCategoryLabel: "Categoria de Trabajo",
        workCategoryDetailLabel: "Tipo de Trabajo",
        workTypeEmptyText: 'Escriba un tipo de Trabajo',
        manHoursLabel: "Horas Hombre",
        machineHoursLabel: "Horas Maquina",
        alertMessage: 'Mensaje',
        selectWorkCategory: 'Seleccione una Categoria de Trabajo'
    }
});
Ext.define('locale.es.sisprod.view.WorkTemplate.UpdateWorkTemplate', {
    override: 'sisprod.view.WorkTemplate.UpdateWorkTemplate',
    title: 'Editar Plantilla',
    messages: {
        workTemplateNameLabel: "Nombre",
        workCategoryLabel: "Categoria de Trabajo",
        workCategoryDetailLabel: "Tipo de Trabajo",
        workTypeEmptyText: 'Escriba un tipo de Trabajo',
        manHoursLabel: "Horas Hombre",
        machineHoursLabel: "Horas Maquina",
        alertMessage: 'Mensaje',
        selectWorkCategory: 'Seleccione una Categoria de Trabajo'
    }
});
Ext.define('locale.es.sisprod.view.WorkTemplate.ListWorkTemplate', {
    override: 'sisprod.view.WorkTemplate.ListWorkTemplate',
    listTitle: 'Listado de Plantillas',
    messages: {
        idWorkTemplateHeader: "ID Plantilla",
        workTemplateNameHeader: "Plantilla",
        manHoursHeader: "Horas Man",
        machineHoursHeader: "Horas Maquina",
        workCategoryNameHeader: "Categoria de Trabajo",
        idWorkCategoryDetailHeader: "Work Category Detail ID",
        workCategoryDetailNameHeader: "Tipo de Trabajo"
    }
});

/**
 * System User Messages
 */
Ext.define("Ext.locale.es.sisprod.controller.SystemUserController", {
    override: "sisprod.controller.SystemUserController",
    messages: {
        msgSelectGroup: 'Seleccione al menos un grupo!',
        resetPasswordConfirmationMessage: '¿Está seguro de resetear la contraseña de "{0}"?',
        changePasswordConfirmationMessage: '¿Está seguro de cambiar su contraseña?'
    }
});
Ext.define("Ext.locale.es.sisprod.view.SystemUser.ChangePasswordLoggedSystemUser", {
    override: "sisprod.view.SystemUser.ChangePasswordLoggedSystemUser",
    messages: {
        labels: {
            currentPassword : 'Contraseña actual',
            newPassword : 'Contraseña nueva',
            confirmNewPassword : 'Confirmar contraseña nueva',
            btnChangePassword : 'Cambiar contraseña',
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.SystemUser.ListSystemUser", {
    override: "sisprod.view.SystemUser.ListSystemUser",
    listTitle: 'Listado de Usuarios',
    messages: {
        formFields: {
            productionPeriodDate: "Usuarios"
        },
        columnHeaders: {
            id: "Identificador de usuario",
            username: "Usuario",
            groupsString: "Grupos",
            enabled: "Habilitado",
            name: "Nombre",
            multiSession: "Multi Sesion",
            expirationDate: "Fecha de Expiracion",
            resetPasswordAndSendToMailButton:"Resetear contraseña"
        },
        tooltips:{
            resetPasswordAndSendToMailButton:"Resetear contraseña aleatoriamente y enviar por correo"
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.SystemUser.AddSystemUser", {
    override: "sisprod.view.SystemUser.AddSystemUser",
    title: 'Agregar Usuario',
    messages: {
        formFields: {
            wellParametersFieldSet: "Agregar Usuario",
            systemUserType: "Tipo de Usuario",
            userNameLabel: 'Cuenta',
            passwordLabel: 'Contraseña',
            multiSessionLabel: 'Sesion Multiple',
            expirationDateLabel: 'Fecha de Expiracion',
            userTypeLabel: 'Tipo de Usuario',
            entityLabel: 'Usuario',
            msgEntity: 'Ingrese Usuario',
            msgTitle: 'Grupos',
            msgGroupName: 'Nombre'
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.SystemUser.UpdateSystemUser", {
    override: "sisprod.view.SystemUser.UpdateSystemUser",
    title: 'Editar Usuario',
    messages: {
        formFields: {
            wellParametersFieldSet: "Actualizar Usuario",
            userNameLabel: 'Cuenta',
            passwordLabel: 'Contraseña',
            multiSessionLabel: 'Sesion Multiple',
            enabledLabel:'Habilitado',
            expirationDateLabel: 'Fecha de Expiracion',
            userTypeLabel: 'Tipo de Usuario',
            entityLabel: 'Usuario',
            msgEntity: 'Ingrese Usuario',
            msgTitle: 'Grupos',
            msgGroupName: 'Nombre'
        }
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrder.ListWorkOrdersByWorkRequest", {
    override: "sisprod.view.WorkOrder.ListWorkOrdersByWorkRequest",
    messages: {
        alertMessage: 'Mensaje',
        selectWorkOrder: 'Seleccione un orden de Trabajo...',
        workOrderCantNoBeExecute: 'Esta orden no puede pasar a ejecucion',
        gridTitle: 'Ordenes de Trabajo',
        idWorkOrderLabel: 'Identificador',
        workOrderFullNumberLabel: 'N°',
        descriptionLabel: 'Descripcion',
        workOrderDateLabel: 'Fecha de Orden',
        scheduledStartDateLabel: 'Inicio Planificado',
        scheduledEndDateLabel: 'Fin Planificado',
        executionStartDateLabel: 'Inicio de Ejecucion',
        executionEndDateLabel: 'Fin de Ejecucion',
        sectorNameLabel: 'Sector',
        workShopLabel: 'Taller',
        workShopCoordinatorLabel: 'Coordinador',
        quadrilleLabel: 'Cuadrilla',
        taskSchedulerLabel: 'Planificador',
        workCategoryLabel: 'Categoria de Trabajo',
        workCategoryDetailLabel: 'Tipo de Trabajo',
        locationLabel: 'Ubicacion',
        workStatusLabel: 'Estado',
        annulledWorkOrderLabel: 'Anulado',
        manHoursLabel: 'Horas Hombre',
        machineHoursLabel: 'Horas Maquina',
        executionLabel: 'Ejecutar',
        printLabel: 'Imprimir'
    }
});
Ext.define('locale.es.sisprod.view.UserType.AddUserType', {
    override: 'sisprod.view.UserType.AddUserType',
    title: 'Agregar Tipo de Usuario',
    messages: {
        isUserTypeDefaultLabel: 'Usuario por Defecto',
        userTypeNameLabel: 'Nombre'

    }
});
Ext.define('locale.es.sisprod.view.UserType.UpdateUserType', {
    override: 'sisprod.view.UserType.UpdateUserType',
    title: 'Editar Tipo de Usuario',
    messages: {
        isUserTypeDefaultLabel: 'Usuario por Defecto',
        userTypeNameLabel: 'Nombre'
    }
});
Ext.define('locale.es.sisprod.view.UserType.ListUserType', {
    override: 'sisprod.view.UserType.ListUserType',
    listTitle: 'Listado de Tipos de Usuario',
    messages: {
        idUserTypeHeader: 'ID Tipo de Usuario',
        userTypeNameHeader: 'Tipo de Usuario',
        isDefaultUserTypeHeader: 'Usuario por Defecto'
    }
});
Ext.define('locale.es.sisprod.view.EvidenceDocumentType.AddEvidenceDocumentType', {
    override: 'sisprod.view.EvidenceDocumentType.AddEvidenceDocumentType',
    title: 'Agregar Tipo de Evidencia',
    messages: {
        isRequeridLabel: 'Requerido',
        evidenceDocumentTypeNameLabel: 'Nombre',
        evidenceDocumentTypeCodeLabel: 'Codigo',
        directoryNameLabel: 'Directorio'
    }
});
Ext.define('locale.es.sisprod.view.EvidenceDocumentType.UpdateEvidenceDocumentType', {
    override: 'sisprod.view.EvidenceDocumentType.UpdateEvidenceDocumentType',
    title: 'Editar Tipo de Evidencia',
    messages: {
        isRequeridLabel: 'Requerido',
        evidenceDocumentTypeNameLabel: 'Nombre',
        evidenceDocumentTypeCodeLabel: 'Codigo',
        directoryNameLabel: 'Directorio'
    }
});
Ext.define('locale.es.sisprod.view.EvidenceDocumentType.ListEvidenceDocumentType', {
    override: 'sisprod.view.EvidenceDocumentType.ListEvidenceDocumentType',
    listTitle: 'Listado de Tipos de Evidencia',
    messages: {
        idEvidenceDocumentTypeHeader: "ID",
        isRequiredHeader: "Requerido",
        evidenceDocumentTypeNameHeader: "Nombre",
        evidenceDocumentTypeCodeHeader: "Codigo",
        directoryNameHeader: "Directorio"
    }
});

Ext.define('locale.es.sisprod.view.UnperformedReason.AddUnperformedReason', {
    override: 'sisprod.view.UnperformedReason.AddUnperformedReason',
    title: 'Agregar Motivo de no Ejecucion',
    messages: {
        unperformedReasonNameLabel: 'Nombre',
        unperformedReasonCodeLabel: 'Codigo',
        formFields: {
            unPerformedReasonNameLabel: 'Nombre',
            unperformedReasonCodeLabel: 'Codigo'
        }

    }
});
Ext.define('locale.es.sisprod.view.UnperformedReason.UpdateUnperformedReason', {
    override: 'sisprod.view.UnperformedReason.UpdateUnperformedReason',
    title: 'Editar Motivo de no Ejecucion',
    messages: {
        unPerformedReasonNameLabel: 'Nombre',
        unPerformedReasonCodeLabel: 'Codigo'
    }
});
Ext.define('locale.es.sisprod.view.UnperformedReason.ListUnperformedReason', {
    override: 'sisprod.view.UnperformedReason.ListUnperformedReason',
    listTitle: 'Listado de Motivo de no Ejecucion',
    messages: {
        idUnperformedReasonHeader: 'Id',
        UnperformedReasonNameHeader: 'Nombre',
        UnperformedReasonCodeHeader: 'Codigo'
    }
});


// Ejecución de orden de trabajo:
Ext.define('Ext.locale.es.sisprod.view.WorkOrderExecution.WorkOrderExecutionForm', {
    override: 'sisprod.view.WorkOrderExecution.WorkOrderExecutionForm',
    title: 'Ejecución de orden de trabajo',
    messages: {
        labels: {
            workRequestNumber: 'N° de pedido de trabajo',
            workRequestFullNumber: 'N° de Pedido.de trabajo',
            workOrderDate: 'Fecha de generación de orden de trabajo',
            workOrderNumber: 'N° de orden de trabajo',
            workRequestSource: 'Origen de pedido de trabajo',
            generalData: 'Datos Generales',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            locationName: 'Ubicación',
            workRequestSourceName: 'Origen Pedido',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Planificador',
            workCategoryName: 'Categoria Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            scheduledDate: 'Fecha Planificación',
            scheduledStartDate: 'Inicio',
            scheduledEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            scheduling: 'Planificación',
            workOrderService: 'Orden de Servicio',
            plannedHours: 'Horas planificadas',
            peformedHours: 'Horas ejecutadas',
            activityTab: 'Actividades',
            productTab: 'Materiales',
            partialSave: 'Guardar Parcialmente',
            closeOrder: 'Concluir Ejecución',
            executeData: 'Ejecución',
            percentageUseResources: 'Porcentaje de uso de recursos',
            percentageAdvance: 'Porcentaje de avance total',
            executionDates: 'Fecha de Ejecución',
            executionData: 'Datos de Ejecución',
            comment: 'Comentario',
            responsibleOfInstallation: 'Responsable de la Instalación'
        },
        validations: {
            selectSector: 'Primero seleccione un sector...',
            selectWorkCategory: 'Primero seleccione una categoría de trabajo...',
            selectWorkShop: 'Primero seleccione un taller...'
        },
        loadTemplateText: 'Cargar Plantilla',
        workRequestData: 'Datos de Pedido',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        quadrilleData: 'Cuadrilla',
        evidenceData: 'Archivos de Evidencia'
    }
});

Ext.define('Ext.locale.es.sisprod.view.WorkOrderClosable.WorkOrderClosableForm', {
    override: 'sisprod.view.WorkOrderClosable.WorkOrderClosableForm',
    title: 'Consultar Orden de Trabajo',
    messages: {
        labels: {
            workRequestNumber: 'N° de pedido de trabajo',
            workRequestFullNumber: 'N° de Pedido.de trabajo',
            workOrderDate: 'Fecha de generación de orden de trabajo',
            workOrderNumber: 'N° de orden de trabajo',
            workRequestSource: 'Origen de pedido de trabajo',
            generalData: 'Datos Generales',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            locationName: 'Ubicación',
            workRequestSourceName: 'Origen Pedido',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Planificador',
            workCategoryName: 'Categoria Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            scheduledDate: 'Fecha Planificación',
            scheduledStartDate: 'Inicio',
            scheduledEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            scheduling: 'Planificación',
            workOrderService: 'Orden de Servicio',
            plannedHours: 'Horas planificadas',
            peformedHours: 'Horas ejecutadas',
            activityTab: 'Actividades',
            productTab: 'Materiales',
            saveObservation: 'Guardar Observacion',
            closeOrder: 'Validar Orden',
            executeData: 'Ejecución',
            percentageUseResources: 'Porcentaje de uso de recursos',
            percentageAdvance: 'Porcentaje de avance total',
            comment: 'Comentario',
            lot: 'Lote',
            sector: 'Sector',
            equimentType: 'Tipo Equipo',
            equiment: 'Equipo',
            reasonOder: 'Motivo de Orden'
        },
        validations: {
            selectSector: 'Primero seleccione un sector...',
            selectWorkCategory: 'Primero seleccione una categoría de trabajo...',
            selectWorkShop: 'Primero seleccione un taller...'
        },
        loadTemplateText: 'Cargar Plantilla',
        workRequestData: 'Datos de Pedido',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        quadrilleData: 'Cuadrilla',
        evidenceData: 'Archivos de Evidencia',
        comment: 'Comentario'
    }
});

// SystemScheduledTask
Ext.define('locale.es.sisprod.view.SystemScheduledTask.ListSystemScheduledTask', {
    override: 'sisprod.view.SystemScheduledTask.ListSystemScheduledTask',
    listTitle: 'Tareas programadas del sistema',
    messages: {
        columnHeaders: {
            id: 'Identificador de tarea',
            taskDescription: 'Descripción',
            lastExecutionDate: 'Última ejecución',
            activeTask: 'Activa',
            cronExpression: 'Expresión cron'
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.SystemScheduledTask.UpdateSystemScheduledTask", {
    override: "sisprod.view.SystemScheduledTask.UpdateSystemScheduledTask",
    title: 'Editar tarea programada',
    messages: {
        formFields: {
            taskDescription: 'Descripción',
            activeTask: 'Activa',
            cronExpression: 'Expresión cron'
        }
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrder.SaveTemplateWindow", {
    override: "sisprod.view.WorkOrder.SaveTemplateWindow",
    title: 'Guardar Recursos en una Plantilla',
    messages: {
        workTemplateText: 'Nombre de Plantilla',
        newWorkTemplateText: 'Nueva Plantilla'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderForCoordinator.ListWorkOrderForCoordinator", {
    override: "sisprod.view.WorkOrderForCoordinator.ListWorkOrderForCoordinator",
    listTitle: "Listado de Ordenes de Trabajo",
    messages: {
        headers: {
            idWorkOrder: 'ID',
            workRequestFullNumber: 'Pedido de Trabajo',
            sectorName: 'Sector',
            taskSchedulerName: 'Planificador',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            locationName: 'Ubicación',
            workOrderStatusName: 'Estado',
            workOrderDate: 'Fecha de Reistro',
            workOrderFullNumber: 'Número',
            scheduledStartDate: 'Fecha de Inicio planificada',
            scheduledEndDate: 'Fecha de Fin planificada',
            executionStartDate: 'Fecha de Inicio de ejecución',
            executionEndDate: 'Fecha de Fín de ejecucíon',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            description: 'Descripción',
            workShopName: 'Taller',
            quadrilleName: 'Quadrilla',
            worshopCoordinatorName: 'Coordinador',
            equipmentName: 'Equipo',
            print: 'Imprimir',
            attentionMaximumDate: 'Fecha Máxima de Atención',
            workRequestSourceName: 'Origen de Pedido',
            percentageUsageResources: 'Uso de Recursos (%)',
            percentageAdvance: 'Avance (%)',
            isDirect: 'Directa'
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderForTaskGeneralScheduler.ListWorkOrderForTaskGeneralScheduler", {
    override: "sisprod.view.WorkOrderForTaskGeneralScheduler.ListWorkOrderForTaskGeneralScheduler",
    listTitle: "Listado de Ordenes de Trabajo",
    messages: {
        headers: {
            idWorkOrder: 'ID',
            workRequestFullNumber: 'Pedido de Trabajo',
            sectorName: 'Sector',
            taskSchedulerName: 'Planificador',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            locationName: 'Ubicación',
            workOrderStatusName: 'Estado',
            workOrderDate: 'Fecha de Reistro',
            workOrderFullNumber: 'Número',
            scheduledStartDate: 'Fecha de Inicio planificada',
            scheduledEndDate: 'Fecha de Fin planificada',
            executionStartDate: 'Fecha de Inicio de ejecución',
            executionEndDate: 'Fecha de Fín de ejecucíon',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            description: 'Descripción',
            workShopName: 'Taller',
            quadrilleName: 'Quadrilla',
            worshopCoordinatorName: 'Coordinador',
            equipmentName: 'Equipo',
            print: 'Imprimir',
            attentionMaximumDate: 'Fecha Máxima de Atención',
            workRequestSourceName: 'Origen de Pedido',
            direct: 'Directa'
        },
        closeWorkOrder: 'Validar'
    }
});
Ext.define("Ext.locale.es.sisprod.controller.WorkOrderForCoordinatorController", {
    override: "sisprod.controller.WorkOrderForCoordinatorController",
    messages: {
        workOrderCantNoBeExecute: 'La orden no Puede Ser Ejecutada',
        selectWorkOrder: 'Seleccione una Orden de Trabajo',
        workOrderNumber: 'N° de Orden de Trabajo'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderExecution.ActivityExecutionOtGrid", {
    override: "sisprod.view.WorkOrderExecution.ActivityExecutionOtGrid",
    messages: {
        activityOtTitle: "Actividades Planificadas",
        manHoursLabel: 'H. H.',
        machineHoursLabel: 'H. M',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta actividad ya fue agregada ',
        noActivityOtToAddError: 'Seleccione una actividad',
        noActivityOtSelectToRemoveError: 'Seleccione una actividad para eliminar',
        activityOtEmptyText: 'Escriba una actividad',
        confirmText: '¿Desea agregar {0} como una nueva actividad?',
        performedManHoursLabel: 'E. H. H.',
        performedMachineHoursLabel: 'E. H. M.',
        idWorkOrderActivity: 'Id de Actividad de Orden de trabajo',
        idActivityOt: 'Id de Actividad',
        unperformedReason: 'Motivo de no ejecución',
        isPlanned: 'Planificada',
        isPerformed: 'Ejecutada',
        alertNoRemovePlannedActivity: 'No se puede eliminar una actividad planificada!',
        tipDetail: 'Detalle de Actividad',
        alertNoAddDetail: '¡No puede agregar detalle a una actividad no ejecutada!',
        inputStartDateForDetail: 'Ingrese Fecha de Inicio para poder ingresar el detalle de atividades!'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.ActivityClosableOtGrid", {
    override: "sisprod.view.WorkOrderClosable.ActivityClosableOtGrid",
    messages: {
        activityOtTitle: "Actividades Planificadas",
        manHoursLabel: 'H. H.',
        machineHoursLabel: 'H. M',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta actividad ya fue agregada ',
        noActivityOtToAddError: 'Selecccione una Actvidad',
        noActivityOtSelectToRemoveError: 'Seleccione una actividad para eliminar',
        activityOtEmptyText: 'Escriba una actividad',
        confirmText: '¿Desea agregar {0} como una nueva actividad?',
        performedManHoursLabel: 'E. H. H.',
        performedMachineHoursLabel: 'E. H. M.',
        idWorkOrderActivity: 'Id de Actividad de Orden de trabajo',
        idActivityOt: 'Id de Actividad',
        unperformedReason: 'Motivo de no ejecución',
        isPlanned: 'Planificada',
        isPerformed: 'Ejecutada',
        alertNoRemovePlannedActivity: 'No se puede eliminar una actividad planificada!'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderExecution.NewActivityGrid", {
    override: "sisprod.view.WorkOrderExecution.NewActivityGrid",
    messages: {
        activityOtTitle: "Actividades no planificadas",
        manHoursLabel: 'H. H.',
        machineHoursLabel: 'H. M.',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta actividad ya fue agregada ',
        noActivityOtToAddError: 'Seleccione una Actividad',
        noActivityOtSelectToRemoveError: 'Seleccione una actividad para eliminar',
        activityOtEmptyText: 'Escriba una actividad',
        confirmText: '¿Desea agregar {0} como una nueva actividad?',
        performedManHoursLabel: 'E. H. H.',
        performedMachineHoursLabel: 'E. H. M.',
        idWorkOrderActivity: 'Id de Actividad de Orden de trabajo',
        idActivityOt: 'Id de Actividad',
        isPlanned: 'Planificada',
        alertActivityPlanned: 'Esta actividad ya fue planificada!',
        tipDetail: 'Detalle de Actividad',
        inputStartDateForDetail: '¡Ingrese Fecha de Inicio para poder ingresar detalle de atividades!'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.NewActivityGrid", {
    override: "sisprod.view.WorkOrderClosable.NewActivityGrid",
    messages: {
        activityOtTitle: "Actividades no planificadas",
        manHoursLabel: 'H. H.',
        machineHoursLabel: 'H. M.',
        activityOtLabel: 'Actividad',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateActivityOtError: 'Esta actividad ya fue agregada ',
        noActivityOtToAddError: 'Seleccione una Actividad',
        noActivityOtSelectToRemoveError: 'Seleccione una actividad para eliminar',
        activityOtEmptyText: 'Escriba una actividad',
        confirmText: '¿Desea agregar {0} como una nueva actividad?',
        performedManHoursLabel: 'E. H. H.',
        performedMachineHoursLabel: 'E. H. M.',
        idWorkOrderActivity: 'Id de Actividad de Orden de trabajo',
        idActivityOt: 'Id de Actividad',
        isPlanned: 'Planificada',
        alertActivityPlanned: 'Esta actividad ya fue planificada!'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderExecution.WorkOrderProductGrid", {
    override: "sisprod.view.WorkOrderExecution.WorkOrderProductGrid",
    messages: {
        productTitle: "Materiales no planificados",
        quantityLabel: 'Cantidad',
        productLabel: 'Material',
        measureUnitLabel: 'Unidad de Medida',
        idMeasureUnitLabel: 'Id de unidad de medida',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'El material ya ha sido agregado!',
        noProductToAddError: 'Seleccione un material!',
        productEmptyText: 'Escriba el nombre del material',
        noProductSelectToRemoveError: 'Seleccione materila para eliminar',
        alertProductPlanned: 'El material ya fue planificado!',
        productCode: 'Código',
        priceLabel: 'Precio',
        stockLabel: 'Stock',
        storeLabel: 'Almacen'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.WorkOrderProductGrid", {
    override: "sisprod.view.WorkOrderClosable.WorkOrderProductGrid",
    messages: {
        productTitle: "Materiales no planificados",
        quantityLabel: 'Cantidad',
        productLabel: 'Materiales',
        measureUnitLabel: 'Unidad de Medida',
        idMeasureUnitLabel: 'Id de unidad de medida',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'El material ya ha sido agregado!',
        noProductToAddError: 'Seleccione un material!',
        productEmptyText: 'Escriba el nombre del material',
        noProductSelectToRemoveError: 'Seleccione material para eliminar',
        alertProductPlanned: 'El material ya fue planificado!'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.WorkOrderObservation", {
    override: "sisprod.view.WorkOrderClosable.WorkOrderObservation",
    title: 'Observacion de Orden de Trabajo',
    messages: {
        labels: {
            taskDescription: 'Observar'
        },
        saveObservation: 'Guardar Observacion'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderExecution.WorkOrderScheduledProductGrid", {
    override: "sisprod.view.WorkOrderExecution.WorkOrderScheduledProductGrid",
    messages: {
        productTitle: "Materiales Planificados",
        quantityLabel: 'Cantidad Planificada',
        productLabel: 'Material',
        measureUnitLabel: 'Unidad de Medida',
        idMeasureUnitLabel: 'Id de Unidad de Medida',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'El material ya ha sido agregado!',
        noProductToAddError: 'Seleccione un material!',
        noProductSelectToRemoveError: 'Seleccione material para eliminar',
        productEmptyText: 'Ingrese Material',
        useQuantity: 'Cantidad Usada',
        isUsed: 'Usado',
        productCode: 'Código',
        priceLabel: 'Precio',
        stockLabel: 'Stock',
        storeLabel: 'Almacen'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.WorkOrderScheduledProductGrid", {
    override: "sisprod.view.WorkOrderClosable.WorkOrderScheduledProductGrid",
    messages: {
        productTitle: "Materiales Planificados",
        quantityLabel: 'Cantidad Planificada',
        productLabel: 'Material',
        measureUnitLabel: 'Unidad de Medida',
        idMeasureUnitLabel: 'Id de Unidad de Medida',
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        duplicateProductError: 'El material ya ha sido agregado!',
        noProductToAddError: 'Seleccione un material!',
        noProductSelectToRemoveError: 'Seleccione material para eliminar',
        productEmptyText: 'Ingrese material',
        useQuantity: 'Cantidad Usada',
        isUsed: 'Usado'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderExecution.QuadrilleEmployeeGrid", {
    override: "sisprod.view.WorkOrderExecution.QuadrilleEmployeeGrid",
    messages: {
        employeesTitle: "Trabajadores",
        employeeLabel: "Trabajador",
        employeesFullName: "Nombre Completo",
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        employeeEmptyText: 'Ingrese nombre de Trabajador',
        duplicateEmployeeError: 'Este trabajador ya fue agregado',
        noEmployeeToAddError: 'Seleccione Trabajador'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.QuadrilleEmployeeGrid", {
    override: "sisprod.view.WorkOrderClosable.QuadrilleEmployeeGrid",
    messages: {
        employeesTitle: "Trabajadores",
        employeeLabel: "Trabajador",
        employeesFullName: "Nombre Completo",
        addButtonText: 'Agregar',
        removeButtonText: 'Eliminar',
        alertCaption: 'Mensaje',
        employeeEmptyText: 'Ingrese nombre de Trabajador',
        duplicateEmployeeError: 'Este trabajador ya fue agregado',
        noEmployeeToAddError: 'Seleccione Trabajador'
    }
});

Ext.define("Ext.locale.es.sisprod.view.WorkOrderExecution.EvidenceFilesGrid", {
    override: "sisprod.view.WorkOrderExecution.EvidenceFilesGrid",
    messages: {
        evidenceFilesTitle: "Archivos de Evidencia",
        evidenceNameLabel: "Nombre de Archivo",
        evidenceTypeName: "Tipo de Evidencia",
        uploadButtonText: 'Cargar Evidencia',
        downloadButtonText: 'Descargar',
        removeButtonText: 'Eliminar',
        confirmText: '¿Desea eliminar el archivo {0}?',
        alertMessage: 'Mensaje'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WorkOrderClosable.EvidenceFilesGrid", {
    override: "sisprod.view.WorkOrderClosable.EvidenceFilesGrid",
    messages: {
        evidenceFilesTitle: "Archivos de Evidencia",
        evidenceNameLabel: "Nombre de Archivo",
        evidenceTypeName: "Tipo de Evidencia",
        uploadButtonText: 'Cargar Evidencia',
        downloadButtonText: 'Descargar',
        removeButtonText: 'Eliminar',
        confirmText: '¿Desea eliminar el archivo {0}?',
        alertMessage: 'Mensaje'
    }
});
Ext.define("Ext.locale.es.sisprod.view.EvidenceFile.AddEvidenceFile", {
    override: "sisprod.view.EvidenceFile.AddEvidenceFile",
    title: 'Agregar Evidencia',
    messages: {
        evidenceTypeLabel: 'Tipo de Evidencia',
        fileLabel: 'Archivo'
    }
});

Ext.define("Ext.locale.es.sisprod.controller.WorkOrderExecutionController", {
    override: 'sisprod.controller.WorkOrderExecutionController',
    messages: {
        alertErrorSave: 'Error al guardar datos de ejecución!',
        alertGeneral: 'No puede concluir la ejecucion de la orden de trabajo {0}, si no  se cumplen las siguientes condiciones:',
        alertActivity: 'Al menos debe registrar la ejecución de una actividad (planificada o nueva)',
        alertProduct: 'Al menos debe registrar el uso de un material (planificado o nuevo)',
        alertEmployee: 'Al menos debe registrar un trabajador en la quadrilla',
        msgConfirmComploteOrder: '¿Esta seguro que desea concluir la ejecución de la orden {0}?',
        alertNoFounAllEvidenceTypeRequired: 'Debe registrar por lo menos un documento de evidencia de los siguientes tipos:',
        inputPercentageAdvance: 'Ingresar porcentaje de avance',
        inputExecutionEndDate: 'Ingresar Fecha de Fin de Ejecución',
        alertDetailInValid: '¡Hay ejecuciones de actividad con fecha fuera del rango de ejecución de la orden, proceda a corregir!',
        alertActivitiesInvalid: '¡Hay actividades con ejecuciones fuera del rango del ejecución de la orden, proceda a corregir!',
        alertErrorNow: '¡Hay actividades con ejecuciones mayores a la fecha actual del servidor, proceda a corregir!',
        inputResponsibleOfInstallation: 'Ingrese el Responsable de la Instalación',
        alertExecutionEndDate: '¡La fecha de fin de ejecución no debe ser mayor a la fecha actual del servidor!',
        emptyActivities: 'Hay actividades ejecutadas con horas hombre y máquina 0. Por favor, verifíquelas!'
    }
});

Ext.define("Ext.locale.es.sisprod.controller.WorkOrderClosableController", {
    override: 'sisprod.controller.WorkOrderClosableController',
    messages: {
        titleObserve: 'Observacion de Orden de Trabajo',
        confirmText: 'Esta seguro que desea observar la orden de trabajo {0}?',
        msgConfirmCloseOrder: 'Esta seguro que desea validar la orden de trabajo {0}?',
        titleClose: 'Validar Orden de Trabajo'
    }
});

Ext.define('Ext.locale.es.sisprod.view.WorkRequestPendingApproval.ListWorkRequestPendingApproval', {
    override: 'sisprod.view.WorkRequestPendingApproval.ListWorkRequestPendingApproval',
    listTitle: 'Pedidos de Trabajo Pendientes de Aprobación',
    messages: {
        headers: {
            idWorkRequest: 'ID',
            lotName: 'Lote',
            workRequestSourceName: 'Origen del Pedido',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            dependencyName: 'Dependencia',
            applicantFullName: 'Solicitante',
            recipientFullName: 'Beneficiario',
            locationName: 'Locación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'N° de Petición',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Máxima Fecha de Atención',
            workRequestStatusName: 'Estado'
        },
        approve: 'Aprobar',
        notapprove: 'No Aprobar'
    }
});
Ext.define('Ext.locale.es.sisprod.view.RescheduleWorkRequest.ListRescheduleWorkRequest', {
    override: 'sisprod.view.RescheduleWorkRequest.ListRescheduleWorkRequest',
    listTitle: 'Pedidos de Trabajo Vencidos ',
    messages: {
        headers: {
            idWorkRequest: 'ID',
            lotName: 'Lote',
            workRequestSourceName: 'Origen de Pedido',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            dependencyName: 'Dependencia',
            applicantFullName: 'Solicitante',
            recipientFullName: 'Receptor',
            senderFullName: 'Emisor',
            locationName: 'Ubicacion',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número de Pedido',
            requestDate: 'Fecha de Pedido',
            attentionMaximumDate: 'Fecha Maxima de Atencion',
            workRequestStatusName: 'Estado'
        },
        rescheduleText: 'Reprogramar'
    }
});
Ext.define('Ext.locale.es.sisprod.view.WorkRequest.RescheduleWorkRequest', {
    override: 'sisprod.view.WorkRequest.RescheduleWorkRequest',
    title: 'Reprogramar Pedido de Trabajo',
    messages: {
        labels: {
            workRequestFullNumber: 'Número de Pedido',
            attentionMaximumDate: 'Fecha Max. de Atencion',
            workCategory: 'Categoria de Trabajo',
            workCategoryDetail: 'Tipo de Trabajo',
            sector: 'Sector',
            taskScheduler: 'Planificador'
        },
        alertMessage: 'Mensaje',
        selectWorkCategory: 'Seleccione una Categoria de Trabajo',
        firstSelectSector: 'Primero seleccione el Secto',
        workCategoryDetailEmptyText: 'Escriba un Tipo de Trabajo',
        taskSchedulerEmptyText: 'Escriba el nombre del Empleado ...'
    },
    windowMessages: {
        saveText: 'Reprogramar',
        closeText: 'Cerrar'
    }
});
Ext.define('Ext.locale.es.sisprod.controller.RescheduleWorkRequestController', {
    override: 'sisprod.controller.RescheduleWorkRequestController',
    messages: {
        confirmText: '¿Desea reprogramar {0}?'
    }
});
Ext.define('Ext.locale.es.sisprod.view.WorkRequestPendingApproval.PreviewWorkRequest', {
    override: 'sisprod.view.WorkRequestPendingApproval.PreviewWorkRequest',
    title: 'Descripción del Pedido de trabajo',
    messages: {
        labels: {
            taskDescription: 'Descripción del Trabajo',
            btnApprove: 'Confirmar Aprobación'
        }
    }
});
Ext.define('Ext.locale.es.sisprod.view.Reports.WorkRequestStatusHistoryReports', {
    override: 'sisprod.view.Reports.WorkRequestStatusHistoryReports',
    messages: {
        reportTitle: 'Historial de Estados de Pedido de Trabajo',
        labels: {
            workRequestSource: 'Origen de Pedido',
            workRequestDate: 'Fecha de Pedido',
            statusHistory: 'Paso por el Estado',
            status: 'Estado',
            fromDate: 'Desde',
            toDate: 'Hasta',
            sectorName: 'Sector',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('locale.es.sisprod.controller.ChemicalTreatmentController', {
    override: 'sisprod.controller.ChemicalTreatmentController',
    messages: {
        addError: 'Debe agregar al menos un producto.',
        addCompleteForm: 'Debe completar todos los campos para agregar una nueva fila.'
    }
});

Ext.define('locale.es.sisprod.view.ChemicalTreatmentGoal.ListChemicalTreatmentGoal', {
    override: 'sisprod.view.ChemicalTreatmentGoal.ListChemicalTreatmentGoal',
    messages: {
        idChemicalTreatmentGoal: 'Identificador de objetivo',
        chemicalTreatmentGoalAcronym: 'Acrónimo',
        chemicalTreatmentGoalName: 'Nombre'
    },
    listTitle: 'Lista de objetivos de tratamientos químicos'
});
Ext.define('locale.es.sisprod.view.ChemicalTreatmentGoal.UpdateChemicalTreatmentGoal', {
    override: 'sisprod.view.ChemicalTreatmentGoal.UpdateChemicalTreatmentGoal',
    messages: {
        chemicalTreatmentGoalAcronymLabel: 'Acrónimo',
        chemicalTreatmentGoalNameLabel: 'Nombre'
    },
    title: 'Editar Objetivo'
});
Ext.define('locale.es.sisprod.view.ChemicalTreatmentGoal.AddChemicalTreatmentGoal', {
    override: 'sisprod.view.ChemicalTreatmentGoal.AddChemicalTreatmentGoal',
    messages: {
        chemicalTreatmentGoalAcronymLabel: 'Acrónimo',
        chemicalTreatmentGoalNameLabel: 'Nombre'
    },
    title: 'Agregar objetivo'
});
Ext.define('locale.es.sisprod.view.ChemicalProduct.AddChemicalProduct', {
    override: 'sisprod.view.ChemicalProduct.AddChemicalProduct',
    messages: {
        chemicalProductAcronymLabel: 'Acrónimo',
        chemicalProductNameLabel: 'Nombre',
        chemicalProductMeasureUnitLabel: 'Unidad de medida'
    },
    title: 'Agregar Producto Químico'
});

Ext.define('locale.es.sisprod.view.ChemicalProduct.ListChemicalProduct', {
    override: 'sisprod.view.ChemicalProduct.ListChemicalProduct',
    messages: {
        idChemicalProduct: 'Identificador Producto',
        chemicalProductAcronym: 'Acrónimo',
        chemicalProductName: 'Nombre',
        chemicalProductMeasureUnitId: 'Identificador De Unidad De Medida',
        chemicalProductMeasureUnitName: 'Unidad De Medida'
    },
    listTitle: 'Lista De Productos Químicos'
});
Ext.define('locale.es.sisprod.view.ChemicalProduct.UpdateChemicalProduct', {
    override: 'sisprod.view.ChemicalProduct.UpdateChemicalProduct',
    messages: {
        chemicalProductAcronymLabel: 'Acrónimo',
        chemicalProductNameLabel: 'Nombre',
        chemicalProductMeasureUnitLabel: 'Unidad de medida'
    },
    title: 'Editar Producto Químico'
});

Ext.define("locale.es.sisprod.view.Reports.WorkRequestMasterReports", {
    override: 'sisprod.view.Reports.WorkRequestMasterReports',
    messages: {
        reportTitle: 'Reporte Maestro de Pedidos de Trabajo / Ordenes de Trabajo',
        labels: {
            lot: 'Lote',
            workRequestGenerationDate: 'Fecha Generación Pedido',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});
Ext.define('Ext.locale.es.sisprod.view.WorkOrderExecution.WorkOrderActivityDetail', {
    override: 'sisprod.view.WorkOrderExecution.WorkOrderActivityDetail',
    title: 'Detalle de Actividad',
    messages: {
        activityDate: 'Fecha',
        manHours: 'Horas Hombre',
        machineHours: 'Horas Máquina',
        msgTitle: 'Detalle',
        msgTipAdd: 'Agregar Detalle',
        msgTipRemove: 'Eliminar Detalle',
        leyendValid: 'Fecha dentro del rango de ejecución de la orden de trabajo',
        leyendInvalid: 'Fecha fuera del rango de ejecución de la orden de trabajo',
        description: 'Descripción',
        leyendAlertCurrentDate: 'Fecha mayor a la fecha actual del servidor'

    }
});
Ext.define('Ext.locale.es.sisprod.controller.WorkOrderForTaskGeneralSchedulerController', {
    override: 'sisprod.controller.WorkOrderForTaskGeneralSchedulerController',
    messages: {
        workOrderCantNoBeExecute: 'Esta Orden no puede validarse',
        selectWorkOrder: 'Seleccione una Orden de Trabajo...',
        workOrderNumber: 'Número de Orden de Trabajo'
    }
});
Ext.define('Ext.locale.es.sisprod.controller.WorkRequestPendingApprovalController', {
    override: 'sisprod.controller.WorkRequestPendingApprovalController',
    messages: {
        selectWorkOrder: 'Seleccione un Pedido de Trabajo',
        alertErrorSave: 'Error al guardar los datos',
        disapproveConfirmation: '¿Seguro que desea no aprobar el pedido de trabajo {0}?',
        titleConfirmation: 'Confirmación'
    }
});

Ext.define('locale.es.sisprod.view.ChemicalTreatment.ListChemicalTreatment', {
    override: 'sisprod.view.ChemicalTreatment.ListChemicalTreatment',
    messages: {
        headers: {
            idChemicalTreatment: 'Identificado tratamiento químico',
            chemicalTreatmentDate: 'Fecha',
            well: 'Pozo'
        }
    },
    listTitle: 'Lista de tratamientos químicos'
});

Ext.define('locale.es.sisprod.view.ChemicalTreatment.AddChemicalTreatment', {
    override: 'sisprod.view.ChemicalTreatment.AddChemicalTreatment',
    title: 'Agregar Tratamiento Químico',
    messages: {
        labels: {
            lot: 'Lote',
            well: 'Pozo',
            chemicalProduct: 'Producto Químico',
            Date: 'Fecha',
            dosage: 'Dosificación',
            dosageMeasureUnit: 'Medida De Dosificación',
            treatmentTime: 'Tiempo De Tratamiento',
            timeIdMeasureUnit: 'Medida De Tiempo',
            chemicalTreatmentProductPanel: 'Detalle',
            chemicalTreatmentGoal: 'Objetivo'
        },
        headers: {
        },
        validations: {
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        },
        chemicalTreatmentsFieldSet: 'Tratamiento Químico',
        wellEmptyText: 'Elija un pozo...'
    }
});

Ext.define('locale.es.sisprod.view.ChemicalTreatment.ChemicalTreatmentProductGrid', {
    override: 'sisprod.view.ChemicalTreatment.ChemicalTreatmentProductGrid',
    messages: {
        columnHeaders: {
            chemicalProductName: 'Producto químico',
            chemicalTreatmentGoal: 'Objetivo',
            dosage: 'Dosis',
            dosageMeasureUnit: 'Unidad De Medida Dosis',
            treatmentTime: 'Tiempo De Tratamiento',
            treatmentTimeMeasureUnit: 'Unidad De Medida De Tiempo'
        },
        validation: {
            repeteadItem: 'Existen valores repetidos: {0}'
        },
        buttons: {
            addMessage: 'Agregar',
            deleteMessage: 'Eliminar'
        }
    },
    grow: true,
    title: 'Productos Para Tratamiento Químico'
});

Ext.define('locale.es.sisprod.view.ChemicalTreatment.UpdateChemicalTreatment', {
    override: 'sisprod.view.ChemicalTreatment.UpdateChemicalTreatment',
    title: 'Editar Tratamiento Químico',
    messages: {
        labels: {
            lot: 'Lote',
            well: 'Pozo',
            chemicalProduct: 'Producto Químico',
            Date: 'Fecha',
            dosage: 'Dosificación',
            dosageMeasureUnit: 'Medida De Dosificación',
            treatmentTime: 'Tiempo De Tratamiento',
            timeIdMeasureUnit: 'Medida De Tiempo',
            chemicalTreatmentProductPanel: 'Detalle',
            chemicalTreatmentGoal: 'Objetivo'
        },
        headers: {
        },
        validations: {
        },
        buttons: {
            addMessage: 'Agregar',
            saveMessage: 'Guardar',
            deleteMessage: 'Eliminar'
        },
        chemicalTreatmentsFieldSet: 'Tratamiento Químico',
        wellEmptyText: 'Elija un pozo...'
    }
});

Ext.define('locale.es.sisprod.view.Swab.ListSwab', {
    override: 'sisprod.view.Swab.ListSwab',
    listTitle: 'Lista Swab',
    messages: {
        headers: {
            idSwab: 'Identificador Swab',
            idProductionPeriod: 'Identificador Periodo De Producción',
            registerEmployeeName: 'Empleado Registrador',
            approvedEmployeeName: 'Empleador Aprobador',
            idWell: 'Identificador Pozo',
            well: 'Pozo',
            oil: 'Petróleo',
            oilMeasureUnitName: 'Unidad De Medida De Petróleo',
            oilIdMeasureUnit: 'Identificador Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            waterIdMeasureUnit: 'Identificador Unidad De Medida De Agua',
            idBattery: 'Identificador Bateria',
            batteryName: 'Nombre De Bateria',
            runNumber: 'Número De Corrida',
            pistonDepth: 'Profundidad Pistón',
            stayTime: 'Tiempo De Estancia',
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            entityName: 'Nombre De Entidad',
            entityIdEntity: 'Nombre De Entidad',
            isApproved: 'Aprobado'
        }
    }
});

Ext.define('locale.es.sisprod.view.Swab.UpdateSwab', {
    override: 'sisprod.view.Swab.UpdateSwab',
    title: 'Editar SWAB',
    messages: {
        labels: {
            productionPeriod: 'Periodo',
            well: 'Pozo',
            wellEmptyText: 'Debe seleccionar un pozo...',
            oil: 'Petróleo',
            oilMeasureUnit: 'Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            runNumber: 'Número De Corrida',
            pistonDepth: 'Profundidad Pistón',
            stayTime: 'Tiempo De Estancia',
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            entity: 'Entidad',
            entityEmptyText: 'Debe seleccionar una entidad...',
            lot: 'Lote'
        },
        buttons: {
        }
    }
});

Ext.define('locale.es.sisprod.view.Swab.AddSwab', {
    override: 'sisprod.view.Swab.AddSwab',
    title: 'Agregar SWAB',
    messages: {
        labels: {
            productionPeriod: 'Periodo',
            well: 'Pozo',
            wellEmptyText: 'Debe seleccionar un pozo...',
            oil: 'Petróleo',
            oilMeasureUnit: 'Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            runNumber: 'Número De Corrida',
            pistonDepth: 'Profundidad Pistón',
            stayTime: 'Tiempo De Estancia',
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            entity: 'Entidad',
            entityEmptyText: 'Debe seleccionar una entidad...',
            lot: 'Lote'
        },
        buttons: {
        }
    }
});
Ext.define('locale.es.sisprod.view.OilSale.AddOilSale', {
    override: 'sisprod.view.OilSale.AddOilSale',
    messages: {
        tankLabel: 'Tanque',
        quantityLabel: 'Cantidad'
    },
    title: 'Agregar Venta Petróleo'
});

Ext.define('locale.es.sisprod.view.OilSale.ListOilSale', {
    override: 'sisprod.view.OilSale.ListOilSale',
    messages: {
        idOilSale: 'Identificador Venta Petróleo',
        productionPeriod: 'Periodo De Producción',
        tank: 'Tanque',
        quantity: 'Cantidad',
        measureUnitName: 'Unidad De Medida'
    },
    entityName: '',
    title: '',
    listTitle: 'Lista De Ventas De Petróleo'
});

Ext.define('locale.es.sisprod.view.OilSale.UpdateOilSale', {
    override: 'sisprod.view.OilSale.UpdateOilSale',
    messages: {
        tankLabel: 'Tanque',
        quantityLabel: 'Cantidad'
    },
    title: 'Editar Venta De Petróleo'
});

Ext.define('locale.es.sisprod.view.GasSale.AddGasSale', {
    override: 'sisprod.view.GasSale.AddGasSale',
    messages: {
        saleHoursLabel: 'Horas De Venta',
        quantityLabel: 'Cantidad',
        auditedSaleLabel: 'Venta Auditada'
    },
    title: 'Agregar Venta De Gas'
});

Ext.define('locale.es.sisprod.view.GasSale.ListGasSale', {
    override: 'sisprod.view.GasSale.ListGasSale',
    messages: {
        idGasSale: 'Identificador De Venta De Gas',
        productionPeriod: 'Periodo De Producción',
        saleHours: 'Horas De Venta',
        quantity: 'Cantidad',
        measureUnitName: 'Unidad De Medida',
        auditedSale: 'Venta Auditada'
    },
    listTitle: 'Lista De Venta De Gas'
});

Ext.define('locale.es.sisprod.view.GasSale.UpdateGasSale', {
    override: 'sisprod.view.GasSale.UpdateGasSale',
    messages: {
        saleHoursLabel: 'Horas De Venta',
        quantityLabel: 'Cantidad',
        auditedSaleLabel: 'Venta Auditada'
    },
    title: 'Editar Venta De Gas'
});

Ext.define('locale.es.sisprod.view.Reports.ChemicalTreatmentReports', {
    override: 'sisprod.view.Reports.ChemicalTreatmentReports',
    messages: {
        reportTitle: 'Tratamiento Químico',
        labels: {
            year: 'Año',
            month: 'Mes',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        message: 'Mensaje',
        selectFirst: 'Debe seleccionar un año...'
    }
});
Ext.define('locale.es.sisprod.controller.DeferredProductionController', {
    override: 'sisprod.controller.DeferredProductionController',
    messages: {
        noProductionPeriodSelected: '{0} no es un Periodo de Producción',
        periodAlreadyApprove: 'El Periodo de Producción {0} ya ah sido aprobado'
    }
});
Ext.define('locale.es.sisprod.controller.ApprovedDeferredProductionController', {
    override: 'sisprod.controller.ApprovedDeferredProductionController',
    messages: {
        noProductionPeriodSelected: '{0} no es un Periodo de Producción',
        confirmText: '¿Aprobar la Produccón Diferida para el Periodo {0}?',
        periodAlreadyApprove: 'El Periodo de Producción {0} ya ah sido aprobado'
    }
});
Ext.define('locale.es.sisprod.view.DeferredProduction.UpdateDeferredProduction', {
    override: 'sisprod.view.DeferredProduction.UpdateDeferredProduction',
    title: 'Actualizar Producción Diferida',
    messages: {
        labels: {
            productionPeriod: 'Fecha de Reporte',
            well: 'Pozo',
            lot: 'Lote',
            battery: 'Bateria',
            production: 'Producción',
            deferredProductionReason: 'Motivo',
            reasonType: 'Tipo',
            minutes: 'Min.',
            hours: 'Horas',
            oil: 'Petroleo',
            deferred: 'Diferida',
            off: 'Parado',
            comment: 'Observación'
        },
        validation: {
            alerTitle: 'Mensaje',
            selectLotFirst: 'Seleccione un Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.DeferredProduction.AddDeferredProduction', {
    override: 'sisprod.view.DeferredProduction.AddDeferredProduction',
    title: 'Agregar Producción Diferida',
    messages: {
        labels: {
            productionPeriod: 'Fecha de Reporte',
            well: 'Pozo',
            lot: 'Lote',
            battery: 'Bateria',
            production: 'Producción',
            deferredProductionReason: 'Motivo',
            reasonType: 'Tipo',
            minutes: 'Min.',
            hours: 'Horas',
            oil: 'Petroleo',
            deferred: 'Diferida',
            off: 'Parado',
            comment: 'Observación'
        },
        validation: {
            alerTitle: 'Mensaje',
            selectLotFirst: 'Seleccione un Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.DeferredProduction.ListDeferredProduction', {
    override: 'sisprod.view.DeferredProduction.ListDeferredProduction',
    listTitle: 'Listado de Produccion Diferida',
    messages: {
        headers: {
            idDeferredProduction: 'Identificador',
            wellCode: 'Pozo',
            batteryCode: 'Bateria',
            reason: 'Motivo',
            hours: 'Horas',
            minute: 'Minutos',
            oil: 'Petroleo',
            deferredNumber: 'Diferida',
            offWell: 'Parado',
            period: 'Fecha de Reporte',
            comment: 'Observación'
        }
    }
});
Ext.define('locale.es.sisprod.view.ApprovedDeferredProduction.ListApprovedDeferredProduction', {
    override: 'sisprod.view.ApprovedDeferredProduction.ListApprovedDeferredProduction',
    listTitle: 'Listado de Produccion Diferida',
    messages: {
        headers: {
            idDeferredProduction: 'Identificador',
            wellCode: 'Pozo',
            batteryCode: 'Bateria',
            reason: 'Motivo',
            hours: 'Horas',
            minute: 'Minutos',
            oil: 'Petroleo',
            deferredNumber: 'Diferida',
            offWell: 'Parado',
            period: 'Fecha de Reporte',
            comment: 'Observación'
        },
        buttons: {
            approve: 'Aprobar'
        }
    }
});
Ext.define('locale.es.sisprod.view.ApprovedDeferredProduction.AddApprovedDeferredProduction', {
    override: 'sisprod.view.ApprovedDeferredProduction.AddApprovedDeferredProduction',
    messages: {
        labels: {
            productionPeriod: 'Fecha de Reporte',
            well: 'Pozo',
            lot: 'Lote',
            battery: 'Bateria',
            production: 'Producción',
            deferredProductionReason: 'Motivo',
            reasonType: 'Tipo',
            minutes: 'Min.',
            hours: 'Horas',
            oil: 'Petroleo',
            deferred: 'Diferida',
            off: 'Parado',
            comment: 'Observación'
        },
        validation: {
            alerTitle: 'Mensaje',
            selectLotFirst: 'Seleccione un Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.ApprovedDeferredProduction.UpdateApprovedDeferredProduction', {
    override: 'sisprod.view.ApprovedDeferredProduction.UpdateApprovedDeferredProduction',
    messages: {
        labels: {
            productionPeriod: 'Fecha de Reporte',
            well: 'Pozo',
            lot: 'Lote',
            battery: 'Bateria',
            production: 'Producción',
            deferredProductionReason: 'Motivo',
            reasonType: 'Tipo',
            minutes: 'Min.',
            hours: 'Horas',
            oil: 'Petroleo',
            deferred: 'Diferida',
            off: 'Parado',
            comment: 'Observación'
        },
        validation: {
            alerTitle: 'Mensaje',
            selectLotFirst: 'Seleccione un Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.DeferredProductionType.UpdateDeferredProductionType', {
    override: 'sisprod.view.DeferredProductionType.UpdateDeferredProductionType',
    messages: {
        deferredProductionTypeNameLabel: 'Tipo de Motivo'
    }
});
Ext.define('locale.es.sisprod.view.DeferredProductionType.AddDeferredProductionType', {
    override: 'sisprod.view.DeferredProductionType.AddDeferredProductionType',
    messages: {
        deferredProductionTypeNameLabel: 'Tipo de Motivo'
    }
});
Ext.define('locale.es.sisprod.view.DeferredProductionType.ListDeferredProductionType', {
    override: 'sisprod.view.DeferredProductionType.ListDeferredProductionType',
    messages: {
        idDeferredProductionTypeHeader: 'Idetificador',
        deferredProductionTypeNameHeader: 'Tipo de Motivo'
    }
});
Ext.define('locale.es.sisprod.view.DeferredProductionReason.ListDeferredProductionReason', {
    override: 'sisprod.view.DeferredProductionReason.ListDeferredProductionReason',
    messages: {
        idDeferredProductionReasonHeader: 'Identificador',
        deferredProductionReasonNameHeader: 'Motivo',
        deferredProductionCodeHeader: 'Codigo',
        deferredProductionTypeNameHeader: 'Tipo de Motivo'
    }
});
Ext.define('locale.es.sisprod.view.DeferredProductionReason.UpdateDeferredProductionReason', {
    override: 'sisprod.view.DeferredProductionReason.UpdateDeferredProductionReason',
    messages: {
        deferredProductionReasonLabel: 'Motivo',
        deferredProductionCodeLabel: 'Codigo',
        deferredProductionTypeLabel: 'Tipo de Motivo'
    }
});
Ext.define('locale.es.sisprod.view.DeferredProductionReason.AddDeferredProductionReason', {
    override: 'sisprod.view.DeferredProductionReason.AddDeferredProductionReason',
    messages: {
        deferredProductionReasonLabel: 'Motivo',
        deferredProductionCodeLabel: 'Codigo',
        deferredProductionTypeLabel: 'Tipo de Motivo'
    }
});

Ext.define('locale.es.sisprod.view.SpecialMeasure.AddSpecialMeasure', {
    override: 'sisprod.view.SpecialMeasure.AddSpecialMeasure',
    title: 'Agregar Medida Especial',
    messages: {
        labels: {
            lot: 'Lote',
            well: 'Pozo',
            wellEmptyText: 'Debes seleccionar un pozo...',
            oil: 'Petróleo',
            oilMeasureUnit: 'Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            totalHours: 'Total De Horas',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.SpecialMeasure.ListSpecialMeasure', {
    override: 'sisprod.view.SpecialMeasure.ListSpecialMeasure',
    listTitle: 'Lista De Medidas Especiales',
    messages: {
        headers: {
            idSpecialMeasure: 'Identificador De Medida Especial',
            idProductionPeriod: 'Identificador De Periodo De Producción',
            idWell: 'Identifiador De Pozo',
            well: 'Pozo',
            oil: 'Petróleo',
            oilMeasureUnitName: 'Unidad De Medida De Petróleo',
            oilIdMeasureUnit: 'Identificador Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            waterIdMeasureUnit: 'Identificador De Unidad De Medida De Agua',
            idBattery: 'Identificador De Bateria',
            batteryName: 'Nombre De Bateria',
            totalHours: 'Total De Horas',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.SpecialMeasure.UpdateSpecialMeasure', {
    override: 'sisprod.view.SpecialMeasure.UpdateSpecialMeasure',
    title: 'Editar Medida Especial',
    messages: {
        labels: {
            lot: 'Lote',
            well: 'Pozo',
            wellEmptyText: 'Debes seleccionar un pozo...',
            oil: 'Petróleo',
            oilMeasureUnit: 'Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            totalHours: 'Total De Horas',
            observation: 'Observación'
        }
    }
});

Ext.define('locale.es.sisprod.view.BatteryProduction.AddBatteryProduction', {
    override: 'sisprod.view.BatteryProduction.AddBatteryProduction',
    title: 'Agregar Produccion de Bateria',
    messages: {
        batteryLabel: 'Nombre de Bateria',
        msgOil: 'Petroleo',
        msgWater: 'Agua',
        msgGas: 'Gas',
        wellNumber: 'Nro. de Pozos',
        lotLabel: 'Lote',
        adjustmentFactor: 'Factor de Ajuste',
        netProduction: 'Produccion Neta',
        messageText: 'Mensaje',
        oilTransfer: 'Transferencia de Petroleo',
        oilPrevious: 'Produccion de petroleo anterior',
        oilProduction: 'Produccion de Petroleo',
        oilForecast: 'Pronostico de Pretoleo',
        validations: {
            selectLot: 'Selecciones Primero el Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.BatteryProduction.UpdateBatteryProduction', {
    override: 'sisprod.view.BatteryProduction.UpdateBatteryProduction',
    title: 'Editar Produccion de Bateria',
    messages: {
        batteryLabel: 'Nombre de Bateria',
        msgOil: 'Petroleo',
        msgWater: 'Agua',
        msgGas: 'Gas',
        swab: 'Swab',
        wellNumber: 'Nro. de Pozos',
        lotLabel: 'Lote',
        adjustmentFactor: 'Factor de Ajuste',
        netProduction: 'Produccion Neta',
        messageText: 'Mensaje',
        oilTransfer: 'Transferencia de Petroleo',
        oilPrevious: 'Produccion de petroleo anterior',
        oilProduction: 'Produccion de Petroleo',
        oilForecast: 'Pronostico de Pretoleo',
        validations: {
            selectLot: 'Selecciones Primero el Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.BatteryProduction.ListBatteryProduction', {
    override: 'sisprod.view.BatteryProduction.ListBatteryProduction',
    listTitle: 'Listado de Produccion de Baterias',
    messages: {
        idBatteryProductionHeader: 'ID',
        batteryNameHeader: 'Bateria',
        oilHeader: 'Petroleo',
        waterHeader: 'Agua',
        gasHeader: 'Gas',
        wellNumberHeader: 'Nro. Pozo',
        adjustmentFactorHeader: 'Factor',
        netProductionHeader: 'Produccion Neta',
        oilTransferHeader: 'Transferencia Petroleo',
       oilPreviousHeader: 'Produccion Anterior',
       oilProductionHeader: 'Produccion de Petroleo',
       oilForecastHeader: 'Pronostico de Pretoleo'
    }
});

Ext.define('locale.es.sisprod.controller.BatteryProductionController', {
    override: 'sisprod.controller.BatteryProductionController',
    messages: {
        msgOil: 'Petroleo',
        msgWater: 'Agua',
        msgGas: 'Gas'
    }
});

Ext.define('locale.es.sisprod.controller.BatteryProductionApprovedController', {
    override: 'sisprod.controller.BatteryProductionApprovedController',
    messages: {
        batteryLabel: 'Nombre Bateria',
        msgOil: 'Petroleo',
        msgWater: 'Agua',
        msgGas: 'Gas',
        msgConfirmApprove: 'Confirma Aprobacion de Produccion de Bateria en el Periodo de Producion {0}?',
        msgTitle: 'Confirma AProbacion',
        msgConfirmResultApprove: 'Aprobacion Satisfactoria',
        periodAlreadyApprove: 'El periodo {0} ha sido aprobado'
    }
});

Ext.define('locale.es.sisprod.view.ApprovedSwab.AddApprovedSwab', {
    override: 'sisprod.view.ApprovedSwab.AddApprovedSwab',
    title: 'Agregar SWAB',
    messages: {
        labels: {
            productionPeriod: 'Periodo',
            well: 'Pozo',
            wellEmptyText: 'Debe seleccionar un pozo...',
            oil: 'Petróleo',
            oilMeasureUnit: 'Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            runNumber: 'Número De Corrida',
            pistonDepth: 'Profundidad Pistón',
            stayTime: 'Tiempo De Estancia',
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            entity: 'Entidad',
            entityEmptyText: 'Debe seleccionar una entidad...',
            lot: 'Lote'
        },
        buttons: {
        }
    }
});

Ext.define('locale.es.sisprod.view.ApprovedSwab.ListApprovedSwab', {
    override: 'sisprod.view.ApprovedSwab.ListApprovedSwab',
    listTitle: 'Lista Swab',
    messages: {
        headers: {
            idSwab: 'Identificador Swab',
            idProductionPeriod: 'Identificador Periodo De Producción',
            registerEmployeeName: 'Empleado Registrador',
            approvedEmployeeName: 'Empleador Aprobador',
            idWell: 'Identificador Pozo',
            well: 'Pozo',
            oil: 'Petróleo',
            oilMeasureUnitName: 'Unidad De Medida De Petróleo',
            oilIdMeasureUnit: 'Identificador Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            waterIdMeasureUnit: 'Identificador Unidad De Medida De Agua',
            idBattery: 'Identificador Bateria',
            batteryName: 'Nombre De Bateria',
            runNumber: 'Número De Corrida',
            pistonDepth: 'Profundidad Pistón',
            stayTime: 'Tiempo De Estancia',
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            entityName: 'Nombre De Entidad',
            entityIdEntity: 'Nombre De Entidad',
            isApproved: 'Aprobado'
        },
        buttons: {
            approve: 'Aprobado'
        }
    }
});

Ext.define('locale.es.sisprod.view.ApprovedSwab.UpdateApprovedSwab', {
    override: 'sisprod.view.ApprovedSwab.UpdateApprovedSwab',
    title: 'Editar SWAB',
    messages: {
        labels: {
            productionPeriod: 'Period',
            well: 'Pozo',
            wellEmptyText: 'Debe seleccionar un pozo...',
            oil: 'Petróleo',
            oilMeasureUnit: 'Unidad De Medida De Petróleo',
            battery: 'Bateria',
            water: 'Agua',
            waterMeasureUnit: 'Unidad De Medida De Agua',
            runNumber: 'Número De Corrida',
            pistonDepth: 'Profundidad Pistón',
            stayTime: 'Tiempo De Estancia',
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            entity: 'Entidad',
            entityEmptyText: 'Debe seleccionar una entidad...',
            lot: 'Lote'
        },
        buttons: {
        }
    }
});

Ext.define('locale.es.sisprod.controller.ApprovedSwabController', {
    override: 'sisprod.controller.ApprovedSwabController',
    messages: {
        noProductionPeriodSelected: '{0} no es un periodo de producción',
        confirmText: '¿Aprobar la producción Swab para el periodo {0} ?',
        periodAlreadyApprove: 'El periodo {0} ya ha sido aprobado'
    }
});

Ext.define('locale.es.sisprod.controller.SwabController', {
    override: 'sisprod.controller.SwabController',
    messages: {
        noProductionPeriodSelected: '{0} no es un periodo de producción',
        confirmText: '¿Aprobar la producción Swab para el periodo {0} ?',
        periodAlreadyApprove: 'El periodo {0} ya ha sido aprobado'
    }
});

Ext.define('locale.es.sisprod.view.PPEquipment.UpdatePPEquipment', {
    override: 'sisprod.view.PPEquipment.UpdatePPEquipment',
    title: 'Editar Equipo',
    messages: {
        descriptionLabel: 'Descripcion',
        isToolLabel: 'Es Herramienta'
    }
});
Ext.define('locale.es.sisprod.view.PPEquipment.AddPPEquipment', {
    override: 'sisprod.view.PPEquipment.AddPPEquipment',
    title: 'Agregar Equipo',
    messages: {
        descriptionLabel: 'Descripcion',
        isToolLabel: 'Es Herramienta'
    }
});
Ext.define('locale.es.sisprod.view.PPEquipment.ListPPEquipment', {
    override: 'sisprod.view.PPEquipment.ListPPEquipment',
    listTitle: 'Listado de Equipos',
    messages: {
        idPPEquipmentHeader: 'Identificador',
        descriptionHeader: 'Descripción',
        isToolHeader: 'Es Herramienta'
    }
});
Ext.define('locale.es.sisprod.view.ActivityOt.UpdateActivityOt', {
    override: 'sisprod.view.ActivityOt.UpdateActivityOt',
    title: 'Editar Actividad',
    messages: {
        descriptionLabel: 'Descripción'
    }
});
Ext.define('locale.es.sisprod.view.ActivityOt.AddActivityOt', {
    override: 'sisprod.view.ActivityOt.AddActivityOt',
    title: 'Agregar Actividad',
    messages: {
        descriptionLabel: 'Descripción'
    }
});
Ext.define('locale.es.sisprod.view.ActivityOt.ListActivityOt', {
    override: 'sisprod.view.ActivityOt.ListActivityOt',
    listTitle: 'Listado de Actividades',
    messages: {
        idActivityOtHeader: 'Identificador',
        descriptionHeader: 'Descripción'
    }
});
Ext.define('locale.es.sisprod.view.BatteryProductionApproved.AddBatteryProductionApproved', {
    override: 'sisprod.view.BatteryProductionApproved.AddBatteryProductionApproved',
    title: 'Agregar Produccion de Bateria',
    messages: {
        batteryLabel: 'Nombre de Bateria',
        msgOil: 'Petroleo',
        msgWater: 'Agua',
        msgGas: 'Gas',
        wellNumber: 'Nro. de Pozos',
        lotLabel: 'Lote',
        adjustmentFactor: 'Factor de Ajuste',
        netProduction: 'Produccion Neta',
        messageText: 'Mensaje',
        oilTransfer: 'Transferencia de Petroleo',
        oilPrevious: 'Produccion de petroleo anterior',
        oilProduction: 'Produccion de Petroleo',
        oilForecast: 'Pronostico de Pretoleo',
        validations: {
            selectLot: 'Selecciones Primero el Lote...'
        }
    }
});
Ext.define('locale.es.sisprod.view.BatteryProductionApproved.UpdateBatteryProductionApproved', {
    override: 'sisprod.view.BatteryProductionApproved.UpdateBatteryProductionApproved',
    title: 'Editar Produccion de Bateria',
    messages: {
        batteryLabel: 'Nombre de Bateria',
        msgOil: 'Petroleo',
        msgWater: 'Agua',
        msgGas: 'Gas',
        swab: 'Swab',
        wellNumber: 'Nro. de Pozos',
        lotLabel: 'Lote',
        adjustmentFactor: 'Factor de Ajuste',
        netProduction: 'Produccion Neta',
        messageText: 'Mensaje',
        oilTransfer: 'Transferencia de Petroleo',
        oilPrevious: 'Produccion de petroleo anterior',
        oilProduction: 'Produccion de Petroleo',
        oilForecast: 'Pronostico de Pretoleo',
        validations: {
            selectLot: 'Selecciones Primero el Lote...'
        }
    }
});

Ext.define('locale.es.sisprod.view.BatteryProductionApproved.ListBatteryProductionApproved', {
    override: 'sisprod.view.BatteryProductionApproved.ListBatteryProductionApproved',
    listTitle: 'Listado de Produccion de Baterias',
    messages: {
        idBatteryProductionHeader: 'ID',
        batteryNameHeader: 'Bateria',
        oilHeader: 'Petroleo',
        waterHeader: 'Agua',
        gasHeader: 'Gas',
        wellNumberHeader: 'Nro. Pozo',
        adjustmentFactorHeader: 'Factor',
        netProductionHeader: 'Produccion Neta',
        oilTransferHeader: 'Transferencia Petroleo',
       oilPreviousHeader: 'Produccion Anterior',
       oilProductionHeader: 'Produccion de Petroleo',
       oilForecastHeader: 'Pronostico de Pretoleo'
    }
});

Ext.define('locale.es.sisprod.view.WorkTemplate.PPEquipmentGrid', {
    override: 'sisprod.view.WorkTemplate.PPEquipmentGrid',
    messages: {
        equipmentTitle: "Lista de Equipos-Herramientas",
        quantityLabel: 'Cantidad',
        equipmentLabel: 'Equipos-Heramientas',
        isToolLabel: 'Es Herramienta',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        alertCaption: 'Mensaje',
        duplicateEquipmentError: 'Este Elemento ya ah sido agregado',
        noEquipmentToAddError: 'Seleccione un Equipo/Herramienta',
        noEquipmentSelectToRemoveError: 'Selecciones el Equipo/Herramienta a eliminar',
        ppEquipmentEmptyText: 'Escriba un Equipo/Herramienta'
    }
});
Ext.define('locale.es.sisprod.view.WorkRequestAll.ListWorkRequestAll', {
    override: 'sisprod.view.WorkRequestAll.ListWorkRequestAll',
    listTitle: 'Listado de Pedidos de Trabajo',
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            lotName: 'Lote',
            workRequestSourceName: 'Origen',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            dependencyName: 'Dependencia',
            applicantFullName: 'Interesado',
            recipientFullName: 'Receptor de Planificación',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado',
            description: 'Descripción',
            workRequestStatusReasonName: 'Motivo de Estado',
            reportLink: 'Imprimir'
        }
    }
});
Ext.define('locale.es.sisprod.view.WorkRequestAll.ConsultWorkRequest', {
    override: 'sisprod.view.WorkRequestAll.ConsultWorkRequest',
    title: 'Consultar Orden de Pedido',
    messages: {
        msgWorkRequestData: 'Datos de Orden de Pedido',
        workRequestNumber: 'N° de pedido de trabajo',
        workRequestFullNumber: 'N° de Pedido.de trabajo',
        workOrderDate: 'Fecha de generación de orden de trabajo',
        workOrderNumber: 'N° de orden de trabajo',
        workRequestSource: 'Origen de pedido de trabajo',
        generalData: 'Datos Generales',
        manHours: 'Horas Hombre',
        machineHours: 'Horas Máquina',
        locationName: 'Ubicación',
        workRequestSourceName: 'Origen Pedido',
        equipmentName: 'Equipo',
        sectorName: 'Sector',
        taskScheduler: 'Planificador',
        workCategoryName: 'Categoria Trabajo',
        workCategoryDetail: 'Tipo Trabajo',
        attentionMaximumDate: 'Fecha Max.Atenc.',
        description: 'Descripción',
        workOrderLabel: {
            idWorkOrderLabel: 'Identificador',
            workOrderFullNumberLabel: 'N°',
            descriptionLabel: 'Descripcion',
            workOrderDateLabel: 'Fecha de Orden',
            scheduledStartDateLabel: 'Inicio Planificado',
            scheduledEndDateLabel: 'Fin Planificado',
            executionStartDateLabel: 'Inicio de Ejecucion',
            executionEndDateLabel: 'Fin de Ejecucion',
            sectorNameLabel: 'Sector',
            workShopLabel: 'Taller',
            workShopCoordinatorLabel: 'Coordinator',
            quadrilleLabel: 'Cuadrilla',
            taskSchedulerLabel: 'Planificador',
            workCategoryLabel: 'Categoria de Trabajo',
            workCategoryDetailLabel: 'Tipo de Trabajo',
            locationLabel: 'Ubicacion',
            workStatusLabel: 'Estado',
            annulledWorkOrderLabel: 'Anulado',
            manHoursLabel: 'Horas Hombre',
            machineHoursLabel: 'Horas Maquina'
        }
    }
});
Ext.define('Ext.locale.es.sisprod.view.WorkOrderClosable.WorkOrderConsult', {
    override: 'sisprod.view.WorkOrderClosable.WorkOrderConsult',
    title: 'Consultar Orden de Trabajo',
    messages: {
        labels: {
            generalData: 'Datos General',
            workOrderDate: 'Fecha de generación de orden de trabajo',
            workOrderNumber: 'N° de orden de trabajo',
            manHours: 'Horas Hombre',
            machineHours: 'Horas Máquina',
            locationName: 'Ubicación',
            workRequestSourceName: 'Origen Pedido',
            equipmentName: 'Equipo',
            sectorName: 'Sector',
            taskScheduler: 'Planificador',
            workCategoryName: 'Categoria Trabajo',
            workCategoryDetail: 'Tipo Trabajo',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            description: 'Descripción',
            workShop: 'Taller',
            quadrille: 'Cuadrilla',
            workShopCoordinator: 'Coordinador',
            scheduledDate: 'Fecha Planificación',
            scheduledStartDate: 'Inicio',
            scheduledEndDate: 'Fin',
            serviceOrder: '¿Orden de Servicio?',
            contractor: 'Contratista',
            serviceOrderNumber: 'N° Servicio',
            scheduling: 'Planificación',
            workOrderService: 'Orden de Servicio',
            plannedHours: 'Horas planificadas',
            peformedHours: 'Horas ejecutadas',
            activityTab: 'Actividades',
            productTab: 'Materiales',
            saveObservation: 'Guardar Observacion',
            closeOrder: 'Validar Orden',
            executeData: 'Ejecución',
            percentageUseResources: 'Porcentaje de uso de recursos',
            percentageAdvance: 'Porcentaje de avance total'
        },
        loadTemplateText: 'Cargar Plantilla',
        workRequestData: 'Datos de Pedido',
        resourcesData: 'Recursos',
        messageText: 'Mensaje',
        quadrilleData: 'Cuadrilla',
        evidenceData: 'Archivos de Evidencia'
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.WorkOrderRatioReports', {
    override: 'sisprod.view.Reports.WorkOrderRatioReports',
    messages: {
        reportTitle: 'Días Estimados Por Trabajo',
        labels: {
            startDate: 'Fecha Inicio',
            endDate: 'Fecha Fin',
            lot: 'Lote',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        message: 'Mensaje'
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.ProductivityByQuadrilleReports', {
    override: 'sisprod.view.Reports.ProductivityByQuadrilleReports',
    messages: {
        reportTitle: 'Reporte De Productividad Por Cuadrilla',
        messageText: 'Mensaje',
        labels: {
            lot: 'Lote',
            workCategory: 'Categoria De Trabajo',
            workCategoryDetail: 'Tipo De Trabajo',
            fromDate: 'Fecha Inicio',
            toDate: 'Fecha Fin',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        validations: {
            selectWorkCategory: 'Seleccione una categoria de trabajo primero...'
        },
        workCategoryDetailEmptyText: 'Ingrese un tipo de trabajo...'
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.ManagementQuadrilleWorkReports', {
    override: 'sisprod.view.Reports.ManagementQuadrilleWorkReports',
    messages: {
        reportTitle: 'Reporte De Gestión De Cuadrilla',
        messageText: 'Mensaje',
        labels: {
            lot: 'Lote',
            workCategory: 'Categoria De Trabajo',
            workCategoryDetail: 'Tipo De Trabajo',
            fromDate: 'Fecha Inicio',
            toDate: 'Fecha Fin',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        validations: {
            selectWorkCategory: 'Seleccione una categoria de trabajo primero...'
        },
        workCategoryDetailEmptyText: 'Ingrese un tipo de trabajo...'
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.EfficacyWorkRequestBacklogDaysReports', {
    override: 'sisprod.view.Reports.EfficacyWorkRequestBacklogDaysReports',
    messages: {
        reportTitle: 'Eficacia - Dias Retrasados de Pedido de Trabajo',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});
Ext.define('Ext.locale.sisprod.view.Reports.EfficacyWorkRequestBacklogDaysReports', {
    override: 'sisprod.view.Reports.EfficacyWorkRequestBacklogDaysReports',
    messages: {
        reportTitle: 'Eficacia - Dias Retrasados de Pedido de Trabajo',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});


Ext.define('Ext.locale.sisprod.view.Reports.EfficiencyActivitiesReports', {
    override: 'sisprod.view.Reports.EfficiencyActivitiesReports',
    messages: {
        reportTitle: 'Eficiencia - Actividades',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});
Ext.define('Ext.locale.sisprod.view.Reports.EfficacyWorkRequestBacklogDaysReports', {
    override: 'sisprod.view.Reports.EfficacyWorkRequestBacklogDaysReports',
    messages: {
        reportTitle: 'Eficacia - Dias Retrasados de Pedido de Trabajo',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.EfficiencyEstimateDurationWorkReports', {
    override: 'sisprod.view.Reports.EfficiencyEstimateDurationWorkReports',
    messages: {
        reportTitle: 'Eficiencia - Duracion de Trabajo',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.EfficiencyMachineHoursReports', {
    override: 'sisprod.view.Reports.EfficiencyMachineHoursReports',
    messages: {
        reportTitle: 'Eficiencia - Horas Maquina',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.EfficiencyManHoursReports', {
    override: 'sisprod.view.Reports.EfficiencyManHoursReports',
    messages: {
        reportTitle: 'Eficiencia - Horas Hombre',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('Ext.locale.sisprod.view.Reports.EfficiencyProductsReports', {
    override: 'sisprod.view.Reports.EfficiencyProductsReports',
    messages: {
        reportTitle: 'Eficiencia - Uso de Materiales',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todos los Lotes',
            fromDate: 'Desde',
            toDate: 'Hasta',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});

Ext.define('Ext.locale.sisprod.controller.EmployeeController', {
    override: 'sisprod.controller.EmployeeController',
    messages: {
        msgEmployeeExist: 'Empleado ya registrado!!'
    }
});
Ext.define('Ext.locale.sisprod.view.Employee.AddEmployee', {
    override: 'sisprod.view.Employee.AddEmployee',
    title: 'Agregar Empleado',
    messages: {
        documentType: 'Tipo de Documento',
        documentNumber: 'Numero de Documento',
        paternalSurname: 'Apellido Paterno',
        maternalSurname: 'Apellido Materno',
        personName: 'Nombre',
        address: 'Direccion',
        email: 'Email',
        phone: 'Telefono',
        company: 'Compañia',
        area: 'Area',
        position: 'Cargo',
        msgPersonData: 'Datos Personales',
        msgEmployeeData: 'Datos del Empleado',
        bloodGroup: 'Grupo Sanguineo',
        messageText: 'Mensaje',
        personEmptyText: 'Personal',
        validations: {
            selectLot: 'Seleccione primero el Tipo de Documento...'
        }
    }
});
Ext.define('Ext.locale.sisprod.view.Employee.UpdateEmployee', {
    override: 'sisprod.view.Employee.UpdateEmployee',
    title: 'Actualizar Empleado',
    messages: {
        documentType: 'Tipo de Documento',
        documentNumber: 'Numero de Documento',
        paternalSurname: 'Apellido Paterno',
        maternalSurname: 'Apellido Materno',
        personName: 'Nombre',
        address: 'Direccion',
        email: 'Email',
        phone: 'Telefono',
        company: 'Compañia',
        area: 'Area',
        position: 'Cargo',
        msgPersonData: 'Datos Personales',
        msgEmployeeData: 'Datos del Empleado',
        bloodGroup: 'Grupo Sanguineo',
        messageText: 'Mensaje',
        personEmptyText: 'Personal',
        validations: {
            selectLot: 'Seleccione primero el Tipo de Documento...'
        }
    }
});
Ext.define('locale.es.sisprod.view.SystemUserGroup.AddSystemUserGroup', {
    override: 'sisprod.view.SystemUserGroup.AddSystemUserGroup',
    title: 'Agregar Grupo de Usuario',
    messages: {
        systemUserGroupNameLabel: 'Nombre'

    }
});
Ext.define('locale.es.sisprod.view.SystemUserGroup.UpdateSystemUserGroup', {
    override: 'sisprod.view.SystemUserGroup.UpdateSystemUserGroup',
    title: 'Actualizar Grupo de Usuario',
    messages: {
        systemUserGroupNameLabel: 'Nombre'

    }
});
Ext.define('locale.es.sisprod.view.SystemUserGroup.ListSystemUserGroup', {
    override: 'sisprod.view.SystemUserGroup.ListSystemUserGroup',
    listTitle: 'Listado de Grupo de Usuario',
    messages: {
        idSystemUserGroupHeader: 'ID',
        systemUserGroupNameHeader: 'Grupo'
    }
});

Ext.define('locale.es.sisprod.view.MobileUnit.AddMobileUnit', {
    override: 'sisprod.view.MobileUnit.AddMobileUnit',
    messages: {
        basicDataTitle: 'Datos Basicos',
        componentsTitle: 'Asignacion de Componentes',
        featuresTitle: 'Caracteristicas Adicionales',
        equipmentNameLabel: 'Nombre de Equipo',
        equipmentModelLabel: 'Modelo',
        equipmentCodeLabel: 'Codigo',
        serialNumberLabel: 'Número de Serie',
        equipmentTypeLabel: 'Tipo de Equipo',
        markLabel: 'Marca',
        equipmentConditionLabel: 'Condicion',
        locationLabel: 'Ubicacion',
        locationEmptyText: 'Escrba una locacion...',
        equipmentEmptyText: 'Escriba un equipo...',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        supplierLabel: 'Propietario',
        isOwn: 'Es propio',
        firstSelectALot: 'Seleccione un lote primero',
        lot: 'Lote'
    },
    title: 'Agregar Unidad Movil'
});

Ext.define('locale.es.sisprod.view.MobileUnit.UpdateMobileUnit', {
    override: 'sisprod.view.MobileUnit.UpdateMobileUnit',
    messages: {
        basicDataTitle: 'Datos Basicos',
        componentsTitle: 'Asignacion de Componentes',
        featuresTitle: 'Caracteristicas Adicionales',
        equipmentNameLabel: 'Nombre de Equipo',
        equipmentModelLabel: 'Modelo',
        equipmentCodeLabel: 'Codigo',
        serialNumberLabel: 'Número de Serie',
        equipmentTypeLabel: 'Tipo de Equipo',
        markLabel: 'Marca',
        equipmentConditionLabel: 'Condicion',
        locationLabel: 'Ubicacion',
        locationEmptyText: 'Escrba una locacion...',
        equipmentEmptyText: 'Escriba un equipo...',
        addButtonText: 'Agregar',
        removeButtonText: 'Quitar',
        supplierLabel: 'Propietario',
        isOwn: 'Es propio',
        firstSelectALot: 'Seleccione un lote primero',
        lot: 'Lote'
    },
    title: 'Editar Unidad Movil'
});

Ext.define('locale.es.sisprod.view.MobileUnit.ListMobileUnit', {
    override: 'sisprod.view.MobileUnit.ListMobileUnit',
    messages: {
        idEquipmentHeader: 'ID de Equipo',
        equipmentNameHeader: 'Equipo',
        equipmentModelHeader: 'Modelo',
        equipmentCodeHeader: 'Codigo',
        serialNumberHeader: 'Número de Serie',
        idEquipmentTypeHeader: 'ID Tipo de Equipo',
        equipmentTypeNameHeader: 'Tipo de Equipo',
        idMarkHeader: 'ID marca',
        markNameHeader: 'Marca',
        idLocationHeader: 'ID Ubicacion',
        locationNameHeader: 'Ubicacion',
        idEquipmentConditionHeader: 'ID Condicion de Equipo',
        equipmentConditionNameHeader: 'Condicion',
        idEquipmentParentHeader: 'Asignado a',
        equipmentParentNameHeader: 'Asignado a ',
        idSupplierHeader: 'ID Proveedor',
        supplierNameHeader: 'Proveedor',
        isOwn: 'Propio',
        lotHeader: 'Lote'
    },
    listTitle: 'Lista De Unidades Moviles'
});

Ext.define('locale.es.sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentGrid', {
    override: 'sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentGrid',
    title: 'Permisos por Entidades',
    messages: {
        headers: {
            entityName: 'Nombre de Entidad',
            canList: 'Listar',
            canInsert: 'Registrar',
            canUpdate: 'Modificar',
            canDelete: 'Eliminar',
            canExport: 'Exportar'
        }
    }
});

Ext.define('locale.es.sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentMenu', {
    override: 'sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentMenu',
    title: 'Permisos por Menús'
});

Ext.define('locale.es.sisprod.view.SystemSecurityRole.SelectSecurityItem', {
    override: 'sisprod.view.SystemSecurityRole.SelectSecurityItem',
    messages: {
        title: "Permisos",
        labels: {
            securityItem: "Usuario/Grupo"
        },
        radioGroup: {
            username: 'Usuario',
            group: 'Grupo'
        },
        showPermissions: 'Mostrar Permisos'
    }
});

Ext.define('locale.es.sisprod.view.SystemSecurityRole.AdminSystemSecurityRole', {
    override: 'sisprod.view.SystemSecurityRole.AdminSystemSecurityRole',
    messages: {
        title: "Permisos",
        buttons: {
            save: 'Guardar'
        }
    }
});

Ext.define('locale.es.sisprod.controller.SystemSecurityRoleController', {
    override: 'sisprod.controller.SystemSecurityRoleController',
    messages: {
        successfulAssignment: 'Permisos asignados correctamente!',
        confirmationText: '¿Está seguro que desea asignar los permisos seleccionados?',
        selectSecurityItem: 'Seleccione Usuario/Grupo!'
    }
});

Ext.define('locale.es.sisprod.view.Substandard.AddSubstandard', {
    override: 'sisprod.view.Substandard.AddSubstandard',
    messages: {
        substandardNameLabel: 'Nombre',
        substandardAcronymLabel: 'Acrónimo',
        substandardTypeLabel: 'Tipo'
    },
    title: 'Agregar Sub Estandar'
});

Ext.define('locale.es.sisprod.view.Substandard.ListSubstandard', {
    override: 'sisprod.view.Substandard.ListSubstandard',
    messages: {
        idSubstandardHeader: 'Identificador Sub Estandar',
        substandardNameHeader: 'Sub Estandar',
        substandardAcronymHeader: 'Acrónimo',
        idSubstandardTypeHeader: 'Identificador De Tipo Sub Estandar',
        substandardTypeNameHeader: 'Tipo Sub Estandar'
    },
    listTitle: 'Lista Sub Estandar'
});

Ext.define('locale.es.sisprod.view.Substandard.UpdateSubstandard', {
    override: 'sisprod.view.Substandard.UpdateSubstandard',
    messages: {
        substandardNameLabel: 'Nombre',
        substandardAcronymLabel: 'Acrónimo',
        substandardTypeLabel: 'Tipo'
    },
    title: 'Editar Sub Estandar'
});

Ext.define('locale.es.sisprod.view.SubstandardType.ListSubstandardType', {
    override: 'sisprod.view.SubstandardType.ListSubstandardType',
    messages: {
        idSubstandardTypeHeader: 'Identificador De Tipo Sub Estandar',
        substandardTypeNameHeader: 'Tipo Sub Estandar',
        substandardTypeAcronymHeader: 'Acrónimo'
    },
    listTitle: 'Lista Tipo Sub Estandar'
});

Ext.define('locale.es.sisprod.view.SubstandardType.UpdateSubstandardType', {
    override: 'sisprod.view.SubstandardType.UpdateSubstandardType',
    messages: {
        substandardTypeNameLabel: 'Nombre',
        substandardTypeAcronymLabel: 'Acrónimo'
    },
    title: 'Editar Tipo Sub Estandar'
});

Ext.define('locale.es.sisprod.view.SubstandardType.AddSubstandardType', {
    override: 'sisprod.view.SubstandardType.AddSubstandardType',
    messages: {
        substandardTypeNameLabel: 'Nombre',
        substandardTypeAcronymLabel: 'Acrónimo'
    },
    title: 'Agregar Tipo Sub Estandar'
});

Ext.define('locale.es.sisprod.view.HsseSupervisor.ListHsseSupervisor', {
    override: 'sisprod.view.HsseSupervisor.ListHsseSupervisor',
    listTitle: 'Lista de Supervisores HSSE',
    messages: {
        headers: {
            idHsseSupervisor: 'ID',
            idEmployee: 'ID Empleado',
            personFullName: 'Nombre de Trabajador',
            documentTypeAcronym: 'Tipo de Documento',
            documentNumber: 'Numero de Documento',
            dependencyName: 'Dependencia'
        }
    }
});
Ext.define('locale.es.sisprod.view.HsseSupervisor.AddHsseSupervisor', {
    override: 'sisprod.view.HsseSupervisor.AddHsseSupervisor',
    title: 'Agregar Supervisor HSSE',
    messages: {
        labels: {
            employee: 'Empleado'
        },
        employeeEmptyText: 'Escriba el nombre de un empleado...'
    }
});
Ext.define('locale.es.sisprod.view.HsseSupervisor.UpdateHsseSupervisor', {
    override: 'sisprod.view.HsseSupervisor.UpdateHsseSupervisor',
    title: 'Editar Supervisor HSSE',
    messages: {
        labels: {
            employee: 'Empleado'
        },
        employeeEmptyText: 'Escriba el nombre de un empleado...'
    }
});

Ext.define('locale.es.sisprod.view.Main', {
    override: 'sisprod.view.Main',
    messages: {
        labels: {
            username: 'Usuario',
            lot: 'Lote: {0}',
            date: 'Fecha: {0}'
        }
    }
});
Ext.define('locale.es.sisprod.view.SubstandardConditionAction.AddSubstandardConditionAction', {
    override: 'sisprod.view.SubstandardConditionAction.AddSubstandardConditionAction',
    title: 'Agregar Condicion Sub Estandar',
    messages: {
        substandardConditionActionDescriptionLabel: 'Descripcion'
    }
});
Ext.define('locale.es.sisprod.view.SubstandardConditionAction.UpdateSubstandardConditionAction', {
    override: 'sisprod.view.SubstandardConditionAction.UpdateSubstandardConditionAction',
    title: 'Actualizar Condicion Sub Estandar',
    messages: {
        substandardConditionActionDescriptionLabel: 'Descripcion'
    }
});
Ext.define('locale.es.sisprod.view.SubstandardConditionAction.ListSubstandardConditionAction', {
    override: 'sisprod.view.SubstandardConditionAction.ListSubstandardConditionAction',
    listTitle: 'Listar Condicion Sub Estandar',
    messages: {
        dSubstandardConditionActionHeader: 'ID',
        substandardConditionActionDescriptionHeader: 'Descripcion'
    }
});

Ext.define('locale.es.sisprod.view.VerifyActsOrConditions.UpdateVerifyActsOrConditions', {
    override: 'sisprod.view.VerifyActsOrConditions.UpdateVerifyActsOrConditions',
    messages: {
        validation: {
            alertTitle: 'Mensaje',
            firstSelectWorkCategoryText: 'Por favor, primero seleccione categoría de trabajo...'
        },
        formTitle: 'Datos de Pedido',
        lotLabel: 'Lote',
        requestDateLabel: 'Fecha',
        workCategoryLabel: 'Categoría de Trabajo',
        workCategoryDetailLabel: 'Tipo de Trabajo',
        workCategoryDetailEmptyText: 'Escriba el nombre del tipo de trabajo',
        workCategoryEmptyText: 'Escriba la categoría de trabajo',
        workRequestSourceLabel: 'Origen de Pedido',
        workRequestFullNumberLabel: 'N° de Pedido',
        equipmentTypeLabel: 'Tipo de Equipo',
        equipmentLabel: 'Equipo',
        equipmentEmptyText: 'Escriba el nombre del equipo...',
        locationLabel: 'Ubicación',
        locationEmptyText: 'Escriba el nombre de una ubicación..',
        applicantLabel: 'Interesado',
        applicantEmptyText: 'Escriba el nombre de un trabajador...',
        recipientLabel: 'Receptor de Planificación',
        recipientEmptyText: 'Escriba el nombre de un trabajador...',
        workDetailsLabel: 'Indique el trabajo a realizar',
        firstSelectAlertText: 'Seleccione el tipo de equipo antes de realizar la búsqueda!',
        firstSelectWorkCategoryAlertText: 'Seleccione categoría de trabajo antes de realizar la búsqueda!',
        isSubstandardConditionLabel: 'Es Sub Estandar',
        detectionDateLabel: 'Fecha de Detección',
        subStandardLabel: 'Sub Estandar',
        subStandardConditionActionLabel: 'Condicion Sub Estandar',
        hsseSupervisorLabel: 'Supervisor',
        hsseSupervisorEmptyText: 'Hsse Supervisor',
        subStandardTitle: 'Datos Sub Estandar',
        observationsLabel: 'Observaciones'
    },
    title: 'Editar Pedido de Trabajo'
});

Ext.define('locale.es.sisprod.view.VerifyActsOrConditions.ListVerifyActsOrConditions', {
    override: 'sisprod.view.VerifyActsOrConditions.ListVerifyActsOrConditions',
    listTitle: 'Listado de Pedidos de Trabajo',
    messages: {
        headers: {
            idWorkRequest: 'Identificador',
            lotName: 'Lote',
            workRequestSourceName: 'Origen',
            workCategoryName: 'Categoria de Trabajo',
            workCategoryDetailName: 'Tipo de Trabajo',
            dependencyName: 'Dependencia',
            applicantFullName: 'Interesado',
            recipientFullName: 'Receptor de Planificación',
            senderFullName: 'Emisor',
            locationName: 'Ubicación',
            equipmentName: 'Equipo',
            workRequestFullNumber: 'Número',
            requestDate: 'Fecha',
            attentionMaximumDate: 'Fecha Max.Atenc.',
            workRequestStatusName: 'Estado',
            description: 'Descripción',
            reportLink: 'Imprimir',
            isSubstandardCondition: '¿Es A o C?',
            detectionDate: 'Fecha Detección',
            substandardName: 'Sub Estandar',
            observations: 'Observaciones'
        },
        nullifyButtonText: 'Anular',
        attachFilesButtonText: 'Adjuntar Archivos',
        monthLabel: 'Seleccione mes'
    }
});

Ext.define('locale.es.sisprod.view.Reports.SubstandardActionOrConditionReports', {
    override: 'sisprod.view.Reports.SubstandardActionOrConditionReports',
    messages: {
        reportTitle: 'Reporte De Actos Y Condiciones Substandard',
        labels: {
            month: 'Mes',
            year: 'Año',
            lot: 'Lote',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        message: 'Mensaje'
    }
});
Ext.define('locale.es.sisprod.view.Well.CompletionDiagramGrid', {
    override: 'sisprod.view.Well.CompletionDiagramGrid',
    messages: {
        headers: {
            referenceFileName: 'Nombre de Archivo',
            effectiveDate: 'Fecha'
        },
        completionDiagramTitle: 'Diagramas de Completacion',
        downloadButtonText: 'Descargar',
        removeButtonText: 'Quitar',
        confirmText: '¿Esta seguro de eliminar {0}?',
        alertMessage: 'Mensaje'
    }
});
Ext.define('locale.es.sisprod.view.Well.CompletionDiagramWindow', {
    override: 'sisprod.view.Well.CompletionDiagramWindow',
    title: 'Diagramas de Completación',
    messages: {
        uploadButtonText: 'Subir Archivo',
        maxUploadFileSizeMessage: 'El tamaño maximo de carga es',
        fieldSetText: 'Selección de Archivo',
        fileLabel: 'Archivo',
        effectiveDateLabel: 'Fecha'
    }
});
Ext.define('locale.es.sisprod.view.SdpCompany.AddSdpCompany', {
    override: 'sisprod.view.SdpCompany.AddSdpCompany',
    title: 'Agregar Servico de Empresa',
    messages: {
        sdpCompanyDataTitle: 'Datos de Compañia',
        sdpCompanyLabel: 'Compañia',
        msgCompany: 'Ingrese Compañia',
        sdpCompanyRUCLabel: 'RUC',
        sdpCompanyAddressLabel: 'Direccion',
        wellServiceTypeNameLabel: 'Nombre',
        wellServiceTypeAcronymLabel: 'Acronimo',
        wellServiceTypeDataTitle: 'Servicios'
    }
});
Ext.define('locale.es.sisprod.view.SdpCompany.UpdateSdpCompany', {
    override: 'sisprod.view.SdpCompany.UpdateSdpCompany',
    title: 'Actualizar Servicio de Empresa',
    messages: {
        sdpCompanyDataTitle: 'Datos de Compañia',
        sdpCompanyLabel: 'Compañia',
        msgCompany: 'Ingrese Compañia',
        sdpCompanyRUCLabel: 'RUC',
        sdpCompanyAddressLabel: 'Direccion',
        wellServiceTypeNameLabel: 'Nombre',
        wellServiceTypeAcronymLabel: 'Acronimo',
        wellServiceTypeDataTitle: 'Servicios'
    }
});
Ext.define('locale.es.sisprod.view.SdpCompany.ListSdpCompany', {
    override: 'sisprod.view.SdpCompany.ListSdpCompany',
    listTitle: 'Listar Empresas con Servicios de Pozos',
    messages: {
        idSdpCompany: 'ID',
        sdpCompanyNameHeader: 'Nombre',
        sdpCompanyRUCHeader: 'RUC'
    }
});

Ext.define('locale.es.sisprod.view.SdpReason.AddSdpReason', {
    override: 'sisprod.view.SdpReason.AddSdpReason',
    title: 'Agregar Causa de Servicio de Pozo',
    messages: {
        sdpReasonNameLabel: 'Nombre',
        sdpReasonAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.SdpReason.UpdateSdpReason', {
    override: 'sisprod.view.SdpReason.UpdateSdpReason',
    title: 'Actualizar Causa de Servicio de Pozo',
    messages: {
        sdpReasonNameLabel: 'Nombre',
        sdpReasonAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.SdpReason.ListSdpReason', {
    override: 'sisprod.view.SdpReason.ListSdpReason',
    listTitle: 'Listar Causa de Servicio de Pozo',
    messages: {
        idSdpReason: 'ID',
        sdpReasonNameHeader: 'Nombre',
        sdpReasonAcronymHeader: 'Acronimo'
    }
});

Ext.define('locale.es.sisprod.view.WellServiceType.AddWellServiceType', {
    override: 'sisprod.view.WellServiceType.AddWellServiceType',
    title: 'Agregar Tipo de Servicio de Pozo',
    messages: {
        wellServiceTypeNameLabel: 'Nombre',
        wellServiceTypeAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.WellServiceType.UpdateWellServiceType', {
    override: 'sisprod.view.WellServiceType.UpdateWellServiceType',
    title: 'Actualizar Tipo de Servicio de Pozo',
    messages: {
        wellServiceTypeNameLabel: 'Nombre',
        wellServiceTypeAcronymLabel: 'Acronimo'
    }
});
Ext.define('locale.es.sisprod.view.WellServiceType.ListWellServiceType', {
    override: 'sisprod.view.WellServiceType.ListWellServiceType',
    listTitle: 'Listar Casusa de Servicio de Pozo',
    messages: {
        idWellServiceType: 'ID',
        wellServiceTypeNameHeader: 'Nombre',
        wellServiceTypeAcronymHeader: 'Acronimo'
    }
});

Ext.define('locale.es.sisprod.view.MobileUnitActivity.ListMobileUnitActivity', {
    override: 'sisprod.view.MobileUnitActivity.ListMobileUnitActivity',
    messages: {
        idMobileUnitActivityHeader: 'Identificador De Actividad De Unidad Movil',
        mobileUnitActivityAcronymHeader: 'Acrónimo',
        mobileUnitActivityNameHeader: 'Nombre',
        isOperativeTimeHeader: 'Es Tiempo Operativo'
    },
    entityName: '',
    title: '',
    listTitle: 'Lista De Actividades Moviles'
});

Ext.define('locale.es.sisprod.view.MobileUnitActivity.UpdateMobileUnitActivity', {
    override: 'sisprod.view.MobileUnitActivity.UpdateMobileUnitActivity',
    messages: {
        mobileUnitActivityAcronymLabel: 'Acrónimo',
        mobileUnitActivityNameLabel: 'Nombre',
        isOperativeTimeLabel: 'Es Tiempo Operativo'
    },
    title: 'Editar De Actividades Moviles'
});

Ext.define('locale.es.sisprod.view.MobileUnitActivity.AddMobileUnitActivity', {
    override: 'sisprod.view.MobileUnitActivity.AddMobileUnitActivity',
    messages: {
        mobileUnitActivityAcronymLabel: 'Acrónimo',
        mobileUnitActivityNameLabel: 'Nombre',
        isOperativeTimeLabel: 'Es Tiempo Operativo'
    },
    title: 'Agregar De Actividades Moviles'
});

Ext.define('locale.es.sisprod.view.MobileUnitActivityPeriod.AddMobileUnitActivityPeriod', {
    override: 'sisprod.view.MobileUnitActivityPeriod.AddMobileUnitActivityPeriod',
    messages: {
        mobileUnitLabel: 'Unidad Movil',
        operativeHourLabel: 'Houras Operativas',
        operativeEfficiencyLabel: 'Eficiencia Operativa (%)',
        mobileUnitActivityNameLabel: 'Nombre Actividad',
        activityHourLabel: 'Horas De Actividad',
        isOperativeTimeLabel: 'Es Timpo Operativo',
        operativeHoursWarning: "La suma de horas operativas no puede ser mayor a 24",
        warningTitle: 'Advertencia'
    },
    title: 'Agregar Actividad Realizada Por Unidad Movil'
});

Ext.define('locale.es.sisprod.view.MobileUnitActivityPeriod.UpdateMobileUnitActivityPeriod', {
    override: 'sisprod.view.MobileUnitActivityPeriod.UpdateMobileUnitActivityPeriod',
    messages: {
        mobileUnitLabel: 'Unidad Movil',
        operativeHourLabel: 'Houras Operativas',
        operativeEfficiencyLabel: 'Eficiencia Operativa (%)',
        mobileUnitActivityNameLabel: 'Nombre Actividad',
        activityHourLabel: 'Horas De Actividad',
        isOperativeTimeLabel: 'Es Timpo Operativo',
        operativeHoursWarning: "La suma de horas operativas no puede ser mayor a 24",
        warningTitle: 'Advertencia'
    },
    title: 'Editar Actividad Realizada Por Unidad Movil'
});

Ext.define('locale.es.sisprod.view.MobileUnitActivityPeriod.ListMobileUnitActivityPeriod', {
    override: 'sisprod.view.MobileUnitActivityPeriod.ListMobileUnitActivityPeriod',
    options: {},
    messages: {
        idMobileUnitActivityPeriodHeader: 'Identificador Actividad Realizadas Por Unidad Movil',
        mobileUnitHeader: 'Unidad Movil',
        operativeHourHeader: 'Horas Operativas',
        operativeEfficiencyHeader: 'Eficiencia Operativa (%)',
        idProductionPeriodHeader: 'Identificador Periodo De Producción',
        productionPeriodDateHeader: 'Fecha Periodo De Producción',
        idMobileUnitHeader: 'Identificador Unidad Movil',
        mobileUnitNameHeader: 'Nombre Unidad Movil',
        operativeHour: 'Horas Operativas',
        operativeEfficiency: 'Eficiencia Operativa (%)'
    },
    listTitle: 'Lista Periodos De Actividad Por Unidad Movil'
});

Ext.define('locale.es.sisprod.controller.WellFeatureFluidLevelController', {
    override: 'sisprod.controller.WellFeatureFluidLevelController',
    messages: {
        selectFeatures: 'Seleccione al menos un característica!'
    }
});

Ext.define('locale.es.sisprod.view.WellFeatureFluidLevel.AddWellFeatureFluidLevel', {
    override: 'sisprod.view.WellFeatureFluidLevel.AddWellFeatureFluidLevel',
    messages: {
        title: 'Lista de Característica de Pozo',
        alertMessage: 'Mensaje',
        saveButtonText: 'Guardar',
        refreshButtonText: 'Refrescar',
        headers: {
            wellFeatureName: 'Característica',
            wellFeatureType: 'Tipo de Característica',
            measureUnit: 'Unidad de Medida'
        }
    }
});

Ext.define('locale.es.sisprod.view.FluidLevelType.AddFluidLevelType', {
    override: 'sisprod.view.FluidLevelType.AddFluidLevelType',
    title: 'Agregar Tipo de Nivel de Fluído',
    messages: {
        fluidLevelTypeName: 'Nombre',
        fluidLevelTypeAcronym: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.FluidLevelType.UpdateFluidLevelType', {
    override: 'sisprod.view.FluidLevelType.UpdateFluidLevelType',
    title: 'Editar Tipo de Nivel de Fluido',
    messages: {
        fluidLevelTypeName: 'Nombre',
        fluidLevelTypeAcronym: 'Acrónimo'
    }
});

Ext.define('locale.es.sisprod.view.FluidLevelType.ListFluidLevelType', {
    override: 'sisprod.view.FluidLevelType.ListFluidLevelType',
    listTitle: 'Listado de Niveles de Fluído',
    messages: {
        headers: {
            idFluidLevelType: 'Identificador',
            fluidLevelTypeName: 'Nombre',
            fluidLevelTypeAcronym: 'Acrónimo'
        }
    }
});

Ext.define('locale.es.sisprod.view.FluidLevel.ListFluidLevel', {
    override: 'sisprod.view.FluidLevel.ListFluidLevel',
    listTitle: 'Listado de Niveles de Fluído',
    messages: {
        headers: {
            idFluidLevel: 'Identificador',
            wellName: 'Pozo',
            batteryName: 'Batería',
            carrera: 'Carrera',
            spm: 'SPM',
            companyName: 'Empresa',
            level: 'Nivel',
            submergence: 'Sumergenc.',
            freeGas: 'Libre Gas',
            pressionCasing: 'Presión Casing',
            pressionTubing: 'Presión Tubing',
            gearboxExisting: 'Carga Max.Exist.',
            initialLevel: 'N.I',
            finalLevel: 'N.F',
            minutes: 'Min.',
            seconds: 'Seg.',
            productionPeriodDate: 'Fecha Reporte',
            fluidLevelTypeName: 'Tipo'
        },
        attachFilesButtonText: 'Adjuntar Archivos'
    }
});

Ext.define('locale.es.sisprod.view.FluidLevel.FluidLevelFilesWindow', {
    override: 'sisprod.view.FluidLevel.FluidLevelFilesWindow',
    title: 'Archivos de Níveles de Fluído',
    messages: {
        uploadButtonText: 'Subir Archivo',
        maxUploadFileSizeMessage: 'El tamaño maximo de carga es',
        fieldSetText: 'Selección de Archivo',
        fileLabel: 'Archivo',
        effectiveDateLabel: 'Fecha'
    }  
});

Ext.define('locale.es.sisprod.controller.FluidLevelController', {
    override: 'sisprod.controller.FluidLevelController',
    messages: {
       wellEquipmentNotSetUp: 'El pozo seleccionado no tiene una unidad de bombeo asignada',
       fileUploadingWaitMessage: 'Subiendo archivo, por favor espere...'
   }  
});

Ext.define('locale.es.sisprod.view.FluidLevel.FluidLevelFilesGrid', {
    override: 'sisprod.view.FluidLevel.FluidLevelFilesGrid',
    messages:{
        headers: {
            fileName: 'Nombre de Archivo'
        },
        filesTitle: 'Lista de Archivos',
        downloadButtonText: 'Descargar',
        removeButtonText: 'Eliminar',
        confirmText: '¿Está seguro que desea eliminar {0}?',
        alertMessage: 'Mensaje'
    }  
});

Ext.define('locale.es.sisprod.view.CompressorStopReason.ListCompressorStopReason', {
    override: 'sisprod.view.CompressorStopReason.ListCompressorStopReason',
    listTitle: 'Listado de Motivos de Parada de Compresores',
    messages: {
        idCompressorStopReasonHeader: "ID",
        compressorStopReasonNameHeader: "Motivo de Parada",
        compressorStopReasonAcronymHeader: "Acronimo",
        discountedHeader: "Se Descuenta"
    }
});
Ext.define('locale.es.sisprod.view.CompressorStopReason.AddCompressorStopReason', {
    override: 'sisprod.view.CompressorStopReason.AddCompressorStopReason',
    title: 'Agregar Motivo de Parada',
    messages: {
        compressorStopReasonNameLabel: "Motivo de Parada",
        compressorStopReasonAcronymLabel: "Acronimo",
        discountedLabel: "Se Descuenta"
    }
});
Ext.define('locale.es.sisprod.view.CompressorStopReason.UpdateCompressorStopReason', {
    override: 'sisprod.view.CompressorStopReason.UpdateCompressorStopReason',
    title: 'Editar Motivo de Parada',
    messages: {
        compressorStopReasonNameLabel: "Motivo de Parada",
        compressorStopReasonAcronymLabel: "Acronimo",
        discountedLabel: "Se Descuenta"
    }
});
Ext.define('locale.es.sisprod.view.CompressorStop.ListCompressorStop', {
    override: 'sisprod.view.CompressorStop.ListCompressorStop',
    listTitle: 'Listado de Parada de Compresores',
    messages: {
        headers: {
            idCompressorStop: 'ID',
            compressor: 'Compresor',
            reason: 'Motivo de Parada',
            finishTime: 'Fin',
            startTime: 'Inicio',
            stopHour: 'Horas de Parada',
            volumen: 'Volumen',
            pressure: 'Presion',
            comment: 'Observaciones',
            productionPeriodDate: 'Fecha de Reporte'
        }
    }
});
Ext.define('locale.es.sisprod.view.CompressorStop.AddCompressorStop', {
    override: 'sisprod.view.CompressorStop.AddCompressorStop',
    title: 'Agregar Parada de Compresor',
    messages: {
        labels: {
            productionPeriod: 'Fecha de Reporte',
            compressor: 'Compresor',
            lot: 'Lote',
            production: 'Producción',
            compressorStopReason: 'Motivo',
            volumen: 'Volumen',
            pressure: 'Presión',
            stopHour: 'Horas de Parada',
            start: 'Inicio',
            finish: 'Fin',
            comment: 'Observación',
            compressorEmptyText: 'Escriba el Nombre del Compresor...',
            reasonEmptyText: 'Escriba un Motivo de Parada...'
        },
        validation: {
            alerTitle: 'Mensaje',
            selectLotFirst: 'Seleccione Lote'
        }
    }
});
Ext.define('locale.es.sisprod.view.CompressorStop.UpdateCompressorStop', {
    override: 'sisprod.view.CompressorStop.UpdateCompressorStop',
    title: 'Editar Parada de Compresor',
    messages: {
        labels: {
            productionPeriod: 'Fecha de Reporte',
            compressor: 'Compresor',
            lot: 'Lote',
            production: 'Producción',
            compressorStopReason: 'Motivo',
            volumen: 'Volumen',
            pressure: 'Presión',
            stopHour: 'Horas de Parada',
            start: 'Inicio',
            finish: 'Fin',
            comment: 'Observación',
            compressorEmptyText: 'Escriba el Nombre del Compresor...',
            reasonEmptyText: 'Escriba un Motivo de Parada...'
        },
        validation: {
            alerTitle: 'Mensaje',
            selectLotFirst: 'Seleccione Lote'
        }
    }
});
Ext.define('locale.es.sisprod.controller.CompressorStopController', {
    override: 'sisprod.controller.CompressorStopController',
    messages: {
        noProductionPeriodSelected: '{0} no es una fecha de reporte',
        stopHoursError: 'Las Horas de Parada deben ser mayores a cero',
        labels: {
            volumen: 'Volumen',
            pressure: 'Presión'
        }
    }
});
Ext.define('locale.es.sisprod.view.Reports.CompressorStopReports', {
    override: 'sisprod.view.Reports.CompressorStopReports',
    messages: {
        reportTitle: 'Parada de Compresores',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todo los lotes',
            month: 'Mes-Año',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }
});
Ext.define('Ext.locale.es.sisprod.view.DirectWorkOrder.WorkOrderActivityDetailDirect', {
    override: 'sisprod.view.DirectWorkOrder.WorkOrderActivityDetailDirect',
    title: 'Detalle de Actividad',
    messages: {
        activityDate: 'Fecha',
        manHours: 'Horas Hombre',
        machineHours: 'Horas Máquina',
        msgTitle: 'Detalle',
        msgTipAdd: 'Agregar Detalle',
        msgTipRemove: 'Eliminar Detalle',
        leyendValid: 'Fecha dentro del rango de ejecución de la orden de trabajo',
        leyendInvalid: 'Fecha fuera del rango de ejecución de la orden de trabajo',
        description: 'Descripción',
        leyendAlertCurrentDate: 'Fecha mayor a la fecha actual del servidor'

    }
});

Ext.define('Ext.locale.es.sisprod.view.Well.AssignEquipments', {
    override: 'sisprod.view.Well.AssignEquipments',
    title: 'Asignación de Equipos',
    messages: {
        equipmentEmptyText: 'Escriba el nombre del equipo...',
        labels: {
            engineEquipment: 'Motor',
            pumpingUnitEquipment: 'Unidad de Bombeo',
            gearboxRating: 'Torque Máximo',
            gearboxPeakBalanced: 'Carga Max.Balanceada'
        }
    }
});

Ext.define('Ext.locale.es.sisprod.view.FluidLevel.AddFluidLevel', {
    override: 'sisprod.view.FluidLevel.AddFluidLevel',
    title: 'Registrar Nivel de Fluído',
    messages: {
        labels: {
            productionPeriod: 'Fecha Reporte',
            lot: 'Lote',
            well: 'Pozo',
            wellData: 'Datos de Pozo',
            battery: 'Batería',
            fluidLevelData: 'Nivel de Fluído',
            fluidLevelType: 'Tipo',
            company: 'Empresa',
            level: 'Nivel',
            submergence: 'Sumergencia',
            freeGas: 'Libre Gas',
            pressionTubing: 'Presión Tubing',
            pressionCasing: 'Presión Casing',
            fluidLevelTime: 'Hora',
            gearboxRating: 'Torque Máximo',
            gearboxPeakBalanced: 'Carga Max.Balanceada',
            gearboxPeakExisting: 'Torque Existente',
            carrera: 'Carrera',
            spm: 'SPM',
            comment: 'Comentarios',
            recommendation: 'Recomendaciones'
        }
    }
});

Ext.define('Ext.locale.es.sisprod.view.FluidLevel.UpdateFluidLevel', {
    override: 'sisprod.view.FluidLevel.UpdateFluidLevel',
    title: 'Editar Nivel de Fluído',
    messages: {
        labels: {
            productionPeriod: 'Fecha Reporte',
            lot: 'Lote',
            well: 'Pozo',
            wellData: 'Datos de Pozo',
            battery: 'Batería',
            fluidLevelData: 'Nivel de Fluído',
            fluidLevelType: 'Tipo',
            company: 'Empresa',
            level: 'Nivel',
            submergence: 'Sumergencia',
            freeGas: 'Libre Gas',
            pressionTubing: 'Presión Tubing',
            pressionCasing: 'Presión Casing',
            fluidLevelTime: 'Hora',
            gearboxRating: 'Torque Máximo',
            gearboxPeakBalanced: 'Carga Max.Balanceada',
            gearboxPeakExisting: 'Torque Existente',
            carrera: 'Carrera',
            spm: 'SPM',
            comment: 'Comentarios',
            recommendation: 'Recomendaciones'
        }
    }
});

Ext.define('Ext.locale.es.sisprod.view.ManometricTest.ManometricTestData', {
    override: 'sisprod.view.ManometricTest.ManometricTestData',
    title: 'Prueba Manométrica',
    messages: {
        labels: {
            initialLevel: 'Nivel Inicial',
            finalLevel: 'Nivel Final',
            manometricTimeTest: 'Hora',
            comments: 'Comentarios',
            testDuration: 'Duración',
            minutes: 'Minutos',
            seconds: 'Segundos'
        }
    }
});

Ext.define('Ext.locale.es.sisprod.view.FluidLevel.EquipmentGrid', {
    override: 'sisprod.view.FluidLevel.EquipmentGrid',
    title: 'Equipos',
    messages: {
        headers: {
            equipmentName: 'Nombre',
            equipmentModel: 'Modelo',
            equipmentCode: 'Código',
            equipmentSerialNumber: 'Nro. Serie',
            equipmentTypeName: 'Tipo',
            equipmentLot: 'Lote',
            equipmentLocation: 'Ubicación'
        }
    }
});

Ext.define("Ext.locale.es.sisprod.view.WellService.ListWellService", {
    override: "sisprod.view.WellService.ListWellService",
    listTitle: 'Listado de SDP',
    messages: {
       idWellService:'Identificador',
       wellServiceTypeNameHeader:'Tipo de Servicio',
       wellNameHeader:'Pozo',
       CompanyMandatedNameHeader: 'Compañia Encargada',
       supervisorEmployeeHeader: 'Supervisor',
       totalCostHeader: 'Costo Total',
       sdpFileButtonText: 'Adjuntar Archivo SDP',
       sdpFileCostButtonText: 'Costos Por Compañias',
       sdpDescriptionHeader: 'Descripcion',
       startupDateHeader: 'Fecha Inicio',
       finishDateHeader: 'Fecha Fin',
       usedFrecuencyHeader: 'Frecuencia de Uso',
       moneyNameHeader: 'Moneda',
       updateWellParamsAndFeaturesButton: 'Parámetros de pozo',
       equipment: 'Equipo'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellService.AddWellService", {
    override: "sisprod.view.WellService.AddWellService",
    title: 'Agregar SDP',
    messages: {
        WellServiceDataTitle:'Datos del Servicio de Pozo',
        wellNameLabel: 'Pozo',
        wellServiceTypeNameLabel: 'Tipo de SDP',
        sdpCompanyLabel:'Compañia',
        equipmentLabel:'Equipo',
        supervisorIdEmployeeLabel: 'Supervisor',
        employeeEmptyText: 'Enter Supervisor',
        isFrequencyLabel: 'Frecuencia',
        descriptionLabel:'Descripcion',
        msgCompany: 'Enter Compañia',
        sdpReasonNameLabel:'Nombre',
        sdpReasonAcronymLabel:'Acronimo',
        sdpReasonDataTitle:'Sdp Motivo',
        startupDateLabel: 'Fecha de Inicio',
        finishDateLabel: 'Fecha de Fin',
        moneyLabel: 'Moneda',
        wellSelected: 'Seleccione...',
        lotLabel: 'Lote'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellService.UpdateWellService", {
    override: "sisprod.view.WellService.UpdateWellService",
    title: 'Editar SDP',
    messages: {
        WellServiceDataTitle:'Datos del Servicio de Pozo',
        wellNameLabel: 'Pozo',
        wellServiceTypeNameLabel: 'Tipo SDP',
        sdpCompanyLabel:'Compañia',
        equipmentLabel:'Equipo',
        supervisorIdEmployeeLabel: 'Supervisor',
        employeeEmptyText: 'Enter Supervisor',
        isFrequencyLabel: 'Frecuencia',
        descriptionLabel:'Descripcion',
        msgCompany: 'Enter Compañia',
        sdpReasonNameLabel:'Nombre',
        sdpReasonAcronymLabel:'Acronimo',
        sdpReasonDataTitle:'Sdp Motivo',
        startupDateLabel: 'Fecha de Incio',
        finishDateLabel: 'Fecha de Fin',
        moneyLabel: 'Moneda',
        lotLabel : 'Lote'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellService.SdpFileGrid", {
    override: "sisprod.view.WellService.SdpFileGrid",
    messages: {
        sdpFileTitle:"Archivos SDP",
        fileNameLabel:"Nombre de Archivo",
        dateActivityLabel:"Fecha de Actividad",
        uploadButtonText:'Subir Archivo',
        downloadButtonText:'Descargar',
        removeButtonText:'Eliminar',
        confirmText:'Quiere eliminar el archivo {0}?',
        alertMessage:'Mensaje'
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellService.SdpFileWindow", {
    override: "sisprod.view.WellService.SdpFileWindow",
    title: "Agregar Archivos SDP",
    messages: {
        uploadButtonText: 'Subir Archivo',
        maxUploadFileSizeMessage: 'El tamaño máximo de carga es',
        fieldSetText: 'Selección de Archivo',
        fileLabel: 'Archivo',
        dateActivityLabel: 'Fecha de Actividad'
    }
});
Ext.define("Ext.locale.es.sisprod.controller.WellServiceController", {
    override: "sisprod.controller.WellServiceController",
    messages: {
        msgSelectSdpReason: 'Seleccione un Motivo!!'
    }
});

Ext.define("Ext.locale.es.sisprod.view.SdpCompanyCost.ListSdpCompanyCost", {
    override: "sisprod.view.SdpCompanyCost.ListSdpCompanyCost",
    title: 'Listado Costos de Servicio de Pozo ',
    messages:{
        SdpCompanyCostTitle:"Costo",
        sdpCompanyNameLabel:"Nombre de Compañia",
        amountLabel:"Monto",
        moneyNameLabel:"Moneda",
        addButtonText:'Agregar Costo A servicio de Pozo',
        downloadButtonText:'Descargar',
        removeButtonText:'Eliminar',
        updateButtonText:'Editar',
        confirmText:'Quiere eliminar el archivo {0}?',
        alertMessage:'Mensaje',
        costTitle:'Listado Costo de Servicio de Pozo'
    }
});
Ext.define("Ext.locale.es.sisprod.view.SdpCompanyCost.AddSdpCompanyCost", {
    override: "sisprod.view.SdpCompanyCost.AddSdpCompanyCost",
    title: 'Agregar Costo SDP',
    messages: {
        sdpCompanyLabel:'Compañia SDP',
        amountLabel:'Monto',
        moneyLabel:'Moneda',
        totalHourLabel:'Total de Horas',
        statupDateLabel:'Fecha de Inicio',
        finishDateLabel:'Fecha de Fin',
        fileLabel:'Valorizacion'
    }
});
Ext.define("Ext.locale.es.sisprod.view.SdpCompanyCost.UpdateSdpCompanyCost", {
    override: "sisprod.view.SdpCompanyCost.UpdateSdpCompanyCost",
    title: 'Editar Costo SDP',
    messages: {
        sdpCompanyLabel:'Compañia SDP',
        amountLabel:'Monto',
        moneyLabel:'Moneda',
        totalHourLabel:'Total de Horas',
        startupDateLabel:'Fecha de Inicio',
        finishDateLabel:'Fecha de Fin',
        fileLabel:'Valorizacion'
    }
});

Ext.define("Ext.locale.es.sisprod.view.SdpActivity.ListSdpActivity", {
    override: "sisprod.view.SdpActivity.ListSdpActivity",
    listTitle: 'Listado de Tipo de Actividad SDP',
    messages:{
        idSdpActivity:'Identificador',
        sdpActivityNameHeader:'Nombre'
    }
});
Ext.define("Ext.locale.es.sisprod.view.SdpActivity.AddSdpActivity", {
    override: "sisprod.view.SdpActivity.AddSdpActivity",
    title: 'Agregar tipo de Actividad SDP',
    messages: {
        sdpActivityNameLabel:'Nombre'
    }
});
Ext.define("Ext.locale.es.sisprod.view.SdpActivity.UpdateSdpActivity", {
    override: "sisprod.view.SdpActivity.UpdateSdpActivity",
    title: 'Editar Tipo de Actividad SDP',
    messages: {
        sdpActivityNameLabel:'Nombre'
    }
});

Ext.define("Ext.locale.es.sisprod.view.SdpActivityDetail.ListSdpActivityDetail", {
    override: "sisprod.view.SdpActivityDetail.ListSdpActivityDetail",
    listTitle: 'Listado Actividades SDP',
    messages:{
        idSdpActivityDetail:'Idemtificador',
        wellNameHeader:'Pozo',
        sdpActivityNameHeader:'Tipo de Actividad',
        wellServiceTypeNameHeader:'Tipo SDP',
        companyNameHeader: 'Compañia',
        descriptionHeader: 'Descripcion',
        totalHourHeader: 'Horas',
        completedHeader: 'Completado'
    }
});
Ext.define("Ext.locale.es.sisprod.view.SdpActivityDetail.AddSdpActivityDetail", {
    override: "sisprod.view.SdpActivityDetail.AddSdpActivityDetail",
    title: 'Agregar Actividad SDP',
    messages: {
        wellServiceNameLabel:'Pozo',
        wellServiceTypeNameLabel:'Tipo SDP',
        activityNameLabel:'Actividad',
        dateActivityLabel:'Fecha de Actividad',
        sdpCompanyNameLabel:'Compañia',
        descriptionLabel:'Description',
        totalHoursLabel:'Total de Horas',
        isCompletedLabel: 'Completado',
        messageText: 'Mensaje',
        entityEmptySDPText: 'Seleccione el Pozo del SDP',
        validations: {
            selectWell: 'Seleccione el Pozo Primero...'
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.SdpActivityDetail.UpdateSdpActivityDetail", {
    override: "sisprod.view.SdpActivityDetail.UpdateSdpActivityDetail",
    title: 'Editar Actividad SDP',
    messages: {
        wellServiceNameLabel:'Pozo',
        wellServiceTypeNameLabel:'Tipo SDP',
        activityNameLabel:'Actividad',
        dateActivityLabel:'Fecha de Actividad',
        sdpCompanyNameLabel:'Compañia',
        descriptionLabel:'Description',
        totalHoursLabel:'Total de Horas',
        isCompletedLabel: 'Completado',
        messageText: 'Mensaje',
        entityEmptySDPText: 'Seleccione el Pozo del SDP',
        validations: {
            selectWell: 'Seleccione el Pozo Primero...'
        }
    }
});
Ext.define("Ext.locale.es.sisprod.view.WellService.ReasonsGrid", {
    override: "sisprod.view.WellService.ReasonsGrid",
    messages: {
        sdpReasonNameLabel: 'Nombre',
        sdpReasonAcronymLabel: 'Acronimo'
    }
});

Ext.define('Ext.locale.es.sisprod.view.Reports.DailyOperationsReports', {
    override: 'sisprod.view.Reports.DailyOperationsReports',
    messages: {
        reportTitle: 'Reporte Diario De Operaciones',
        labels: {
            reportDate: 'Fecha',
            lot: 'Lote',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        message: 'Mensaje'
    }
});

Ext.define('Ext.locale.es.sisprod.view.Reports.DeferredProductionReports', {
    override: 'sisprod.view.Reports.DeferredProductionReports',
    messages: {
        reportTitle: 'Reporte De Producción Diferida',
        labels: {
            reportDate: 'Fecha',
            lot: 'Lote',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        message: 'Mensaje'
    }
});

Ext.define('Ext.locale.es.sisprod.view.Reports.ForecastProductionReports', {
    override: 'sisprod.view.Reports.ForecastProductionReports',
    messages: {
        reportTitle: 'Reporte de Pronóstico de Producción',
        labels: {
            month: 'Mes',
            year: 'Año',
            lot: 'Lote',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        message: 'Mensaje'
    }
});

Ext.define('locale.es.sisprod.view.Reports.ProductionSwabReports', {
    override: 'sisprod.view.Reports.ProductionSwabReports',
    messages: {
        reportTitle: 'Produccion Swab',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todo los lotes',
            month: 'Mes-Año',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        }
    }

});
Ext.define('locale.es.sisprod.view.Reports.ForecastFieldProductionReports', {
    override: 'sisprod.view.Reports.ForecastFieldProductionReports',
    messages: {
        reportTitle: 'Pronostico de Produccion de Campo',
        labels: {
            lot: 'Lote',
            lotEmptyText: 'Todo los lotes',
            month: 'Mes-Año',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        alertMessage: 'Alerta'
    }
});

Ext.define('locale.es.sisprod.view.Reports.SubmergenceLevelReports', {
    override: 'sisprod.view.Reports.SubmergenceLevelReports',
    messages: {
        reportTitle: 'Nivel de Sumergencia',
        labels: {
            condition: 'Condición',
            submergenceValue: 'Valor',
            print: 'Imprimir',
            resetForm: 'Limpiar'
        },
        storeValues: {
            lessEqualThan: 'Menor igual',
            lessThan: 'Menor',
            equalThan: 'Igual',
            greaterThan: 'Mayor',
            greaterEqualThan: 'Mayor igual'
        }
    }
});

Ext.define('locale.es.sisprod.view.SystemAudit.ListSystemAudit', {
    override: 'sisprod.view.SystemAudit.ListSystemAudit',
    messages: {
        headers: {
            systemAuditId: 'SystemAudit ID',
            entityCaption: 'Entidad',
            instanceId: 'Instance Id',
            systemUserName: 'Usuario',
            actionName: 'Acción',
            eventDate: 'Fecha',
            url: 'Url',
            remoteIpAddress: 'Ip'
       }
    }
});
