/**
 * Get all properties from a page (either FHR or THC)
 */
function getData() {
    // The map data is stored in the last script
    const scripts = document.querySelectorAll("script");
    const scriptData = scripts[scripts.length - 1].innerText;

    // The data is stored in beachesarray1
    let propertiesString = scriptData.match(/var beachesarray1 = JSON.parse\('.*'\)/)[0];
    propertiesString = propertiesString.replace("var beachesarray1 = JSON.parse('", "").slice(0, -2);

    // Parse the plain text to get a JSON again
    const properties = JSON.parse(propertiesString);

    return properties;
}

/**
 * Load the map with all the properties
 */
function loadMap(data) {
    // Hide the search & existing map
    document.querySelector(".mapform")?.remove();

    // Create a google map placeholder div
    const mainContent = document.querySelector("#body div.main-content");
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    mainContent.append(mapDiv);

    // Create the map
    var map = L.map('map').setView([0, 0], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Set the data as pins
    data.map(point => {
        // Images
        const iconImage = chrome.runtime.getURL("leaflet/images/marker-icon.png");
        const propertyImage = "https://www.americanexpress.com/en-us/travel/discover/photos" + point.ImageForMap
        const propertyPrefix = `https://www.americanexpress.com/en-us/business/tls/partnerships/mystery-shop/Mystery/Property${point.Program}`
        const propertyURL = `${propertyPrefix}?amid=${point.AmexId}&shopId=${point.Id}`

        const iconPopup = L.popup().setContent(
            `<a href="${propertyURL}">
                <div class="popup-contents">
                    <img src="${propertyImage}" width="315" height="210" />
                    
                    <p class="popup-text">
                        <strong>${point.HotelName}</strong>
                        <br />
                        ${point.City}, ${point.Country}<br/>
                    </p>
                </div>
            </a>
            `);

        const icon = L.icon({
            iconUrl: iconImage,
            iconSize: [25, 41],
            iconAnchor: [13, 40],
            popupAnchor: [0, -40],
            className: "icon-regular"
        });

        L.marker([point.Latitude, point.Longitude], {
            title: point.HotelName,
            riseOnHover: true,
            icon: icon
        }).bindPopup(iconPopup).addTo(map);
    })
}

/**
 * Replace the map with a better one
 */
async function replaceMap() {
    // Get the data
    const data = getData();

    // Load the map
    loadMap(data);
}

// /**
//  * Add a "Show All" button to the navbar
//  */
// function addShowAllButton() {
//     // Get the navigation bar links
//     const navLinks = document.querySelector("#navigation ul.newnav");
//     if (!navLinks) return;

//     // Create a "Show all" link
//     const showAll = document.createElement("li");
//     showAll.className = "show-all";
//     const showAllLink = document.createElement("a");
//     showAllLink.className = "linkFhr"
//     // showAllLink.href = "#";
//     showAllLink.innerHTML = "Show All";
//     showAllLink.onclick = replaceMap;
//     showAll.append(showAllLink);

//     // Add it to the navbar
//     navLinks.prepend(showAll)
// }

// Add the button to the navbar
replaceMap()
