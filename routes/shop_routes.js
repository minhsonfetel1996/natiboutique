/**
 * @author spm
 */
const express = require("express");
const { successResponse } = require("./common/response_templates");
const ShopRouter = express.Router();
const axios = require("axios");

const getCities = (req, res) => {
    axios.get(`https://thongtindoanhnghiep.co/api/city`)
        .then(response => {
            if (response) {
                successResponse(null, response.data["LtsItem"].map(c => {
                    return {
                        id: c.ID,
                        name: c.Title
                    }
                }), res);
            }
        }).catch(error => {
            console.log('Have error during get cities: ', error);
            res.status(500).json({ success: false, message: 'Have internal error' });
        });
};

const getDistricts = (req, res) => {
    axios.get(`https://thongtindoanhnghiep.co/api/city/${req.params.id}/district`)
        .then(response => {
            if (response) {
                successResponse(null, response.data.map(d => {
                    return {
                        id: d.ID,
                        name: d.Title
                    }
                }), res);
            }
        }).catch(error => {
            console.log('Have error during get districts from cityId: ', error);
            res.status(500).json({ success: false, message: 'Have internal error' });
        });
};

ShopRouter.get('/cities', getCities);
ShopRouter.get('/:id/districts', getDistricts);

module.exports = ShopRouter;
