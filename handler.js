import nc from 'next-connect';

export default nc({
    onError (error, req, res) {
        return res.status(500).end(JSON.stringify(`Oops something happened Not connected to database ${error}`))
    },
    onNoMatch(req, res) {
        return res.status(405).end(JSON.stringify(`Method ${req.method} not Allowed`))
    }

})
