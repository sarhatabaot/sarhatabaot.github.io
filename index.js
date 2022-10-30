class Resource {
    constructor(id, downloads) {
        this.id = id;
        this.downloads = downloads;
    }
}

const endpoint = "https://api.spiget.org/v2/authors/43276/resources";
const test_response = './test-response.json';

var resources = getResourcesFromJson(fetchJson(test_response));
var totalDownloads = getTotalDownloads(resources);

applyDownloadsToDom();

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
            let promiseArray = JSON.parse(response.json());
            let resources = getResourcesFromJson(promiseArray);
            let totalDownloads = getTotalDownloads(resources);
            applyDownloadsToDom(totalDownloads);
        })
        .catch((err) => console.error(err));
}

//This function accepts parsedJson and return an array of resources.
function getResourcesFromJson(promiseArray) {
    let resources = [];
    for (let i = 0; i < 5; i++) {
        var downloads = promiseArray[0].downloads;
        var id = promiseArray[i].id;
        resources.push(new Resource(id, downloads));
    }

    return resources;
}

function getTotalDownloads(resources) {
    var total = 0;
    resources.forEach(resource => total += resource.downloads);
    return total;
}