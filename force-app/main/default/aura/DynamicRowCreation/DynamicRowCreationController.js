({
    doInit : function(component, event, helper) {
        helper.addRowHelper(component, 1);
    },
    
    addRow : function(component, event, helper) {
        var loopVar = 1;
        if(event.getSource().get('v.name') === 'multipleRows' && !$A.util.isEmpty('v.numberOfRows') ) {
            loopVar = component.get('v.numberOfRows') > 15 ? 0 : component.get('v.numberOfRows');
        }
        helper.addRowHelper(component, loopVar);
    },
    
    editRow : function(component, event, helper) {
        var dynamicRowsList = component.get("v.dynamicRowsList");
        var index = dynamicRowsList.findIndex(x => x.rowNumber === event.getSource().get('v.name'))
        if(index != -1)
            dynamicRowsList[index].editMode = !dynamicRowsList[index].editMode;
        component.set("v.dynamicRowsList", dynamicRowsList);
    },
    
    deleteRow : function(component, event, helper) {
        var dynamicRowsList = component.get("v.dynamicRowsList");
        var index = dynamicRowsList.findIndex(x => x.rowNumber === event.getSource().get('v.name'))
        if(index != -1)
            dynamicRowsList.splice(index, 1);
        component.set("v.dynamicRowsList", dynamicRowsList);
    },
    
    cloneRow : function(component, event, helper) {
        var dynamicRowsList = component.get("v.dynamicRowsList");
        var index = dynamicRowsList.findIndex(x => x.rowNumber === event.getSource().get('v.name'))
        if(index != -1) {
            dynamicRowsList.push({
                'Name': dynamicRowsList[index].Name,
                'Phone': dynamicRowsList[index].Phone,
                'AccountNumber': dynamicRowsList[index].AccountNumber,
                'editMode': dynamicRowsList[index].editMode,
                'rowNumber':dynamicRowsList.length + 1
            });
        }
        component.set("v.dynamicRowsList", dynamicRowsList);
    },
    
    incrementRow: function(component, event, helper) {
        var numberOfRows = component.get("v.numberOfRows");
        component.set("v.numberOfRows", numberOfRows + 1);
    },
    
    decrementRow: function(component, event, helper) {
        var numberOfRows = component.get("v.numberOfRows");
        component.set("v.numberOfRows", numberOfRows - 1);
    },
    
    saveRecords : function(component, event, helper) {
        var validExpense = component.find('dynamiRowsForm').reduce(function ( validSoFar, inputCmp ) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validExpense){
            helper.saveRecordsHelper(component, event, helper);
        }
    },
})