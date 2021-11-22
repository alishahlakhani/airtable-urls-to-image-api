var Airtable = require('airtable');
const API_KEY = "Insert your key here";
const BASE_ID = "Insert your base Id"
const BASE_NAME = "Insert your base name"
const VIEW_NAME = "Insert your view name"
const URL_TEXT_COLUMN_NAME = "Insert column name where images are in url format"
const URL_ATTACHMENT_COLUMN_NAME = "Insert column name where image type is Attachment"

var base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

let list = [];
base(BASE_NAME).select({
    view: VIEW_NAME
})
    .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
            if (record.get(URL_TEXT_COLUMN_NAME) && record.get(URL_TEXT_COLUMN_NAME).length > 0) {
                list.push({
                    id: record.id, fields: {
                        [URL_ATTACHMENT_COLUMN_NAME]: [
                            {
                                "url": record.get(URL_TEXT_COLUMN_NAME)
                            }
                        ]
                    },
                })
            }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    }, (err) => {
        if (err) { console.error(err); return; }
        console.log("Total Records to be converted", list.length);

        start = 0;
        for (let end = 10; end <= list.length; end += 10) {
            updateRecord(start, end, list.slice(start, end))
            start = end;
        }
    });

function updateRecord(start, end, list) {
    return new Promise((res, rej) => {
        base(VIEW_NAME).update(list, (err, records) => {
            if (err) {
                rej(err);
                return;
            }

            records.forEach((record) => {
                console.log(`[${start} - ${end}] Updated =>`, record.get(URL_TEXT_COLUMN_NAME));
            });

            res("ok")
        });
    })
}