var fileSelect = document.getElementById('fileSelect');
fileSelect.addEventListener('change',function(){
    if(!fileSelect.files) return;
    
    let fl = new fileLoader(fileSelect);


});

class fileLoader {
    constructor(input) {
        this.input = input;
        this.load();
    }
    load() {
        let reader = new FileReader();
        
        reader.onload = (event) => {
            let img = new Image();

            img.onload = () => {
                document.body.appendChild(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(this.input.files[0]);
    }
}