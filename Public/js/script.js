var imgData = "";

const inputElement = document.getElementById("image_input");
inputElement.addEventListener("change", handleFiles, false);


function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  console.log(fileList);

  imgData = document.getElementById("uploaded-modified-image");

  imgData.src = URL.createObjectURL(fileList[0]);

  imgData.style.display = "grid";
  imgData.style.width = "300px";
  imgData.style.height = "300px";
  imgData.style.justifyContent = "center";
  imgData.style.alignItems = "center";

  const maintainButton = document.getElementById("cta-btn-upload");

  maintainButton.style.marginLeft = "25%";

}

