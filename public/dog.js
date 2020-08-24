const pedigreeUrl = 'api/getPedigreeLink?id='

function getPetId() {
    let urlString = window.location.href;
    let url = new URL(urlString);
    let dogId = url.searchParams.get("id");
    return dogId;
}

function getPetPedigree(petId) {
    let getPedigreeUrl = pedigreeUrl + petId;
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

    xhr.open('GET', getPedigreeUrl);
    xhr.send();
    });
}

function setPedigreeButton(dogId) {
    let pedigreeButton = document.getElementById('pedigree-btn');
    pedigreeButton.addEventListener('click', function() {
        getPetPedigree(dogId).then(res => window.open(res.pedigree_link, "_blank"));
    })
}

window.onload = function() {
    let dogId = getPetId();
    setPedigreeButton(dogId);

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