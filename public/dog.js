window.onload = function() {
    let dogId = getPetId();
    let photoSlider = new PhotoSlider();

    let photoButton = document.getElementById("photos-btn");
    let dogElement = document.getElementById("dog-avatar");

    photoButton.addEventListener("click", function() {
        photoSlider.togglePhotoShow(dogId);
    });
    dogElement.addEventListener("click", function() {
        photoSlider.togglePhotoShow(dogId);
    });

}

function getPetId() {
    let urlString = window.location.href;
    let url = new URL(urlString);
    let dogId = url.searchParams.get("id");
    return dogId;
}