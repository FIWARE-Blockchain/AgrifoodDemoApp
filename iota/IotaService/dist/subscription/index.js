

// const CreateAsset = async (req, res) => {
//     getNodeInfo().then((result) => {
//         res.status(HttpStatus.OK).send(result);
//     }).catch((err) => {
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
//     });
// }

// app.post('/notification', (req, res) => {
//     const encode = Buffer.from(JSON.stringify(req.body.data)).toString('base64');
//     fiwareiota.createMamTransaction(encode).then((result) => {
//         fs.writeFile('./iota_log.json', JSON.stringify(result, null, 4), (err) => {
//             if (err) { console.error(err); }
//         });
//         res.status(204).send(result);
//     }).catch((err) => {
//         res.status(500).send(err);
//     });
// });
"use strict";