window.onload = function() {
    let photoSlider = new PhotoSlider();
    let dogsElements = document.getElementsByClassName("dog-box dog-1");

    for (let dogEl of dogsElements) {
        dogEl.addEventListener("click", function() {
            photoSlider.togglePhotoShow(dogEl.id);
        });
    }

}
