const configs = require("./configs");
const Airtable = require('airtable');

var base = new Airtable({ apiKey: configs.API_KEY }).base(configs.BASE_ID);

let list = [];
base(configs.BASE_NAME).select({
    view: configs.VIEW_NAME
})
    .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
            if (record.get(configs.URL_TEXT_COLUMN_NAME) && record.get(configs.URL_TEXT_COLUMN_NAME).length > 0) {
                list.push({
                    id: record.id, fields: {
                        [configs.URL_ATTACHMENT_COLUMN_NAME]: [
                            {
                                "url": record.get(configs.URL_TEXT_COLUMN_NAME)
                            }
                        ]
                    },
                })
            }
        });
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
        base(configs.VIEW_NAME).update(list, (err, records) => {
            if (err) {
                rej(err);
                return;
            }

            records.forEach((record) => {
                console.log(`[${start} - ${end}] Updated =>`, record.get(configs.URL_TEXT_COLUMN_NAME));
            });

            res("ok")
        });
    })
}