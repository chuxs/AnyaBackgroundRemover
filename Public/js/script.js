var imgData = "";
let secondsLeft = 6;

const inputElement = document.getElementById("image_inputID");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  console.log(fileList);

  imgData = document.querySelector(".imageHolder");

  const actualImage = URL.createObjectURL(fileList[0]);
  imgData.src = actualImage;

  imgData.style.display = "grid";
  imgData.style.width = "300px";
  imgData.style.height = "300px";
  imgData.style.justifyContent = "center";
  imgData.style.alignItems = "center";

  // const uploadButton = document.getElementById("cta-btn-upload-id");
  // uploadButton.style.display = "none";

  // const  imageSection = document.getElementById("image-content-id");
  // imageSection.style.display = "grid";

  // const removeButton = document.getElementById("cta-btn-erase");
  // removeButton.style.marginLeft = "25%";

}


// Update countdown every second
const timer = setInterval(() => {
  secondsLeft--;
  
  if (secondsLeft <= 0) {
    clearInterval(timer);
    document.getElementById('loading').innerHTML = "Image is ready to download!";
  }
}, 1000);

const myImg = document.getElementById('cta-btn-download')

myImg.addEventListener('click', (event) => {
  const imgElement = document.getElementById('download-modified-image'); // Example by ID

  // Get the image source (URL)
  const imageSrc = imgElement.src;

  downloadImage(imageSrc);

  async function downloadImage(source){
  const image = await fetch(source)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = 'modified-image.png';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  }

});