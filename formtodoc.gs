function getFormText() {

 var createDoc = true; //set this to false if you don't want to output a Doc
 var formID = 'YOUR_ID_HERE'; //find this in your form's URL
 var form = FormApp.openById(formID);
 var docTitle = "YOUR NEW DOC'S TITLE" //change this to whatever you want your doc to be named
 var newDoc = DocumentApp.create(docTitle);
 if (createDoc == true){
  var body = newDoc.getBody();
  body.appendParagraph(form.getTitle()).setBold(true);
  body.appendParagraph(form.getDescription()).setBold(false).setItalic(true);
 }
 var surveyText = ""; 
  
 // Logs the questions
 var items = form.getItems()
 for (var i = 0; i < items.length; i++){
  var itemType = items[i].getType();
  var curTitle = items[i].getTitle();

  if (itemType == 'PAGE_BREAK'){
    body.appendHorizontalRule();
  }
 
  surveyText = surveyText +"\n\n" +  curTitle; 
  
  //Logs the help text
  var curHelpText = items[i].getHelpText();   
  surveyText = surveyText +"\n\n" +  curHelpText; 

if (createDoc == true){
    body.appendParagraph(curTitle).setBold(true).setItalic(false);
    body.appendParagraph(curHelpText).setBold(false).setItalic(true);
}
// Logs the choices
 
  var addChoices = false;
 
  if (itemType == 'CHECKBOX'){
    var itemChoices = items[i].asCheckboxItem().getChoices();
    var addChoices = true;
  }
  else if (itemType == 'MULTIPLE_CHOICE'){
    var itemChoices = items[i].asMultipleChoiceItem().getChoices();
    var addChoices = true;
  }
  else if (itemType == 'LIST'){
    var itemChoices = items[i].asListItem().getChoices();
    var addChoices = true;
  }
  

  else if (itemType == 'CHECKBOX'){
    var itemChoices = items[i].asCheckboxItem().getChoices();
    var addChoices = true;
  }

  else if (itemType == 'CHECKBOX_GRID'){
    var gridRows = items[i].asCheckboxGridItem().getRows();
    var gridColumns = items[i].asCheckboxGridItem().getColumns();
    surveyText = surveyText + "\n" + gridRows;
    surveyText = surveyText + "\n" + gridColumns;
    if (createDoc == true){
      body.appendListItem(gridRows).setBold(false).setItalic(false).setGlyphType(DocumentApp.GlyphType.SQUARE_BULLET);
      body.appendListItem(gridColumns).setBold(false).setItalic(false).setGlyphType(DocumentApp.GlyphType.SQUARE_BULLET);
    }
    
  }

  if(addChoices == true){
    for (var j = 0; j < itemChoices.length; j++) {
      var choicesValue = itemChoices[j].getValue();
       // Logger.log(choicesValue);
       if (createDoc == true){
          body.appendListItem(choicesValue).setBold(false).setItalic(false).setGlyphType(DocumentApp.GlyphType.BULLET);
       }  
        surveyText = surveyText + "\n" + choicesValue; 
        
    }
  }
  

  
  
};

  Logger.log("complete");
  Logger.log(surveyText);
}


