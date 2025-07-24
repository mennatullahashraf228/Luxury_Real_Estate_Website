
let allProducts = [];
let myArray = JSON.parse(localStorage.getItem("loved")) || [];
let favcards = [...myArray];
const container = document.getElementById("details");
const id = localStorage.getItem("viewDetails");

const x = document.getElementById("nn");
if (x) x.innerHTML = `${favcards.length}`;

fetch("https://edu-me01.github.io/Json-Data/properties.json")
    .then(res => res.json())
    .then(data => {
        allProducts = data.properties;
        const item = data.properties.find(p => p.id == id);
        if (item) {
            showDetails(item);
        } else {
            container.textContent = "Not found";
        }
    });

function showDetails(item) {
    localStorage.setItem("loc", item.location);
    localStorage.setItem("des", item.description);

    const favBtn = document.createElement("button");
    favBtn.id = `fav-btn-${item.id}`;
    favBtn.className = myArray.some(p => p.id === item.id)
        ? "love btn bg-secondary text-white"
        : "love btn bg-danger text-white";
    favBtn.innerHTML = myArray.some(p => p.id === item.id)
        ? `<i class="fa-solid fa-heart-circle-check"></i> Added`
        : `<i class="fa-solid fa-heart"></i> Favorite`;
    favBtn.onclick = () => loved(item.id);

    const priceAndFavDiv = document.createElement("div");
    priceAndFavDiv.setAttribute("data-aos", "fade-up");
    priceAndFavDiv.setAttribute("data-aos-duration", "800");
    priceAndFavDiv.className = "d-flex justify-content-between align-items-center gap-3 mb-3 flex-wrap";
    priceAndFavDiv.innerHTML = `
        <div class="extra-info text-start">
            <p class=""><strong>${item.type}</strong> </p>
            <p class=""><strong>${item.condition}</strong> </p>
        </div>
        <div class="price-and-btn d-flex align-items-center gap-3">
            <p class="fs-5 m-0 text-success"><strong>$</strong> ${item.price}</p>
        </div>
    `;
    priceAndFavDiv.querySelector(".price-and-btn").appendChild(favBtn);

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "image-slider-container";
    sliderContainer.innerHTML = `
        <div class="swiper mySwiper">
            <div class="swiper-wrapper" id="imageSlider"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    `;

    const descDiv = document.createElement("div");
    descDiv.className = "alldescriptions";
    descDiv.innerHTML = `
        <div class="des">
            <p><strong>Description</strong></p>
            <div class="description"><p>${item.description}</p></div>
        </div>
        <div class="features">
            <p><strong>Features & Amenities</strong></p>
            <div id="featuresContainer"></div>
        </div>
    `;

    const formDiv = document.createElement("div");
    formDiv.className = "theform";
   
    formDiv.innerHTML = `
        <form >
            <h2>Contact Agent</h2>
            <div class="photocontainer">
                <img src="shutterstock_smile-or-remove-your-photo-scaled.jpg" alt="person" class="owner">
                <div class="detailsperson">
                    <h3>John Smith</h3>
                    <p>Senior Real state Agent</p>
                </div>
            </div>
            <div class="inf"><p>Your Name*</p><input type="text" placeholder=" Your Name" /></div>
            <div class="inf"><p>Email*</p><input type="email" placeholder=" Your Email"/></div>
            <div class="inf"><p>Phone*</p><input type="number" placeholder=" Your Phone"/></div>
            <div class="inf"><p>Message*</p><textarea placeholder=" Your Message"></textarea></div>
            <button type="submit" class="sub btn btn-success mt-2"><i class="fa-solid fa-paper-plane"></i> Send</button>
        </form>
    `;
    

    const wrapper = document.createElement("div");
    wrapper.className = "description-and-form";
    wrapper.appendChild(descDiv);
    wrapper.appendChild(formDiv);

    container.innerHTML = "";
    container.appendChild(priceAndFavDiv);
    container.appendChild(sliderContainer);
    container.appendChild(wrapper);

    showImages(item.images);
    initSwiper();
    showFeatures(item.features);
    showDetails2(item);
    details3();
   

}

function showImages(images) {
    const slider = document.getElementById("imageSlider");
    images.slice(0, 3).forEach(img => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<img src="${img}" class="theimge" alt="">`;
        slider.appendChild(slide);
    });
}

function initSwiper() {
    new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

function showFeatures(features) {
    const featuresContainer = document.getElementById("featuresContainer");
    
    
    if (!features || features.length === 0) {
        featuresContainer.innerHTML = "<p>No features available</p>";
        return;
    }
    const ul = document.createElement("ul");
    features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        ul.appendChild(li);
    });
    featuresContainer.appendChild(ul);
    
}


function showDetails2(item) {
    const extraDetails = document.createElement("div");
    extraDetails.className = "property des";
     extraDetails.setAttribute("data-aos", "fade-right"); // من اليمين
    extraDetails.setAttribute("data-aos-duration", "800"); // المدة
    extraDetails.setAttribute("data-aos-delay", "200"); // تأخير (اختياري)
    extraDetails.innerHTML = `
        <p class="text"><strong>Property Details</strong></p>
        <div class="main">
            <div class="sec1">
                <p><strong>Bedrooms:</strong> ${item.bedrooms}</p>
                <p><strong>Bathrooms:</strong> ${item.bathrooms}</p>
                <p><strong>Area:</strong> ${item.squareFeet} sqft</p>
                <p><strong>Year Built:</strong> ${item.yearBuilt}</p>
            </div>
            <div class="sec2">
                <p><strong>Parking:</strong> ${item.parking}</p>
                <p><strong>Furnished:</strong> ${item.furnished}</p>
                <p class=""><strong>Type:</strong> ${item.type}</p>
            <p class=""><strong>Condition:</strong> ${item.condition}</p>
            </div>
        </div>
    `;
    container.appendChild(extraDetails);
}

function loved(id) {
    const favItem = allProducts.find(p => p.id === id);
    const btn = document.getElementById(`fav-btn-${id}`);
    if (!favItem || !btn) return;

    const existIndex = myArray.findIndex(p => p.id === id);

    if (existIndex === -1) {
        myArray.push(favItem);
        localStorage.setItem("loved", JSON.stringify(myArray));
        btn.classList.remove("bg-danger");
        btn.classList.add("bg-secondary");
        btn.innerHTML = `<i class="fa-solid fa-heart-circle-check"></i> Added`;

        Swal.fire({
            icon: "success",
            title: "Added to favorites!",
            text: "This property has been added to your favorites list.",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        myArray.splice(existIndex, 1);
        localStorage.setItem("loved", JSON.stringify(myArray));
        btn.classList.remove("bg-secondary");
        btn.classList.add("bg-danger");
        btn.innerHTML = `<i class="fa-solid fa-heart"></i> Favorite`;

        Swal.fire({
            icon: "info",
            title: "Removed from favorites",
            text: "This property was removed from your favorites.",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const x = document.getElementById("nn");
    if (x) x.innerHTML = `${myArray.length}`;
}

function details3() {
    const location = localStorage.getItem("loc");
    const desc = localStorage.getItem("des");
    const bottom = document.createElement("div");
    bottom.className = "bottom-info";
    bottom.innerHTML = `
        <div class="bac">
            <p><strong class="tag text-success"><i class="fa-solid fa-location-dot text-success"></i> Location:</strong> ${location}</p>
            <p><strong class="tag text-success"><i class="fa-solid fa-circle-info text-success"></i> Description:</strong><br>${desc}</p>
        </div>
    `;
    container.appendChild(bottom);
    setTimeout(() => {
        AOS.refresh();
    }, 100);
}
