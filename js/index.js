class Resource {
    constructor(id, downloads) {
        this.id = id;
        this.downloads = downloads;
    }
}

const endpoint = "https://api.spiget.org/v2/authors/43276/resources";
// const test_response = './test-response.json';

window.onload = fetchJson(endpoint);

function applyDownloadsToDom(downloads) {
    document.getElementById('downloads').innerHTML = new Intl.NumberFormat().format(downloads);
}

function fetchJson(path) {
    fetch(path, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS)'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(content => {
            var data = content.data;
            var resources = [];
            for (const plugin of data) {
                resources.push(new Resource(plugin.id, plugin.downloads))
            }
            // for (var i = 0; i < 5; i++) {
            //     resources.push(new Resource(data[i].id, data[i].downloads))
            // }

            var totalDownloads = getTotalDownloads(resources);
            applyDownloadsToDom(totalDownloads);
        })
        .catch((err) => console.error(err));
}

//This function accepts parsedJson and return an array of resources.
async function getResourcesFromJson(promiseArray) {
    let resources = [];
    for (let i = 0; i < 5; i++) {
        console.info(promiseArray[i]);
        var finalResult = promiseArray[i];
        var downloads = finalResult["downloads"];
        var id = finalResult.id;
        resources.push(new Resource(id, downloads));
    }

    return resources;
}

function getTotalDownloads(resources) {
    var total = 0;
    resources.forEach(resource => total += resource.downloads);
    return total;
}