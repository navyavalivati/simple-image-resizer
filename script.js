document.getElementById('downloadBtn').addEventListener('click', downloadImage);

function downloadImage() {
    const fileInput = document.getElementById('imageInput');
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (!fileInput.files[0] || !width || !height) {
        alert('Please select an image and specify dimensions');
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;

        img.onload = function() {
            
            //setting to desired dimensions
            canvas.width = width;
            canvas.height = height;

            //drawing image on canvas
            ctx.drawImage(img, 0, 0, width, height);

            //creating a download link
            const resizedImageData = canvas.toDataURL('image/jpeg');
            const downloadLink = document.createElement('a');
            downloadLink.href = resizedImageData;
            downloadLink.download = 'resized_image.jpg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink); //cleaning up
        };
    };

    reader.readAsDataURL(fileInput.files[0]);
}