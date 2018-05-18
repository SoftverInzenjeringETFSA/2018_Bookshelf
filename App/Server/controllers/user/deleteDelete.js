'use strict';

let User = require('../../models/user');

module.exports = (req, res) => {
    
    User.findByIdAndRemove(req.params.id, (err, user) => {  
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "User successfully deleted",
            id: user._id
        };
        return res.status(200).send(response);
    });
};