document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/Winter-1_GW_PC_2_UNREC._CB584899650_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img2020/img21/apparelGW/jan24atf/unrec/citi/pc-2_2x._CB584618827_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/PC_Hero_1x_Rec_OT_APAY._CB598759972_.jpg",
  ];
  let currentIndex = 0;

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slider.style.backgroundImage = `url('${images[currentIndex]}')`;
  }

  setInterval(showNextImage, 3000);
});

// document.addEventListener("DOMContentLoaded", function () {
//   const navbar = document.getElementById("Header");

//   window.addEventListener("scroll", function () {
//     if (window.scrollY > window.innerHeight * 0.15) {
//       navbar.style.top = "0";
//     } else {
//       navbar.style.top = "-100%";
//     }
//   });
// });

const dropdownbtn = document.querySelectorAll(".dropdownbtn");
const dropdownbox = document.querySelectorAll(".dropdownbox");

dropdownbtn.forEach((dropb, index) => {
  dropb.addEventListener("mouseover", () => {
    dropdownbox[index].classList.remove("active");
  });
  dropb.addEventListener("mouseout", () => {
    dropdownbox[index].classList.add("active");
  });
});

function show() {
  document.getElementById("side-silder").style.display = "block";
}
function hide() {
  document.getElementById("side-silder").style.display = "none";
}

function displaySelectedValue() {
  let show2 = document.getElementById("language-datashowfromlocalstore");
  var radioButtons = document.getElementsByName("redio-button");
  let selectedLanguage = "EN";

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedLanguage = radioButtons[i].value;
      localStorage.setItem("language", selectedLanguage);
      break;
    }
  }
  show2.innerHTML = localStorage.getItem("language");
}

displaySelectedValue();

//LOctation for accuesss
let locationButton = document.getElementById("location-fetch");
let locationDiv = document.querySelector(".location-text");

locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    console.log("The browser does not support geolocation");
  }
});

const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("Please allow access to location");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location Information Unavailable");
      break;
    case error.TIMEOUT:
      console.log("The request to get location timed out");
  }
};

const showLocation = async (position) => {
  try {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );

    if (response.ok) {
      let data = await response.json();
      const maxLength = 6;
      const truncatedString = data.address.county.slice(0, maxLength);

      locationDiv.innerText = `${truncatedString} ${data.address.postcode}`;
    } else {
      console.log(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
};
