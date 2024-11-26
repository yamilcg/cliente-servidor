const { response, request } = require('express');
const pool = require('../db/connection');
const { typeQueries } = require('../models/type');

const getAllTypes = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const types = await conn.query(typeQueries.getAll);
        res.send(types);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
};

const getTypeByID = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const type = await conn.query(typeQueries.getByID, [id]);

        if (type.length === 0) {
            res.status(404).send('Type not found');
            return;
        }

        res.send(type);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
};

const addType = async (req = request, res = response) => {
    const { type } = req.body;

    if (!type) {
        res.status(400).send('Type field is required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const type_exist = await conn.query(typeQueries.getByTypeName, [type]);

        if (type_exist.length > 0) {
            res.status(400).send('Type already exists');
            return;
        }

        const newType = await conn.query(typeQueries.createType, [type]);

        if (newType.affectedRows === 0) {
            res.status(500).send('Failed to create type');
            return;
        }

        res.status(201).send('Type added successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const updateType = async (req = request, res = response) => {
    const { id } = req.params;
    const { type } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    if (!type) {
        res.status(400).send('Type field is required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const type_exist = await conn.query(typeQueries.getByID, [id]);

        if (type_exist.length === 0) {
            res.status(404).send('Type does not exist');
            return;
        }

        const updateType = await conn.query(typeQueries.updateType, [type, id]);

        if (updateType.affectedRows === 0) {
            res.status(500).send('Failed to update type');
            return;
        }

        res.status(200).send('Type updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const deleteType = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const type_exist = await conn.query(typeQueries.getByID, [id]);

        if (type_exist.length === 0) {
            res.status(404).send('Type does not exist');
            return;
        }

        const deleteType = await conn.query(typeQueries.deleteType, [id]);

        if (deleteType.affectedRows === 0) {
            res.status(500).send('Failed to delete type');
            return;
        }

        res.status(200).send('Type deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    getAllTypes,
    getTypeByID,
    addType,
    updateType,
    deleteType,
};
