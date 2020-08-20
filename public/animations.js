function hamburger() {
    document.getElementById("menu").classList.toggle('active');
    document.getElementById("hamb-btn").classList.toggle('menu-closed');
}



function more_event(element) {
    let content = element.getElementsByClassName("dogs")[1];
    let btn_img = element.getElementsByClassName("more-icon")[0];

    content.classList.toggle('dogs-hidden');
    btn_img.classList.toggle('more-opened');
}

function photo_slider(slider_element, slide_to) {
    let imgs = Array.from(slider_element.getElementsByTagName("img"));

    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].classList.contains("active-img")) {
            imgs[i].classList.remove("active-img");
            if (slide_to == 'next')
                imgs[(i + 1) % imgs.length].classList.add("active-img");
            if (slide_to == 'previous')
                imgs.slice(i - 1)[0].classList.add("active-img");
            break;
        }
    }
}

function social(socialElement) {
    let vkLink = "https://vk.com/maximablack";
    let instaLink = "https://www.instagram.com/maxima_black_kennel";
    let fbLink = "https://www.facebook.com/maxima.black.kennel";

    if (socialElement.classList.contains("vk")) {
        window.open(vkLink, "_blank");
    }
    if (socialElement.classList.contains("insta")) {
        window.open(instaLink, "_blank");
    }
    if (socialElement.classList.contains("fb")) {
        window.open(fbLink, "_blank");

    }
}

function goToAnchor(anchor) {
    var loc = document.location.toString().split('#')[0];
    document.location = loc + '#' + anchor;
    return false;
}

function goToLink(link) {
    var loc = document.location.toString().split('#')[0];
    document.location = loc + link;
    return false;
}

function goToDog(dogElement) {
    let link = 'dog?id=' + dogElement.id;
    goToLink(link);
}