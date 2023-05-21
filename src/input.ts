export function setupInput(element: HTMLInputElement) {
    // file chooser
    element.addEventListener("change", () => {
        const files = element.files;
        if (files === null) {
            return;
        }
        if (files.length === 0) {
            return;
        }
        const file = files[0];

        // filename check
        if (!file.name.endsWith(".xml")) {
            alert("Please select a .xml file");
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", loadHandler);
        reader.readAsText(file);
    });
}

function loadHandler(this: FileReader) {
    const text = this.result;
    if (typeof text !== "string") {
        return;
    }

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    console.log(xml);
    const gs = xml.querySelectorAll("gameSetup")[1];

    const players = gs.querySelectorAll("players");
    players.forEach((player) => {
        player.innerHTML = `<smartplays> </smartplays>`;
    });

    downloadXML(xml);
}

function downloadXML(xml: Document, filename = "profiles.xml") {
    debugger;
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xml);
    const blob = new Blob([xmlString], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), {
        href: url,
        download: filename,
    });
    link.click();
}
