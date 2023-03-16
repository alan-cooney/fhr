function getData() {
    // The map data is stored in the last script
    const scripts = document.querySelectorAll("script");
    const scriptData = scripts[scripts.length - 1].innerText;

    // The data is stored in beachesarray1
    let propertiesString = scriptData.match(/var beachesarray1 = JSON.parse\('.*'\)/)[0];
    propertiesString = propertiesString.replace("var beachesarray1 = JSON.parse('", "").slice(0, -2);

    // Parse the plain text to get a JSON again
    const properties = JSON.parse(propertiesString);

    console.log(properties);
    return properties;
}


async function loadMap() {
    // Hide the search & existing map
    const searchDiv = document.querySelector(".container-mainFHR");
    searchDiv.remove();

    // Get the data
    const data = getData();

    // Create a google map placeholder div
    const mainContent = document.querySelector("#body div.main-content");
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    mainContent.append(mapDiv);



    // Add the map
    // const mappingLib = await import("https://unpkg.com/leaflet@1.9.3/dist/leaflet.js");
    // console.log(mappingLib);



    // function initMap() {
    //     // The location of Uluru
    //     const uluru = { lat: -25.344, lng: 131.031 };
    //     // The map, centered at Uluru
    //     const map = new google.maps.Map(document.getElementById("map"), {
    //         zoom: 4,
    //         center: uluru,
    //     });
    //     // The marker, positioned at Uluru
    //     const marker = new google.maps.Marker({
    //         position: uluru,
    //         map: map,
    //     });
    // }

    // initMap();

}



function runShowAll() {
    loadMap();
}

/**
 * Add a "Show All" button to the navbar
 */
function addShowAllButton() {
    // Get the navigation bar links
    const navLinks = document.querySelector("#navigation ul.newnav");
    if (!navLinks) return;

    // Create a "Show all" link
    const showAll = document.createElement("li");
    showAll.className = "show-all";
    const showAllLink = document.createElement("a");
    showAllLink.className = "linkFhr"
    // showAllLink.href = "#";
    showAllLink.innerHTML = "Show All";
    showAllLink.onclick = runShowAll;
    showAll.append(showAllLink);

    // Add it to the navbar
    navLinks.prepend(showAll)
}

addShowAllButton()
