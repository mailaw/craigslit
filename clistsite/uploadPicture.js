function savePoster(dataObject){
    alert("Event saved! Return to home.")
	$.ajax({
      method: 'POST',
      url: "http://localhost:3000/savePoster",
      contentType: 'application/json',
      data: JSON.stringify({data: dataObject}),
      crossDomain: true,
      dataType: 'json',
      success: function(data) {
        alert("Event Successfully Saved!")
      }
      // error: function(err){
      //   alert("ERROR SAVING POSTER ", err);
      //   console.log("ERROR SAVING POSTER ", err);
      // }
	})
};

function getJpg(){
  var div = document.getElementById("output")
    var title = document.getElementById('title').value
    var eventDate = document.getElementById('eventdate').value
    var organization = document.getElementById('organization').value
    var selection = document.getElementById("categories");
    var category = selection.options[selection.selectedIndex].value;
    console.log(div, title, eventDate, organization, category)
  var x = document.getElementById("upload");
    var txt = "";
    if ('files' in x) { //has name, type, and size
        if (x.files.length == 0) {
            alert("Select one or more files");
        } else {
            console.log(x)
            for (var i = 0; i < x.files.length; i++) {
              var file = x.files[i];
                var y = document.createElement("img");
                y.file = file;
                div.appendChild(y);
                var reader = new FileReader();
                reader.onload = (function(img) {
                    return function(e) {
                        img.src = e.target.result;
                        var imgData =  e.target.result.replace("data:"+ file.type +";base64,", '');
                        savePoster({imgData, title, eventDate, organization, category});
                    };
                })(y);
                reader.readAsDataURL(file);
        };
          // console.log("RESULT", reader.result)
          // reader.readAsDataURL(file);
            }
        }
    else {
        if (x.value == "") {
            alert("Select one or more files.");
        } else {
            alert("File type not supported. Please upload a .jpg");
        }
    }
}
