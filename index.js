const { retrieveLatLng } = require("./latlngutils");
const fs = require("fs")
const {parse} = require("csv-parse")
const path = require("path")


const parseFile = async () => {
    const parser =fs.createReadStream(path.join(__dirname, "data/Traffic_Volumes_AADT.csv")).pipe(parse({
        delimiter: ",",
        skip_empty_lines: true,
        to_line: 5,
        columns: true

    }))

    const writer = fs.createWriteStream(path.join(__dirname, "data/outputLatLng.csv"));
    await writer.write("OBJECTID,LAT,LNG\r\n")

    for await (const row of parser) {
        const id = row.OBJECTID;
        const county = row.COUNTY;
        const route = row.ROUTE + row.RTE_SFX;
        const postmile = row.PM_PFX + row.PM + row.PM_SFX
        const latlng = await retrieveLatLng(county, route, postmile);
        console.log(latlng)
        await writer.write(id.concat(",", latlng.lat, ",", latlng.lng, "\r\n"));
    }

    writer.close();
}

parseFile();

  