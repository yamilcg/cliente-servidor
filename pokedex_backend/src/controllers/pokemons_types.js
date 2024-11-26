const { response, request } = require('express');
const pool = require('../db/connection');
const { pokemonsTypesQueries } = require('../models/pokemons_types');

const getAllPokemonTypes = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const pokemonTypes = await conn.query(pokemonsTypesQueries.getAll);
        res.send(pokemonTypes);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
};

const getPokemonTypeByID = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const pokemonType = await conn.query(pokemonsTypesQueries.getByID, [id]);

        if (pokemonType.length === 0) {
            res.status(404).send('Pokemon-Type relation not found');
            return;
        }

        res.send(pokemonType);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (conn) conn.end();
    }
};

const addPokemonType = async (req = request, res = response) => {
    const { pokemon_id, type_id } = req.body;

    if (!pokemon_id || !type_id) {
        res.status(400).send('pokemon_id and type_id fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const relationExist = await conn.query(pokemonsTypesQueries.getByPokemonAndType, [pokemon_id, type_id]);

        if (relationExist.length > 0) {
            res.status(400).send('Relation already exists');
            return;
        }

        const newRelation = await conn.query(pokemonsTypesQueries.create, [pokemon_id, type_id]);
        if (newRelation.affectedRows === 0) {
            res.status(500).send('Failed to create relation');
            return;
        }

        res.status(201).send('Relation added successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const deletePokemonType = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const relationExist = await conn.query(pokemonsTypesQueries.getByID, [id]);

        if (relationExist.length === 0) {
            res.status(404).send('Relation does not exist');
            return;
        }

        const deletedRelation = await conn.query(pokemonsTypesQueries.delete, [id]);
        if (deletedRelation.affectedRows === 0) {
            res.status(500).send('Failed to delete relation');
            return;
        }

        res.status(200).send('Relation deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const updatePokemonType = async (req = request, res = response) => {
    const { id } = req.params;
    const { pokemon_id, type_id } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    if (!pokemon_id || !type_id) {
        res.status(400).send('pokemon_id and type_id fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();

        // Verificar si existe la relación por ID
        const relationExist = await conn.query(pokemonsTypesQueries.getByID, [id]);
        if (relationExist.length === 0) {
            res.status(404).send('Pokemon-Type relation not found');
            return;
        }

        // Actualizar la relación
        const updatedRelation = await conn.query(pokemonsTypesQueries.update, [pokemon_id, type_id, id]);
        if (updatedRelation.affectedRows === 0) {
            res.status(500).send('Failed to update relation');
            return;
        }

        res.status(200).send('Relation updated successfully');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    getAllPokemonTypes,
    getPokemonTypeByID,
    addPokemonType,
    deletePokemonType,
    updatePokemonType, // Exporta el nuevo método
};
