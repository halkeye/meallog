document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('entryForm');
    const imageInput = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    if (form) {
        form.addEventListener('submit', (event) => {
            const title = document.getElementById('title').value;
            const notes = document.getElementById('notes').value;

            if (!title || !notes) {
                event.preventDefault();
                alert('Please fill in all fields.');
            }
        });
    }

    if (imageInput) {
        imageInput.addEventListener('change', (event) => {
            const files = event.target.files;
            imagePreview.innerHTML = '';

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.margin = '5px';
                    imagePreview.appendChild(img);
                };

                reader.readAsDataURL(file);
            }
        });
    }
});