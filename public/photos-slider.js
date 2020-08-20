const photosUrl = 'api/getDogPhotos?id='

class PhotoSlider {
    constructor() {
        this.loadSliderElements();
        this.addButtonsListeners();

        this.petId = undefined;
        this.sliderOpen = false;
        this.photoIndex = 0;
    }

    loadSliderElements() {
        this.photosConteiner = document.getElementById("photos-conteiner");
        this.imageContainer = document.getElementById("dog-photo-img");
    }

    addButtonsListeners() {
        let nextButton = document.getElementById("next-photo");
        let previousButton = document.getElementById("previous-photo");
        let closeButton = document.getElementById("btn-close");

        previousButton.addEventListener("click", function() {
            this.slidePhoto(-1);
        }.bind(this));
        
        nextButton.addEventListener("click", function() {
            this.slidePhoto(1);
        }.bind(this));

        closeButton.addEventListener("click", this.togglePhotoShow.bind(this));
    }

    togglePhotoShow(petId) {
        this.sliderOpen = !this.sliderOpen;
        if (typeof(petId) != 'undefined') {
            this.petId = petId;
        }

        if (this.sliderOpen) {
            this.getPhotos(this.petId).then(res => {
                this.photos = res;
                this.showPhoto(this.photoIndex);
                this.photosConteiner.classList.toggle('photos-show');
            });
        }
        else {
            this.photosConteiner.classList.toggle('photos-show');
            this.petId = undefined;
            this.photoIndex = 0;
            this.imageContainer.src = '';
        }
    }
    
    getPhotos(petId) {
        let getPhotosUrl = photosUrl + petId;

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (e) => {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                console.warn('request_error');
            }
        };

        xhr.open('GET', getPhotosUrl);
        xhr.send();
        });
    }
    
    showPhoto() {
        let imgSrc = this.photos[this.photoIndex].image_src;
        this.imageContainer.src = imgSrc;
    }

    slidePhoto(direction) {
        if (direction == 1) {
            this.photoIndex++;
            this.photoIndex %= this.photos.length;
        }
        else if (direction == -1) {
            this.photoIndex--;
            if (this.photoIndex < 0) {
                this.photoIndex = this.photos.length + this.photoIndex;
            }
        }
        this.showPhoto();
    }
}